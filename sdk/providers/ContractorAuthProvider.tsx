import { Backdrop, CircularProgress, Dialog, DialogContent, IconButton, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, FC, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { Identify, sendAnalytics } from '../analytics/analyticsWrapper'
import { createCookieInHour, deleteCookie, getCookie } from '../analytics/helper'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import { StepIconProps } from '@mui/material/StepIcon'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CloseIcon from '@mui/icons-material/Close'

import {
	emailVerification,
	getCustomerDetails,
	loginService,
	logOutService,
	reSendEmailOtpService,
	sendEmailOtpService,
	sendOtpService,
} from '../apis'
import { CUSTOMER_STATUS, CustomerDetails, ONBOARDING_STATUS, USER_LOGIN_TYPE, USER_TYPE } from '../types'
import { useSnackbar } from './SnackbarProvider'
import { LoginForm } from 'modules/auth/login/components/LoginForm'
import { OTPVerification } from 'modules/auth/otp/components/OtpVerification'
import { useFlags } from 'flagsmith/react'

const LoadingUniqueString = 'loading...'
interface AuthState {
	user: null | CustomerDetails
	phoneNumber: null | string
	accessToken: null | string
	refreshToken: null | string
	isRegister: boolean
	isSideBarToggle: boolean
	isWhatsAppOptIn: boolean
}

interface emailOtpPayload {
	otp: string
	token: string
}
interface AuthProviderValue extends AuthState {
	requestOtp: (phoneNumber: string) => Promise<any>
	verifyOtp: (phoneNumber: string, otp: string) => Promise<any>
	logOut: () => void
	getContactorUserInfo: () => Promise<any>
	updateIsRegUser: (isRegister: boolean) => {}
	updateIsSideBarToggle: (isSideBarToggle: boolean) => {}
	requestEmailOtp: () => Promise<any>
	reSendEmailOtp: (payload: { token: string }) => Promise<any>
	createEasyBooking: (bookingDetails: any) => Promise<any>
	verifyEmailOtp: (payload: emailOtpPayload) => Promise<any>
	openLoginDialog: () => any
	setBackdropProps: any
	handleWhatsApp: () => any
	otpMaxLimitReached: boolean
}

const simpleReducer = (state: AuthState, payload: Partial<AuthState>) => ({
	...state,
	...payload,
})
const AccessMap: { [key in ONBOARDING_STATUS]: string } = {
	PROFILE_CREATION_PENDING: '/create-profile',
	EMAIL_VERIFICATION_PENDING: '/verify-email',
	ORGANISATION_CREATION_PENDING: '/create-organisation',
	ONBOARDED: '/dashboard',
	ORGANISATION_LINKING_FAILED: '/onboarding/failed',
}
const initialAuthState: AuthState = {
	accessToken: LoadingUniqueString,
	refreshToken: LoadingUniqueString,
	phoneNumber: LoadingUniqueString,
	user: null,
	isRegister: false,
	isSideBarToggle: false,
	isWhatsAppOptIn: true,
}
const ContractorAuthContext = createContext<AuthProviderValue>({
	...initialAuthState,
	logOut: () => Promise.resolve(null),
	requestOtp: () => Promise.resolve(null),
	verifyOtp: () => Promise.resolve(null),
	getContactorUserInfo: () => Promise.resolve(null),
	updateIsRegUser: () => false,
	updateIsSideBarToggle: () => false,
	requestEmailOtp: () => Promise.resolve(null),
	reSendEmailOtp: (payload: { token: string }) => Promise.resolve(null),
	createEasyBooking: () => Promise.resolve(null),
	verifyEmailOtp: () => Promise.resolve(null),
	openLoginDialog: () => null,
	setBackdropProps: () => null,
	handleWhatsApp: () => null,
	otpMaxLimitReached: false,
})
const { Provider, Consumer } = ContractorAuthContext

const cookieExpireTime = 45
const PublicPages = [
	'/',
	'/about-us',
	'/contact-us',
	'/privacy-policy',
	'/refund-policy',
	'/tnc',
	'/faq',
	'/hero/plans',
	'/KhulaManch',
	'/how-it-works',
	'/blog',
	'/job-card/connect',
	'/blog/[blogId]',
]
interface ContractorAuthProviderProps {
	authState?: AuthState
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 8px)',
		right: 'calc(50% + 8px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#4db07f',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#4db07f',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#4db07f',
		borderTopWidth: 3,
		borderRadius: 1,
	},
}))

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
	color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#4db07f',
	display: 'flex',
	height: 22,
	alignItems: 'center',
	...(ownerState.active && {
		color: '#4db07f',
	}),
	'& .QontoStepIcon-completedIcon': {
		color: '#4db07f',
		zIndex: 1,
		fontSize: 20,
	},
}))

function QontoStepIcon(props: StepIconProps) {
	const { active, completed, className } = props

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? (
				<CheckCircleIcon className='QontoStepIcon-completedIcon' />
			) : active ? (
				<AdjustOutlinedIcon className='QontoStepIcon-completedIcon' />
			) : (
				<RadioButtonUncheckedIcon className='QontoStepIcon-completedIcon' />
			)}
		</QontoStepIconRoot>
	)
}

const stepsName = ['Booking Details', 'Wage Details', 'Contact', 'Order Placed']

const ContractorAuthProvider: FC<ContractorAuthProviderProps> = ({ children, authState }) => {
	const [state, dispatch] = useReducer(simpleReducer, authState ?? initialAuthState)
	const router = useRouter()
	const { showSnackbar } = useSnackbar()
	const [backdropProps, setBackdropProps] = useState({ open: false })
	const [redirectingIn, setRedirectingIn] = useState(0)
	const [otpMaxLimitReached, setOtpMaxLimitReached] = useState(false)
	const flags = useFlags(['s_booking_creation_remove_default_wage'])

	const requestOtp = useCallback(
		async (phoneNumber: string) => {
			dispatch({
				phoneNumber: phoneNumber,
			})
			try {
				return await sendOtpService(phoneNumber, USER_TYPE.CONTRACTOR)
			} catch (error: any) {
				if (error.response.status === 429) {
					showSnackbar('Please try again in 5 minutes.', 'error')
					setOtpMaxLimitReached(true)
				} else {
					showSnackbar(error.response.data.developerInfo, 'error')
				}
			}
		},
		[showSnackbar]
	)
	const getContactorUserInfo = useCallback(async () => {
		try {
			const { data } = await getCustomerDetails()
			const {
				_id,
				email,
				name,
				phoneNumber,
				companyName,
				onboardingStatus,
				GSTIN,
				customerStatus,
				designation,
				linkedOrganisation,
				whatsappOptedIn,
			} = data.payload
			dispatch({
				user: {
					organisationId: linkedOrganisation?.organisationId ?? '',
					organisationRole: linkedOrganisation?.role ?? '',
					customerId: _id ?? '',
					email: email ?? '',
					name: name ?? '',
					phoneNumber: phoneNumber ?? '',
					companyName: data?.payload?.companyName ?? '',
					onboardingStatus: data.payload?.onboardingStatus ?? ONBOARDING_STATUS.PROFILE_CREATION_PENDING,
					GSTIN: data?.payload?.GSTIN ?? '',
					hasProjects: data?.payload?.hasProjects ?? false,
					customerStatus: customerStatus ?? CUSTOMER_STATUS?.REGISTERED,
					designation: designation ?? '',
					whatsappOptedIn: whatsappOptedIn ?? false,
				},
				isWhatsAppOptIn: whatsappOptedIn ?? true,
			})

			if (getCookie('isUTMParamIdentified') !== '') {
				createCookieInHour('isUTMParamIdentified', true, cookieExpireTime)
			}

			await Identify({
				userType: 'customer',
				customerId: data?.payload?._id ?? '',
				name: data?.payload?.name ?? '',
				email: data?.payload?.email ?? '',
				phone: data?.payload?.phoneNumber ?? '',
				company: data?.payload?.companyName ?? '',
				createdAt: data?.payload?.createdAt ?? '',
				organisationId: data?.payload?.linkedOrganisation?.organisationId ?? '',
				organisationRole: data?.payload?.linkedOrganisation?.role ?? '',
				designation: data?.payload?.designation ?? '',

				customerStatus: data?.payload?.customerStatus ?? CUSTOMER_STATUS?.REGISTERED,
				isOrganisationMembershipDeleted: data?.payload?.linkedOrganisation?.isDeleted ? 'Yes' : '',
				onboardingStatus: data?.payload?.onboardingStatus ?? ONBOARDING_STATUS.PROFILE_CREATION_PENDING,
			})
			return data
		} catch (error: any) {
			//todo show error in snackbar
			console.log(error)
		}
	}, [])
	const verifyOtp = useCallback(
		async (phoneNumber: string, otp: string) => {
			try {
				const { data } = await loginService(
					phoneNumber,
					USER_TYPE.CONTRACTOR,
					USER_LOGIN_TYPE.OTP,
					otp,
					state.isWhatsAppOptIn
				)
				if (data?.success) {
					document.cookie = `accessToken = ${data.data?.accessToken}`
					document.cookie = `phoneNumber = ${data.data?.phoneNumber}`
					document.cookie = `refreshToken = ${data.data?.refreshToken}`

					localStorage.setItem('accessToken', data.data?.accessToken)
					localStorage.setItem('phoneNumber', data.data?.phoneNumber)
					localStorage.setItem('refreshToken', data.data?.refreshToken)
					dispatch({
						accessToken: data.data?.accessToken,
						phoneNumber: data.data?.phoneNumber,
						refreshToken: data.data?.refreshToken,
					})

					if (getCookie('isUTMParamIdentified') !== '') {
						createCookieInHour('isUTMParamIdentified', true, cookieExpireTime)
					}
					await Identify({
						userType: 'customer',
						customerId: data?.data?._id ?? '',
						name: data?.data?.name ?? '',
						email: data?.data?.email ?? '',
						phone: data?.data?.phoneNumber ?? '',
						company: data?.data?.companyName ?? '',
						createdAt: data?.data?.createdAt ?? '',
						organisationId: data?.data?.linkedOrganisation?.organisationId ?? '',
						organisationRole: data?.data?.linkedOrganisation?.role ?? '',
						designation: data?.data?.designation ?? '',
						customerStatus: data?.data?.customerStatus ?? CUSTOMER_STATUS?.REGISTERED,
						isOrganisationMembershipDeleted: data?.data?.linkedOrganisation?.isDeleted ? 'Yes' : '',
						onboardingStatus: data?.payload?.onboardingStatus ?? ONBOARDING_STATUS.PROFILE_CREATION_PENDING,
					})
					return data
				} else {
					showSnackbar(data?.error, 'error')
					return data
				}
			} catch (error: any) {
				if (error.response.status === 429) {
					showSnackbar('Please try again in 5 minutes.', 'error')
					setOtpMaxLimitReached(true)
				} else {
					showSnackbar(error.response.data.developerInfo, 'error')
				}
				return error
				//TODO: Need to fix in response also
				//showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			//return await loginService(phoneNumber, USER_TYPE.CONTRACTOR, USER_LOGIN_TYPE.OTP, otp)
		},
		[showSnackbar, state.isWhatsAppOptIn]
	)

	const updateIsRegUser = useCallback(async (isRegister: boolean) => {
		dispatch({
			isRegister: isRegister,
		})
	}, [])

	const updateIsSideBarToggle = useCallback(async (isSideBarToggle: boolean) => {
		dispatch({
			isSideBarToggle: isSideBarToggle,
		})
	}, [])

	const requestEmailOtp = useCallback(async () => {
		return sendEmailOtpService()
	}, [])
	const reSendEmailOtp = useCallback(async (payload: { token: string }) => {
		return reSendEmailOtpService(payload)
	}, [])

	const verifyEmailOtp = useCallback(
		async (payload: emailOtpPayload) => {
			try {
				const { data } = await emailVerification(payload)
				//getContactorUserInfo()
				return data
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
		},
		[showSnackbar]
	)

	useEffect(() => {
		;(async () => {
			const accessToken = localStorage.getItem('accessToken')
			const refreshToken = localStorage.getItem('refreshToken')
			const phoneNumber = localStorage.getItem('phoneNumber')
			if (!(accessToken && refreshToken && phoneNumber)) {
				if (PublicPages.includes(router.pathname)) return
				logOutService(true)
				return
			}
			try {
				const { data } = await getCustomerDetails()
				dispatch({
					accessToken: accessToken,
					refreshToken: refreshToken,
					phoneNumber: phoneNumber,
					user: {
						customerId: data?.payload?.customerId ?? '',
						organisationId: data?.payload?.linkedOrganisation?.organisationId ?? '',
						organisationRole: data?.payload?.linkedOrganisation?.role ?? '',
						email: data?.payload?.email ?? '',
						name: data?.payload?.name ?? '',
						phoneNumber: data?.payload?.phoneNumber ?? '',
						companyName: data?.payload?.companyName ?? '',
						onboardingStatus: data?.payload?.onboardingStatus ?? '',
						GSTIN: data?.payload?.GSTIN ?? '',
						hasProjects: data?.payload?.hasProjects ?? false,
						customerStatus: data?.payload?.customerStatus ?? CUSTOMER_STATUS.REGISTERED,
						designation: data?.payload?.designation ?? '',
						whatsappOptedIn: data?.payload?.whatsappOptedIn ?? false,
					},
					isWhatsAppOptIn: data?.payload?.whatsappOptedIn ?? true,
				})
				await Identify({
					userType: 'customer',
					customerId: data?.payload?._id ?? '',
					name: data?.payload?.name ?? '',
					email: data?.payload?.email ?? '',
					phone: data?.payload?.phoneNumber ?? '',
					company: data?.payload?.companyName ?? '',
					createdAt: data?.payload?.createdAt ?? '',
					organisationId: data?.payload?.linkedOrganisation?.organisationId ?? '',
					organisationRole: data?.payload?.linkedOrganisation?.role ?? '',
					designation: data?.payload?.designation ?? '',
					customerStatus: data?.payload?.customerStatus ?? CUSTOMER_STATUS?.REGISTERED,
					isOrganisationMembershipDeleted: data?.payload?.linkedOrganisation?.isDeleted ? 'Yes' : '',
					onboardingStatus: data?.payload?.onboardingStatus ?? ONBOARDING_STATUS.PROFILE_CREATION_PENDING,
				})
				if (getCookie('isUTMParamIdentified') !== '') {
					createCookieInHour('isUTMParamIdentified', true, cookieExpireTime)
				}
			} catch (error: any) {
				console.log('error', error)
				if (error?.response?.status !== 401) {
					showSnackbar(error?.response?.data?.developerInfo, 'error')
				}
			}
		})()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	//logic for redirect based on state and update userInfo
	useEffect(() => {
		if (!(state.accessToken && state.refreshToken && state.phoneNumber)) {
			if (PublicPages.includes(router.pathname)) return
			logOutService(true)
			return
		}
		if (
			state.accessToken !== LoadingUniqueString &&
			state.phoneNumber !== LoadingUniqueString &&
			state.user === null
		) {
			getContactorUserInfo()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.accessToken, state.phoneNumber, state.refreshToken])

	useEffect(() => {
		const timer = setInterval(getContactorUserInfo, 300000)
		return () => clearInterval(timer)
	}, [])
	const createEasyBooking = useCallback(
		async (bookingDetails) => {
			if (state.user?.hasProjects) {
				await router.replace(`/dashboard`, undefined, {})
				return
			}
			try {
				setBackdropProps({ open: true })
				const payload = {
					jobType: bookingDetails.jobType,
					city: bookingDetails.city,
					state: bookingDetails.state,
					requirements: {
						HELPER: bookingDetails.isHelper
							? {
									count: 0,
									wage: bookingDetails.helperWage,
							  }
							: undefined,
						TECHNICIAN: bookingDetails.isTechnician
							? {
									count: 0,
									wage: bookingDetails.technicianWage,
							  }
							: undefined,
						SUPERVISOR: bookingDetails.isSupervisor
							? {
									count: 0,
									wage: bookingDetails.supervisorWage,
							  }
							: undefined,
					},
				}
				const user = await getContactorUserInfo()
				if (user?.payload?.hasProjects) {
					showSnackbar('You Already have Job Posted, Go to dashboard to view your jobs', 'warning')
					setBackdropProps({ open: false })
					return
				}
				const { data, status } = await axios.post('/gateway/customer-api/projects/bookings', payload)
				deleteCookie('discoveryBooking')
				setStartRedirecting(true)
				sendAnalytics({
					name: 'postedJob',
					action: 'ButtonClick',
					metaData: {
						success: true,
					},
				})
				const a = setTimeout(async () => {
					await router.replace(`/projects/${data?.payload?.projectId}/bookings`, undefined, {})
					setBackdropProps({ open: false })
					setStartRedirecting(false)
				}, 3000)
			} catch (error) {
				sendAnalytics({
					name: 'postedJob',
					action: 'ButtonClick',
					metaData: {
						success: false,
					},
				})
				showSnackbar('Failed to your job', 'error')
				setBackdropProps({ open: false })
			}
		},
		[getContactorUserInfo, router, showSnackbar, state.user?.hasProjects]
	)

	useEffect(() => {
		if (state.user) {
			try {
				const redirectRoute = AccessMap[state.user.onboardingStatus]

				if (state.user.onboardingStatus !== ONBOARDING_STATUS.ONBOARDED) {
					if (router.pathname !== redirectRoute) {
						router.replace(redirectRoute)
					}
					return
				} else if (
					router.pathname === '/create-organisation' &&
					state.user.onboardingStatus === ONBOARDING_STATUS.ONBOARDED
				) {
					router.replace('/onboarding/success')
					return
				} else if (
					router.pathname === '/onboarding/failed' &&
					state.user.onboardingStatus === ONBOARDING_STATUS.ONBOARDED
				) {
					router.replace('/dashboard')
				} else {
					if (!PublicPages.every((item) => router.pathname !== item)) {
					} else if (
						// restricts access to any other routes except the routes included in array
						[
							'/dashboard',
							'/profile',
							'/worker',
							'/projects',
							'/bookings',
							'/account',
							'/onboarding',
						].every((item) => !router.pathname.includes(item))
					) {
						if (router.query.redirectBackTo) {
							router.replace(router.query.redirectBackTo as string)
							return
						}
						router.replace(redirectRoute)
						return
					}
				}
			} catch (error) {
				console.log(error)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.user, router])

	const handleWhatsApp = useCallback(() => {
		dispatch({
			isWhatsAppOptIn: !state.isWhatsAppOptIn,
		})
	}, [state])

	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
	const [isOtpSent, setIsOtpSent] = useState<boolean>(false)
	const [startRedirecting, setStartRedirecting] = useState(false)
	useEffect(() => {
		if (!startRedirecting) return
		setRedirectingIn(5)
		const interval = setInterval(() => {
			setRedirectingIn((t) => {
				if (t <= 0) {
					return 0
				}
				return t - 1
			})
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [startRedirecting])

	const openLoginDialog = useCallback(() => {
		if (!state.user) setIsDialogOpen(!isDialogOpen)
	}, [isDialogOpen, state.user])
	useEffect(() => {
		if (state.user) {
			setIsDialogOpen(false)
		}
	}, [state.user])

	// const handleActiveStepValue = useCallback(() => {
	// 	let value = router.query.bookingformStep ?? 0
	// 	setActiveStepValue(value)
	// }, [router])
	useEffect(() => {
		if (router.query.redirectBackTo) {
			setIsDialogOpen(true)
		}
	}, [router.query.redirectBackTo])
	const authProviderValue: AuthProviderValue = useMemo(
		() => ({
			...state,
			setBackdropProps: setBackdropProps,
			requestOtp: requestOtp,
			verifyOtp: verifyOtp,
			logOut: logOutService,
			getContactorUserInfo: getContactorUserInfo,
			updateIsRegUser: updateIsRegUser,
			updateIsSideBarToggle: updateIsSideBarToggle,
			requestEmailOtp: requestEmailOtp,
			verifyEmailOtp: verifyEmailOtp,
			reSendEmailOtp: reSendEmailOtp,
			createEasyBooking: createEasyBooking,
			openLoginDialog: openLoginDialog,
			handleWhatsApp: handleWhatsApp,
			otpMaxLimitReached: otpMaxLimitReached,
		}),
		[
			state,
			setBackdropProps,
			requestOtp,
			verifyOtp,
			getContactorUserInfo,
			updateIsRegUser,
			updateIsSideBarToggle,
			requestEmailOtp,
			verifyEmailOtp,
			reSendEmailOtp,
			createEasyBooking,
			openLoginDialog,
			handleWhatsApp,
			otpMaxLimitReached,
		]
	)
	return (
		<Provider value={authProviderValue}>
			{children}

			<Dialog
				onClose={openLoginDialog}
				fullWidth={true}
				maxWidth={'xs'}
				open={isDialogOpen}
				sx={{
					'& .MuiPaper-root': {
						borderRadius: '16px',
						width: { xs: '100%', md: '100%' },
					},
					margin: 'auto',
					padding: '10px',
					'& .MuiPaper-elevation': {
						margin: { xs: '0px' },
						padding: { xs: 0 },
					},
				}}>
				<DialogContent
					sx={{
						paddingX: { md: 4, xs: 0 },
					}}>
					<Stack direction={'row'} justifyContent={'flex-start'}>
						<IconButton onClick={openLoginDialog}>
							<CloseIcon sx={{ color: '#000' }} />
						</IconButton>
					</Stack>

					<Paper
						elevation={0}
						sx={{
							px: { md: 0, xs: 0 },
						}}>
						{!isOtpSent ? (
							<LoginForm isOtpSent={isOtpSent} setIsOtpSent={setIsOtpSent} fromHome={true} />
						) : (
							<OTPVerification isOtpSent={isOtpSent} setIsOtpSent={setIsOtpSent} fromHome={true} />
						)}
					</Paper>

					{/* <Stack>
						<Button
							onClick={() => {
								setIsRegister(true)
							}}>
							Register
						</Button>
					</Stack> */}
				</DialogContent>
			</Dialog>

			<Backdrop {...backdropProps}>
				{startRedirecting && <CircularProgress />}
				<Dialog
					PaperProps={{ sx: { borderRadius: 3, backgroundColor: '#000000' } }}
					maxWidth='xs'
					open={startRedirecting}>
					<Stack p={2} py={3} spacing={2}>
						<Typography color='success.dark' variant='h2' textAlign={'center'}>
							You have successfully posted your Job.
						</Typography>
						<Typography variant='body2' textAlign={'center'}>
							You will start receiving ProjectHeroes Applications in few minutes. Check your contractor
							dashboard to get ProjectHeroes phone number.
						</Typography>
						<Typography color='primary.main' variant='caption' textAlign={'center'}>
							Redirecting to dashboard in 00:0{redirectingIn}
						</Typography>
					</Stack>
				</Dialog>
			</Backdrop>
		</Provider>
	)
}

export const useContractorAuth = () => useContext(ContractorAuthContext)
export { ContractorAuthProvider, Consumer as ContractorAuthConsumer, ContractorAuthContext }

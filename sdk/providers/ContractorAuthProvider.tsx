import { KeyboardReturn } from '@mui/icons-material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, FC, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { Identify } from '../analytics/analyticsWrapper'
import { createCookieInHour, deleteCookie, getCookie } from '../analytics/helper'
import {
	emailVerification,
	getCustomerDetails,
	loginService,
	logOutService,
	reSendEmailOtpService,
	sendEmailOtpService,
	sendOtpService,
} from '../apis'
import { CustomerDetails, CUSTOMER_STATUS, ONBOARDING_STATUS, USER_LOGIN_TYPE, USER_TYPE } from '../types'
import { useSnackbar } from './SnackbarProvider'
const LoadingUniqueString = 'loading...'
interface AuthState {
	user: null | CustomerDetails
	phoneNumber: null | string
	accessToken: null | string
	refreshToken: null | string
	isRegister: false | Boolean
	isSideBarToggle: false | boolean
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

	verifyEmailOtp: (payload: emailOtpPayload) => Promise<any>
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

	verifyEmailOtp: () => Promise.resolve(null),
})
const { Provider, Consumer } = ContractorAuthContext

const fullYearDays = 365
interface ContractorAuthProviderProps {
	authState?: AuthState
}
const ContractorAuthProvider: FC<ContractorAuthProviderProps> = ({ children, authState }) => {
	const [state, dispatch] = useReducer(simpleReducer, authState ?? initialAuthState)
	const router = useRouter()
	const { showSnackbar } = useSnackbar()
	const requestOtp = useCallback(
		async (phoneNumber: string) => {
			dispatch({
				phoneNumber: phoneNumber,
			})
			try {
				return await sendOtpService(phoneNumber, USER_TYPE.CONTRACTOR)
			} catch (error: any) {
				showSnackbar(error.response.data.developerInfo, 'error')
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
				},
			})

			if (getCookie('isUTMParamIdentified') !== '') {
				createCookieInHour('isUTMParamIdentified', true, fullYearDays)
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
		} catch (error: any) {
			//todo show error in snackbar
			console.log(error)
		}
	}, [])
	const verifyOtp = useCallback(
		async (phoneNumber: string, otp: string) => {
			try {
				const { data } = await loginService(phoneNumber, USER_TYPE.CONTRACTOR, USER_LOGIN_TYPE.OTP, otp)
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
						createCookieInHour('isUTMParamIdentified', true, fullYearDays)
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
				showSnackbar(error?.error, 'error')
				return error
				//TODO: Need to fix in response also
				//showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			//return await loginService(phoneNumber, USER_TYPE.CONTRACTOR, USER_LOGIN_TYPE.OTP, otp)
		},
		[showSnackbar]
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
			if (!(accessToken || refreshToken || phoneNumber)) {
				logOutService()
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
					},
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
					createCookieInHour('isUTMParamIdentified', true, fullYearDays)
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
			logOutService()
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
			try {
				const payload = {
					jobType: bookingDetails.jobType,
					city: bookingDetails.location.split(',')[0],
					state: bookingDetails.location.split(',')[0],
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
					bookingDuration: bookingDetails.workDuration,
				}
				const { data, status } = await axios.post('/gateway/customer-api/projects/bookings', payload)
				deleteCookie('discoveryBooking')
				router.push(`/bookings/${data.payload.projectId}/${data.payload.bookingId}/checkout`)
			} catch (error) {
				showSnackbar('Failed to create easy booking', 'error')
			}
		},
		[router, showSnackbar]
	)

	useEffect(() => {
		if (state.user) {
			try {
				const discoveryBookingFromCookie = () => {
					try {
						const discoveryBookingFromCookie = JSON.parse(getCookie('discoveryBooking'))
						return discoveryBookingFromCookie
					} catch (error) {
						return undefined
					}
				}

				if (!state.user.hasProjects && discoveryBookingFromCookie()) {
					createEasyBooking(discoveryBookingFromCookie())
				} else {
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
						if (
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
							router.replace(redirectRoute)
							return
						}
					}
				}
			} catch (error) {
				console.log(error)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.user, router])

	const authProviderValue: AuthProviderValue = useMemo(
		() => ({
			...state,
			requestOtp: requestOtp,
			verifyOtp: verifyOtp,
			logOut: logOutService,
			getContactorUserInfo: getContactorUserInfo,
			updateIsRegUser: updateIsRegUser,
			updateIsSideBarToggle: updateIsSideBarToggle,
			requestEmailOtp: requestEmailOtp,
			verifyEmailOtp: verifyEmailOtp,
			reSendEmailOtp: reSendEmailOtp,
		}),
		[
			state,
			requestOtp,
			verifyOtp,
			getContactorUserInfo,
			updateIsRegUser,
			updateIsSideBarToggle,
			requestEmailOtp,
			verifyEmailOtp,
			reSendEmailOtp,
		]
	)
	return <Provider value={authProviderValue}>{children}</Provider>
}

export const useContractorAuth = () => useContext(ContractorAuthContext)
export { ContractorAuthProvider, Consumer as ContractorAuthConsumer, ContractorAuthContext }

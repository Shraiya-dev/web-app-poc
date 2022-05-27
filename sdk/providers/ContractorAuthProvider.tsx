import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { Identify } from '../analytics/analyticsWrapper'
import { getCustomerDetails, loginService, logOutService, sendOtpService } from '../apis'
import { CustomerDetails, CUSTOMER_STATUS, USER_LOGIN_TYPE, USER_TYPE } from '../types'
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

interface AuthProviderValue extends AuthState {
	requestOtp: (phoneNumber: string) => Promise<any>
	verifyOtp: (phoneNumber: string, otp: string) => Promise<any>
	logOut: () => void
	getContactorUserInfo: () => Promise<any>
	updateIsRegUser: (isRegister: boolean) => {}
	updateIsSideBarToggle: (isSideBarToggle: boolean) => {}
}
const simpleReducer = (state: AuthState, payload: Partial<AuthState>) => ({
	...state,
	...payload,
})
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
})
const { Provider, Consumer } = ContractorAuthContext

const ContractorAuthProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(simpleReducer, initialAuthState)
	const router = useRouter()
	const { showSnackbar } = useSnackbar()
	const requestOtp = useCallback(async (phoneNumber: string) => {
		dispatch({
			phoneNumber: phoneNumber,
		})
		return await sendOtpService(phoneNumber, USER_TYPE.CONTRACTOR)
	}, [])
	const getContactorUserInfo = useCallback(async () => {
		try {
			const { data } = await getCustomerDetails()

			console.log(data)
			dispatch({
				user: {
					customerId: data.payload?._id ?? '',
					email: data.payload?.email ?? '',
					name: data.payload?.name ?? '',
					phoneNumber: data.payload?.phoneNumber ?? '',
					companyName: data.payload.companyName ?? '',
					GSTIN: data.payload.GSTIN ?? '',
					customerStatus: data.payload?.customerStatus ?? CUSTOMER_STATUS.REGISTERED,
				},
			})

			await Identify({
				name: data.payload?.name ?? '',
				email: data.payload?.email ?? '',
				phone: data.payload?.phoneNumber ?? '',
				company: data.payload.companyName ?? '',
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
					localStorage.setItem('accessToken', data.data?.accessToken)
					localStorage.setItem('phoneNumber', data.data?.phoneNumber)
					localStorage.setItem('refreshToken', data.data?.refreshToken)
					dispatch({
						accessToken: data.data?.accessToken,
						phoneNumber: data.data?.phoneNumber,
						refreshToken: data.data?.refreshToken,
					})

					await Identify({
						customerId: data?.data?._id ?? '',
						name: data.data?.name ?? '',
						email: data.data?.email ?? '',
						phone: data.data?.phoneNumber ?? '',
						company: data.data.companyName ?? '',
						createdAt: data.data.createdAt ?? '',
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
						customerId: data.payload?.customerId ?? '',
						email: data.payload?.email ?? '',
						name: data.payload?.name ?? '',
						phoneNumber: data.payload?.phoneNumber ?? '',
						companyName: data.payload.companyName ?? '',
						GSTIN: data.payload.GSTIN ?? '',
						customerStatus: data.payload?.customerStatus ?? CUSTOMER_STATUS.REGISTERED,
					},
				})
			} catch (error: any) {
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
		if (state.user) {
			if (
				[CUSTOMER_STATUS.REGISTERED, CUSTOMER_STATUS.UPDATE_PROFILE].includes(state.user.customerStatus) &&
				router.asPath !== '/onboarding'
			) {
				router.push('/onboarding')
			} else if (
				state.user.customerStatus === CUSTOMER_STATUS.PROFILE_COMPLETED &&
				!(
					router.pathname.includes('/dashboard') ||
					router.pathname.includes('/profile') ||
					router.pathname.includes('/worker') ||
					router.pathname.includes('/projects') ||
					router.pathname.includes('/bookings')
				)
			) {
				router.push('/dashboard')
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
		}),
		[state, requestOtp, verifyOtp, getContactorUserInfo, updateIsRegUser, updateIsSideBarToggle]
	)
	return <Provider value={authProviderValue}>{children}</Provider>
}

export const useContractorAuth = () => useContext(ContractorAuthContext)
export { ContractorAuthProvider, Consumer as ContractorAuthConsumer, ContractorAuthContext }

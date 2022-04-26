import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { loginService, sendOtpService } from '../apis'
import { CustomerDetails, CUSTOMER_STATUS, USER_LOGIN_TYPE, USER_TYPE } from '../types'
import { useSnackbar } from './SnackbarProvider'

const LoadingUniqueString = 'loading...'
interface AuthState {
	user: null | CustomerDetails
	phoneNumber: null | string
	accessToken: null | string
	refreshToken: null | string
}

interface AuthProviderValue extends AuthState {
	requestOtp: (phoneNumber: string) => Promise<any>
	verifyOtp: (phoneNumber: string, otp: string) => Promise<any>
	logOut: () => Promise<any>
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
}
const ContractorAuthContext = createContext<AuthProviderValue>({
	...initialAuthState,
	logOut: () => Promise.resolve(null),
	requestOtp: () => Promise.resolve(null),
	verifyOtp: () => Promise.resolve(null),
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
			const { data } = await axios.get('/gateway/customer-api')
			dispatch({
				user: {
					customerId: data.payload?._id ?? '',
					email: data.payload?.email ?? '',
					name: data.payload?.userName ?? '',
					phoneNumber: data.payload?.phoneNumber ?? '',
					companyName: data.payload.companyName ?? '',
					customerStatus: data.payload?.customerStatus ?? CUSTOMER_STATUS.REGISTERED,
				},
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
					return data
				} else {
					throw data
				}
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			//return await loginService(phoneNumber, USER_TYPE.CONTRACTOR, USER_LOGIN_TYPE.OTP, otp)
		},
		[showSnackbar]
	)

	const logOut = useCallback(async () => {
		localStorage.clear()
		dispatch(initialAuthState)
		await router.push('/login')
	}, [router])
	useEffect(() => {
		;(async () => {
			const accessToken = localStorage.getItem('accessToken')
			const refreshToken = localStorage.getItem('refreshToken')
			const phoneNumber = localStorage.getItem('phoneNumber')
			if (!(accessToken || refreshToken || phoneNumber)) {
				logOut()
			}
			try {
				const { data } = await axios.get('/gateway/customer-api')

				dispatch({
					accessToken: accessToken,
					refreshToken: refreshToken,
					phoneNumber: phoneNumber,
					user: {
						customerId: data.payload?.customerId ?? '',
						email: data.payload?.email ?? '',
						name: data.payload?.userName ?? '',
						phoneNumber: data.payload?.phoneNumber ?? '',
						companyName: data.payload.companyName ?? '',
						customerStatus: data.payload?.customerStatus ?? CUSTOMER_STATUS.REGISTERED,
					},
				})
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	//logic for redirect based on state and update userInfo
	useEffect(() => {
		if (!(state.accessToken && state.refreshToken && state.phoneNumber)) {
			logOut()
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
			if ([CUSTOMER_STATUS.REGISTERED, CUSTOMER_STATUS.UPDATE_PROFILE].includes(state.user.customerStatus)) {
				router.push('/onboarding')
			} else if (!router.pathname.includes('/dashboard')) {
				router.push('/dashboard')
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.user])

	const authProviderValue: AuthProviderValue = useMemo(
		() => ({
			...state,
			requestOtp: requestOtp,
			verifyOtp: verifyOtp,
			logOut: logOut,
			getContactorUserInfo: getContactorUserInfo,
		}),
		[state, requestOtp, verifyOtp, logOut, getContactorUserInfo]
	)
	return <Provider value={authProviderValue}>{children}</Provider>
}

export const useContractorAuth = () => useContext(ContractorAuthContext)
export { ContractorAuthProvider, Consumer as ContractorAuthConsumer, ContractorAuthContext }

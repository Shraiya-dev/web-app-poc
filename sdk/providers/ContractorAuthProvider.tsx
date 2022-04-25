import { log } from 'console'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { loginService, sendOtpService } from '../apis'
import { USER_LOGIN_TYPE, USER_TYPE } from '../types'

const LoadingUniqueString = 'loading...'
interface User {
	name?: string
	phoneNumber?: string
	isFirstLogin?: boolean
	userId?: string
	email?: string
}

interface AuthState {
	user: null | User
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
	const requestOtp = useCallback(async (phoneNumber: string) => {
		dispatch({
			phoneNumber: phoneNumber,
		})
		return await sendOtpService(phoneNumber, USER_TYPE.CONTRACTOR)
	}, [])
	const loginUser = useCallback((payload, silent: boolean = false) => {
		localStorage.setItem('accessToken', payload?.accessToken)
		localStorage.setItem('phoneNumber', payload?.phoneNumber)

		if (!silent) {
			localStorage.setItem('refreshToken', payload?.refreshToken)
		}

		dispatch({
			user: {
				userId: payload?._id,
				email: payload?.email,
				name: payload?.userName,
				phoneNumber: payload?.phoneNumber,
				isFirstLogin: payload?.isFirstLogin,
			},
		})
	}, [])
	const verifyOtp = useCallback(
		async (phoneNumber: string, otp: string) => {
			try {
				const { data } = await loginService(phoneNumber, USER_TYPE.CONTRACTOR, USER_LOGIN_TYPE.OTP, otp)
				if (data?.success) {
					loginUser(data?.data)
					return data
				} else {
					throw data
				}
			} catch (error) {
				console.log(error)
			}
			//return await loginService(phoneNumber, USER_TYPE.CONTRACTOR, USER_LOGIN_TYPE.OTP, otp)
		},
		[loginUser]
	)
	const silentLogin = useCallback(
		async (phoneNumber, accessToken) => {
			try {
				const { data } = await loginService(
					phoneNumber,
					USER_TYPE.CONTRACTOR,
					USER_LOGIN_TYPE.SILENT,
					undefined,
					accessToken
				)
				if (data.success) {
					//login success update the use state
					loginUser(data?.data, true)
				} else {
					//login failure let the requester handel the error
					throw data
				}
			} catch (error) {
				throw error
			}
		},
		[loginUser]
	)

	const logOut = useCallback(async () => {
		localStorage.clear()
		dispatch(initialAuthState)
		await router.push('/login')
	}, [router])

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		const refreshToken = localStorage.getItem('refreshToken')
		const phoneNumber = localStorage.getItem('phoneNumber')

		dispatch({
			accessToken: accessToken,
			refreshToken: refreshToken,
			phoneNumber: phoneNumber,
		})
	}, [])

	//logic for redirect based on state and update userInfo
	useEffect(() => {
		if (state.accessToken === null || state.refreshToken === null || state.phoneNumber === null) {
			logOut()
			return
		}
		if (
			state.accessToken !== LoadingUniqueString &&
			state.phoneNumber !== LoadingUniqueString &&
			state.user === null
		) {
			silentLogin(state.phoneNumber, state.accessToken)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.accessToken, state.phoneNumber, state.refreshToken])
	useEffect(() => {
		if (state.user) {
			if (state.user.isFirstLogin) {
				//todo redirect to onboarding flow
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
		}),
		[state, requestOtp, verifyOtp, logOut]
	)
	return <Provider value={authProviderValue}>{children}</Provider>
}

export const useContractorAuth = () => useContext(ContractorAuthContext)
export { ContractorAuthProvider, Consumer as ContractorAuthConsumer, ContractorAuthContext }

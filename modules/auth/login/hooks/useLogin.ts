import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useContractorAuth, useSnackbar } from '../../../../sdk'
import { useFormik } from 'formik'
import { Analytic, DataLayerPush, getCookie } from '../../../../sdk/analytics'
import { ButtonClicked, sendAnalytics } from '../../../../sdk/analytics/analyticsWrapper'

const initialLoginState = {
	status: 'idle',
	error: '',
}

const useLogin = () => {
	const router = useRouter()

	const { requestOtp, isRegister, updateIsRegUser } = useContractorAuth()
	const [loginState, setLoginState] = useState(initialLoginState)
	const { status, error } = loginState
	const [loading, setLoading] = useState(false)
	//const [isRegister, setIsRegister] = useState(false);

	const { showSnackbar } = useSnackbar()

	const handleLogin = () => {
		updateIsRegUser(!isRegister)
		ButtonClicked({
			action: isRegister ? 'Register Option' : 'Login Option',
			page: 'Login',
			url: router.asPath,
		})
	}
	const discoveryBookingFromCookie = useMemo(() => {
		try {
			const discoveryBookingFromCookie = JSON.parse(getCookie('discoveryBooking'))
			return discoveryBookingFromCookie
		} catch (error) {
			return undefined
		}
	}, [])
	const form = useFormik({
		initialValues: {
			phoneNumber: '',
		},

		validate: (values) => {
			const errors: any = {}

			let k = values.phoneNumber

			if (
				values.phoneNumber === '' ||
				Number.isNaN(Number(values.phoneNumber)) ||
				`${values.phoneNumber}`.length !== 10
			) {
				errors.phoneNumber = 'Enter Valid phone Number'
			}
			return errors
		},
		onSubmit: async (values) => {
			setLoading(true)
			DataLayerPush({
				event: discoveryBookingFromCookie ? 'discovery_request_login' : 'organic_request_login',
				phoneNumber: '+91' + values?.phoneNumber,
			})

			sendAnalytics({
				name: 'requestPhoneOtp',
				action: 'ButtonClick',
				metaData: {
					origin: discoveryBookingFromCookie ? 'Easy Book Worker flow' : undefined,
				},
			})
			requestOtp(`+91${values?.phoneNumber}`)
				.then((res) => {
					if (res?.data?.success) {
						setLoginState((prevValues) => ({
							...prevValues,
							status: 'success',
						}))

						//router.push('/verifyOTP')

						setLoading(false)
					} else {
						showSnackbar(res?.data?.error, 'error')
						setLoginState((prevValues) => ({
							...prevValues,
							status: 'failed',
							error: res?.data?.error || res?.error,
						}))
						setLoading(false)
					}
				})
				.catch((error) => {
					showSnackbar(error?.response?.data?.developerInfo, 'error')
					console.log('error', error)
				})

			ButtonClicked({
				action: 'Login',
				page: 'Login',
				url: router.asPath,
			})
		},
	})

	return {
		status,
		error,
		form,
		loading,
		setLoading,
		isRegister,
		handleLogin,
	}
}

export default useLogin

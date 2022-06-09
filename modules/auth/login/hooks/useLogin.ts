import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useContractorAuth, useSnackbar } from '../../../../sdk'
import { useFormik } from 'formik'
import { Analytic } from '../../../../sdk/analytics'
import { ButtonClicked } from '../../../../sdk/analytics/analyticsWrapper'

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
			// Analytic.page()
			setLoading(true)
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

import { useState, useEffect } from 'react'
//import { useNavigate, useLocation } from "react-router-dom";
import { Router, useRouter } from 'next/router'
import { useContractorAuth } from '../../../sdk'
import { useFormik } from 'formik'
import { validatePhoneNumber } from '../../../sdk'

const initialLoginState = {
	status: 'idle',
	error: '',
}

const useLogin = () => {
	const router = useRouter()

	const { phoneNumber, requestOtp } = useContractorAuth()
	const [loginState, setLoginState] = useState(initialLoginState)
	const { status, error } = loginState

	//const navigate = useNavigate();

	const handlePhoneNumberSubmit = async () => {

        router.push('/verifyOTP')
		setLoginState((prevValues: any) => ({ ...prevValues, error: null }))

		const result = validatePhoneNumber(phoneNumber)
		if (result !== 'valid') {
			return setLoginState((prevValues) => ({
				...prevValues,
				error: result,
			}))
		}

		try {
			if (result === 'valid') {
				const formattedPhoneNumber = `${phoneNumber}`
				setLoginState((prevValues) => ({
					...prevValues,
					status: 'loading',
				}))

				const res = await requestOtp(formattedPhoneNumber)

				if (res?.data?.success) {
					setLoginState((prevValues) => ({
						...prevValues,
						status: 'success',
					}))
					return
				}
				setLoginState((prevValues) => ({
					...prevValues,
					status: 'failed',
					error: res?.data?.error || res?.error,
				}))
			}
		} catch (error: any) {
			setLoginState((prevValues) => ({
				...prevValues,
				status: 'failed',
				error: error.message,
			}))
		}
	}

	const [loading, setLoading] = useState(false)

	const form = useFormik({
		initialValues: {
			phoneNumber: '',
		},

		validate: (values) => {
			const errors = { }

			if (values.phoneNumber === '' || Number.isNaN(Number(values.phoneNumber)) || values.phoneNumber.length!==10) {
				errors.phoneNumber = 'Enter Valid phone Number'
			}
			return errors
		},
		onSubmit: (values) => {
			console.log('values')

			//setLoading(true)
			requestOtp(values.phoneNumber).then((res)=>{
                console.log("resquest sent", res)
            })
			//setLoading(false)
			router.push('/verifyOTP')
		},
	})

	useEffect(() => {
		if (status === 'success') {
			setLoginState((prevValues) => ({
				...prevValues,
				status: 'idle',
			}))

			router.push('/verifyOTP')

			//   navigate("/otpverification", {
			//     state: {
			//       from: "/login",
			//     },
			//   });
		}
	}, [status, router])

	return {
		handlePhoneNumberSubmit,
		status,
		error,
		form,
        loading
	}
}

export default useLogin

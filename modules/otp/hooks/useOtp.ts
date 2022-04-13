import { useState, useEffect } from 'react'
//import { useNavigate, useLocation } from "react-router-dom";
import { useRouter } from 'next/router'
import { useContractorAuth } from '../../../sdk'
import { useFormik } from 'formik'

const initialOtpState = {
	status: 'idle',
	error: '',
}

const validateOtpField = (otp: any) => {
	if (otp.otp.length < 6) {
		return 'Please enter 6 digit OTP'
	}
	return 'valid'
}

const useOtp = () => {
	const router = useRouter()
	const { phoneNumber, verifyOtp, logOut } = useContractorAuth()
	const [otpState, setOtpState] = useState(initialOtpState)
	const { status, error } = otpState
	const [otp, setOtp] = useState({ otp: '' })

	const handleChange = (otp: any) => setOtp({ otp })

	const form = useFormik({
		initialValues: {
			otp: '',
		},

		onSubmit: (values) => {
			if (validateOtpField(otp) === 'valid') {
				verifyOtp(`${phoneNumber}`, otp.otp)
					.then((res) => {
						console.log('00000', res)
						if (res?.data?.success) {
							setOtpState((prevValues) => ({
								...prevValues,
								status: 'success',
							}))

							return router.push('/onboarding')
						}

						setOtpState((prevValues) => ({
							...prevValues,
							otp: '',
							status: 'failed',
							error: res?.data?.error,
						}))
					})
					.catch((err) => {
						console.log('error', err)
					})
			} else {
				setOtpState((prevValues) => ({
					...prevValues,
					otp: '',
					status: 'failed',
					error: 'Invalid OTP',
				}))
			}

			router.push('/verifyOTP')
		},
	})

	return {
		status,
		error,
		otp,
		form,
		handleChange,
	}
}

export default useOtp

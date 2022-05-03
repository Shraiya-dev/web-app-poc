import { useState } from 'react'
import { useRouter } from 'next/router'
import { useContractorAuth, useSnackbar } from '../../../sdk'
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
	const { phoneNumber, verifyOtp, requestOtp } = useContractorAuth()
	const [otpState, setOtpState] = useState(initialOtpState)
	const { status, error } = otpState
	const [otp, setOtp] = useState({ otp: '' })
	const [loading, setLoading] = useState(false)
	const { showSnackbar } = useSnackbar()

	const handleChange = (otp: any) => setOtp({ otp })

	const resendOTP = () => {
		requestOtp(phoneNumber || '')
			.then((res) => {
				showSnackbar(res?.data?.data?.msg, 'success')
			})
			.catch((error: any) => {
				console.log('error', error)
				showSnackbar(error, 'error')
			})
	}

	const form = useFormik({
		initialValues: {
			otp: '',
		},

		onSubmit: (values) => {
			if (validateOtpField(otp) === 'valid') {
				setLoading(true)
				verifyOtp(`${phoneNumber}`, otp.otp)
					.then((res) => {
						if (res?.success === true) {
							setOtpState((prevValues) => ({
								...prevValues,
								status: res?.success,
							}))
							setLoading(false)
						} else {
							setOtpState((prevValues: any) => ({
								...prevValues,
								otp: '',
								status: false,
								error: 'Invalid OTP',
							}))
							setLoading(false)
						}
					})
					.catch((err) => {
						console.log('error', error)
						setOtpState((prevValues: any) => ({
							...prevValues,
							otp: '',
							status: false,
							error: 'Invalid OTP',
						}))
						setLoading(false)
					})
			} else {
				setOtpState((prevValues: any) => ({
					...prevValues,
					otp: '',
					status: false,
					error: 'Invalid OTP',
				}))
			}
		},
	})

	return {
		status,
		error,
		otp,
		form,
		handleChange,
		resendOTP,
		otpState,
		loading,
		setLoading,
	}
}

export default useOtp

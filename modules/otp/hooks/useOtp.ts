import { useState, useEffect } from 'react'
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
	const { phoneNumber, verifyOtp, requestOtp } = useContractorAuth()
	const [otpState, setOtpState] = useState(initialOtpState)
	const { status, error } = otpState
	const [otp, setOtp] = useState({ otp: '' })

	const handleChange = (otp: any) => setOtp({ otp })

	const resendOTP = () => {
		requestOtp(phoneNumber || '')
			.then((res) => {
				console.log('res', res)
			})
			.catch((err) => {
				console.log('error', err)
			})
	}

	const form = useFormik({
		initialValues: {
			otp: '',
		},

		onSubmit: (values) => {
			if (validateOtpField(otp) === 'valid') {
				verifyOtp(`${phoneNumber}`, otp.otp)
					.then((res) => {
						console.log('00000', res?.data)
						if (res?.success) {
							setOtpState((prevValues) => ({
								...prevValues,
								status: 'success',
							}))

							return router.push('/onboarding')
						} else {
							setOtpState((prevValues) => ({
								...prevValues,
								otp: '',
								status: 'failed',
								error: 'Invalid OTP',
							}))
						}
					})
					.catch((err) => {
						console.log('error', err)
						setOtpState((prevValues) => ({
							...prevValues,
							otp: '',
							status: 'failed',
							error: 'Invalid OTP',
						}))
					})
			} else {
				setOtpState((prevValues) => ({
					...prevValues,
					otp: '',
					status: 'failed',
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
	}
}

export default useOtp

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useContractorAuth, useSnackbar } from '../../../../sdk'
import { useFormik } from 'formik'
import { ButtonClicked } from '../../../../sdk/analytics/analyticsWrapper'

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

interface emailOtpPayload {
	otp: string
	otpToken: string
	// identifier: string
	// verifyType: string
	// expiry: string
	// hash: string
}

const useEmailOtpVerification = () => {
	const [otpState, setOtpState] = useState(initialOtpState)
	const { status, error } = otpState
	const [otp, setOtp] = useState({ otp: '' })
	const [loading, setLoading] = useState(false)
	const { showSnackbar } = useSnackbar()
	const { requestEmailOtp, user, verifyEmailOtp, getContactorUserInfo } = useContractorAuth()
	const [emailPayload, setEmailPayload] = useState<emailOtpPayload>()
	const router = useRouter()

	const handleChange = (otp: any) => setOtp({ otp })

	const resendOTP = useCallback(() => {
		requestEmailOtp()
			.then((res) => {
				ButtonClicked({
					action: 'Email OTP Sent',
					page: 'Email Verification',
					url: router.asPath,
				})
				if (res?.status === 200) {
					setEmailPayload(res?.data.payload)
					showSnackbar('OTP Sent Successfully!', 'success')
				} else {
					showSnackbar(res?.error, 'error')
				}
			})
			.catch((error: any) => {
				console.log('error', error)
				showSnackbar(error, 'error')
			})
	}, [])

	const form = useFormik({
		initialValues: {
			otp: '',
		},

		onSubmit: async (values) => {
			if (validateOtpField(otp) === 'valid') {
				setLoading(true)

				const payload = {
					otp: otp?.otp ?? '',
					token: emailPayload?.otpToken ?? '',
				}
				await verifyEmailOtp(payload)
					.then((res) => {
						// if (res?.status===200) {

						ButtonClicked({
							action: 'Verify OTP',
							page: 'Email Verification',
							url: router.asPath,
						})
						setOtpState((prevValues) => ({
							...prevValues,
							status: 'success',
						}))

						setLoading(false)
						// } else {
						// 	setOtpState((prevValues: any) => ({
						// 		...prevValues,
						// 		otp: '',
						// 		status: false,
						// 		error: 'Invalid OTP',
						// 	}))
						// 	setLoading(false)
						// }
					})
					.catch((err) => {
						console.log('error', error)
						setOtpState((prevValues: any) => ({
							...prevValues,
							otp: '',
							status: false,
							error: 'Invalid OTP',
						}))
						showSnackbar(error, 'error')
						setLoading(false)
					})

				await getContactorUserInfo()
			} else {
				setOtpState((prevValues: any) => ({
					...prevValues,
					otp: '',
					status: false,
					error: 'Invalid OTP',
				}))
				setLoading(false)
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
		user,
		emailPayload,
		setEmailPayload,
	}
}

export default useEmailOtpVerification

import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useContractorAuth, useSnackbar } from '../../../../sdk'
import { useFormik } from 'formik'
import { DataLayerPush, getCookie } from '../../../../sdk/analytics'
import { ButtonClicked, sendAnalytics } from '../../../../sdk/analytics/analyticsWrapper'

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
	const { openLoginDialog, isWhatsAppOptIn } = useContractorAuth()

	const handleChange = (otp: any) => setOtp({ otp })

	const resendOTP = () => {
		requestOtp(phoneNumber || '')
			.then((res) => {
				if (res) {
					ButtonClicked({
						action: 'Resend OTP',
						page: 'Login',
						url: router.asPath,
					})
					showSnackbar(res?.data?.data?.msg, 'success')
				}
			})
			.catch((error: any) => {
				console.log('error', error)
				showSnackbar(error, 'error')
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
			otp: '',
		},

		onSubmit: (values) => {
			setLoading(true)
			DataLayerPush({
				event: discoveryBookingFromCookie ? 'discovery_otp_verification' : 'organic_otp_verification',
				phoneNumber: '+91' + phoneNumber,
			})
			sendAnalytics({
				name: 'verifiedPhoneOtp',
				action: 'ButtonClick',
				metaData: {
					origin: discoveryBookingFromCookie ? 'Easy Book Worker flow' : 'Navbar login',
				},
			})

			if (validateOtpField(otp) === 'valid') {
				verifyOtp(`${phoneNumber}`, otp.otp)
					.then((res) => {
						if (res?.success === true) {
							setOtpState((prevValues) => ({
								...prevValues,
								status: res?.success,
							}))
							DataLayerPush({
								event: discoveryBookingFromCookie
									? 'discovery_otp_verification'
									: 'organic_otp_verification',
								phoneNumber: '+91' + phoneNumber,
							})

							// console.log('verified')
							if (isWhatsAppOptIn) {
								sendAnalytics({
									name: 'whatsAppOptIn',
									action: 'ButtonClick',
									metaData: {
										phoneNumber: phoneNumber,
									},
								})
							}
							if (!discoveryBookingFromCookie) {
								if (router.query.redirectBackTo) {
									router.push(router.query.redirectBackTo as string)
								} else {
									router.push('/dashboard')
								}
							}
							setLoading(false)
						} else {
							setOtpState((prevValues: any) => ({
								...prevValues,
								otp: '',
								status: false,
								error: 'Invalid OTP',
							}))
							// console.log('unverified')
							setTimeout(() => {
								setLoading(false)
							}, 500)
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
						setTimeout(() => {
							setLoading(false)
						}, 500)
						openLoginDialog()
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
		phoneNumber,
	}
}

export default useOtp

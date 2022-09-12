import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { updateProfile, useContractorAuth, useSnackbar, validateEmail } from '../../../../sdk'
import { ButtonClicked } from '../../../../sdk/analytics/analyticsWrapper'

const useEditEmail = () => {
	const [loading, setLoading] = useState(false)
	const { showSnackbar } = useSnackbar()
	const { user, getContactorUserInfo } = useContractorAuth()

	const [isChangeEmail, setIsChangeEmail] = useState(false)

	const handleChangeEmail = () => setIsChangeEmail((state) => !state)
	const router = useRouter()

	const form = useFormik({
		initialValues: {
			email: user?.email ?? '',
		},

		validate: (values) => {
			const errors = <any>{}

			if (!validateEmail(values.email)) {
				errors.email = 'Enter valid Company email'
			}

			return errors
		},

		onSubmit: async (values) => {
			const payload = {
				email: values.email,
			}
			await updateProfile(payload)
				.then((data: any) => {
					getContactorUserInfo()
					//resendOTP()

					ButtonClicked({
						action: 'Edit Email',
						page: 'Email Verification',
						url: router.asPath,
					})
					setLoading(false)
					handleChangeEmail()
				})
				.catch((error: any) => {
					showSnackbar(error?.response?.data?.developerInfo, 'error')
					console.log(error)
					setLoading(false)
				})
		},
	})

	return {
		form,
		loading,
		setLoading,
		isChangeEmail,
		setIsChangeEmail,
		handleChangeEmail,
	}
}

export default useEditEmail

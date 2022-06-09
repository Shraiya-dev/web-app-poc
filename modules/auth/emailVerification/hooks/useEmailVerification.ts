import { useState } from 'react'
import { updateProfile, useContractorAuth, useSnackbar, validateEmail } from '../../../../sdk'
import { useFormik } from 'formik'
import { ButtonClicked } from '../../../../sdk/analytics/analyticsWrapper'
import { useRouter } from 'next/router'

const useEmailVerification = () => {
	const [loading, setLoading] = useState(false)
	//const [isEmailSent, setIsEmailSent] = useState(false)
	const { getContactorUserInfo, user } = useContractorAuth()

	const { showSnackbar } = useSnackbar()
	const router = useRouter()

	const form = useFormik({
		initialValues: { name: user?.name ?? '', email: user?.email ?? '', companyRole: 'none' },

		validate: (values) => {
			const errors = <any>{}

			if (!values.name) {
				errors.name = 'Enter the Full Name'
			}

			if (!validateEmail(values.email)) {
				errors.email = 'Enter valid Company email'
			}

			if (values.companyRole === 'none') {
				errors.companyName = 'Select relevant Company Role'
			}

			return errors
		},
		onSubmit: async (values) => {
			setLoading(true)

			const payload = {
				name: values.name,
				email: values.email,
				designation: values.companyRole,
			}
			updateProfile(payload)
				.then((data: any) => {
					getContactorUserInfo()
					//resendOTP()

					ButtonClicked({
						action: 'Profile Creation',
						page: 'Profile',
						url: router.asPath,
					})
					setLoading(false)
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
		//isEmailSent,
		//resendOTP,
		//setIsEmailSent,
	}
}

export default useEmailVerification

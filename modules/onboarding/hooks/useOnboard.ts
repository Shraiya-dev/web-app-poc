import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFormik } from 'formik'

import { validateEmail } from '../../../sdk/utils/validationHelpers'

import { updateProfile } from '../../../sdk/apis'

const useOnboarding = () => {
	const router = useRouter()

	const [loading, setLoading] = useState(false)

	console.log('router', router)
	const form = useFormik({
		initialValues: {
			name: '',
			company: '',
			companyEmail: '',
			phoneNumber: '',
		},
		validate: (values) => {
			const errors = <any>{}

			if (!values.name) {
				errors.name = 'Required'
			}

			if (!values.company) {
				errors.company = 'Required'
			}

			if (!values.companyEmail) {
				errors.companyEmail = 'Required'
			}

			if (!values.phoneNumber) {
				errors.phoneNumber = 'Required'
			}

			if (
				values.phoneNumber === '' ||
				Number.isNaN(Number(values.phoneNumber)) ||
				values.phoneNumber.length !== 10
			) {
				errors.phoneNumber = 'Enter Valid phone Number'
			}

			if (!validateEmail(values.companyEmail)) {
				errors.companyEmail = 'Enter Valid Company Email'
			}
			return errors
		},
		onSubmit: (values) => {
			const payload = {
				name: values.name,
				company: values.company,
				companyemail: values.companyEmail,
			}
			updateProfile(payload)
				.then((status: any) => {
					if (status === 200) {
						router.push('/dashboard')
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
	})

	return {
		form,
		loading,
	}
}

export default useOnboarding

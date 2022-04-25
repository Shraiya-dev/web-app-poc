import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFormik } from 'formik'

import { validateEmail } from '../../../sdk/utils/validationHelpers'

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
			router.push('/dashboard')
		},
	})

	return {
		form,
		loading,
	}
}

export default useOnboarding

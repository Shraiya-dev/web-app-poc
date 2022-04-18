import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFormik } from 'formik'

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

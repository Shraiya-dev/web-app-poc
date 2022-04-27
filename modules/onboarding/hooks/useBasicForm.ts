import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'

import { validateEmail, freeEmailChecker } from '../../../sdk/utils/validationHelpers'

import { updateProfile } from '../../../sdk/apis'
import { getCustomerDetails } from '../../../sdk/apis'

interface CreateBasicForm {
	name: string
	company: string
	companyEmail: string
	phoneNumber: string
}

interface initialData {
	name: string
	companyName: string
	email: string
	phoneNumber: string
	customerStatus: string
}

const useBasicForm = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [initialData, setInitialData] = useState<initialData>()

	const [editInfo, setEditInfo] = useState(false)

	const handleEdit = () => {
		setEditInfo((state) => !state)
	}

	useEffect(() => {
		getCustomerDetails()
			.then((data: any) => {
				setInitialData(data?.data?.payload)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [router])

	
	const form = useFormik<CreateBasicForm>({
		initialValues: {
			name: initialData?.name || '',
			company: initialData?.companyName || '',
			companyEmail: initialData?.email || '',
			phoneNumber: initialData?.phoneNumber || '',
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

			// if (
			// 	values.phoneNumber === '' ||
			// 	Number.isNaN(Number(values.phoneNumber)) ||
			// 	values.phoneNumber.length !== 10
			// ) {
			// 	errors.phoneNumber = 'Enter Valid phone Number'
			// }

			if (initialData?.customerStatus === 'REGISTERED') {
				if (!freeEmailChecker(values.companyEmail)) {
					errors.companyEmail = 'Enter Valid Company Email'
				}
			} else {
				if (!validateEmail(values.companyEmail)) {
					errors.companyEmail = 'Enter Valid Company Email'
				}
			}

			return errors
		},
		onSubmit: (values) => {
			const payload = {
				name: values.name,
				companyName: values.company,
				email: values.companyEmail,
			}
			updateProfile(payload)
				.then((status: any) => {
					router.push('/dashboard')
				})
				.catch((error) => {
					console.log(error)
				})
		},
	})

	return {
		form,
		loading,
		initialData,
		setInitialData,
		editInfo,
		setEditInfo,
		handleEdit,
	}
}

export default useBasicForm

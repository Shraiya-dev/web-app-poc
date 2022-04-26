import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFormik } from 'formik'

import { validateEmail , freeEmailChecker} from '../../../sdk/utils/validationHelpers'

import { updateProfile } from '../../../sdk/apis'
import { useContractorAuth } from '../../../sdk'

interface CreateBasicForm {
	name: string
	company: string
	companyEmail: string
	phoneNumber: string
}

const useBasicForm = () => {
	const router = useRouter()
	const { phoneNumber } = useContractorAuth()

	const [loading, setLoading] = useState(false)
	const [initialData, setInitialData] = useState<CreateBasicForm>()

	const [editInfo, setEditInfo] = useState(false)

	const handleEdit = () => {
		setEditInfo((state) => !state)
	}

	const data = {
		name: 'Deepak',
		company: 'projecthero',
		companyName: 'deepak.kushwaha@projecthero.in',
		phoneNumber: '9901549150',
	}

	console.log('router', router)
	const form = useFormik<CreateBasicForm>({
		initialValues: {
			name: data?.name,
			company: data?.company,
			companyEmail: data?.companyName,
			phoneNumber: phoneNumber || '',
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

			if (!freeEmailChecker(values.companyEmail)) {
				errors.companyEmail = 'Enter Valid Company Email'
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

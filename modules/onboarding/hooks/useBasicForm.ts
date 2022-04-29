import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'

import { validateEmail, freeEmailChecker } from '../../../sdk/utils/validationHelpers'

import { updateProfile } from '../../../sdk/apis'
import { useContractorAuth, useSnackbar } from '../../../sdk'
interface CreateBasicForm {
	name: string
	company: string
	companyEmail: string
	phoneNumber: string
}

const useBasicForm = () => {
	const [loading, setLoading] = useState(false)
	const { showSnackbar } = useSnackbar()
	const { user, getContactorUserInfo } = useContractorAuth()
	const [editInfo, setEditInfo] = useState(false)

	const handleEdit = () => {
		setEditInfo((state) => !state)
	}

	useEffect(() => {
		form.setValues({
			company: user?.companyName ?? '',
			companyEmail: user?.email ?? '',
			name: user?.name ?? '',
			phoneNumber: user?.phoneNumber ?? '',
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])
	const form = useFormik<CreateBasicForm>({
		initialValues: {
			name: user?.name || '',
			company: user?.companyName || '',
			companyEmail: user?.email || '',
			phoneNumber: user?.phoneNumber || '',
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

			if (!validateEmail(values.companyEmail)) {
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
				.then((data: any) => {
					setLoading(true)
					getContactorUserInfo()
					setLoading(false)
					setEditInfo(false)
				})
				.catch((error: any) => {
					showSnackbar(error?.response?.data?.developerInfo, 'error')
					console.log(error)
				})
		},
	})

	return {
		form,
		loading,
		editInfo,
		setEditInfo,
		handleEdit,
	}
}

export default useBasicForm

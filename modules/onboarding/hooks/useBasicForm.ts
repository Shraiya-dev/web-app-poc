import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'

import { validateEmail, freeEmailChecker } from '../../../sdk/utils/validationHelpers'

import { updateProfile } from '../../../sdk/apis'
import { getCustomerDetails } from '../../../sdk/apis'
import { useContractorAuth, useSnackbar } from '../../../sdk'
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
	const { showSnackbar } = useSnackbar()
	const [initialData, setInitialData] = useState<initialData>()
	const { user, getContactorUserInfo } = useContractorAuth()
	const [editInfo, setEditInfo] = useState(false)

	const handleEdit = () => {
		setEditInfo((state) => !state)
	}

	// useEffect(() => {
	// 	getCustomerDetails()
	// 		.then((data: any) => {
	// 			setInitialData(data?.data?.payload)
	// 			form.initialValues.name = data?.data?.payload?.name
	// 			form.initialValues.company = data?.data?.payload?.companyName
	// 			form.initialValues.companyEmail = data?.data?.payload?.email
	// 			form.initialValues.phoneNumber = data?.data?.payload?.phoneNumber
	// 		})
	// 		.catch((error: any) => {
	// 			showSnackbar(error?.response?.data?.developerInfo, 'error')
	// 			console.log(error)
	// 		})
	// }, [router])

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
					if (data?.data?.payload?.customerId) {
						router.push('/dashboard')
					} else {
						showSnackbar(data?.data?.developerInfo, 'error')
					}
					getContactorUserInfo()
				})
				.catch((error: any) => {
					showSnackbar(error?.response?.data?.developerInfo, 'error')
					console.log(error)
				})
		},
	})
	useEffect(() => {
		form.setValues({
			company: user?.companyName ?? '',
			companyEmail: user?.email ?? '',
			name: user?.name ?? '',
			phoneNumber: user?.phoneNumber ?? '',
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

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

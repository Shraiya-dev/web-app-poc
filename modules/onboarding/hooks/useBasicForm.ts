import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'

import { isValidGSTIN, validateEmail } from '../../../sdk/utils/validationHelpers'

import { updateProfile } from '../../../sdk/apis'
import { useContractorAuth, useSnackbar } from '../../../sdk'
import { ButtonClicked } from '../../../sdk/analytics/analyticsWrapper'

interface CreateBasicForm {
	name: string
	company: string
	companyEmail: string
	phoneNumber: string
	GSTIN: string
}

const useBasicForm = () => {
	const [loading, setLoading] = useState(false)
	const { showSnackbar } = useSnackbar()
	const { user, getContactorUserInfo } = useContractorAuth()
	const [editInfo, setEditInfo] = useState(false)
	const router = useRouter()

	const handleEdit = () => {
		setEditInfo((state) => !state)
		ButtonClicked({
			action: 'Edit Profile',
			page: 'Company Profile',
			url: router.asPath,
		})
		form.setValues({
			company: user?.companyName ?? '',
			companyEmail: user?.email ?? '',
			name: user?.name ?? '',
			phoneNumber: user?.phoneNumber.slice(3) ?? '',
			GSTIN: user?.GSTIN ?? '',
		})
	}

	useEffect(() => {
		form.setValues({
			company: user?.companyName ?? '',
			companyEmail: user?.email ?? '',
			name: user?.name ?? '',
			phoneNumber: user?.phoneNumber.slice(3) ?? '',
			GSTIN: user?.GSTIN ?? '',
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])
	const form = useFormik<CreateBasicForm>({
		initialValues: {
			name: user?.name || '',
			company: user?.companyName || '',
			companyEmail: user?.email || '',
			phoneNumber: user?.phoneNumber || '',
			GSTIN: user?.GSTIN ?? '',
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

			if (!values.GSTIN) {
				errors.GSTIN = 'Required'
			}

			if (!validateEmail(values.companyEmail)) {
				errors.companyEmail = 'Enter Valid Company Email'
			}
			if (!isValidGSTIN(values.GSTIN.toUpperCase())) {
				errors.GSTIN = 'Enter Valid GSTIN Number'
			}

			return errors
		},
		onSubmit: (values) => {
			const payload = {
				name: values.name,
				companyName: values.company,
				email: values.companyEmail,
				GSTIN: values.GSTIN.toUpperCase(),
			}
			updateProfile(payload)
				.then((data: any) => {
					setLoading(true)
					getContactorUserInfo()
					setLoading(false)
					setEditInfo(false)
					ButtonClicked({
						action: router.asPath === '/profile' ? 'Save' : 'Next',
						page: router.asPath === '/profile' ? 'Company Profile' : 'Onboarding',
						url: router.asPath,
					})
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
		editInfo,
		setEditInfo,
		handleEdit,
	}
}

export default useBasicForm

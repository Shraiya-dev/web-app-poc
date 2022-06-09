import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { updateProfile, useContractorAuth, useSnackbar } from '../../../sdk'
import { ButtonClicked } from '../../../sdk/analytics/analyticsWrapper'

interface PersonalAccount {
	name: string
	phoneNumber: string
	email: string
	designation: string
}

const usePersonalAccount = () => {
	const [isAccountEditable, setIsAccountEditable] = useState(false)
	const [loading, setLoading] = useState(false)
	const { user, getContactorUserInfo } = useContractorAuth()
	const { showSnackbar } = useSnackbar()
	const router = useRouter()

	const handleEdit = () => {
		setIsAccountEditable((state) => !state)

		form.setValues({
			name: user?.name ?? '',
			phoneNumber: user?.phoneNumber.slice(3) ?? '',
			email: user?.email ?? '',
			designation: user?.designation || '',
		})
	}

	useEffect(() => {
		form.setValues({
			name: user?.name ?? '',
			phoneNumber: user?.phoneNumber.slice(3) ?? '',
			email: user?.email ?? '',
			designation: user?.designation ?? 'none',
		})
	}, [user])

	const form = useFormik<PersonalAccount>({
		initialValues: {
			name: user?.name ?? '',
			phoneNumber: user?.phoneNumber ?? '',
			email: user?.email ?? '',
			designation: user?.designation ?? 'none',
		},
		validate: (values) => {
			const errors = <any>{}

			if (!values.name) {
				errors.name = 'Enter the Full Name'
			}

			if (values.designation === 'none' || values.designation === '') {
				errors.companyName = 'Select relevant Company Role'
			}

			return errors
		},
		onSubmit: (values) => {},
	})

	const handleSubmit = () => {
		const payload = {
			name: form?.values?.name ?? '',
			designation: form?.values?.designation,
		}
		updateProfile(payload)
			.then((data: any) => {
				setLoading(true)
				getContactorUserInfo()
				setLoading(false)
				handleEdit()
				ButtonClicked({
					action: 'Save',
					page: 'Account',
					url: router.asPath,
				})
			})
			.catch((error: any) => {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
				console.log(error)
				setLoading(false)
			})
	}

	return {
		form,
		handleEdit,
		isAccountEditable,
		setIsAccountEditable,
		loading,
		handleSubmit,
	}
}

export default usePersonalAccount

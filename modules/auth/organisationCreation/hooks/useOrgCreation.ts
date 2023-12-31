import { FormikHelpers, useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { DataLayerPush, isValidGSTIN, useContractorAuth, useSnackbar } from '../../../../sdk'
import { ButtonClicked } from '../../../../sdk/analytics/analyticsWrapper'
import { uploadImage } from '../../../createProject/apis'
import { createOrganisation, postValidateGSTIN } from '../apis/apis'
import { ValidateGSTINResponse, ValidateGSTINStatusCode } from '../types'

const useOrgCreation = () => {
	const [loading, setLoading] = useState(false)
	const [isGSTINDocUploaded, setIsGSTINDocUploaded] = useState(false)
	const { getContactorUserInfo, user } = useContractorAuth()
	const [component, setComponent] = useState<'ORG' | 'ERROR'>('ORG')
	const { showSnackbar } = useSnackbar()
	const [orgDetails, setOrgDetails] = useState<ValidateGSTINResponse>()
	const router = useRouter()
	const [isGSTINVerified, setIsGSTINVerified] = useState(false)
	const createOrg = useCallback(async (payload: any) => {
		const { data } = await createOrganisation(payload)
	}, [])

	const form = useFormik({
		initialValues: {
			companyName: user?.companyName ?? '',
			GSTIN: user?.GSTIN ?? '',
			GSTINDocuments: [],
		},

		validate: (values) => {
			const errors = <any>{}

			if (!values.companyName) {
				errors.company = 'Required'
			}

			if (!values.GSTIN) {
				errors.GSTIN = 'Required'
			}

			if (!isValidGSTIN(values.GSTIN.toUpperCase())) {
				errors.GSTIN = 'Enter Valid GSTIN Number'
			}

			return errors
		},
		onSubmit: async (values) => {
			const payload = {
				companyName: values.companyName,
				GSTIN: values.GSTIN.toUpperCase(),
			}

			try {
				await createOrg(payload)
				DataLayerPush({ event: 'registration_success', company_name: values.companyName, gstin: values.GSTIN })

				await getContactorUserInfo()
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			ButtonClicked({
				action: 'Create Organisation',
				page: 'Organisation Creation',
				url: router.asPath,
			})
		},
	})
	const validateGSTIN = useCallback(
		async (values: { gstin: string }, fh: FormikHelpers<{ gstin: string }>) => {
			//todo call gstin submission api here
			setLoading(true)
			try {
				const { status, data } = await postValidateGSTIN({ GSTIN: values.gstin.toUpperCase() })
				if (
					(data?.payload as ValidateGSTINResponse).nextStepCode ===
					ValidateGSTINStatusCode.CREATE_ORGANISATION
				) {
					setIsGSTINVerified(true)
					form.setFieldValue('GSTIN', (data?.payload as ValidateGSTINResponse).GSTIN)
				} else {
					setComponent('ERROR')
				}
				setOrgDetails(data.payload)
			} catch (error: any) {
				if (error.response.data.isClientError) {
					fh.setErrors({
						gstin: error?.response?.data?.developerInfo,
					})
				} else {
					fh.setErrors({
						gstin: error?.response?.data?.messageToUser,
					})
				}

				// showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			setLoading(false)
		},
		[form]
	)

	const GSTINForm = useFormik<{ gstin: string }>({
		initialValues: {
			gstin: '',
		},
		validate: (values) => {
			const errors: any = {}
			if (!values.gstin) {
				errors.gstin = 'Required'
			}
			if (values.gstin && !isValidGSTIN(values.gstin.toUpperCase())) {
				errors.gstin = 'Enter Valid GSTIN Number'
			}

			return errors
		},
		onSubmit: validateGSTIN,
	})
	useEffect(() => {
		console.log(GSTINForm)
	}, [GSTINForm])
	const uploadFiles = useCallback(
		async (files) => {
			setIsGSTINDocUploaded((old) => true)

			const uploadableFiles = files.filter((file: any) =>
				['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)
			)
			if (files.length !== uploadableFiles.length) {
				showSnackbar('Invalid file type found!', 'error')
				setIsGSTINDocUploaded((old) => false)
				return
			}

			const res = await Promise.all(
				uploadableFiles.map((file: any) => {
					//uploading file
					const formData = new FormData()
					formData.set('type', 'gstin_certificate')
					formData.set('file', file)
					formData.set('entity', 'organisation')

					// API's Needed
					return uploadImage(formData)
				})
			)

			const uploadSuccess = res.filter(({ status }) => status === 200)

			if (uploadSuccess.length === res.length) {
				showSnackbar('Image uploaded successfully!', 'success')
			} else {
				showSnackbar('Failed to upload Image', 'error')
			}

			form.setFieldValue('GSTINDocuments', [
				...uploadSuccess.map(({ data }) => {
					return data.payload.url
				}),
			])
			setIsGSTINDocUploaded((old) => false)
		},
		[form, showSnackbar]
	)

	return {
		orgDetails,
		GSTINForm,
		form,
		isGSTINVerified,
		setIsGSTINVerified,
		loading,
		isGSTINDocUploaded,
		uploadFiles,
		component,
	}
}

export default useOrgCreation

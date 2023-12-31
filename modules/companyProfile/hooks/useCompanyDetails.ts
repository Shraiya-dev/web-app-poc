import { useFormik } from 'formik'
import { useCallback, useState } from 'react'
import { useContractorAuth, useSnackbar } from '../../../sdk'
import { uploadImage } from '../../createProject/apis'
import { checkValidGSTIN, getOrganisationDetails, getOrganisationMembers } from '../apis/apis'

interface OrgDetails {
	companyName: string
	GSTIN: string
	// GSTINDocuments: string[]
}

const useCompanyDetails = () => {
	const [selectedTab, setSelectedTab] = useState('details')

	const [loading, setLoading] = useState(false)
	const [isGSTINDocUploaded, setIsGSTINDocUploaded] = useState(false)
	const [isCmpDetailsEditable, setIsCmpDetailsEditable] = useState(false)
	const { user, getContactorUserInfo } = useContractorAuth()
	const [orgDetails, setOrgDetails] = useState<OrgDetails>()
	const [orgMemberDetails, setOrgMemberDetails] = useState([])

	const [isValidGST, setIsValidGST] = useState<boolean>(false)
	const [validGSTResponse, setValidGSTResponse] = useState<String>('')
	const [hasUpdateValue, setHasUpdateValue] = useState<boolean>(false)
	const [isGSTLoaded, setIsGSTLoaded] = useState<boolean>(false)
	const [showGSTValidate, setShowGSTValidate] = useState<boolean>(true)

	const { showSnackbar } = useSnackbar()

	const handleTabSelection = (e: any, value: any) => {
		setSelectedTab(value)
	}

	const getOrgDetails = useCallback(async () => {
		if (true) {
			const { data, status } = await getOrganisationDetails()
			if (status === 200) {
				setOrgDetails({
					companyName: data.payload.companyName,
					GSTIN: data.payload.GSTIN,
					// GSTINDocuments: [data.payload.GstinCertificate],
				})

				form.setValues({
					companyName: data.payload.companyName ?? '',
					GSTIN: data.payload.GSTIN ?? '',
					// GSTINDocuments: [data.payload.GstinCertificate] ?? [],
				})
			}
		}
	}, [user?.organisationId])

	const getMemberDetails = useCallback(async () => {
		const orgId = user?.organisationId

		const { data, status } = await getOrganisationMembers(orgId)
		if (status === 200) {
			setOrgMemberDetails(data.payload?.customers)
		}
	}, [user])

	const handleEdit = () => {
		setIsCmpDetailsEditable((state) => !state)

		// form.setValues({
		// 	companyName: orgDetails?.companyName ?? '',
		// 	GSTIN: orgDetails?.GSTIN ?? '',
		// 	GSTINDocuments: orgDetails?.GSTINDocuments ?? [],
		// })
	}

	const form = useFormik({
		initialValues: {
			companyName: orgDetails?.companyName ?? '',
			GSTIN: orgDetails?.GSTIN ?? '',
			// GSTINDocuments: orgDetails?.GSTINDocuments ?? [],
		},

		validate: (values) => {
			const errors = <any>{}

			if (!values.companyName) {
				errors.company = 'Required'
			}

			// if (!values.GSTIN) {
			// 	errors.GSTIN = 'Required'
			// }

			// if (values.GSTINDocuments.length === 0) {
			// 	errors.GSTINDocuments = 'Required'
			// }

			// if (!isValidGSTIN(values.GSTIN.toUpperCase())) {
			// 	errors.GSTIN = 'Enter Valid GSTIN Number'
			// }

			return errors
		},
		onSubmit: async (values) => {},
	})

	const uploadFiles = useCallback(
		async (files) => {
			setIsGSTINDocUploaded(() => true)

			const uploadableFiles = files.filter((file: any) =>
				['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)
			)
			if (files.length !== uploadableFiles.length) {
				showSnackbar('Invalid file type found!', 'error')
				setIsGSTINDocUploaded(() => false)
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

			// form.setFieldValue('GSTINDocuments', [
			// 	...uploadSuccess.map(({ data }) => {
			// 		return data.payload.url
			// 	}),
			// ])
			setIsGSTINDocUploaded(() => false)
		},
		[form, showSnackbar]
	)

	const getGSTDetail = useCallback(async () => {
		setIsGSTLoaded(true)
		const payload = { GSTIN: form.values.GSTIN }
		try {
			const { data, status } = await checkValidGSTIN(payload)
			if (status === 200) {
				setIsValidGST(true)
				showSnackbar('GSTIN is valid', 'success')
				setValidGSTResponse(data?.payload?.tradeName)
				setHasUpdateValue(true)
				setIsGSTLoaded(false)
				setShowGSTValidate(true)
			} else {
				setIsValidGST(false)
				showSnackbar(data?.messageToUser, 'error')
				setIsGSTLoaded(false)
			}
		} catch (error) {
			setIsValidGST(false)
			showSnackbar('Invalid GST', 'error')
			setIsGSTLoaded(false)
		}
	}, [form, showSnackbar])

	// useEffect(() => {
	// 	getOrgDetails()
	// 	getMemberDetails()
	// }, [user, getOrgDetails])

	return {
		form,
		selectedTab,
		handleTabSelection,
		uploadFiles,
		loading,
		isGSTINDocUploaded,
		isCmpDetailsEditable,
		setIsCmpDetailsEditable,
		handleEdit,
		orgMemberDetails,
		setOrgMemberDetails,
		orgDetails,
		setOrgDetails,
		getOrgDetails,
		getMemberDetails,
		user,
		getGSTDetail,
		isValidGST,
		validGSTResponse,
		setIsValidGST,
		hasUpdateValue,
		setHasUpdateValue,
		isGSTLoaded,
		setLoading,
		showGSTValidate,
		setShowGSTValidate,
	}
}

export default useCompanyDetails

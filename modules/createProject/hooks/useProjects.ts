import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { isPincodeValid, useSnackbar } from '../../../sdk'
import { JobBenefits } from '../../../sdk/types/jobBenefits'
import { createProject, uploadImage } from '../apis/apis'

interface CreateProjectForm {
	// Project Info
	projectName: string
	state: string
	city: string
	pinCode: string
	siteAddress: string

	sitePhotos: Array<String>

	// Worker Benefits
	pfAvailable: boolean | undefined
	esiProvided: boolean | undefined
	overTimeFactor: string
	accomodationProvided: boolean | undefined

	accomodationPhotos: Array<String>
	foodProvided: boolean | undefined
}

const useCreateProject = () => {
	const [step, setStep] = useState(1)
	const [isLegalContact, setIsLegalContact] = useState(false)
	const [projectDurationInfo, setProjectDurationInfo] = useState('')
	const [isSubmitable, setIsSubmitable] = useState(false)
	const [shiftTiming, setShiftTiming] = useState('')
	const [onCloseDialog, setOncloseDialog] = useState(false)
	const [loading, setLoading] = useState(false)

	const [isUploadingImages, setIsUploadingImages] = useState({
		site: false,
		accomodation: false,
	})
	const { showSnackbar } = useSnackbar()
	const router = useRouter()

	const handlePrev = () => {
		if (step > 1) {
			setStep((state) => state - 1)
		}
	}

	const handleProjectDuration = (info: any) => {
		setProjectDurationInfo(info)
		form.setFieldValue('projectDuration', info)
	}

	const form = useFormik<CreateProjectForm>({
		initialValues: {
			projectName: '',
			state: 'none',
			city: 'none',
			pinCode: '',
			siteAddress: '',
			sitePhotos: [],

			pfAvailable: undefined,
			esiProvided: undefined,
			overTimeFactor: 'none',
			accomodationProvided: undefined,
			accomodationPhotos: [],
			foodProvided: undefined,
		},
		validate: (values) => {
			const errors = <any>{}

			if (values.pinCode && !isPincodeValid(values.pinCode)) {
				errors.pinCode = 'Enter Valid pincode'
			}
			//errors.pinCode = 'Enter Valid pincode'

			return errors
		},
		onSubmit: () => {},
	})

	const uploadImages = useCallback(
		async (type, files) => {
			setIsUploadingImages((old) => ({
				...old,
				[type]: true,
			}))
			let fieldName: keyof CreateProjectForm = 'sitePhotos'
			let imgType = ''
			switch (type) {
				case 'site':
					fieldName = 'sitePhotos'
					imgType = 'site'
					break
				case 'accomodation':
					fieldName = 'accomodationPhotos'
					imgType = 'accommodations'
					break
			}
			const uploadableImages = files.filter((file: any) =>
				['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)
			)
			if (files.length !== uploadableImages.length) {
				showSnackbar('Invalid file type found!', 'error')
				setIsUploadingImages((old) => ({
					...old,
					[type]: false,
				}))
				return
			}

			const res = await Promise.all(
				uploadableImages.map((img: any) => {
					//uploading file
					const formData = new FormData()
					formData.set('type', imgType)
					formData.set('file', img)
					formData.set('entity', 'project')

					return uploadImage(formData)
				})
			)

			const uploadSuccess = res.filter(({ status }) => status === 200)

			if (uploadSuccess.length === res.length) {
				showSnackbar('Image uploaded successfully!', 'success')
			} else {
				showSnackbar('Failed to upload Some or All images', 'error')
			}

			form.setFieldValue(fieldName, [
				// TODO getting typescript error need to look into that
				...form.values[fieldName],
				...uploadSuccess.map(({ data }) => {
					return data.payload.url
				}),
			])
			setIsUploadingImages((old) => ({
				...old,
				[type]: false,
			}))
		},
		[form, showSnackbar]
	)

	const handleSubmit = () => {
		setLoading(true)
		const benefit = []

		if (form.values.pfAvailable === true) {
			benefit.push(JobBenefits.PF)
		}

		if (form.values.esiProvided === true) {
			benefit.push(JobBenefits.INSURANCE)
		}

		if (form.values.foodProvided === true) {
			benefit.push(JobBenefits.FOOD)
		}

		if (form.values.pfAvailable === true) {
			benefit.push(JobBenefits.PF)
		}

		if (form.values.accomodationProvided === true) {
			benefit.push(JobBenefits.ACCOMODATION)
		}

		const payload = {
			name: form.values.projectName,
			siteAddress: form.values.siteAddress,
			city: form.values.city,
			state: form.values.state,
			pincode: form.values.pinCode,
			overTime: {
				rate: form.values.overTimeFactor,
			},
			benefits: benefit,
			images: {
				accommodations: form.values.accomodationPhotos,
				site: form.values.sitePhotos,
			},
		}

		createProject(payload)
			.then((res) => {
				if (res?.status === 200) {
					setIsSubmitable(false)
					setLoading(false)
					showSnackbar('Project Created Successfully', 'success')
					router.push('/dashboard')
				}
				//setStep((state) => state + 1)
			})
			.catch((error: any) => {
				showSnackbar(error?.response?.data?.messageToUser, 'error')
				console.log(error)
				setLoading(false)
			})

		setLoading(false)
	}

	const handleNext = () => {
		if (step === 1) {
			setStep((state) => state + 1)
		} else {
			handleSubmit()
		}
	}

	return {
		form,
		step,
		setStep,
		handlePrev,
		handleNext,
		isLegalContact,
		setIsLegalContact,
		projectDurationInfo,
		setProjectDurationInfo,
		handleProjectDuration,
		isUploadingImages,
		setIsUploadingImages,
		uploadImages,
		isSubmitable,
		setIsSubmitable,
		shiftTiming,
		setShiftTiming,
		onCloseDialog,
		setOncloseDialog,
		loading,
		setLoading,
	}
}

export default useCreateProject

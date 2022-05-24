import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { JOB_TYPES, useContractorAuth, validateEmail, useSnackbar } from '../../../sdk'
import { createBooking, getProjectDetails } from '../apis'

interface CreateBookingForm {
	jobType: JOB_TYPES | ''

	BookingDuration: string
	StartDate: Date

	helper: Number
	supervisor: Number
	technician: Number

	helperWages: Number
	supervisorWages: Number
	technicianWages: Number

	overTimeFactor: string

	tags: Array<String>
	startTime: string
	endTime: string
	shiftTime: string

	state: string
	city: string
	siteAddress: string

	name: string
	company: string
	companyEmail: string
	phoneNumber: string
}

const useCreateBooking = () => {
	const [step, setStep] = useState(1)

	const { user } = useContractorAuth()
	const router = useRouter()
	const [projectName, setProjectName] = useState('')
	const projectId = router.query.projectId
	const { showSnackbar } = useSnackbar()

	const [isSubmittable, setIsSubmittable] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	const handlePrev = () => {
		if (step > 1) {
			setStep((state) => state - 1)
		}
	}

	const form = useFormik<CreateBookingForm>({
		initialValues: {
			jobType: '',

			BookingDuration: '',
			StartDate: new Date(),

			helper: 0,
			supervisor: 0,
			technician: 0,

			helperWages: 0,
			supervisorWages: 0,
			technicianWages: 0,

			overTimeFactor: 'none',

			tags: [],
			startTime: 'none',
			endTime: 'none',
			shiftTime: '',

			state: 'none',
			city: 'none',
			siteAddress: '',

			name: user?.name || '',
			company: user?.companyName || '',
			companyEmail: user?.email || '',
			phoneNumber: user?.phoneNumber.slice(3) || '',
		},
		validate: (values) => {
			const errors = <any>{}

			if (step === 1) {
				if (!values.jobType) {
					errors.jobType = 'Required'
				}

				//helper
				if (Number(values.helper) === 0 && Number(values.helperWages) > 0) {
					errors.helper = 'Required'
				}
				if (Number(values.helper) > 0 && Number(values.helperWages) === 0) {
					errors.helperWages = 'Required'
				}

				if (Number(values.technician) === 0 && Number(values.technicianWages) > 0) {
					errors.technician = 'Required'
				}
				if (Number(values.technician) > 0 && Number(values.technicianWages) === 0) {
					errors.technicianWages = 'Required'
				}

				if (Number(values.supervisor) === 0 && Number(values.supervisorWages) > 0) {
					errors.supervisor = 'Required'
				}
				if (Number(values.supervisor) > 0 && Number(values.supervisorWages) === 0) {
					errors.supervisorWages = 'Required'
				}
			}

			return errors
		},
		onSubmit: (values) => {
			const payload = {
				//projectId: router?.query?.projectId,
				jobType: values.jobType,
				requirements: {
					HELPER: {
						count: Number(values.helper),
						wage: Number(values.helperWages),
					},
					TECHNICIAN: {
						count: Number(values.technician),
						wage: Number(values.technicianWages),
					},
					SUPERVISOR: {
						count: Number(values.supervisor),
						wage: Number(values.supervisorWages),
					},
				},
				shiftTime: form.values.startTime + '-' + form.values.endTime,
				bookingDuration: form.values.BookingDuration,

				tags: form.values.tags,
			}
			setLoading(true)
			createBooking(payload, router?.query?.projectId)
				.then((res) => {
					if (res.status === 200) {
						setIsSubmittable(false)
						setLoading(false)
						showSnackbar('Booking Created Successfully', 'success')
						router.push(`/projects/${router?.query?.projectId}/bookings`)
					}
				})
				.catch((error: any) => {
					showSnackbar(error?.response?.data?.developerInfo, 'error')
					console.log(error)
					setLoading(false)
				})
		},
	})

	const getProjectInfo = useCallback(async () => {
		if (!projectId) return
		try {
			const { data } = await getProjectDetails(projectId)
			setProjectName(data?.payload?.project?.name)
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
	}, [router.query])

	useEffect(() => {
		getProjectInfo()
	}, [getProjectInfo])

	return {
		form,
		step,
		setStep,
		handlePrev,
		projectName,
		setProjectName,
		isSubmittable,
		setIsSubmittable,
		loading,
		setLoading,
	}
}

export default useCreateBooking

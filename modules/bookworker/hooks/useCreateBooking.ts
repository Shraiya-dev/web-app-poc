import { useFormik } from 'formik'
import { useState, useEffect } from 'react'

import { useContractorAuth, useSnackbar, validateEmail } from '../../../sdk'

interface CreateBookingForm {
	jobType: string

	BookingDuration: string
	StartDate: Date

	helper: Number
	supervisor: Number
	technician: Number

	helperWages: Number
	supervisorWages: Number
	technicianWages: Number

	overTimeFactor: string
	overTimeBuffer: string
	overTime: string

	skills: Array<String>
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

interface userInitialInfo {
	name: string
	companyName: string
	email: string
	phoneNumber: string
	customerStatus: string
}

const useCreateBooking = () => {
	const [step, setStep] = useState(1)
	const [userInitialInfo, setUserInitialInfo] = useState<userInitialInfo>()

	const { user } = useContractorAuth()

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
			overTimeBuffer: '',
			overTime: '',

			skills: [],
			tags: [],
			startTime: '',
			endTime: '',
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
				if (!values.helper && values.helperWages) {
					errors.helper = 'Required'
				}
				if (values.helper && !values.helperWages) {
					errors.helperWages = 'Required'
				}

				if (!values.technician && values.technicianWages) {
					errors.technician = 'Required'
				}
				if (values.technician && !values.technicianWages) {
					errors.technicianWages = 'Required'
				}

				if (!values.supervisor && values.supervisorWages) {
					errors.supervisor = 'Required'
				}
				if (values.supervisor && !values.supervisorWages) {
					errors.supervisorWages = 'Required'
				}
			}

			if (step === 2) {
				if (!values.city) {
					errors.city = 'Required'
				}

				if (!values.state) {
					errors.state = 'Required'
				}

				if (!values.siteAddress) {
					errors.siteAddress = 'Required'
				}

				if (!values.shiftTime) {
					if (!values.startTime) {
						errors.startTime = 'Required'
					}
					if (!values.endTime) {
						errors.endTime = 'Required'
					}

					errors.shiftTime = 'Required'
				}
			}

			if (step === 3) {
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

				if (!validateEmail(values.companyEmail)) {
					errors.companyEmail = 'Please Enter Valid Email'
				}

				if (
					values.phoneNumber === '' ||
					Number.isNaN(Number(values.phoneNumber)) ||
					values.phoneNumber.length !== 10
				) {
					errors.phoneNumber = 'Enter Valid phone Number'
				}
			}

			return errors
		},
		onSubmit: (values) => {
			console.log('hello', values)
		},
	})

	return {
		form,
		step,
		setStep,
		userInitialInfo,
		setUserInitialInfo,

		handlePrev,
	}
}

export default useCreateBooking

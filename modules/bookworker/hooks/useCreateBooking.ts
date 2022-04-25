import { useFormik } from 'formik'
import { useState } from 'react'

import { validateEmail } from '../../../sdk'
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
	startTime: Date
	endTime: Date
	shiftTime: string
	// projectName: string
	// projectType: string

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

			overTimeFactor: '',
			overTimeBuffer: '',
			overTime: '',

			skills: [],
			tags: [],
			startTime: new Date(),
			endTime: new Date(),
			shiftTime: '',
			// projectName: '',
			// projectType: '',

			state: '',
			city: '',
			siteAddress: '',

			name: '',
			company: '',
			companyEmail: '',
			phoneNumber: '',
		},
		validate: (values) => {
			const errors = <any>{}

			if (step === 1) {
				if (!values.jobType) {
					errors.jobType = 'Required'
				}
				if (!values.helper && !values.supervisor && !values.technician) {
					errors.helper = 'Required'
					errors.supervisor = 'Required'
					errors.technician = 'Required'
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
			console.log(values)
		},
	})

	return {
		form,
		step,
		setStep,
	}
}

export default useCreateBooking

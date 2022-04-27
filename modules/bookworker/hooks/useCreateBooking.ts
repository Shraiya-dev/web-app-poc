import { useFormik } from 'formik'
import { useState, useEffect } from 'react'

import { validateEmail } from '../../../sdk'
import { getCustomerDetails } from '../../../sdk/apis'

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

	useEffect(() => {
		getCustomerDetails()
			.then((data: any) => {
				form.values.name = data?.data?.payload?.name
				form.values.company = data?.data?.payload?.companyName
				form.values.companyEmail = data?.data?.payload?.email
				form.values.phoneNumber = data?.data?.payload?.phoneNumber
			})
			.catch((error) => {
				console.log(error)
			})
	}, [step])

	function timeConvert(time: any) {
		// Check correct time format and split into components

		time = time.getHours() + ':' + time.getMinutes()
		time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]

		if (time.length > 1) {
			// If time format correct
			time = time.slice(1) // Remove full string match value
			time[5] = +time[0] < 12 ? 'AM' : 'PM' // Set AM/PM
			time[0] = +time[0] % 12 || 12 // Adjust hours
		}
		return time.join('') // return adjusted time or original string
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
			startTime: new Date(),
			endTime: new Date(),
			shiftTime: '',

			state: 'none',
			city: 'none',
			siteAddress: '',

			name: userInitialInfo?.name || '',
			company: userInitialInfo?.companyName || '',
			companyEmail: userInitialInfo?.email || '',
			phoneNumber: userInitialInfo?.phoneNumber || '',
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

				//helper
				if (!values.helper && values.helperWages) {
					errors.helper = 'Required'
				}
				if (values.helper && !values.helperWages) {
					errors.helperWages = 'Required'
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
			const payload = {
				city: values.city,
				state: values.state,
				companyName: values.company,
				email: values.companyEmail,
				name: values.name,
				phoneNumber: values.phoneNumber,
				siteAddress: values.siteAddress,
				schedule: {
					bookingDuration: values.BookingDuration,
					startDate: values.StartDate,
					shiftTime: values.shiftTime,
				},
				peopleRequired: {
					SUPERVISOR: values.supervisor,
					HELPER: values.helper,
					TECHNICIAN: values.technician,
				},
				overTime: {
					rate: values.overTimeFactor,
				},
				earning: {
					HELPER: values.helperWages,
					TECHNICIAN: values.technicianWages,
					SUPERVISOR: values.supervisorWages,
				},
				tags: values.tags,
				jobType: values.jobType,
			}
		},
	})

	return {
		form,
		step,
		setStep,
		userInitialInfo,
		setUserInitialInfo,
		timeConvert,
	}
}

export default useCreateBooking

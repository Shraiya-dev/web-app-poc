import { useFormik } from 'formik'
import { useState } from 'react'
const useCreateBooking = () => {
	const form = useFormik({
		initialValues: {
			jobType: '',

			BookingDuration: '',
			StartDate: '',

			helper: '',
			supervisor: '',
			technician: '',

			helperWages: '',
			supervisorWages: '',
			technicianWages: '',

			overTimeFactor: '',
			overTimeBuffer: '',
			overTime: '',

			skills: [],
			tags:[],
			startTime: '',
			endTime: '',
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

			if (!values.jobType) {
				errors.jobType = 'Required'
			}
			if (!values.helper) {
				errors.helper = 'Required'
			}
			if (!values.supervisor) {
				errors.supervisor = 'Required'
			}
			if (!values.technician) {
				errors.technician = 'Required'
			}

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

			return errors
		},
		onSubmit: (values) => {
			console.log(values)
		},
	})

	return {
		form,
	}
}

export default useCreateBooking

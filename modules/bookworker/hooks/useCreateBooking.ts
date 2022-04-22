import { useFormik } from 'formik'
import { useState } from 'react'
const useCreateBooking = () => {
	const form = useFormik({
		initialValues: {
			jobType: '',
			otherSpecific: '',
			ChooseSpecific: '',
			BookingDuration: '',
			StartDate: '',

			helper: '',
			supervisor: '',
			technician: '',

			helperWages: '',
			supervisorWages: '',
			technicianWages: '',

			overTimeFactor:'',
			overTimeBuffer:'',
			overTime:'',


			projectName: '',
			projectType: '',

			state: '',
			city: '',
			siteAddress: '',

			name:'',
			company:'',
			companyEmail:'',
			phoneNumber:''

		},
		validate: () => {},
		onSubmit: (values) => {},
	})

	return {
		form,
	}
}

export default useCreateBooking

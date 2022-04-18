import { useFormik } from 'formik'
const useCreateBooking = () => {
	const form = useFormik({
		initialValues: {
			jobType:'',
			otherSpecific: '',
			ChooseSpecific: '',
			BookingDuration: '',
			StartDate:'',

			helper: '',
			supervisor: '',
			technician: '',

			projectName: '',
			projectType: '',

			state: '',
			city: '',
			siteAddress: '',
		},
		validate: () => {},
		onSubmit: (values) => {},
	})

	return {
		form,
	}
}

export default useCreateBooking

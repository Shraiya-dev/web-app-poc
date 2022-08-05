import { useFormik } from 'formik'
import { createCookieInHour } from 'sdk/analytics'
import { useFormikProps } from 'sdk/hooks'
import * as Yup from 'yup'
export const useEasyBooking = () => {
	const form = useFormik({
		initialValues: {
			location: '',
			jobType: 'none',
			workDuration: 'none',
			helperWage: undefined,
			technicianWage: undefined,
			supervisorWage: undefined,
		},
		validate: (values) => {
			console.log(values)
		},
		validationSchema: Yup.object({
			location: Yup.string().required('Location is required'),
			jobType: Yup.string().not(['none'], 'Job type is required'),
			workDuration: Yup.string().required('Work duration is required').not(['none'], 'Work duration is required'),
			helperWage: Yup.number()
				.required('Wage is required')
				.min(0, 'Wage should be greater then 0')
				.max(2000, 'Wage should be less then 2000'),
			technicianWage: Yup.number()
				.required('Wage is required')
				.min(0, 'Wage should be greater then 0')
				.max(2000, 'Wage should be less then 2000'),
			supervisorWage: Yup.number()
				.required('Wage is required')
				.min(0, 'Wage should be greater then 0')
				.max(2000, 'Wage should be less then 2000'),
		}),
		onSubmit: async (values) => {
			createCookieInHour('discoveryBooking', JSON.stringify(values), 45)
		},
	})
	const formikProps = useFormikProps(form)
	return { form, formikProps }
}

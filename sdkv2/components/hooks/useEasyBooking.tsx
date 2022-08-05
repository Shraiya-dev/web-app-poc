import { useFormik } from 'formik'
import { useCallback, useState } from 'react'
import { createCookieInHour } from 'sdk/analytics'
import { useFormikProps } from 'sdk/hooks'
import * as Yup from 'yup'
export const useEasyBooking = () => {
	const [wageDisable, setWageDisable] = useState({
		helperWage: false,
		technicianWage: false,
		supervisorWage: false,
	})
	const form = useFormik({
		initialValues: {
			location: '',
			jobType: 'none',
			workDuration: 'none',
			helperWage: undefined,
			technicianWage: undefined,
			supervisorWage: undefined,
			isHelper: wageDisable?.helperWage,
			isTechnician: wageDisable?.technicianWage,
			isSupervisor: wageDisable?.supervisorWage,
		},
		validate: (values) => {
			console.log(values)
		},
		validationSchema: Yup.object({
			location: Yup.string().required('Location is required'),
			jobType: Yup.string().not(['none'], 'Job type is required'),
			workDuration: Yup.string().required('Work duration is required').not(['none'], 'Work duration is required'),
			isHelper: Yup.boolean(),
			isTechnician: Yup.boolean(),
			isSupervisor: Yup.boolean(),
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
		// 	helperWage: Yup.number()
		// 		.when('isHelper', {
		// 			is: (isHelper: any) => isHelper === true,
		// 			then: Yup.number().required('Wage is required'),
		// 			otherwise: Yup.number(),
		// 		})
		// 		.min(0, 'Wage should be greater then 0')
		// 		.max(2000, 'Wage should be less then 2000'),
		// 	technicianWage: Yup.number()
		// 		.when('isTechnician', {
		// 			is: (isTechnician: any) => isTechnician === true,
		// 			then: Yup.number().required('Wage is required'),
		// 			otherwise: Yup.number(),
		// 		})
		// 		.min(0, 'Wage should be greater then 0')
		// 		.max(2000, 'Wage should be less then 2000'),
		// 	supervisorWage: Yup.number()
		// 		.when('isSupervisor', {
		// 			is: (isSupervisor: any) => isSupervisor === true,
		// 			then: Yup.number().required('Wage is required'),
		// 			otherwise: Yup.number(),
		// 		})
		// 		.min(0, 'Wage should be greater then 0')
		// 		.max(2000, 'Wage should be less then 2000'),
		// }),
		onSubmit: (values) => {
			// createCookieInHour('discoveryBooking', JSON.stringify(values), 45)
			handleSubmit(values)
		},
	})

	const handleSubmit = async (values: any) => {
		createCookieInHour('discoveryBooking', JSON.stringify(values), 45)
	}

	const formikProps = useFormikProps(form)
	return { form, formikProps, wageDisable, setWageDisable }
}

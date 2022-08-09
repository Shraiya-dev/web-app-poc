import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { createCookieInHour, DataLayerPush, getCookie, sendAnalytics } from 'sdk/analytics'
import { useFormikProps } from 'sdk/hooks'
import * as Yup from 'yup'
export const useEasyBooking = () => {
	const router = useRouter()
	const handleSubmit = async (values: any) => {
		DataLayerPush({ event: 'booking_requirement' })
		sendAnalytics({
			name: 'CreateEasyBookWorker',
			action: 'ButtonClick',
			metaData: {
				step: 'Submit Requirements',
				values: values,
			},
		})
		createCookieInHour('discoveryBooking', JSON.stringify(values), 45)
		router.push('/login')
	}
	const form = useFormik({
		initialValues: {
			location: '',
			jobType: 'none',
			workDuration: 'none',
			helperWage: undefined,
			technicianWage: undefined,
			supervisorWage: undefined,
			isHelper: false,
			isTechnician: false,
			isSupervisor: false,
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
			helperWage: Yup.number().when('isHelper', {
				is: true,
				then: Yup.number()
					.required('Wage is required')
					.min(0, 'Wage should be greater then 0')
					.max(2000, 'Wage should be less then 2000'),
			}),

			technicianWage: Yup.number().when('isTechnician', {
				is: true,
				then: Yup.number()
					.required('Wage is required')
					.min(0, 'Wage should be greater then 0')
					.max(2000, 'Wage should be less then 2000'),
			}),
			supervisorWage: Yup.number().when('isSupervisor', {
				is: true,
				then: Yup.number()
					.required('Wage is required')
					.min(0, 'Wage should be greater then 0')
					.max(2000, 'Wage should be less then 2000'),
			}),
		}),

		onSubmit: (values) => {
			// createCookieInHour('discoveryBooking', JSON.stringify(values), 45)
			handleSubmit(values)
		},
	})
	useEffect(() => {
		try {
			const discoveryBookingFromCookie = JSON.parse(getCookie('discoveryBooking'))
			form.setValues(discoveryBookingFromCookie)
		} catch (error) {
			console.log(error)
		}
	}, [])

	const formikProps = useFormikProps(form)
	return { form, formikProps }
}

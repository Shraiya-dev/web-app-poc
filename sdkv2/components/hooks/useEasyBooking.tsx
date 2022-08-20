import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { createCookieInHour, DataLayerPush, getCookie, sendAnalytics } from 'sdk/analytics'
import { useFormikProps } from 'sdk/hooks'
import { useContractorAuth } from 'sdk/providers'
import * as Yup from 'yup'
export const useEasyBooking = () => {
	const router = useRouter()
	const [loading, setLoading] = useState<boolean>(false)
	const { createEasyBooking } = useContractorAuth()
	const [isSubmittable, setIsSubmittable] = useState<boolean>(false)

	const form = useFormik({
		initialValues: {
			jobType: 'none',

			StartDate: new Date(),

			helper: 0,
			supervisor: 0,
			technician: 0,

			helperWage: 0,
			technicianWage: 0,
			supervisorWage: 0,

			location: '',
			workDuration: 'none',
			startTime: 'none',
			endTime: 'none',
			shiftTime: '',

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

		onSubmit: createEasyBooking,
	})
	useEffect(() => {
		try {
			const discoveryBookingFromCookie = JSON.parse(getCookie('discoveryBooking'))
			form.setValues({
				...discoveryBookingFromCookie,
				location: `${discoveryBookingFromCookie.city}, ${discoveryBookingFromCookie.state}`,
			})
		} catch (error) {}
	}, [])

	const formikProps = useFormikProps(form)
	return { form, formikProps, loading, isSubmittable, setIsSubmittable }
}

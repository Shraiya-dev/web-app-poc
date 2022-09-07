import { FormikHelpers, useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { createCookieInHour, DataLayerPush, getCookie, sendAnalytics } from 'sdk/analytics'
import { useFormikProps } from 'sdk/hooks'
import { useContractorAuth } from 'sdk/providers'
import * as Yup from 'yup'
export const useEasyBooking = () => {
	const router = useRouter()
	const { openLoginDialog, user } = useContractorAuth()

	const handleSubmit = useCallback(
		async (values: any, fh: any) => {
			DataLayerPush({
				event: 'booking_requirement',
				helperWage: values.helperWage,
				technicianWage: values.technicianWage,
				supervisorWage: values.supervisorWage,
			})
			sendAnalytics({
				name: 'CreateEasyBookWorker',
				action: 'ButtonClick',
				metaData: {
					step: 'Submit Requirements',
					values: values,
				},
			})
			createCookieInHour(
				'discoveryBooking',
				JSON.stringify({
					...values,
					city: values.location.split(', ')[0],
					state: values.location.split(', ')[1],
				}),
				45
			)
			openLoginDialog()
			fh.resetForm()
			router.push({ pathname: '/', query: { bookingFromStep: 2 } })
		},
		[openLoginDialog, router]
	)

	const form = useFormik({
		initialValues: {
			location: '',
			jobType: 'none',
			helperWage: 500,
			technicianWage: 700,
			supervisorWage: 900,
			isHelper: false,
			isTechnician: false,
			isSupervisor: false,
		},
		validate: (values) => {
			// console.log(values)
		},
		validationSchema: Yup.object({
			location: Yup.string().required('Location is required'),
			jobType: Yup.string().not(['none'], 'Job type is required'),
			isHelper: Yup.boolean(),
			isTechnician: Yup.boolean(),
			isSupervisor: Yup.boolean(),
			helperWage: Yup.number().when('isHelper', {
				is: true,
				then: Yup.number()
					.required('Wage is required')
					.min(300, 'Wage should be greater then 300')
					.max(2000, 'Wage should be less then 2000'),
			}),

			technicianWage: Yup.number().when('isTechnician', {
				is: true,
				then: Yup.number()
					.required('Wage is required')
					.min(300, 'Wage should be greater then 300')
					.max(2000, 'Wage should be less then 2000'),
			}),
			supervisorWage: Yup.number().when('isSupervisor', {
				is: true,
				then: Yup.number()
					.required('Wage is required')
					.min(300, 'Wage should be greater then 300')
					.max(2000, 'Wage should be less then 2000'),
			}),
		}),

		onSubmit: handleSubmit,
	})
	useEffect(() => {
		try {
			const discoveryBookingFromCookie = () => {
				try {
					const discoveryBookingFromCookie = JSON.parse(getCookie('discoveryBooking'))
					return discoveryBookingFromCookie
				} catch (error) {
					return undefined
				}
			}
			const a = discoveryBookingFromCookie()
			form.setValues({
				...a,
				location: `${a.city}, ${a.state}`,
			})
		} catch (error) {}
	}, [])

	const formikProps = useFormikProps(form)
	return { form, formikProps }
}

import { useFlags } from 'flagsmith/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { createCookieInHour, DataLayerPush, getCookie, sendAnalytics } from 'sdk/analytics'
import { DefaultWageForWorker } from 'sdk/constants'
import { LiveFlags } from 'sdk/constants/flagsmith'
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

	const flags = useFlags([LiveFlags.s_booking_creation_remove_default_wage])

	const form = useFormik<{
		location: string
		jobType: string
		helperWage: string | number
		technicianWage: string | number
		supervisorWage: string | number
		isHelper: boolean
		isTechnician: boolean
		isSupervisor: boolean
	}>({
		initialValues: {
			location: '',
			jobType: 'none',
			helperWage: '',
			technicianWage: '',
			supervisorWage: '',
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
			isHelper: Yup.boolean(),
			isTechnician: Yup.boolean(),
			isSupervisor: Yup.boolean(),
			helperWage: Yup.number().when('isHelper', {
				is: true,
				then: Yup.number()
					.required('*salary is required')
					.min(300, '*daily salary cannot be less than ₹300')
					.max(2000, '*daily salary cannot be more than ₹2000'),
			}),

			technicianWage: Yup.number().when('isTechnician', {
				is: true,
				then: Yup.number()
					.required('*salary is required')
					.min(300, '*daily salary cannot be less than ₹300')
					.max(2000, '*daily salary cannot be more than ₹2000'),
			}),
			supervisorWage: Yup.number().when('isSupervisor', {
				is: true,
				then: Yup.number()
					.required('*salary is required')
					.min(300, '*daily salary cannot be less than ₹300')
					.max(2000, '*daily salary cannot be more than ₹2000'),
			}),
		}),

		onSubmit: handleSubmit,
	})
	useEffect(() => {
		form.setValues({
			location: '',
			jobType: 'none',
			helperWage: flags[LiveFlags.s_booking_creation_remove_default_wage]?.enabled
				? DefaultWageForWorker[flags[LiveFlags.s_booking_creation_remove_default_wage]?.value as string].HELPER
				: DefaultWageForWorker['T1'].HELPER,
			technicianWage: flags[LiveFlags.s_booking_creation_remove_default_wage]?.enabled
				? DefaultWageForWorker[flags[LiveFlags.s_booking_creation_remove_default_wage]?.value as string]
						.TECHNICIAN
				: DefaultWageForWorker['T1'].TECHNICIAN,
			supervisorWage: flags[LiveFlags.s_booking_creation_remove_default_wage]?.enabled
				? DefaultWageForWorker[flags[LiveFlags.s_booking_creation_remove_default_wage]?.value as string]
						.SUPERVISOR
				: DefaultWageForWorker['T1'].SUPERVISOR,
			isHelper: false,
			isTechnician: false,
			isSupervisor: false,
		})
	}, [flags])
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

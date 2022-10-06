import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DataLayerPush, sendAnalytics } from 'sdk/analytics'
import { DefaultWageForWorker } from 'sdk/constants'
import { useFormikProps } from 'sdk/hooks'
import { useContractorAuth, useSnackbar } from 'sdk/providers'
import * as Yup from 'yup'
import { createBooking } from '../apis'
import { useFlags } from 'flagsmith/react'
import { LiveFlags } from 'sdk/constants/flagsmith'

export const useCreateBooking = () => {
	const router = useRouter()
	const [isSubmittable, setIsSubmittable] = useState<boolean>(false)
	const { createEasyBooking } = useContractorAuth()
	const { showSnackbar } = useSnackbar()
	const handleSubmit = async (values: any) => {
		DataLayerPush({
			event: 'booking_requirement',
			helperWage: values.helperWage,
			technicianWage: values.technicianWage,
			supervisorWage: values.supervisorWage,
		})

		try {
			const payload = {
				jobType: values.jobType,
				requirements: {
					HELPER: values.isHelper
						? {
								count: 0,
								wage: values.helperWage,
						  }
						: undefined,
					TECHNICIAN: values.isTechnician
						? {
								count: 0,
								wage: values.technicianWage,
						  }
						: undefined,
					SUPERVISOR: values.isSupervisor
						? {
								count: 0,
								wage: values.supervisorWage,
						  }
						: undefined,
				},
			}
			createBooking(payload, router?.query?.projectId)
				.then((res) => {
					if (res.status === 200) {
						sendAnalytics({
							name: 'postedJob',
							action: 'ButtonClick',
							metaData: {
								values,
							},
						})

						showSnackbar('Booking Created Successfully', 'success')
						DataLayerPush({
							event: 'worker_booked',
						})

						router.push(
							`/bookings/${router?.query?.projectId}/${res?.data?.payload?.bookingId}/track-workers`
						)
						return
					}
				})
				.catch((error: any) => {
					showSnackbar(error?.response?.data?.developerInfo, 'error')
					console.log(error)
				})
		} catch (error) {
			console.log(error)
		}
	}
	const flags = useFlags([LiveFlags.s_booking_creation_remove_default_wage])
	const form = useFormik<{
		jobType: string
		helperWage: string | number
		technicianWage: string | number
		supervisorWage: string | number
		isHelper: boolean
		isTechnician: boolean
		isSupervisor: boolean
	}>({
		initialValues: {
			// location: '',
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
			// location: Yup.string().required('Location is required'),
			jobType: Yup.string().not(['none'], 'Job type is required'),
			isHelper: Yup.boolean(),
			isTechnician: Yup.boolean(),
			isSupervisor: Yup.boolean(),
			helperWage: Yup.number().when('isHelper', {
				is: true,
				then: Yup.number()
					.required('Wage is required')
					.min(300, 'Wage should be greater then Rs 300')
					.max(2000, 'Wage should be less then Rs 2000'),
			}),

			technicianWage: Yup.number().when('isTechnician', {
				is: true,
				then: Yup.number()
					.required('Wage is required')
					.min(300, 'Wage should be greater then Rs 300')
					.max(2000, 'Wage should be less then Rs 2000'),
			}),
			supervisorWage: Yup.number().when('isSupervisor', {
				is: true,
				then: Yup.number()
					.required('Wage is required')
					.min(300, 'Wage should be greater then Rs 300')
					.max(2000, 'Wage should be less then Rs 2000'),
			}),
		}),

		onSubmit: (values) => {
			handleSubmit(values)
		},
	})
	useEffect(() => {
		form.setValues({
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
	const formikProps = useFormikProps(form)
	return { form, formikProps, isSubmittable, setIsSubmittable }
}

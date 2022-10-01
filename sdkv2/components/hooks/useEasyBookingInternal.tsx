import { useFlags } from 'flagsmith/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DataLayerPush } from 'sdk/analytics'
import { DefaultWageForWorker } from 'sdk/constants'
import { LiveFlags } from 'sdk/constants/flagsmith'
import { useFormikProps } from 'sdk/hooks'
import { useContractorAuth } from 'sdk/providers'
import * as Yup from 'yup'

export const useEasyBookingInternal = () => {
	const router = useRouter()
	const [isSubmittable, setIsSubmittable] = useState<boolean>(false)
	const { createEasyBooking } = useContractorAuth()

	const handleSubmit = async (values: any) => {
		DataLayerPush({
			event: 'booking_requirement',
			helperWage: values.helperWage,
			technicianWage: values.technicianWage,
			supervisorWage: values.supervisorWage,
		})

		try {
			let value = { ...values, state: values.location.split(',')[1], city: values.location.split(',')[0] }
			const { data, status } = await createEasyBooking(value)
			if (status === 200) {
				router.push(`/projects/${data?.payload?.projectId}/bookings`)
			}
		} catch (error) {
			console.log(error)
		}
	}
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
			// console.log(values)
		},
		validationSchema: Yup.object({
			location: Yup.string().required('Location is required'),
			jobType: Yup.string().not(['none'], 'Job type is required'),
			// workDuration: Yup.string().required('Work duration is required').not(['none'], 'Work duration is required'),
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

	const formikProps = useFormikProps(form)
	return { form, formikProps, isSubmittable, setIsSubmittable }
}

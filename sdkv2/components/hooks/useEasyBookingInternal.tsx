import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DataLayerPush, sendAnalytics } from 'sdk/analytics'
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
		sendAnalytics({
			name: 'CreateEasyBookWorker',
			action: 'ButtonClick',
			metaData: {
				step: 'Submit Requirements',
				values: values,
				origin: 'dashboard',
			},
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
			// console.log(values)
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
			handleSubmit(values)
		},
	})

	const formikProps = useFormikProps(form)
	return { form, formikProps, isSubmittable, setIsSubmittable }
}

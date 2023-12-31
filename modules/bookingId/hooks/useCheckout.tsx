import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useSnackbar } from 'sdk'
import { getBookingDetails, getDiscountEligibilityService } from '../apis'

export interface DiscountDetails {
	isEligible: boolean
	discount?: Discount
}

export interface Discount {
	code?: string
	quantity?: number
	amount?: number
	title?: string
}

export const useCheckout = () => {
	const router = useRouter()

	const [bookingData, setBookingData] = useState<any>()
	const [discountDetails, setDiscountDetails] = useState<DiscountDetails>()
	const { showSnackbar } = useSnackbar()
	const [wage, setWage] = useState<any>()
	const [loading, dispatchLoading] = useReducer((p: any, n: any) => ({ ...p, ...n }), {})
	const form = useFormik<any>({
		initialValues: {
			qtyHelper: 0,
			qtyTechnician: 0,
			qtySupervisor: 0,
		},

		onSubmit: async (values: any) => {},
	})
	const getDiscountEligibility = useCallback(async () => {
		dispatchLoading({ discount: true })
		const { bookingId, projectId } = router?.query
		try {
			const { data } = await getDiscountEligibilityService()
			setDiscountDetails(data?.payload?.response)
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
		dispatchLoading({ discount: false })
	}, [router?.query, showSnackbar])
	const getBookingDetail = useCallback(async () => {
		const { bookingId, projectId } = router?.query
		dispatchLoading({ booking: true })
		try {
			const { data } = await getBookingDetails(bookingId, projectId)
			setBookingData(data?.payload)
			setWage({
				wageHelper: data?.payload?.booking?.rateCard?.HELPER ?? 0,
				wageTechnician: data?.payload?.booking?.rateCard?.TECHNICIAN ?? 0,
				wageSupervisor: data?.payload?.booking?.rateCard?.SUPERVISOR ?? 0,
			})
			// form.setValues({
			// 	qtyHelper: data?.payload?.booking?.peopleRequired?.HELPER,
			// 	qtySupervisor: data?.payload?.booking?.peopleRequired?.SUPERVISOR,
			// 	qtyTechnician: data?.payload?.booking?.peopleRequired?.TECHNICIAN,
			// })
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
		dispatchLoading({ booking: false })
	}, [router?.query, showSnackbar])

	useEffect(() => {
		if (!router.isReady) return
		getBookingDetail()
		getDiscountEligibility()
	}, [router])

	return {
		form,
		loading,
		wage,
		getBookingDetail,
		dispatchLoading,
		bookingData,
		setWage,
		discountDetails,
	}
}

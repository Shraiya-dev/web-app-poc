import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSnackbar } from 'sdk'
import { getBookingDetails, updateWages } from '../apis'

export const useCheckout = () => {
	const router = useRouter()
	const [bookingData, setBookingData] = useState<any>()
	const { showSnackbar } = useSnackbar()
	const [wage, setWage] = useState<any>()
	const form = useFormik<any>({
		initialValues: {
			qtyHelper: 0,
			qtyTechnician: 0,
			qtySupervisor: 0,
		},
		onSubmit: async (values: any) => {},
	})

	const getBookingDetail = useCallback(async () => {
		const { bookingId, projectId, ...rest } = router?.query
		try {
			const { data } = await getBookingDetails(bookingId, projectId)
			setBookingData(data?.payload)
			setWage({
				wageHelper: data?.payload?.booking?.rateCard?.HELPER ?? 0,
				wageTechnician: data?.payload?.booking?.rateCard?.TECHNICIAN ?? 0,
				wageSupervisor: data?.payload?.booking?.rateCard?.SUPERVISOR ?? 0,
			})
			form.setValues({
				qtyHelper: data?.payload?.booking?.peopleRequired?.HELPER,
				qtySupervisor: data?.payload?.booking?.peopleRequired?.SUPERVISOR,
				qtyTechnician: data?.payload?.booking?.peopleRequired?.TECHNICIAN,
			})
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
	}, [router?.query, showSnackbar])

	useEffect(() => {
		if (!router.isReady) return
		getBookingDetail()
	}, [router])

	return {
		form,
		wage,
		bookingData,
		setWage,
	}
}

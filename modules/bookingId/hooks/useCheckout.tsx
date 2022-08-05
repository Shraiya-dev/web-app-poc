import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'sdk'
import { getBookingDetails, updateWages } from '../apis'

export const useCheckout = () => {
	const router = useRouter()
	const [bookingData, setBookingData] = useState(null)
    const { showSnackbar } = useSnackbar()
	const [personRequire, setPersonRequire] = useState({
		helper: 0,
		technician: 0,
		supervisor: 0,
	})
	const [wages, setWages] = useState({
		helper: 112,
		technician: 0,
		supervisor: 0,
	})

	const handleWageUpdate = useCallback(async (bookingId: any, projectId: any, payload: any) => {
		if (!bookingId || !projectId) return
		try {
			const { data } = await updateWages(bookingId, projectId, payload)
		} catch (error) {
			console.log(error)
		}
	}, [])

	const handleChangePersonRequire = (e: any) => {
		setPersonRequire((prev): any => {
			return {
				...prev,
				[e.target.name]: Number(e.target.value),
			}
		})
	}


	const getBookingDetail = useCallback(async () => {
		const { bookingId, projectId, ...rest } = router?.query

		if (!bookingId || !projectId) return

		try {
			const { data } = await getBookingDetails(bookingId, projectId)
			setBookingData(data?.payload)
			setWages({
				helper: data?.payload?.rateCard.HELPER,
				technician: data?.payload?.rateCard.TECHNICIAN,
				supervisor: data?.payload?.rateCard.SUPERVISOR,
			})
		} catch (error:any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
	}, [router])

	useEffect(() => {
		getBookingDetail()
	}, [getBookingDetail])

	return {
		handleChangePersonRequire,
		personRequire,
		wages,
		bookingData,
	}
}

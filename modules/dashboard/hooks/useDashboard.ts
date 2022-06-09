import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { BookingPreview, BookingStats, JobCardState, JOB_TYPES, useSnackbar, WORKER_TYPES } from '../../../sdk'
import { JobBenefits } from '../../../sdk/types/jobBenefits'
import { getBookingsService, getBookingsSummaryService } from '../apis'

export const useDashboard = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [bookingStats, setBookingStats] = useState<BookingStats>({
		bookingsCount: 0,
		heroesHired: 0,
		progressBookingsCount: 0,
	})

	const [bookings, setBookings] = useState<{
		hasMore: boolean
		bookings: BookingPreview[]
		totalBookings: number
	}>({ hasMore: false, bookings: [], totalBookings: 0 })
	const { showSnackbar } = useSnackbar()

	// const getBookingStats = useCallback(async () => {
	// 	try {
	// 		const { data } = await getBookingsSummaryService()
	// 		setBookingStats({
	// 			bookingsCount: data.payload.bookingsCount,
	// 			heroesHired: data.payload.heroesHired,
	// 			progressBookingsCount: data.payload.progressBookingsCount,
	// 		})
	// 	} catch (error: any) {
	// 		showSnackbar(error?.response?.data?.developerInfo, 'error')
	// 	}
	// }, [showSnackbar])

	//const projectId = router.query.projectId

	const getBookings = useCallback(async () => {
		const { projectId, ...rest } = router.query
		setIsLoading(true)
		if (!projectId) return
		try {
			const queryParams = new URLSearchParams(rest as any)
			queryParams.set('pageNumber', '0')
			queryParams.set('pageSize', '500')

			const { data } = await getBookingsService(queryParams, projectId)

			// const bookings = data?.payload?.bookings?.map((item: any) => {

			// 	const booking: BookingPreview = {
			// 		bookingId: item?.booking?.bookingId,

			// 		//city: item?.booking?.city,
			// 		//state: item?.booking?.state,

			// 		status: item?.booking?.status,

			// 		jobType: item?.booking?.jobType,
			// 		peopleRequired: {
			// 			HELPER: item?.booking?.requirements?.HELPER?.count,
			// 			SUPERVISOR: item?.booking?.requirements?.SUPERVISOR?.count,
			// 			TECHNICIAN: item?.booking?.requirements?.TECHNICIAN?.count,
			// 		},
			// 		schedule: {
			// 			bookingDuration: item.booking.bookingDuration,

			// 			shiftTime: item.schedule.shiftTime,
			// 			startDate: new Date(item.schedule.startDate),
			// 		},
			// 		jobCardDetails: {
			// 			ACCEPTED: item.stats.jobCardCounts?.ACCEPTED ?? 0,
			// 			READY_TO_DEPLOY: item.stats.jobCardCounts?.READY_TO_DEPLOY ?? 0,
			// 			DEPLOYMENT_COMPLETE: item.stats.jobCardCounts?.DEPLOYMENT_COMPLETE ?? 0,
			// 		},
			// 		//createdAt: new Date(item.createdAt),
			// 	}
			// 	return booking
			// })

			setBookings({
				hasMore: data?.payload?.hasMore || false,
				bookings: data?.payload?.bookings,
				totalBookings: data?.payload?.bookings?.length,
			})
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
		setIsLoading(false)
	}, [router.query, showSnackbar])
	// useEffect(() => {
	// 	getBookingStats()
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	useEffect(() => {
		getBookings()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query])

	return {
		bookings: bookings,
		bookingStats: bookingStats,
		isLoading: isLoading,
	}
}

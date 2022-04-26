import axios from 'axios'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useCallback, useEffect, useState } from 'react'
import { BookingPreview, BookingStats, useSnackbar } from '../../../sdk'

export const useDashboard = () => {
	const router = useRouter()
	const [bookingStats, setBookingStats] = useState<BookingStats>({
		bookingsCount: 0,
		heroesHired: 0,
		progressBookingsCount: 0,
	})
	const [bookings, setBookings] = useState<Array<BookingPreview>>([])
	const { showSnackbar } = useSnackbar()
	const getBookingStats = useCallback(async () => {
		try {
			const { data } = await axios.get('/gateway/customer-api/bookingSummary')
			setBookingStats({
				bookingsCount: data.payload.bookingsCount,
				heroesHired: data.payload.heroesHired,
				progressBookingsCount: data.payload.progressBookingsCount,
			})
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
	}, [showSnackbar])
	const getBookings = useCallback(async () => {
		try {
			const queryParams = new URLSearchParams(router.query as any)
			const { data } = await axios.get('/gateway/customer-api/bookings?' + queryParams.toString())
			const bookings = data.payload.bookings.map((item: any) => {
				const booking: BookingPreview = {
					bookingId: item.bookingId,
					city: item.city,
					status: item.status,
					state: item.state,
					jobType: item.jobType,
					peopleRequired: {
						HELPER: item.peopleRequired.HELPER,
						SUPERVISOR: item.peopleRequired.SUPERVISOR,
						TECHNICIAN: item.peopleRequired.TECHNICIAN,
					},
					schedule: {
						bookingDuration: item.schedule.bookingDuration,
						shiftTime: item.schedule.shiftTime,
						startDate: new Date(item.schedule.startDate),
					},
					jobCardDetails: {
						ACCEPTED: item.jobCardDetails?.ACCEPTED ?? 0,
						READY_TO_DEPLOY: item.jobCardDetails?.READY_TO_DEPLOY ?? 0,
						DEPLOYMENT_COMPLETE: item.jobCardDetails?.DEPLOYMENT_COMPLETE ?? 0,
					},
				}
				return booking
			})

			setBookings(bookings)
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
	}, [router.query, showSnackbar])
	useEffect(() => {
		getBookingStats()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		getBookings()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getBookings])

	return {
		bookings: bookings,
		bookingStats: bookingStats,
	}
}

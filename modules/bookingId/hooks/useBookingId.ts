import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { BookingPreview, JobCard, useSnackbar } from '../../../sdk'

export const useBookingId = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const { showSnackbar } = useSnackbar()
	const [bookingSummary, setBookingSummary] = useState<BookingPreview>()
	const [jobCards, setJobCards] = useState<Array<JobCard>>([])

	const getJobCards = useCallback(async () => {
		setIsLoading(true)
		const { bookingId, ...rest } = router.query
		if (!bookingId) return
		try {
			const queryParams = new URLSearchParams(rest as any)
			const { data } = await axios.get(`/gateway/customer-api/bookings/${bookingId}?` + queryParams.toString())
			const booking = data.payload.bookings
			const jobCards = data.payload.workers ?? []

			setBookingSummary({
				bookingId: booking.bookingId,
				city: booking.city,
				status: booking.status,
				state: booking.state,
				jobType: booking.jobType,
				peopleRequired: {
					HELPER: booking.peopleRequired.HELPER,
					SUPERVISOR: booking.peopleRequired.SUPERVISOR,
					TECHNICIAN: booking.peopleRequired.TECHNICIAN,
				},
				schedule: {
					bookingDuration: booking.schedule.bookingDuration,
					shiftTime: booking.schedule.shiftTime,
					startDate: new Date(booking.schedule.startDate),
				},
				jobCardDetails: {
					ACCEPTED: booking.jobCardDetails?.ACCEPTED ?? 0,
					READY_TO_DEPLOY: booking.jobCardDetails?.READY_TO_DEPLOY ?? 0,
					DEPLOYMENT_COMPLETE: booking.jobCardDetails?.DEPLOYMENT_COMPLETE ?? 0,
				},
				createdAt: new Date(booking.createdAt),
			})
			setJobCards(
				jobCards.map((item: JobCard) => {
					const jobCard: JobCard = {
						workerId: item.workerId,
						workerName: item.workerName,
						jobType: item.jobType,
						experience: item.experience,
						projectCount: item.projectCount,
						city: item.city,
						state: item.state,
						dob: item.dob,
						skillType: item.skillType,
					}
					return jobCard
				})
			)
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
		setIsLoading(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query])

	useEffect(() => {
		getJobCards()
	}, [getJobCards])

	return {
		jobCards: jobCards,
		bookingSummary: bookingSummary,
		getJobCards: getJobCards,
		isLoading: isLoading,
	}
}

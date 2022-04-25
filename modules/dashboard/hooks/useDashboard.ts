import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BookingPreview, BOOKING_STATES, JOB_TYPES } from '../../../sdk'

export const useDashboard = () => {
	const router = useRouter()
	const [bookings, setBookings] = useState<Array<BookingPreview>>(
		Array(50).fill({
			bookingId: 'ABCDEF',
			city: 'Noida',
			status: 'RECEIVED' as BOOKING_STATES,

			state: 'Uttar Pradesh',
			jobType: 'BAR_BENDER' as JOB_TYPES,
			peopleRequired: {
				HELPER: 5,
				SUPERVISOR: 2,
			},
			schedule: {
				bookingDuration: '45 to 90 days',
				shiftTime: '9am to 6pm',
				startDate: new Date(),
			},
			jobCardDetails: {
				ACCEPTED: 5,
				READY_TO_DEPLOY: 7,
				DEPLOYMENT_COMPLETE: 10,
			},
		})
	)
	useEffect(() => {
		const sp = new URLSearchParams(router.query as any)
		console.log('fetching booking for ?', sp.toString())
	}, [router.query])

	return {
		bookings: bookings,
	}
}

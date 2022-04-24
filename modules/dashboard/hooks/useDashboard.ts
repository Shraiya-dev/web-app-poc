import { useFormik } from 'formik'
import { useState } from 'react'
import { BookingPreview, BOOKING_STATES, JOB_TYPES } from '../../../sdk'

export const useDashboard = () => {
	//todo define interface for proper usage
	const [bookings, setBookings] = useState<Array<BookingPreview>>(
		Array(6).fill({
			bookingId: 'ABCDEF',
			city: 'Noida',
			status: 'READY_TO_DEPLOY' as BOOKING_STATES,
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
				READY_TO_DEPLOY: 10,
				DEPLOYMENT_COMPLETE: 10,
			},
		})
	)

	return {
		bookings: bookings,
	}
}

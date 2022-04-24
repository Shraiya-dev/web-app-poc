import { BOOKING_STATES } from '../types'

export const BookingLabel: Partial<{
	[key in BOOKING_STATES]: string
}> = {
	RECEIVED: 'Created',
	CONFIRMED: 'Confirmed',
	ALLOCATION_PENDING: 'Allocation Ongoing',
	ALLOCATION_IN_PROGRESS: 'Allocation Ongoing',
	ALLOCATION_CLOSED: 'Allocation Ongoing',
	READY_TO_DEPLOY: 'Ready to Deploy'

}
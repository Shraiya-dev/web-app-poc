import { BOOKING_STATES, WORKER_TYPES } from '../types'

export const BookingStateLabel: Partial<{
	[key in BOOKING_STATES]: string
}> = {
	RECEIVED: 'Created',
	CONFIRMED: 'Confirmed',
	ALLOCATION_PENDING: 'Allocation Ongoing',
	ALLOCATION_IN_PROGRESS: 'Allocation Ongoing',
	ALLOCATION_CLOSED: 'Allocation Ongoing',
	READY_TO_DEPLOY: 'Ready to Deploy',
	DEPLOYED: 'Deployed',
	CANCELLED: 'Cancelled',
}

export const SkillTypeLabel: Partial<{
	[key in WORKER_TYPES]?: string
}> = {
	HELPER: 'Helper',
	SUPERVISOR: 'Supervisor',
	TECHNICIAN: 'Technician',
}

export const DefaultWageForWorker: { [key in WORKER_TYPES]: number } = {
	HELPER: 600,
	TECHNICIAN: 900,
	SUPERVISOR: 1100,
}

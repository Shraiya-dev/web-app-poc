import { JOB_TYPES } from './Job'
import { JobCardState } from './jobCard'

export const enum BOOKING_STATES {
	RECEIVED = 'RECEIVED',
	CONFIRMED = 'CONFIRMED',
	ALLOCATION_PENDING = 'ALLOCATION_PENDING',
	ALLOCATION_ON_GOING = 'ALLOCATION_ON_GOING',
	ALLOCATION_IN_PROGRESS = 'ALLOCATION_IN_PROGRESS',
	ALLOCATION_CLOSED = 'ALLOCATION_CLOSED',
	ALLOCATION_COMPLETE = 'ALLOCATION_COMPLETE',
	READY_TO_DEPLOY = 'READY_TO_DEPLOY',
	DEPLOYED = 'DEPLOYED',
	CANCELLED = 'CANCELLED',
	CLOSED = 'CLOSED',
}
export enum WORKER_TYPES {
	SUPERVISOR = 'SUPERVISOR',
	HELPER = 'HELPER',
	TECHNICIAN = 'TECHNICIAN',
}

export interface BookingPreview {
	bookingId: string
	jobType: JOB_TYPES
	peopleRequired: {
		[key in WORKER_TYPES]?: number
	}
	state: string
	city: string
	schedule: {
		bookingDuration: string
		startDate: Date
		shiftTime: string
	}
	jobCardDetails?: {
		[key in JobCardState]?: number
	}
	status?: BOOKING_STATES
}

export interface BookingStats {
	bookingsCount: number
	progressBookingsCount: number
	heroesHired: number
}

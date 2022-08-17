import { JOB_TYPES } from './Job'
import { JobBenefits } from './jobBenefits'
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

export interface BookingDetailsPreview {
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
	createdAt: Date
	status?: BOOKING_STATES
}

export interface BookingRequirements {
	count: number
	wage: number
}

export enum BookingDuration {
	LESS_THAN_THIRTY = 'LESS_THAN_THIRTY',
	THIRTY_TO_FORTY_FIVE = 'THIRTY_TO_FORTY_FIVE',
	FORTY_FIVE_TO_NINETY = 'FORTY_FIVE_TO_NINETY',
	NINETY_TO_ONE_FIFTY = 'NINETY_TO_ONE_FIFTY',
	MORE_THAN_ONE_FIFTY = 'MORE_THAN_ONE_FIFTY',

	LESS_THAN_SEVEN = 'less than 7 days',

	SEVEN_TO_FORTY_FIVE = '7 days to 45 days',

	FORTY_FIVE_TO_NINETY_OLD = '45 days to 90 days',

	MORE_THAN_NINETY = 'more than 90 days',
}

export enum BOOKING_STAGES {
	RECEIVED = 'RECEIVED',
	CONFIRMED = 'CONFIRMED',
	ALLOCATION_PENDING = 'ALLOCATION_PENDING',
	ALLOCATION_IN_PROGRESS = 'ALLOCATION_IN_PROGRESS',
	ALLOCATION_CLOSED = 'ALLOCATION_CLOSED',
	READY_TO_DEPLOY = 'READY_TO_DEPLOY',
	DEPLOYED = 'DEPLOYED',
	CANCELLED = 'CANCELLED',
	CLOSED = 'CLOSED',

	/** @deprecated */
	ALLOCATION_ON_GOING = 'ALLOCATION_ON_GOING',
	/** @deprecated */
	ALLOCATION_COMPLETE = 'ALLOCATION_COMPLETE',
}

export interface OverTimeDetails {
	/** Factor determing the overtime earnings */
	rate: number
}

export interface CustomerBookingDetailsClientResponse {
	bookingId: string
	jobType: JOB_TYPES
	peopleRequired: {
		[key in WORKER_TYPES]?: number
	}
	rateCard: { [key in WORKER_TYPES]?: number }

	schedule: {
		bookingDuration: BookingDuration
		shiftTime: string
	}
	startDate: Date
	tags: string[]

	status?: BOOKING_STATES
	createdAt: Date
	bookingType: String
}

export interface BookingsWorkerInfo {
	workerName: string
	jobType: JOB_TYPES
	dob: string
	projectCount: Number
	city: string
	state: string
	experience: string
	workerId: string
}

export interface ProjectPreview {
	id: string

	name: string
	customerId: string

	city: string
	state: string
	siteAddress: string
	pincode?: string

	endDate?: Date

	benefits: JobBenefits[]

	images: {
		accommodations: string[]
		site: string[]
	}

	overTime: OverTimeDetails

	generateEarnings?: boolean
}

export interface BookingPreview {
	booking: CustomerBookingDetailsClientResponse
	workers: BookingsWorkerInfo[]
	project: ProjectPreview
	stats: {
		jobCardCountsBySkill: any
		jobCardCounts?: {
			[key in JobCardState]?: number
		}
	}
	hasMore: boolean
}

export interface BookingStats {
	bookingsCount: number
	progressBookingsCount: number
	heroesHired: number
}

import { JOB_TYPES } from 'sdk/types'

export interface Worker {
	workerId?: string
	name?: string
	phoneNumber?: string
	verified?: boolean
	profileImage?: string
	jobType?: JOB_TYPES
	skillType?: string
	rating?: number
	experience?: {
		years?: number
		organization?: string
	}
}

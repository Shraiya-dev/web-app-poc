export interface Worker {
	workerId?: string
	name?: string
	phoneNumber?: string
	verified?: boolean
	profileImage?: string
	jobType?: string
	skillType?: string
	rating?: number
	experience?: {
		years?: number
		organization?: string
	}
}

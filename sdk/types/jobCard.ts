import { WORKER_TYPES } from './booking'
import { JOB_TYPES } from './Job'
import { WORKER_APPLICATION_STATUS } from './worker'

export enum JobCardState {
	WORKER_APPLIED = 'WORKER_APPLIED',
	ACCEPTED = 'ACCEPTED',
	READY_TO_DEPLOY = 'READY_TO_DEPLOY',
	DEPLOYMENT_COMPLETE = 'DEPLOYMENT_COMPLETE',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED',
}

export interface JobCard {
	WorkerName: string
	jobCardId: string
	jobType: JOB_TYPES
	dob: string
	contractorFeedbackCode?: WORKER_APPLICATION_STATUS
	//projectCount: Number
	city: string
	state: string
	experience: string
	workerId: string
	skillType: WORKER_TYPES
	jobCardState: JobCardState
	workerImage: string
	phoneNumber: String
}

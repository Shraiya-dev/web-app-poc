import { JobCardState } from '../types'

export const JobCardStateLabel: Partial<{
	[key in JobCardState]: string
}> = {
	WORKER_APPLIED: 'Applied',
	ACCEPTED: 'Accepted',
	READY_TO_DEPLOY: 'Ready To Deploy',
	DEPLOYMENT_COMPLETE: 'Deployed',
	COMPLETED: 'Completed',
	CANCELLED: 'Canceled',
}

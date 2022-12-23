import { WORKER_APPLICATION_STATUS, WORKER_TYPES } from '../types'

export const WorkerTypeLabel: Partial<{
	[key in WORKER_TYPES]: string
}> = {
	SUPERVISOR: 'Supervisor',
	HELPER: 'Helper',
	TECHNICIAN: 'Technician',
}

export const WorkerApplicationStatusLabel: {
	[key in WORKER_APPLICATION_STATUS]: string
} = {
	REJECTED: 'Rejected',
	HIRED: 'Hired',
	TO_REVIEW: 'To Review',
	SHORTLISTED: 'Shortlisted',
}

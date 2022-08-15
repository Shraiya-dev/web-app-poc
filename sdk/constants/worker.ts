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
	COULD_NOT_CONNECT: 'Could not connect',
	INCORRECT: 'Incorrect Profile',
	REJECTED: 'Rejected',
	IN_PROGRESS: 'In progress',
	HIRED: 'Hired',
	WORK_STARTED: 'Work Started',
}

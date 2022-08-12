import { WORKER_APPLICATION_STATUS, WORKER_TYPES } from '../types'

export const WorkerTypeLabel: Partial<{
	[key in WORKER_TYPES]: string
}> = {
	SUPERVISOR: 'Supervisor',
	HELPER: 'Helper',
	TECHNICIAN: 'Technician',
}

export const WorkerApplicationStatusLabel: Partial<{
	[key in WORKER_APPLICATION_STATUS]: string
}> = {
	COULD_NOT_CONNECT: 'COULD_NOT_CONNECT',
	INCORRECT: 'INCORRECT',
	REJECTED: 'REJECTED',
	IN_PROGRESS: 'IN_PROGRESS',
	HIRED: 'HIRED',
	WORK_STARTED: 'WORK_STARTED',
}

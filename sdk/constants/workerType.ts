import { WORKER_TYPES } from '../types'

export const WorkerTypeLabel: Partial<{
	[key in WORKER_TYPES]: string
}> = {
	SUPERVISOR: 'Supervisor',
	HELPER: 'Helper',
	TECHNICIAN: 'Technician',
}

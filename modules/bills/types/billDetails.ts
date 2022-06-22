import { JOB_TYPES, WORKER_TYPES } from '../../../sdk'
export interface BillDetails {
	bill: {
		billId: string

		baseWage: string // ₹ 20
		otFactor: string // 1
		otWage: string // ₹ 20

		grossWage: string

		pf: string // ₹ 20
		esi: string // ₹ 20

		netWage: string // ₹ 20
	}
	worker: {
		id: string
		name: string
		phoneNumber: string
		workDetails: {
			jobType: JOB_TYPES
			workerType: WORKER_TYPES
		}
	}
}

export interface BillSummaryResponse {
	summary: {
		totalPayable: string // ₹ 6,270
		heroCount: string // 16
		baseWage: string // ₹ 20
		otWage: string // ₹ 20
		grossWage: string
		pf: string // ₹ 20
		esi: string // ₹ 20
	}
	displayDate: string // D MMMM
}

export interface BillDetailResponse {
	bills: BillDetails[]
	aggregationDate: string // DD-MM-YY
	displayDate: string // D MMMM
	hasMore: boolean
}

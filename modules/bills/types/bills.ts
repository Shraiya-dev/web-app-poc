export interface BillResponse {
	aggregatedBills: Bill[]
	hasMore: boolean
}

export interface Bill {
	billIds: string[]
	workersIds: string[]
	aggregationDate: string // DD-MM-YY
	displayDate: string // D MMMM
	dwrId: string
	totalPayable: string // ₹ 6,270
	heroCount: string // 16
	baseWage: string // ₹ 20
	otWage: string // ₹ 20
	grossWage: string
	pf: string // ₹ 20
	esi: string // ₹ 20
}

export enum WorkReportStatus {
	PENDING_APPROVAL = 'PENDING_APPROVAL',
	DISPUTED = 'DISPUTED',
	APPROVED = 'APPROVED',
	DRAFT = 'DRAFT',
}

export interface WorkReport {
	_id: string
	dwrId: string
	projectId: string
	status: WorkReportStatus
	date: string
	totalPresent: number
	totalCount: number
	presentPercentage: string
	totalShiftHours: string
	totalOtHours: string
	avgShiftHours: string
	avgOTHours: string
}
export interface WorkReportResponse {
	hasMore: boolean
	pageNumber: number
	pageSize: number
	totalPages: number
	totalRecords: number
	response: {
		dwrSummary: { [key in WorkReportStatus]: number }
		dwrDetails: WorkReport[]
	}
}

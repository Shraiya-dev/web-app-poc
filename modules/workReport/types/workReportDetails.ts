import { WorkReportStatus } from './workReport'

export interface WorkReportDetails {
	workerId?: string
	name?: string
	phoneNumber?: string
	jobType?: string
	skillType?: string
	attendanceId?: string
	isPresent?: boolean
	checkIn?: string
	checkOut?: string
	shiftHours?: string
	otCheckIn?: string
	otCheckOut?: string
	otHours?: string
}
export interface WorkReportDetailsAggregatedDetails {
	totalPresent: number
	totalCount: number
	totalShiftHours: string
	totalOtHours: string
	presentPercentage: string
	avgShiftHours: string
	avgOTHours: string
}

export interface WorkReportDetailsResponse {
	hasMore?: boolean
	pageNumber?: number
	pageSize?: number
	totalPages?: number
	totalRecords?: number
	response?: {
		ticketId: string
		projectId?: string
		status?: WorkReportStatus
		date?: string
		workerDetails?: WorkReportDetails[]
		footerDetails?: WorkReportDetailsAggregatedDetails
	}
}

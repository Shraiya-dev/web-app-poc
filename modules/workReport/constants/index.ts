import { theme } from '../../../sdk'
import { WorkReportStatus } from '../types'

export const WorkReportStatusColor: { [key in WorkReportStatus]: string } = {
	PENDING_APPROVAL: theme.palette.warning.main,
	DISPUTED: theme.palette.error.main,
	APPROVED: theme.palette.success.main,
	DRAFT: theme.palette.grey[700],
}
export const WorkReportStatusLabel: { [key in WorkReportStatus]: string } = {
	APPROVED: 'Approved',
	DISPUTED: 'Disputed',
	DRAFT: 'Draft',
	PENDING_APPROVAL: 'Pending Approval',
}
export const StatusFilterOptions: { label: string; value: WorkReportStatus }[] = [
	{ label: WorkReportStatusLabel.PENDING_APPROVAL, value: WorkReportStatus.PENDING_APPROVAL },
	{ label: WorkReportStatusLabel.DISPUTED, value: WorkReportStatus.DISPUTED },
	{ label: WorkReportStatusLabel.APPROVED, value: WorkReportStatus.APPROVED },
	// { label: 'Draft', value: WorkReportStatus.DRAFT },
]

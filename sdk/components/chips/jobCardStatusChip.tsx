import { Chip, ChipProps } from '@mui/material'
import { BOOKING_STATES, JobCardState } from '../../types'
import { BookingStateLabel, JobCardStateLabel } from '../../constants'

interface jobCardChipProps extends ChipProps {
	jobCardState?: JobCardState
}

const chipColor: Partial<
	{
		[key in JobCardState]: string
	}
> = {
	WORKER_APPLIED: 'primary.lightOrange',
	ACCEPTED: 'primary.lightGreen',
	READY_TO_DEPLOY: 'primary.mediumGreen',
	DEPLOYMENT_COMPLETE: 'primary.successGreen',
	COMPLETED: 'primary.main',
	CANCELLED: 'error.main',
}

export const JobCardStatusChip = ({ jobCardState, sx, ...props }: jobCardChipProps) => {
	return jobCardState ? (
		<Chip
			sx={{
				...sx,
				backgroundColor: chipColor[jobCardState],
				color: 'common.white',
			}}
			label={JobCardStateLabel[jobCardState]}
			{...props}
		/>
	) : null
}

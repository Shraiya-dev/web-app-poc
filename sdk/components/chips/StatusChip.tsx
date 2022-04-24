import { Chip, ChipProps } from '@mui/material'
import { BOOKING_STATES } from '../../types'
import { BookingLabel } from '../../constants'

interface StatusChipProps extends ChipProps {
	bookingState: BOOKING_STATES
}

const chipColor: Partial<{
	[key in BOOKING_STATES]: string
}> = {
	RECEIVED: 'secondary.light',
	CONFIRMED: 'secondary.main',
	ALLOCATION_PENDING: 'info.main',
	ALLOCATION_IN_PROGRESS: 'info.main',
	ALLOCATION_CLOSED: 'info.main',
	READY_TO_DEPLOY: 'success.main',
}

export const StatusChip = ({ bookingState, ...props }: StatusChipProps) => {
	return (
		<Chip
			sx={{
				backgroundColor: chipColor[bookingState],
				color: 'common.white',
			}}
			label={BookingLabel[bookingState]}
			{...props}
		/>
	)
}

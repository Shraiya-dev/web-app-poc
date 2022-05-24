import { Chip, ChipProps } from '@mui/material'
import { BOOKING_STATES } from '../../types'
import { BookingStateLabel } from '../../constants'

interface StatusChipProps extends ChipProps {
	bookingState?: BOOKING_STATES
}

const chipColor: Partial<{
	[key in BOOKING_STATES]: string
}> = {
	RECEIVED: 'primary.lightGrey',
	CONFIRMED: 'primary.lightOrange',
	ALLOCATION_PENDING: 'primary.lightGreen',
	ALLOCATION_IN_PROGRESS: 'primary.lightGreen',
	ALLOCATION_CLOSED: 'primary.mediumGreen',
	READY_TO_DEPLOY: 'primary.mediumGreen',
	DEPLOYED: 'primary.successGreen',
	CANCELLED: 'error.main',
}

const chipTextColor: Partial<{
	[key in BOOKING_STATES]: string
}> = {
	RECEIVED: 'secondary.main',
	CONFIRMED: 'secondary.main',
	ALLOCATION_PENDING: 'secondary.main',
	ALLOCATION_IN_PROGRESS: 'secondary.main',
	ALLOCATION_CLOSED: 'secondary.main',
	READY_TO_DEPLOY: 'common.white',
	DEPLOYED: 'common.white',
	CANCELLED: 'common.white',
}

export const StatusChip = ({ bookingState, sx, ...props }: StatusChipProps) => {
	return bookingState ? (
		<Chip
			sx={{
				...sx,
				backgroundColor: chipColor[bookingState],
				color: chipTextColor[bookingState],
			}}
			label={BookingStateLabel[bookingState]}
			{...props}
		/>
	) : null
}

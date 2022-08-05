import { Chip, ChipProps } from '@mui/material'
import { BOOKING_STATES } from '../../types'
import { BookingStateLabel } from '../../constants'

interface StatusChipProps extends ChipProps {
	bookingState?: BOOKING_STATES
}

const chipColor: Partial<
	{
		[key in BOOKING_STATES]: string
	}
> = {
	RECEIVED: 'primary.lightGrey',
	CONFIRMED: 'primary.lightOrange',
	ALLOCATION_PENDING: 'primary.lightGreen',
	ALLOCATION_IN_PROGRESS: 'primary.lightGreen',
	ALLOCATION_CLOSED: 'primary.mediumGreen',
	READY_TO_DEPLOY: 'primary.mediumGreen',
	DEPLOYED: 'primary.successGreen',
	CANCELLED: 'error.main',
}

const chipTextColor: Partial<
	{
		[key in BOOKING_STATES]: string
	}
> = {
	RECEIVED: 'primary.darkGrey',
	CONFIRMED: 'theme.warning.dark',
	ALLOCATION_PENDING: 'theme.success.light',
	ALLOCATION_IN_PROGRESS: 'theme.success.light',
	ALLOCATION_CLOSED: 'theme.success.light',
	READY_TO_DEPLOY: 'theme.success.light',
	DEPLOYED: 'theme.success.light',
	CANCELLED: 'theme.error.dark',
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

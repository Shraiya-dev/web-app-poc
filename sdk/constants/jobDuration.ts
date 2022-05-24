import { BookingDuration } from '../types'

export const BookingDurationLabel: Partial<{
	[key in BookingDuration]: string
}> = {
	LESS_THAN_THIRTY: 'Less than 30 days',
	THIRTY_TO_FORTY_FIVE: '30-45 days',
	FORTY_FIVE_TO_NINETY: '45-90 days',
	NINETY_TO_ONE_FIFTY: '90-150 days',
	MORE_THAN_ONE_FIFTY: '150+ days',
	'less than 7 days': 'less than 7 days',
	'7 days to 45 days': '7 days to 45 days',
	'45 days to 90 days': '45 days to 90 days',
	'more than 90 days': 'more than 90 days',
}

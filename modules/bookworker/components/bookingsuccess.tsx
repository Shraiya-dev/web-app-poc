import { Box, Typography, Button, styled, Icon } from '@mui/material'
import { useRouter } from 'next/router'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function BookingSuccess() {
	const router = useRouter()

	const handleSuccessBooking = () => {
		router.push(`/dashboard`)
	}

	const CustomEmptyBooking = styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		'.info': {
			margin: 10,
		},
		'.cta': {
			marginTop: 10,
		},
		'.info-secondary': {
			margin: 10,
			color: '#6A7991',
		},
	}))
	return (
		<CustomEmptyBooking>
			<Box>
				<Typography>
					<CheckCircleIcon style={{ color: '#33BFA6', fontSize: 80 }} />
				</Typography>
				<Typography variant='h4' className='info'>
					Booking created successfully!
				</Typography>
				<Typography variant='h6' className='info-secondary'>
					Please check your dashboard to view progress
				</Typography>
				<Button className='cta' onClick={handleSuccessBooking}>
					View Your Booking
				</Button>
			</Box>
		</CustomEmptyBooking>
	)
}

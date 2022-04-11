import { Box, Typography, Button, styled } from '@mui/material'
import { useRouter } from 'next/router'

export default function EmptyBooking() {

    const router = useRouter()

	const handleEmptyBooking = () => {
		router.push(`/book-worker`)
	}

	const CustomEmptyBooking = styled(Box)(({ theme }) => ({
		justifyContent: 'center',
		textAlign: 'center',
		margin: 200,
		'.info': {
			margin: 10,
		},
		'.cta': {
			marginTop: 30,
		},
		'.info-secondary': {
			margin: 10,
			color: '#6A7991',
		},
	}))
	return (
		<CustomEmptyBooking>
			<Box>
				<Typography variant='h4' className='info'>
					You don’t have any bookings
				</Typography>
				<Typography variant='h6' className='info-secondary'>
					Press on Book worker to create bookings
				</Typography>
				<Button className='cta' onClick={handleEmptyBooking}>Book Workers</Button>
			</Box>
		</CustomEmptyBooking>
	)
}

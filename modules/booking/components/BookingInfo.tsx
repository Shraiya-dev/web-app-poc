import * as React from 'react'
import { Box, Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import styled from '@emotion/styled'

export default function BookingInfo() {
	const CustomizedBookingInfo = styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'center',
		'.booking': {
			float: 'left',
			width: 72,
			height: 72,
			background: 'grey',
			margin: 8,
			backgroundColor: '#244CB3',
			opacity: '0.05',
			borderRadius: '4px',
		},

		'.text-info': {
			fontSize: 18,
			paddingTop: 8,
		},
		'.booking-info': {
			height: 38,
			fontSize: 30,
		},
	}))

	return (
		<CustomizedBookingInfo>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					'& > :not(style)': {
						m: 2,
						width: 337,
						height: 90,
					},
				}}>
				<Paper elevation={3}>
					<Box className='booking' style={{ backgroundColor: '#244CB3' }}>
						A
					</Box>
					<Box style={{ margin: 8 }}>
						<Stack className='booking-info' style={{ color: '#244CB3' }}>
							20
						</Stack>
						<Stack className='text-info'>Total Bookings</Stack>
					</Box>
				</Paper>
				<Paper elevation={3}>
					<Box className='booking' style={{ backgroundColor: '#FF7400' }}>
						A
					</Box>
					<Box style={{ margin: 8 }}>
						<Stack className='booking-info' style={{ color: '#FF7400' }}>
							20
						</Stack>
						<Stack className='text-info'>In Progress Bookings</Stack>
					</Box>
				</Paper>
				<Paper elevation={3}>
					<Box className='booking' style={{ backgroundColor: '#30B12E' }}>
						A
					</Box>
					<Box style={{ margin: 8 }}>
						<Stack className='booking-info' style={{ color: '#244CB3' }}>
							20
						</Stack>
						<Stack className='text-info'>Heros Hired</Stack>
					</Box>
				</Paper>
			</Box>
		</CustomizedBookingInfo>
	)
}

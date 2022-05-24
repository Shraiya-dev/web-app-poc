import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Button, Grid, Typography, Box, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function BookingCards() {
	// ToDO: Need to move to right hooks
	const router = useRouter()

	const handleViewDetails = (id: any) => {
		router.push(`/worker-details`)
	}

	const CustomiBookingCards = styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'center',
		'.cta': {
			backgroundColor: 'transparent',
			boxShadow: 'none',
			color: 'black',
			verticalAlign: 'middle',
			marginLeft: 20,
		},
		'.top-box': {
			background: 'rgba(36, 76, 179, 0.15)',
			height: 110,
			padding: 16,
		},
		'.worker-type': {
			fontSize: 14,
			marginTop: 10,
		},
		'.id': {
			fontSize: 12,
			fontWeight: 'lighter',
			marginTop: 10,
		},
		'.bottom-box': {
			float: 'right',
			color: '#244CB3',

			height: '100%',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontSize: 14,
			paddingTop: 30,
		},
		'.bottom-dimension': {
			height: 136,
			padding: 16,
		},
		'.text-info': {
			display: 'inline',
			padding: 10,
			verticalAlign: 'middle',
			fontSize: 12,
		},
		'.icons': {
			fontSize: 12,
			color: '#CC2C49',
			verticalAlign: 'middle',
		},
	}))

	const items = [
		{ name: 'Fish', value: '1' },
		{ name: 'Insects', value: '2' },
		{ name: 'SeaCreatures', value: '3' },
		{ name: 'Fish', value: '1' },
		{ name: 'Insects', value: '2' },
		{ name: 'SeaCreatures', value: '3' },
	]

	return (
		<CustomiBookingCards>
			<Grid
				container
				rowSpacing={1}
				columns={{ xs: 12, sm: 12, md: 24 }}
				direction='row'
				justifyContent='center'
				alignItems='flex-start'>
				{items?.map((index) => {
					return (
						<Grid item xs={12} sm={12} md={9}>
							<Box>
								<Box
									sx={{
										display: 'flex',
										flexWrap: 'wrap',
										'& > :not(style)': {
											m: 2,
											width: 527,
										},
									}}>
									<Paper elevation={1}>
										<Box className='top-box'>
											<Box style={{ float: 'left' }}>
												<Typography variant='h5'>Bar Bender (10)</Typography>
												<Typography className='worker-type'>
													Helper (5) Technician (5)
												</Typography>
												<Typography className='id'> ID: OADSKTUQSIQC</Typography>
											</Box>
											<Box className='bottom-box'>
												<Stack
													display={'inline'}
													style={{ cursor: 'pointer' }}
													onClick={(id: any) => handleViewDetails(id)}>
													View Details{' '}
													<ArrowRightAltIcon style={{ verticalAlign: 'middle' }} />
												</Stack>
											</Box>
										</Box>

										<Box className='bottom-dimension'>
											<Box>
												<Typography className='text-info' textTransform='capitalize'>
													<LocationOnIcon className='icons' /> Nagpur, Maharashtra
												</Typography>
												<Typography className='text-info'>
													<CalendarTodayIcon className='icons' /> 2nd March Onwards
												</Typography>
												<Typography className='text-info'>
													<AccessTimeIcon className='icons' /> More than 90 Days
												</Typography>
											</Box>
											<Box style={{ display: 'flex', margin: 16 }}>
												<Box style={{ marginRight: 30 }}>
													<Typography style={{ fontSize: 16 }}>Accepted</Typography>
													<Typography style={{ fontSize: 24, color: '#244CB3' }}>
														9
													</Typography>
												</Box>
												<Box style={{ marginRight: 30 }}>
													<Typography style={{ fontSize: 16 }}>Ready to Deploy</Typography>
													<Typography style={{ fontSize: 24, color: '#244CB3' }}>
														9
													</Typography>
												</Box>
												<Box>
													<Typography style={{ fontSize: 16 }}>Deployed</Typography>
													<Typography style={{ fontSize: 24, color: '#244CB3' }}>
														9
													</Typography>
												</Box>
											</Box>
										</Box>
									</Paper>
								</Box>
							</Box>
						</Grid>
					)
				})}
			</Grid>
		</CustomiBookingCards>
	)
}

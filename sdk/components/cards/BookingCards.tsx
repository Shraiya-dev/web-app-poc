import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Button, Grid, Typography, Box, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

export default function BookingCards() {
	const router = useRouter()

	const handleViewDetails = (id:any) => {
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
	}))
	return (
		<CustomiBookingCards>
			<Box>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						'& > :not(style)': {
							m: 2,
							width: 1080,
						},
					}}>
					<Paper elevation={3}>
						<Box>
							<Box
								style={{
									background: 'rgba(36, 76, 179, 0.15)',
									height: 94,
									padding: 30,
								}}>
								<Grid container spacing={4}>
									<Grid item>
										<Stack>
											<Typography>Bar Bender (10)</Typography>
										</Stack>
										<Stack>{`Helper (5)  Technitian (5) `}</Stack>
									</Grid>
									<Grid item>Grid2</Grid>
									<Grid item>Grid3</Grid>
									<Grid item>Grid4</Grid>
									<Grid item>
										<Button className='cta' onClick={(id) => handleViewDetails(id)}>
											View Details
										</Button>
									</Grid>
								</Grid>
							</Box>
							<Stack style={{ height: 142 }}>B</Stack>
						</Box>
					</Paper>
				</Box>
			</Box>
		</CustomiBookingCards>
	)
}

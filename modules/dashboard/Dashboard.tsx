import { FilterAlt, Search } from '@mui/icons-material'
import { Box, Button, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import award from '../../public/assets/icons/award.svg'
import calender from '../../public/assets/icons/calender.svg'
import watch from '../../public/assets/icons/watch.svg'
import { BookingCard, StatisticsCard } from '../../sdk'
import { useDashboard } from './hooks'
const boxData = [
	{
		src: calender,
		value: 0,
		bgColor: '#244CB30D',
		color: '#244CB3',
		text: 'Total Bookings',
	},
	{
		src: watch,
		value: 0,
		bgColor: '#FF74000D',
		color: '#FF7400',
		text: 'In Progress Bookings',
	},
	{
		src: award,
		value: 0,
		bgColor: '#30B12E0D',
		color: '#30B12E',
		text: 'Heros Hired',
	},
]

const CustomizeDashboard = styled(Box)(({ theme }) => ({
	'.bookingTyppo': {
		fontSize: '24px',
		fontWeight: 800,
	},
	[theme.breakpoints.down('md')]: {
		'.bookingTyppo': {
			fontSize: '16px',
			fontWeight: 400,
		},
	},
}))

export const Dashboard = () => {
	const { bookings } = useDashboard()
	return (
		<CustomizeDashboard>
			<Grid container spacing={2} alignItems={'stretch'}>
				{boxData.map((stat, index) => {
					return (
						<Grid item xs={6} sm={6} md={4} key={index}>
							<StatisticsCard stat={stat} />
						</Grid>
					)
				})}
			</Grid>
			<Grid mt={6} container>
				<Grid item xs={12} md={8} justifyContent='space-between' alignItems='center'>
					<Typography className='bookingTyppo' variant='h4'>
						Your Bookings
					</Typography>

					<Button className='filter' color='inherit' endIcon={<FilterAlt />} variant='text'>
						Filter
					</Button>
				</Grid>
				<Grid item xs={12} md={4} alignItems='center'>
					<TextField
						fullWidth
						placeholder='Search'
						size='small'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<Search color='inherit' />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
			</Grid>
			{/* <TextField
				fullWidth
				placeholder='Search'
				size='small'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<Search color='inherit' />
						</InputAdornment>
					),
				}}
			/> */}
			<Stack mt={6}>
				{bookings.length === 0 ? (
					<Stack flex={1} mt={20} direction={'column'} spacing={4} alignItems='center'>
						<Typography variant='h3'>You don&apos;t have any bookings</Typography>
						<Typography variant='h5' color={'GrayText'}>
							Press on Book worker to create bookings
						</Typography>
						<Button>Book Workers</Button>
					</Stack>
				) : (
					<Grid container spacing={3}>
						{bookings.map((booking, index) => {
							return (
								<Grid item xs={12} md={6} key={index}>
									<BookingCard booking={booking} />
								</Grid>
							)
						})}
					</Grid>
				)}
			</Stack>
		</CustomizeDashboard>
	)
}

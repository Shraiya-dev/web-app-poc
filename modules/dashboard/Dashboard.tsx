import { FilterAlt, Search } from '@mui/icons-material'
import { Button, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import award from '../../public/assets/icons/award.svg'
import calender from '../../public/assets/icons/calender.svg'
import watch from '../../public/assets/icons/watch.svg'
import { BookingCard, StatisticsCard } from '../../sdk'
import { FilterDrawer } from './components'
import { useDashboard } from './hooks'

export const Dashboard = () => {
	const { bookings, bookingStats } = useDashboard()
	const [openFilterDrawer, setFilterDrawer] = useState(false)
	const handelDrawerToggle = useCallback(() => {
		setFilterDrawer((prev) => !prev)
	}, [setFilterDrawer])

	return (
		<Stack>
			<Grid container spacing={2} alignItems={'stretch'}>
				<Grid item xs={6} sm={6} md={4}>
					<StatisticsCard
						label='Total Bookings'
						color='primary.main'
						count={bookingStats.bookingsCount}
						icon={calender}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={4}>
					<StatisticsCard
						label='In Progress Bookings'
						color='warning.main'
						count={bookingStats.progressBookingsCount}
						icon={watch}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={4}>
					<StatisticsCard
						label='Heros Hired'
						color='success.main'
						count={bookingStats.heroesHired}
						icon={award}
					/>
				</Grid>
			</Grid>
			<Grid mt={6} container>
				<Grid item xs={12} md={8} justifyContent='space-between' alignItems='center'>
					<Typography variant='h4'>Your Bookings</Typography>

					<Button onClick={handelDrawerToggle} color='inherit' endIcon={<FilterAlt />} variant='text'>
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
			<FilterDrawer open={openFilterDrawer} onClose={handelDrawerToggle} />
		</Stack>
	)
}

import { FilterAlt } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import {
	Badge,
	Box,
	Button,
	CircularProgress,
	Dialog,
	Grid,
	IconButton,
	Pagination,
	Stack,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import award from '../../public/assets/icons/award.svg'
import calender from '../../public/assets/icons/calender.svg'
import watch from '../../public/assets/icons/watch.svg'
import { BookingCard, SearchField, StatisticsCard } from '../../sdk'
import { CreateBooking } from '../bookworker/components/createBooking'
import { useBooking } from '../bookworker/hooks/useBooking'
import { FilterDrawer } from './components'
import { useDashboard } from './hooks'

export const Dashboard = () => {
	const { bookings, bookingStats, isLoading } = useDashboard()
	const router = useRouter()
	const [openFilterDrawer, setFilterDrawer] = useState(false)
	const {
		bookingFormOpen,
		setBookingFormOpen,
		onCloseDialog,
		setOncloseDialog,
		toggleBookingForm,
		handleBookingForm,
	} = useBooking()

	const handelDrawerToggle = useCallback(() => {
		setFilterDrawer((prev) => !prev)
	}, [setFilterDrawer])
	return (
		<Stack>
			<Dialog onClose={toggleBookingForm} open={bookingFormOpen} fullScreen>
				<CreateBooking
					toggleBookingForm={toggleBookingForm}
					onCloseDialog={onCloseDialog}
					setOncloseDialog={setOncloseDialog}
					bookingFormOpen={bookingFormOpen}
					setBookingFormOpen={setBookingFormOpen}
				/>
			</Dialog>
			<Grid mt={1} container spacing={2} alignItems={'stretch'}>
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
				<Grid item xs={12} md={9} justifyContent='space-between' alignItems='center'>
					<Typography variant='h4'>Your Bookings</Typography>

					<Button
						onClick={handelDrawerToggle}
						color='inherit'
						disabled={bookingStats.bookingsCount <= 0}
						endIcon={
							<Badge
								overlap='circular'
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={
									router.query.status && (
										//simple svg to show dot on filter text
										<svg height='10' width='10'>
											<circle cx='5' cy='5' r='5' fill='red' />
										</svg>
									)
								}>
								<FilterAlt />
							</Badge>
						}
						variant='text'>
						Filter
					</Button>
				</Grid>
				<Grid item xs={12} md={3} alignItems='center'>
					<SearchField name='bookingId' fullWidth placeholder='Search by booking ID' size='small' />
				<Grid item xs={12} md={4} alignItems='center'>
					<SearchField name='bookingId' fullWidth placeholder='Search by Booking ID' size='small' />
				</Grid>
			</Grid>

			{isLoading ? (
				<Stack p={5} alignItems='center'>
					<CircularProgress size={50} />
				</Stack>
			) : (
				<Stack mt={4}>
					{bookings.bookings.length === 0 ? (
						<Stack flex={1} mt={20} direction={'column'} spacing={4} alignItems='center'>
							<Typography variant='h4'>No booking. Create a booking to hire workers.</Typography>
							</Typography>
							<Button onClick={handleBookingForm}>Book Workers</Button>
						</Stack>
					) : (
						<Grid container spacing={3}>
							{bookings.bookings.map((booking, index) => {
								return (
									<Grid item xs={12} md={6} key={index}>
										<BookingCard booking={booking} />
									</Grid>
								)
							})}
						</Grid>
					)}
					{bookings.bookings.length > 0 && (
						<Stack p={4} alignItems='center'>
							<Pagination
								color='primary'
								page={Number(router.query.pageNumber ?? 0) + 1}
								onChange={(e, page) => {
									router.query.pageNumber = page - 1 + ''
									router.push(router)
								}}
								count={Math.ceil(bookings.totalBookings / 10)}
							/>
						</Stack>
					)}
				</Stack>
			)}
			<FilterDrawer open={openFilterDrawer} onClose={handelDrawerToggle} />
		</Stack>
	)
}

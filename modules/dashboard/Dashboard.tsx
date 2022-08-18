import { Badge, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { BookingCard, primary, SearchField, theme, useMobile } from '../../sdk'
import { FilterDrawer } from './components'
import { useDashboard } from './hooks'
import TuneIcon from '@mui/icons-material/Tune'
import { ButtonClicked } from '../../sdk/analytics/analyticsWrapper'

export const Dashboard = () => {
	const { bookings, bookingStats, isLoading } = useDashboard()
	const router = useRouter()
	const [openFilterDrawer, setFilterDrawer] = useState(false)
	const isMobile = useMobile()
	const handelDrawerToggle = useCallback(() => {
		setFilterDrawer((prev) => !prev)
	}, [setFilterDrawer])

	return (
		<Stack>
			{/* <Grid mt={1} container spacing={2} alignItems={'stretch'}>
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
			</Grid> */}

			{/* <Typography variant='h4'>Your Bookings</Typography> */}

			<Stack
				direction={isMobile ? 'column' : 'row'}
				justifyContent='space-between'
				alignItems={isMobile ? 'stretch' : 'center'}
				spacing={1}>
				<Stack direction='row' justifyContent='space-between'>
					{/* <Button
						onClick={handelDrawerToggle}
						//color='inherit'
						//disabled={bookings.totalBookings <= 0}
						endIcon={
							<Badge
								overlap='circular'
								anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
								badgeContent={
									(router.query.status || router.query.jobType || router.query.sortBy) && (
										//simple svg to show dot on filter text
										<svg height='30' width='16'>
											<circle cx='8' cy='8' r='8' fill={theme.palette.error.main} />
										</svg>
									)
								}>
								<TuneIcon
								//sx={{ color: router.query.status || router.query.jobType ? primary.main : '' }}
								/>
							</Badge>
						}
						variant='outlined'
						sx={{
							borderRadius: 2,
							padding: 1,
							marginLeft: 0,
							border: `1px solid ${
								router.query.status || router.query.jobType || router.query.sortBy
									? primary.main
									: 'rgba(6, 31, 72, 0.3)'
							}`,

							color:
								router.query.status || router.query.jobType || router.query.sortBy
									? primary.main
									: theme.palette.secondary.main,
						}}>
						{`Filters & Sort`}
					</Button> */}
					{isMobile && (
						<Link href={`/projects/${router?.query?.projectId}/bookings/create`} passHref>
							<a>
								<Button
									variant='contained'
									onClick={() => {
										ButtonClicked({
											action: 'Book Workers',
											page: 'Project',
											projectId: router?.query?.projectId,
											url: router.asPath,
										})
									}}>
									Book Workers
								</Button>
							</a>
						</Link>
					)}
				</Stack>
				<Stack direction='row' alignItems='center' spacing={2}>
					<SearchField name='bookingId' fullWidth placeholder='Search by booking ID' size='small' />
					{!isMobile && (
						<Link href={`/projects/${router?.query?.projectId}/bookings/create`} passHref>
							<a>
								<Button
									variant='contained'
									onClick={() => {
										ButtonClicked({
											action: 'Book Workers',
											page: 'Project',
											projectId: router?.query?.projectId,
											url: router.asPath,
										})
									}}>
									Book Workers
								</Button>
							</a>
						</Link>
					)}
				</Stack>
			</Stack>
			{isLoading ? (
				<Stack p={5} alignItems='center'>
					<CircularProgress size={50} />
				</Stack>
			) : (
				<Stack mt={4}>
					{bookings.totalBookings === 0 ? (
						<Stack flex={1} mt={20} direction={'column'} spacing={4} alignItems='center'>
							<Typography variant='h4' color={theme.palette.primary.main}>
								No booking. Create a booking to hire workers.
							</Typography>
							{/* <Button onClick={handleBookingForm}>Book Workers</Button> */}
							<Link href={`/projects/${router?.query?.projectId}/bookings/create`} passHref>
								<a>
									<Button variant='contained'>Book Workers</Button>
								</a>
							</Link>
						</Stack>
					) : (
						<Grid container spacing={3}>
							{bookings.bookings.map((bookingInfo, index) => {
								return (
									<Grid item xs={12} sm={6} lg={4} key={index}>
										<BookingCard booking={bookingInfo} />
									</Grid>
								)
							})}
						</Grid>
					)}
					{/* TODO: Look into pagination */}
					{/* {bookings.totalBookings > 0 && (
						<Stack p={4} alignItems='center'>
							<Pagination
								color='primary'
								page={Number(router.query.pageNumber ?? 0) + 1}
								onChange={(_e, page) => {
									router.query.pageNumber = page - 1 + ''
									router.push(router)
								}}
								count={Math.ceil(bookings.totalBookings / 10)}
							/>
						</Stack>
					)} */}
				</Stack>
			)}
			<FilterDrawer open={openFilterDrawer} onClose={handelDrawerToggle} />
		</Stack>
	)
}

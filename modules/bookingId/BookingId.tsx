import { Box, Button, CircularProgress, LinearProgress, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { JobTypeLabel, primary, StatusChip, theme, useMobile } from '../../sdk'
import { CustomTopBar } from '../../sdk/components/topBar/customTopBar'
import { useBookingId } from './hooks'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { TabContext, TabPanel } from '@mui/lab'
import WorkerTracking from './components/workerTracking'
import Image from 'next/image'
import { JobTypeIcon } from '../createBooking/utils'
import BookingInfo from './components/bookingInfo'
import { HorizontalTabClicked } from '../../sdk/analytics/analyticsWrapper'
import { useCallback, useEffect, useState } from 'react'

export const BookingId = () => {
	const router = useRouter()
	const isMobile = useMobile()
	const { jobCardsLength, jobCards, bookingSummary, isLoading, handleTabSelection } = useBookingId()

	const helperCount = bookingSummary?.booking?.peopleRequired?.HELPER ?? 0
	const technicianCount = bookingSummary?.booking?.peopleRequired?.TECHNICIAN ?? 0
	const supervisorCount = bookingSummary?.booking?.peopleRequired?.SUPERVISOR ?? 0
	const total = helperCount + technicianCount + supervisorCount

	const [length, setLength] = useState(0)
	const handleRequiredTotal = useCallback(
		(value) => {
			setLength(value)
		},
		[length]
	)

	return (
		<>
			{isLoading ? (
				<Stack p={5} alignItems='center'>
					<CircularProgress size={50} />
				</Stack>
			) : (
				<CustomTopBar>
					<Stack justifyContent={'flex-start'} width={1}>
						<Stack direction={'row'} spacing={4} alignItems={'center'}>
							<Stack direction={'row'} spacing={2}>
								<Typography
									style={{
										fontSize: 26,
										fontWeight: 700,
										color: theme.palette.secondary.main,
										paddingRight: 8,
									}}
								>
									<ArrowBackIosNewIcon
										onClick={() => router.push(`/projects/${router.query.projectId}/bookings`)}
										sx={{
											verticalAlign: 'middle',
											color: '#fff',
											fontSize: 24,
											cursor: 'pointer',
										}}
									/>
								</Typography>

								<Image
									src={JobTypeIcon[bookingSummary?.booking?.jobType || 'GYPSUM']}
									width={24}
									height={24}
									style={{ verticalAlign: 'middle' }}
								/>
								<Stack direction={'column'}>
									<Typography
										variant='h5'
										fontWeight={700}
										sx={{ verticalAlign: 'middle', margin: 1 }}
									>
										{length ?? 0} / {total}{' '}
										{JobTypeLabel[bookingSummary?.booking?.jobType || 'GYPSUM']}
									</Typography>

									<LinearProgress
										color='error'
										variant='determinate'
										value={(length * 100) / total}
										sx={{
											height: '8px',
											borderRadius: '10px',
											background: '#EBEBEB',
										}}
									/>
								</Stack>
							</Stack>

							{!isMobile && (
								<Button sx={{ fontSize: '14px', fontWeight: 800 }}>+ Get More Application</Button>
							)}

							{/* <StatusChip
								bookingState={bookingSummary?.booking?.status}
								sx={{ verticalAlign: 'middle', marginTop: 1, marginLeft: 3 }}
							/> */}
						</Stack>

						{/* <Typography
							sx={{
								fontSize: 14,
								color: theme.palette.secondary.main,
								paddingLeft: 8,
							}}
						>
							ID:&nbsp;{bookingSummary?.booking?.bookingId}
						</Typography> */}
					</Stack>
				</CustomTopBar>
			)}

			<TabContext value={router.query.tab as string}>
				{isMobile && (
					<Box pt={2} pl={2}>
						<Button size='small' sx={{ fontSize: '14px', fontWeight: 800 }}>
							+ Get More Application
						</Button>
					</Box>
				)}
				<Box sx={{ borderBottom: 1, borderColor: 'divider', margin: 3, marginBottom: 0, marginTop: 3 }}>
					<Tabs
						TabIndicatorProps={{
							style: {
								height: '3px',
							},
						}}
						value={router.query.tab as string}
						onChange={handleTabSelection}
					>
						<Tab
							sx={{
								fontSize: '18px',
								textTransform: 'none',
							}}
							value='track-workers'
							label='Track Workers'
							onClick={() => {
								router.push(
									`/bookings/${router?.query?.projectId}/${router?.query?.bookingId}/track-workers`
								)

								HorizontalTabClicked({
									name: 'Track Workers',
									page: 'Booking',
									bookingId: router?.query?.bookingId,
									url: router.asPath,
								})
							}}
						/>
						<Tab
							sx={{
								fontSize: '18px',
								textTransform: 'none',
							}}
							value='details'
							label='Booking Details'
							onClick={() => {
								router.push(`/bookings/${router?.query?.projectId}/${router?.query?.bookingId}/details`)
								HorizontalTabClicked({
									name: 'Booking Details',
									page: 'Booking',
									bookingId: router?.query?.bookingId,
									url: router.asPath,
								})
							}}
						/>
					</Tabs>
				</Box>
				<TabPanel
					value='track-workers'
					style={{
						height: isMobile ? 'calc( 100vh - 320px )' : '',
						overflowY: 'auto',
						position: 'relative',
					}}
				>
					<WorkerTracking handleRequiredTotal={handleRequiredTotal} />
					{/* <Dashboard /> */}
				</TabPanel>
				<TabPanel
					value='details'
					style={{
						height: isMobile ? 'calc( 100vh - 320px )' : '',
						overflowY: 'auto',
						position: 'relative',
					}}
				>
					{bookingSummary ? <BookingInfo bookingInfo={bookingSummary} loading={isLoading} /> : ''}
				</TabPanel>
			</TabContext>

			{/* <Grid container spacing={2} alignItems='flex-start'>
				<Grid item xs={12}>
					<Button startIcon={<ArrowBack />} onClick={() => router.back()} variant='text' color='primary'>
						Go Back
					</Button>
				</Grid>
				<Grid item xs={12} md={4}>
					{bookingSummary && <BookingCard booking={bookingSummary} />}
				</Grid>
				<Grid container item xs={12} md={8} spacing={2}>
					<Grid item xs={12}>
						<Stack direction='row' justifyContent='space-between'>
							<Stack direction='row' spacing={2}>
								<Typography variant='h5'>
									{JobCardStateLabel[router.query.jobCardState as JobCardState]}
								</Typography>
								<Select
									onChange={handelSkillFilter}
									value={router.query.skillType ?? 'none'}
									variant='standard'>
									{getSelectOptionsFromObject({
										none: 'All Skills',
										HELPER: 'Helper',
										TECHNICIAN: 'Technician',
										SUPERVISOR: 'Supervisor',
									})}
								</Select>
							</Stack>
						</Stack>
					</Grid>
					{isLoading ? (
						<Grid xs={12}>
							<Stack flex={1} alignItems={'center'} p={10}>
								<CircularProgress size={50} />
							</Stack>
						</Grid>
					) : jobCards.length === 0 ? (
						<Grid xs={12}>
							<Stack flex={1} alignItems={'center'} py={25}>
								<Typography variant='h4' color='secondary.light'>
									No Workers.
								</Typography>
							</Stack>
						</Grid>
					) : (
						jobCards.map((jobCard) => (
							<Grid item key={jobCard.workerId} xs={12} md={6}>
								<JobCardCard jobCard={jobCard} />
							</Grid>
						))
					)}
				</Grid>
			</Grid> */}
		</>
	)
}

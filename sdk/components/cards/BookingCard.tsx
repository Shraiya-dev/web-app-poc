import { AccessTime, ArrowRightAlt, CalendarToday, LocationOn } from '@mui/icons-material'
import { Button, Paper, Stack, Typography, alpha, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { JobCardStateLabel, JobTypeLabel } from '../../constants'
import { BookingPreview, BOOKING_STATES, JobCardState } from '../../types'
import { capitalize } from '../../utils'
import { StatusChip } from '../chips'

interface BookingCardProps {
	booking: BookingPreview
}

const CustomPaper = styled(Paper)(({ theme }) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	overflow: 'hidden',
	'.cardHeader': {
		flex: 1,
		padding: theme.spacing(2.5),
		backgroundColor: theme.palette.primary.light,
	},
	'.cardBody': {
		flex: 1,
		flexDirection: 'column',
		padding: theme.spacing(2.5),
		a: {
			display: 'flex',
			padding: `0 ${theme.spacing(1)}`,
			margin: `${theme.spacing(0.5)}`,
			cursor: 'pointer',
			borderRadius: 4,
			border: 'none',
			flexDirection: 'column',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
			'&:hover': {
				backgroundColor: alpha(theme.palette.primary.main, 0.05),
				border: 1,
				borderColor: theme.palette.primary.main,
				color: theme.palette.primary.main,
			},
			'&.selected': {
				backgroundColor: alpha(theme.palette.primary.main, 0.05),
				border: `1px solid`,
				borderColor: theme.palette.primary.main,
				color: theme.palette.primary.main,
			},
		},
	},
}))
export const BookingCard = ({ booking }: BookingCardProps) => {
	const router = useRouter()
	const { totalCount, supervisorCount, technicianCount, helperCount } = useMemo(() => {
		const { SUPERVISOR = 0, HELPER = 0, TECHNICIAN = 0 } = booking.peopleRequired
		const total = HELPER + SUPERVISOR + TECHNICIAN
		return { totalCount: total, helperCount: HELPER, technicianCount: TECHNICIAN, supervisorCount: SUPERVISOR }
	}, [booking])

	return (
		<CustomPaper elevation={5}>
			<Stack className='cardHeader'>
				<Stack direction='row' justifyContent='space-between' flexWrap='wrap'>
					<Typography variant='h5' fontWeight={700}>
						{JobTypeLabel[booking.jobType]} ({totalCount})
					</Typography>
					<StatusChip bookingState={booking.status} />
				</Stack>
				<Stack alignItems='center' direction='row' spacing={2}>
					<Typography variant='caption'>ID: {booking.bookingId}</Typography>
					<Typography variant='caption'>
						Created On: {booking.createdAt && format(booking.createdAt, 'dd/MM/yy')}
					</Typography>
				</Stack>
				<Stack direction='row' flexWrap='wrap' mt={2}>
					{helperCount !== 0 && <Typography mr={1}>Helper ({helperCount})</Typography>}
					{technicianCount !== 0 && <Typography mr={1}>Technician ({technicianCount})</Typography>}
					{supervisorCount !== 0 && <Typography>Supervisor ({supervisorCount})</Typography>}
				</Stack>
				<Stack direction='row' flexWrap='wrap' mt={1}>
					<Typography mr={1} className='vAlignCenter' variant='body2'>
						<LocationOn fontSize='inherit' color='error' />
						&nbsp;{capitalize(booking.city)}, {capitalize(booking.state)}
					</Typography>
					<Typography mr={1} className='vAlignCenter' variant='body2'>
						<CalendarToday fontSize='inherit' color='error' />
						&nbsp;{format(booking.schedule.startDate, 'do MMMM')} Onwards
					</Typography>
					<Typography className='vAlignCenter' variant='body2'>
						<AccessTime fontSize='inherit' color='error' />
						&nbsp;{capitalize(booking.schedule.bookingDuration)}
					</Typography>
				</Stack>
			</Stack>
			<Stack className='cardBody'>
				<Typography color='secondary.main'>WORKER ALLOCATION</Typography>
				<Grid container xs={12}>
					<Grid item xs={12} md={router.query.bookingId ? 12 : 8}>
						<Stack flex={1} direction='row'>
							<Link
								href={`/dashboard/bookings/${booking.bookingId}/WORKER_APPLIED`}
								passHref
								replace={!!router.query.bookingId}>
								<Typography
									component='a'
									className={
										router.query.jobCardState === JobCardState.WORKER_APPLIED ? 'selected' : ''
									}>
									<Typography variant='h5'>{booking.jobCardDetails?.ACCEPTED}</Typography>
									<Typography variant='body1' align='left'>
										Applied
									</Typography>
								</Typography>
							</Link>
							<Link
								href={`/dashboard/bookings/${booking.bookingId}/${JobCardState.READY_TO_DEPLOY}`}
								passHref
								replace={!!router.query.bookingId}>
								<Typography
									component='a'
									className={
										router.query.jobCardState === JobCardState.READY_TO_DEPLOY ? 'selected' : ''
									}>
									<Typography variant='h5'>{booking.jobCardDetails?.READY_TO_DEPLOY}</Typography>
									<Typography variant='body1' align='left'>
										Ready to Deploy
									</Typography>
								</Typography>
							</Link>
							<Link
								href={`/dashboard/bookings/${booking.bookingId}/${JobCardState.DEPLOYMENT_COMPLETE}`}
								passHref
								replace={!!router.query.bookingId}>
								<Typography
									component='a'
									className={
										router.query.jobCardState === JobCardState.DEPLOYMENT_COMPLETE ? 'selected' : ''
									}>
									<Typography variant='h5'>{booking.jobCardDetails?.DEPLOYMENT_COMPLETE}</Typography>
									<Typography variant='body1' align='left'>
										Deployed
									</Typography>
								</Typography>
							</Link>
						</Stack>
					</Grid>
					{!router.query.bookingId && (
						<Grid item xs={12} md={4} pt={2} alignItems='flex-end' justifyContent='flex-end'>
							<Link href={`/dashboard/bookings/${booking.bookingId}/WORKER_APPLIED`} passHref>
								<Typography
									lineHeight={0.5}
									fontWeight='bold'
									className='vAlignCenter'
									variant='body1'
									component='a'
									color={'primary.main'}>
									<>View Booking</>
								</Typography>
							</Link>
						</Grid>
					)}
				</Grid>
			</Stack>
		</CustomPaper>
	)
}

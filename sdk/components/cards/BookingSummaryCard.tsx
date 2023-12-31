import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material'
import { alpha, Button, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { JobTypeLabel } from '../../constants'
import { BookingDetailsPreview, JobCardState } from '../../types'
import { StatusChip } from '../chips'

interface BookingSummaryCardProps {
	booking: BookingDetailsPreview
}

const CustomPaper = styled(Paper)(({ theme }) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	overflow: 'hidden',
	paddingBottom: theme.spacing(4),
	'.cardHeader': {
		flex: 1,
		padding: theme.spacing(2),
		backgroundColor: theme.palette.primary.light,
	},
	'.cardBody': {
		flex: 1,
		flexDirection: 'column',
		padding: theme.spacing(2),
		button: {
			borderRadius: 4,
			borderColor: theme.palette.grey[300],
			color: theme.palette.common.black,
			justifyContent: 'space-between',
			margin: `${theme.spacing(1)} 0`,
			'&.selected': {
				backgroundColor: alpha(theme.palette.primary.main, 0.05),
				borderColor: theme.palette.primary.main,
				color: theme.palette.primary.main,
			},
		},
		[theme.breakpoints.down('md')]: {
			flex: 1,
			flexDirection: 'row',
			button: {
				flex: 1,
				padding: theme.spacing(1),
				margin: `0 ${theme.spacing(1)}`,
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'space-between',
			},
		},
	},
}))
export const BookingSummaryCard = ({ booking }: BookingSummaryCardProps) => {
	const router = useRouter()
	const { totalCount, supervisorCount, technicianCount, helperCount } = useMemo(() => {
		const { SUPERVISOR = 0, HELPER = 0, TECHNICIAN = 0 } = booking.peopleRequired
		const total = HELPER + SUPERVISOR + TECHNICIAN
		return { totalCount: total, helperCount: HELPER, technicianCount: TECHNICIAN, supervisorCount: SUPERVISOR }
	}, [booking])
	const handelTabChange = useCallback(
		(newState) => {
			router.query.jobCardState = newState
			router.replace(router)
		},
		[router]
	)

	return (
		<CustomPaper elevation={1}>
			<Stack className='cardHeader'>
				<Typography variant='h5' fontWeight={700}>
					{JobTypeLabel[booking.jobType]} ({totalCount})
				</Typography>

				<Stack direction='row' justifyContent='space-between'>
					<Typography variant='body2'>ID: {booking.bookingId}</Typography>
					<StatusChip bookingState={booking.status} />
				</Stack>
				<Typography variant='body2'>
					Created On: {booking.createdAt && format(booking.createdAt, 'dd/MM/yy')}
				</Typography>
				<Stack direction='row' flexWrap='wrap'>
					{helperCount !== 0 && <Typography mr={1}>Helper ({helperCount})</Typography>}
					{technicianCount !== 0 && <Typography mr={1}>Technician ({technicianCount})</Typography>}
					{supervisorCount !== 0 && <Typography>Supervisor ({supervisorCount})</Typography>}
				</Stack>
				<Stack direction='row' flexWrap='wrap' mt={2}>
					<Typography mr={1} className='vAlignCenter' variant='body2'>
						<LocationOn fontSize='inherit' color='error' />
						&nbsp;{booking.city}, {booking.state}
					</Typography>
					<Typography mr={1} className='vAlignCenter' variant='body2'>
						<CalendarToday fontSize='inherit' color='error' />
						&nbsp;{format(booking.schedule.startDate, 'do MMMM')} Onwards
					</Typography>
					<Typography className='vAlignCenter' variant='body2'>
						<AccessTime fontSize='inherit' color='error' />
						&nbsp;{booking.schedule.bookingDuration}
					</Typography>
				</Stack>
			</Stack>
			<Stack className='cardBody'>
				<Button
					className={router.query.jobCardState === JobCardState.WORKER_APPLIED ? 'selected' : ''}
					variant='outlined'
					onClick={() => {
						handelTabChange(JobCardState.WORKER_APPLIED)
					}}>
					<Typography variant='body1' align='left'>
						Applied
					</Typography>
					<Typography variant='h5'>{booking.jobCardDetails?.ACCEPTED}</Typography>
				</Button>
				<Button
					variant='outlined'
					className={router.query.jobCardState === JobCardState.READY_TO_DEPLOY ? 'selected' : ''}
					onClick={() => {
						handelTabChange(JobCardState.READY_TO_DEPLOY)
					}}>
					<Typography variant='body1' align='left'>
						Ready to Deploy
					</Typography>
					<Typography variant='h5'>{booking.jobCardDetails?.READY_TO_DEPLOY}</Typography>
				</Button>
				<Button
					variant='outlined'
					className={router.query.jobCardState === JobCardState.DEPLOYMENT_COMPLETE ? 'selected' : ''}
					onClick={() => {
						handelTabChange(JobCardState.DEPLOYMENT_COMPLETE)
					}}>
					<Typography variant='body1' align='left'>
						Deployed
					</Typography>
					<Typography variant='h5'>{booking.jobCardDetails?.DEPLOYMENT_COMPLETE}</Typography>
				</Button>
			</Stack>
		</CustomPaper>
	)
}

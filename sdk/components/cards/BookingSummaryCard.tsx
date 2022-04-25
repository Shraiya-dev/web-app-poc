import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material'
import { alpha, Button, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { JobTypeLabel } from '../../constants'
import { BookingPreview } from '../../types'
import { StatusChip } from '../chips'

interface BookingSummaryCardProps {
	booking: BookingPreview
}

const CustomPaper = styled(Paper)(({ theme }) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	overflow: 'hidden',
	'.cardHeader': {
		flex: 1,
		padding: `${theme.spacing(3)} ${theme.spacing(2)} ${theme.spacing(2)}`,
		backgroundColor: theme.palette.primary.light,
	},
	'.cardBody': {
		flex: 1,
		flexDirection: 'column',
		padding: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(3)}`,
		button: {
			borderRadius: 4,
			borderColor: theme.palette.secondary.light,
			color: theme.palette.common.black,
			justifyContent: 'space-between',
			'&.selected': {
				backgroundColor: alpha(theme.palette.primary.main, 0.05),
				borderColor: theme.palette.primary.main,
				color: theme.palette.primary.main,
			},
		},
	},
	'.vAlignCenter': {
		display: 'flex',
		alignItems: 'center',
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
			console.log(newState)

			router.query.status = newState
			router.push(router)
		},
		[router]
	)

	return (
		<CustomPaper>
			<Stack className='cardHeader'>
				<Typography variant='h4' fontWeight={700}>
					{JobTypeLabel[booking.jobType]} ({totalCount})
				</Typography>
				<Stack direction='row' justifyContent='space-between'>
					<Typography variant='body2'>ID: {booking.bookingId}</Typography>
					<StatusChip bookingState={booking.status} />
				</Stack>
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
			<Stack className='cardBody' spacing={2}>
				<Button
					className={router.query.status === 'WORKER_APPLIED' ? 'selected' : ''}
					variant='outlined'
					onClick={() => {
						handelTabChange('WORKER_APPLIED')
					}}>
					<>Applied</> <Typography variant='h5'>40</Typography>
				</Button>
				<Button
					variant='outlined'
					className={router.query.status === 'READY_TO_DEPLOY' ? 'selected' : ''}
					onClick={() => {
						handelTabChange('READY_TO_DEPLOY')
					}}>
					Ready to Deploy
					<Typography variant='h5'>10</Typography>
				</Button>
				<Button
					variant='outlined'
					className={router.query.status === 'DEPLOYED' ? 'selected' : ''}
					onClick={() => {
						handelTabChange('DEPLOYED')
					}}>
					Deployed
					<Typography variant='h5'>4</Typography>
				</Button>
			</Stack>
		</CustomPaper>
	)
}

import { AccessTime, ArrowRightAlt, CalendarToday, LocationOn } from '@mui/icons-material'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { format } from 'date-fns'
import Link from 'next/link'
import { useMemo } from 'react'
import { JobCardStateLabel, JobTypeLabel } from '../../constants'
import { BookingPreview, BOOKING_STATES, JobCardState } from '../../types'
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
		padding: `${theme.spacing(3)} ${theme.spacing(2)} ${theme.spacing(2)}`,
		backgroundColor: theme.palette.primary.light,
	},
	'.cardBody': {
		flex: 1,
		flexDirection: 'column',
		padding: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(3)}`,
	},
	'.vAlignCenter': {
		display: 'flex',
		alignItems: 'center',
	},
}))
export const BookingCard = ({ booking }: BookingCardProps) => {
	const { totalCount, supervisorCount, technicianCount, helperCount } = useMemo(() => {
		const { SUPERVISOR = 0, HELPER = 0, TECHNICIAN = 0 } = booking.peopleRequired
		const total = HELPER + SUPERVISOR + TECHNICIAN
		return { totalCount: total, helperCount: HELPER, technicianCount: TECHNICIAN, supervisorCount: SUPERVISOR }
	}, [booking])

	return (
		<CustomPaper elevation={3}>
			<Stack className='cardHeader'>
				<Stack direction='row' justifyContent='space-between'>
					<Typography variant='h6' fontWeight={700}>
						{JobTypeLabel[booking.jobType]} ({totalCount})
					</Typography>
					<Stack alignItems='center' direction='row' spacing={2}>
						<Typography variant='body2'>ID: {booking.bookingId}</Typography>
						<StatusChip bookingState={booking.status} />
					</Stack>
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
			<Stack className='cardBody'>
				<Typography color='secondary.main'>WORKER ALLOCATION</Typography>
				<Stack direction={'row'} justifyContent='space-between' alignItems='flex-end'>
					<Stack direction={'row'} spacing={3}>
						<Stack>
							<Typography variant='body1' fontWeight={500} lineHeight={2.5} color={'inherit'}>
								{JobCardStateLabel[JobCardState.ACCEPTED]}
							</Typography>
							<Typography variant='h5' fontWeight={700} lineHeight={2} color={'primary'}>
								{booking?.jobCardDetails ? booking?.jobCardDetails[JobCardState.ACCEPTED] : 0}
							</Typography>
						</Stack>
						<Stack>
							<Typography variant='body1' fontWeight={500} lineHeight={2.5} color={'inherit'}>
								{JobCardStateLabel[JobCardState.READY_TO_DEPLOY]}
							</Typography>
							<Typography variant='h5' fontWeight={700} lineHeight={2} color={'primary'}>
								{booking?.jobCardDetails ? booking?.jobCardDetails[JobCardState.READY_TO_DEPLOY] : 0}
							</Typography>
						</Stack>
						<Stack>
							<Typography variant='body1' fontWeight={500} lineHeight={2.5} color={'inherit'}>
								{JobCardStateLabel[JobCardState.DEPLOYMENT_COMPLETE]}
							</Typography>
							<Typography variant='h5' fontWeight={700} lineHeight={2} color={'primary'}>
								{booking?.jobCardDetails
									? booking?.jobCardDetails[JobCardState.DEPLOYMENT_COMPLETE]
									: 0}
							</Typography>
						</Stack>
					</Stack>
					{booking.status === BOOKING_STATES.READY_TO_DEPLOY ? (
						<Stack spacing={1}>
							<Typography className='vAlignCenter' sx={{ alignItems: 'flex-end' }}>
								<CalendarToday fontSize='small' color='error' />
								<Typography variant='button' fontWeight='bold' color='primary.main'>
									&nbsp;&#8377;12000
								</Typography>
								&nbsp;due on {format(new Date(), 'dd/MM/yy')}
							</Typography>
							<Button color='warning' endIcon={<ArrowRightAlt />}>
								Complete Payment
							</Button>
						</Stack>
					) : (
						<Link href={`/dashboard/bookings/${booking.bookingId}/WORKER_APPLIED`} passHref>
							<Typography
								fontWeight='bold'
								className='vAlignCenter'
								variant='body1'
								component='a'
								color={'primary.main'}>
								<>View Details</>
								<ArrowRightAlt fontSize='large' />
							</Typography>
						</Link>
					)}
				</Stack>
			</Stack>
		</CustomPaper>
	)
}

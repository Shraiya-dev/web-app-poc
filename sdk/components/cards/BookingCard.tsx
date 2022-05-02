import { AccessTime, ArrowRightAlt, CalendarToday, LocationOn } from '@mui/icons-material'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { format } from 'date-fns'
import Link from 'next/link'
import { useMemo } from 'react'
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
	},
}))
export const BookingCard = ({ booking }: BookingCardProps) => {
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
				<Stack direction={'row'} justifyContent='space-between' alignItems='flex-end' flexWrap='wrap'>
					<Stack direction={'row'} spacing={3}>
						<Stack>
							<Typography variant='h5' fontWeight={500} lineHeight={2} color={'inherit'}>
								{booking?.jobCardDetails ? booking?.jobCardDetails[JobCardState.ACCEPTED] : 0}
							</Typography>
							<Typography variant='body1' fontWeight={500} lineHeight={0.8} color={'inherit'}>
								{JobCardStateLabel[JobCardState.ACCEPTED]}
							</Typography>
						</Stack>
						<Stack>
							<Typography variant='h5' fontWeight={500} lineHeight={2} color={'inherit'}>
								{booking?.jobCardDetails ? booking?.jobCardDetails[JobCardState.READY_TO_DEPLOY] : 0}
							</Typography>
							<Typography variant='body1' fontWeight={500} lineHeight={0.8} color={'inherit'}>
								{JobCardStateLabel[JobCardState.READY_TO_DEPLOY]}
							</Typography>
						</Stack>
						<Stack>
							<Typography variant='h5' fontWeight={500} lineHeight={2} color={'inherit'}>
								{booking?.jobCardDetails
									? booking?.jobCardDetails[JobCardState.DEPLOYMENT_COMPLETE]
									: 0}
							</Typography>
							<Typography variant='body1' fontWeight={500} lineHeight={0.8} color={'inherit'}>
								{JobCardStateLabel[JobCardState.DEPLOYMENT_COMPLETE]}
							</Typography>
						</Stack>
					</Stack>

					{/* 
					//Payment buttons
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
					) : ( */}
					<Stack flex={1} alignItems='flex-end'>
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
					</Stack>
					{/* )} */}
				</Stack>
			</Stack>
		</CustomPaper>
	)
}

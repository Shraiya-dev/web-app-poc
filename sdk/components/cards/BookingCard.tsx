import { AccessTime, ArrowRightAlt, CalendarToday, LocationOn } from '@mui/icons-material'
import { Paper, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { styled } from '@mui/system'
import Link from 'next/link'
import { useMemo } from 'react'
import { detailsData, JobLabel } from '../../constants'
import { BOOKING_STATES, BookingPreview } from '../../types'
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
						{JobLabel[booking.jobType]} ({totalCount})
					</Typography>
					<Stack alignItems='center' direction='row' spacing={2}>
						<Typography variant='body2'>ID: OADSKTUQSIQC</Typography>
						<StatusChip bookingState={BOOKING_STATES.CONFIRMED} />
					</Stack>
				</Stack>
				<Stack direction='row' flexWrap='wrap'>
					{helperCount !== 0 && <Typography mr={1}>Helper ({helperCount})</Typography>}
					{technicianCount !== 0 && <Typography mr={1}>Technician ({technicianCount})</Typography>}
					{supervisorCount !== 0 && <Typography>Supervisor ({supervisorCount})</Typography>}
				</Stack>
				<Stack direction='row' flexWrap='wrap' mt={2}>
					<Typography mr={1} className='vAlignCenter' variant='body2'>
						<LocationOn fontSize='inherit' sx={{ color: red[600] }} />
						&nbsp;Nagpur, Maharashtra
					</Typography>
					<Typography mr={1} className='vAlignCenter' variant='body2'>
						<CalendarToday fontSize='inherit' sx={{ color: red[600] }} />
						&nbsp;2nd March Onwards
					</Typography>
					<Typography className='vAlignCenter' variant='body2'>
						<AccessTime fontSize='inherit' sx={{ color: red[600] }} />
						&nbsp;More than 90 Days
					</Typography>
				</Stack>
			</Stack>
			<Stack className='cardBody'>
				<Typography color='secondary.main'>
					WORKER ALLOCATION
				</Typography>
				<Stack direction={'row'} justifyContent='space-between' alignItems='flex-end'>
					<Stack direction={'row'} spacing={3}>
						{detailsData.map((value, index) => {
							return (
								<Stack direction={'column'} key={index}>
									<Typography variant='body1' fontWeight={500} lineHeight={2.5} color={'inherit'}>
										{value.label}
									</Typography>
									<Typography variant='h5' fontWeight={700} lineHeight={2} color={'primary'}>
										{value.value}
									</Typography>
								</Stack>
							)
						})}
					</Stack>
					<Link href='' passHref >
						<Typography fontWeight='bold' className='vAlignCenter' variant='body1' component='a' color={'primary.main'}>
							<>View Details</>
							<ArrowRightAlt fontSize='large' />
						</Typography>
					</Link>
				</Stack>
			</Stack>
		</CustomPaper>
	)
}

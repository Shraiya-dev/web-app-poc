import { AccessTime, ArrowRightAlt, CalendarToday, LocationOn } from '@mui/icons-material'
import { Paper, Stack, Typography, Button, Chip, Grid } from '@mui/material'
import { red } from '@mui/material/colors'
import { styled } from '@mui/system'
import Link from 'next/link'
import { detailsData } from '../../../sdk/constants'

interface BookingCardProps {
	booking: any //todo replace with booking interface
}

const CustomPaper = styled(Paper)(({ theme }) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	overflow: 'hidden',
	'.cardHeader': {
		flex: 1,
		justifyContent: 'space-between',
		flexDirection: 'row',
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
export const WorkerBookingInfo = () => {
	return (
		<CustomPaper elevation={3}>
			<Stack className='cardHeader'>
				<Stack flex={1} spacing={1}>
					<Typography variant='h6' fontWeight={600}>
						Bar Bender (10)
					</Typography>
					<Stack direction='row' flexWrap='wrap'>
						<Typography mr={1}>Helper (5)</Typography>
						<Typography mr={1}>Technician (5)</Typography>
						<Typography>Supervisor (5)</Typography>
					</Stack>
					<Typography variant='body2'>
						ID: OADSKTUQSIQC <Chip label='Allocation ongoing' color='primary' style={{ float: 'right' }} />
					</Typography>
				</Stack>
			</Stack>
			<Stack className='cardBody'>
				<Stack direction='row' flexWrap='wrap'>
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
				<Stack mt={2} direction={'column'} spacing={3}>
					{detailsData.map((value, index) => {
						return (
							<Button color='inherit' style={{ borderRadius: 4 }}>
								{value.label}
							</Button>
						)
					})}
				</Stack>
			</Stack>
		</CustomPaper>
	)
}

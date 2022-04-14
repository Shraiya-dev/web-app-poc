import { AccessTime, ArrowRightAlt, CalendarToday, LocationOn } from '@mui/icons-material'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Link from 'next/link'

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
export const BookingCard = ({ booking }: BookingCardProps) => {
	return (
		<CustomPaper elevation={10}>
			<Stack className='cardHeader'>
				<Stack flex={1} spacing={1}>
					<Typography variant='h6' fontWeight={700}>
						Bar Bender (10)
					</Typography>
					<Stack direction='row' spacing={1.5}>
						<Typography>Helper (5)</Typography>
						<Typography>Technician (5)</Typography>
						<Typography>Supervisor (5)</Typography>
					</Stack>
					<Typography variant='body2'>ID: OADSKTUQSIQC</Typography>
				</Stack>
				<Stack alignSelf='center'>
					<Link href=''>
						<Button variant='text' endIcon={<ArrowRightAlt fontSize='inherit' />}>
							View Details
						</Button>
					</Link>
				</Stack>
			</Stack>
			<Stack className='cardBody'>
				<Stack direction='row' spacing={2}>
					<Typography className='vAlignCenter' variant='body2'>
						<LocationOn fontSize='inherit' />
						&nbsp;Nagpur, Maharashtra
					</Typography>
					<Typography className='vAlignCenter' variant='body2'>
						<CalendarToday fontSize='inherit' />
						&nbsp;2nd March Onwards
					</Typography>
					<Typography className='vAlignCenter' variant='body2'>
						<AccessTime fontSize='inherit' />
						&nbsp;More than 90 Days
					</Typography>
				</Stack>
				<Stack>
					
				</Stack>
			</Stack>
		</CustomPaper>
	)
}

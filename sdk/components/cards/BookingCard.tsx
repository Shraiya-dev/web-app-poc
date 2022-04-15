import { AccessTime, ArrowRightAlt, CalendarToday, LocationOn } from '@mui/icons-material'
import { Paper, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { styled } from '@mui/system'
import Link from 'next/link'
import { detailsData } from '../../constants'

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
		<CustomPaper elevation={3}>
			<Stack className='cardHeader'>
				<Stack flex={1} spacing={1}>
					<Typography variant='h6' fontWeight={700}>
						Bar Bender (10)
					</Typography>
					<Stack direction='row' flexWrap='wrap'>
						<Typography mr={1}>Helper (5)</Typography>
						<Typography mr={1}>Technician (5)</Typography>
						<Typography>Supervisor (5)</Typography>
					</Stack>
					<Typography variant='body2'>ID: OADSKTUQSIQC</Typography>
				</Stack>
				<Stack alignItems='center' direction='row'>
					<Link href='' passHref>
						<Typography variant='body1' component='a' color={'primary.main'}>
							<Stack alignItems='center' direction='row'>
								<>View</>
								<ArrowRightAlt fontSize='large' />
							</Stack>
						</Typography>
					</Link>
				</Stack>
			</Stack>
			<Stack className='cardBody'>
				<Stack direction='row' flexWrap='wrap'>
					<Typography mr={1} className='vAlignCenter' variant='body2'>
						<LocationOn fontSize='inherit' sx={{color: red[600]}} />
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
				<Stack mt={2} direction={'row'} spacing={3}>
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
			</Stack>
		</CustomPaper>
	)
}

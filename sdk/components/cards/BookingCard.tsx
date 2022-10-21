import { alpha, Box, Button, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { JobTypeIcon } from '../../../modules/createBooking/utils/helperData'
import { ButtonClicked, CardClicked } from '../../analytics/analyticsWrapper'
import { JobTypeLabel, primary } from '../../constants'
import { useMobile } from '../../hooks'
import { BookingPreview } from '../../types'
import { theme } from '../../../sdk'

interface BookingCardProps {
	booking: BookingPreview
}

const CustomPaper = styled(Paper)(({ theme }) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	overflow: 'hidden',

	'.cardHeader': {
		cursor: 'pointer',
		flex: 1,
		margin: theme.spacing(2),
	},

	'.cardBody': {
		flex: 1,
		flexDirection: 'column',
		padding: theme.spacing(2),
		paddingTop: 0,
		cursor: 'pointer',
		'.links': {
			a: {
				display: 'flex',
				padding: theme.spacing(1),
				cursor: 'pointer',
				borderRadius: 4,
				border: `1px solid transparent`,
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
				marginRight: theme.spacing(0.5),
				'&:hover': {
					backgroundColor: alpha(theme.palette.primary.main, 0.05),
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
	},
	'.cta': {
		borderRadius: 32,
		color: primary.main,
		background: 'rgba(238, 250, 255, 0.6)',
		boxShadow: 'none',
		fontSize: 14,
		fontWeight: 700,
		padding: 8,
		backgroundOpacity: 0.6,
		height: 32,
		'&:hover': {
			background: 'rgba(238, 250, 255, 1)',
			boxShadow: 'none',
		},
	},
}))
export const BookingCard = ({ booking }: BookingCardProps) => {
	const router = useRouter()
	const isMobile = useMobile()
	const {
		totalCount,
		supervisorCount,
		technicianCount,
		helperCount,
		requiredTechnician,
		requiredHelper,
		requiredSupervisor,
		totalRequiredCount,
	} = useMemo(() => {
		//const { SUPERVISOR, HELPER, TECHNICIAN } = booking?.booking?.requirements

		const helperCount = Number(booking?.booking?.peopleRequired?.HELPER ?? 0)
		const technicianCount = Number(booking?.booking?.peopleRequired?.TECHNICIAN ?? 0)
		const supervisorCount = Number(booking?.booking?.peopleRequired?.SUPERVISOR ?? 0)
		const total = helperCount + technicianCount + supervisorCount
		const Technician = Number(booking?.stats?.jobCardCountsBySkill?.TECHNICIAN ?? 0)
		const Helper = Number(booking?.stats?.jobCardCountsBySkill?.HELPER ?? 0)
		const Supervisor = Number(booking?.stats?.jobCardCountsBySkill?.SUPERVISOR ?? 0)
		const requiredTotal = Technician + Helper + Supervisor
		return {
			totalCount: total,
			helperCount: helperCount,
			technicianCount: technicianCount,
			supervisorCount: supervisorCount,
			requiredTechnician: Technician,
			requiredHelper: Helper,
			requiredSupervisor: Supervisor,
			totalRequiredCount: requiredTotal,
		}
	}, [booking])

	const handleClick = () => {
		router.push(`/bookings/${router.query.projectId}/${booking.booking?.bookingId}/track-workers`)
		CardClicked({
			action: 'Open Booking',
			page: 'Project',
			bookingId: booking.booking?.bookingId,
			url: router.asPath,
		})
	}

	return (
		<CustomPaper elevation={1}>
			<Stack
				className='cardHeader'
				pb={2}
				onClick={handleClick}
				//  sx={{ borderBottom: 1, borderColor: 'divider' }}
			>
				<Stack direction='row' justifyContent='space-between'>
					<Box display={'flex'}>
						<Image
							src={JobTypeIcon[booking?.booking?.jobType] || ''}
							width={24}
							height={24}
							style={{ verticalAlign: 'middle' }}
						/>
						<Typography
							variant='h5'
							fontWeight={600}
							fontFamily={'Saira,sans-serif'}
							sx={{ verticalAlign: 'middle', margin: 1, color: primary.properDark }}>
							{JobTypeLabel[booking?.booking?.jobType]} Job Posting
						</Typography>
					</Box>
					{/* <StatusChip bookingState={booking?.booking?.status} sx={{ verticalAlign: 'middle' }} /> */}
				</Stack>

				<Typography
					fontWeight={300}
					variant='subtitle1'
					style={{
						display: 'flex',
						verticalAlign: 'middle',
						fontSize: 12,
						marginLeft: 32,
						color: primary.properDark,
					}}>
					ID: {booking?.booking?.bookingId}
				</Typography>

				{/* <Stack alignItems='center' direction='row' spacing={2}>
					<Typography variant='caption'>ID: {booking.bookingId}</Typography>
					<Typography variant='caption'>
						Created On: {booking.createdAt && format(booking.createdAt, 'dd/MM/yy')}
					</Typography>
				</Stack> */}
				{/* <Stack direction='row' flexWrap='wrap' mt={1} ml={4}>
					{helperCount !== 0 && (
						<Typography mr={1} fontSize={13} color={primary.properDark}>
							{helperCount} Helper
						</Typography>
					)}
					{technicianCount !== 0 && (
						<Typography mr={1} fontSize={13} color={primary.properDark}>
							{technicianCount} Technician
						</Typography>
					)}
					{supervisorCount !== 0 && (
						<Typography fontSize={13} color={primary.properDark}>
							{' '}
							{supervisorCount} Supervisor
						</Typography>
					)}
				</Stack> */}
				<Stack direction='row' flex={1} justifyContent='space-evenly'>
					<Stack justifyContent={'space-between'} alignItems={'center'}>
						<Typography variant='h6' fontWeight={600} fontSize={16} color={primary.properDark}>
							{requiredHelper}
						</Typography>
						<Box>
							<img src='/assets/landing/bookings/Helper.svg' alt='' />
						</Box>
						<Typography variant='body2' color={primary.properDark}>
							Helper
						</Typography>
					</Stack>
					<Stack justifyContent={'space-between'} alignItems={'center'}>
						<Typography variant='h6' fontWeight={600} mr={1} fontSize={16} color={primary.properDark}>
							{requiredTechnician}
						</Typography>
						<Box>
							<img src='/assets/landing/bookings/Technician.svg' alt='' />
						</Box>
						<Typography fontSize={13} color={primary.properDark}>
							Technician
						</Typography>
					</Stack>
					<Stack justifyContent={'space-between'} alignItems={'center'}>
						<Typography mr={1} fontSize={16} variant='h6' fontWeight={600} color={primary.properDark}>
							{requiredSupervisor}
						</Typography>
						<Box>
							<img src='/assets/landing/bookings/Supervisor.svg' alt='' />
						</Box>
						<Typography fontSize={13} color={primary.properDark}>
							Supervisor
						</Typography>
					</Stack>
				</Stack>
				{/* <Stack direction='row' flexWrap='wrap' mt={1}>
					<Typography mr={1} className='vAlignCenter' variant='body2' width={'50ch'}>
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
				</Stack> */}
			</Stack>
			{/* Allocation Status */}
			<Stack className='cardBody' onClick={handleClick}>
				{/* <Typography color={primary.properDark} fontWeight={700} fontSize={12}>
					ALLOCATION STATUS
				</Typography> */}
				{/* <Grid container>
					<Grid item xs={12}>
						<Stack className='links' flex={1} direction='row' spacing={3}> */}
				{/* <Link
								href={`/dashboard/projects/bookings/${router.query.projectId}/${booking.booking?.bookingId}/WORKER_APPLIED`}
								passHref
								replace={!!router.pathname.includes('[bookingId]')}> */}
				{/* <Typography
							// component='a'
							// className={
							// 	router.query.jobCardState === JobCardState.WORKER_APPLIED ? 'selected' : ''
							// }
							> */}
				{/* <Typography variant='h5' color={primary.properDark}>
									{(booking?.stats?.jobCardCounts?.WORKER_APPLIED ?? 0) +
										(booking?.stats?.jobCardCounts?.ACCEPTED ?? 0)}
								</Typography>
								<Typography variant='body2' align='left' color={primary.properDark}>
									Applied
								</Typography>
							</Typography> */}
				{/* </Link> */}
				{/* <Link
								href={`/dashboard/projects/bookings/${router.query.projectId}/${booking.booking?.bookingId}/${JobCardState.READY_TO_DEPLOY}`}
								passHref
								replace={!!router.pathname.includes('[bookingId]')}> */}
				{/* <Typography
							// component='a'
							// className={
							// 	router.query.jobCardState === JobCardState.READY_TO_DEPLOY ? 'selected' : ''
							// }
							>
								<Typography variant='h5' color={primary.properDark}>
									{booking?.stats?.jobCardCounts?.READY_TO_DEPLOY ?? 0}
								</Typography>
								<Typography variant='body2' align='left' color={primary.properDark}>
									Ready to Deploy
								</Typography>
							</Typography> */}
				{/* </Link> */}
				{/* <Link
								href={`/dashboard/projects/bookings/${router.query.projectId}/${booking?.booking?.bookingId}/${JobCardState.DEPLOYMENT_COMPLETE}`}
								passHref
								replace={!!router.pathname.includes('[bookingId]')}> */}
				{/* <Typography
							// component='a'
							// className={
							// 	router.query.jobCardState === JobCardState.DEPLOYMENT_COMPLETE ? 'selected' : ''
							// }
							>
								<Typography variant='h5' color={primary.properDark}>
									{(booking?.stats?.jobCardCounts?.DEPLOYMENT_COMPLETE ?? 0) +
										(booking?.stats?.jobCardCounts?.COMPLETED ?? 0)}
								</Typography>
								<Typography variant='body2' align='left' color={primary.properDark}>
									Deployed
								</Typography>
							</Typography> */}
				{/* </Link> */}
				{/* </Stack>
					</Grid>
				</Grid> */}
				{!router.pathname.includes('[bookingId]') && (
					// <Grid item xs={12} md={4} pt={2} alignItems='flex-end' justifyContent='flex-end'>
					<Stack
						direction={'row'}
						rowGap={1}
						mt={2}
						justifyContent='center'
						sx={{
							width: '100%',
						}}>
						<Box width={'70%'}>
							<Link
								href={`/bookings/${router.query.projectId}/${booking.booking?.bookingId}/track-workers`}
								passHref>
								<Button
									className='cta'
									fullWidth
									onClick={() => {
										ButtonClicked({
											action: 'Open Booking',
											page: 'Project',
											bookingId: booking.booking?.bookingId,
											url: router.asPath,
										})
									}}
									style={{
										padding: 1,
										background: theme.palette.primary.light,
										color: primary.properDark,
										fontFamily: 'Saira,sans-serif',
										fontWeight: 600,
									}}>
									ProjectHeroes ko call karen
								</Button>
							</Link>
						</Box>
					</Stack>

					// </Grid>
				)}
			</Stack>
		</CustomPaper>
	)
}

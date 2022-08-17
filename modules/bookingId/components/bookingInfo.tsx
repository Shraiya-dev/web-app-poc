import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	CircularProgress,
	Divider,
	Grid,
	Icon,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import { BookingPreview, InputWrapper, JobTypeLabel, useMobile } from '../../../sdk'

import Helper from '../../../public/assets/icons/helper.svg'
import Supervisor from '../../../public/assets/icons/supervisor.svg'
import Technician from '../../../public/assets/icons/technician.svg'

import Image from 'next/image'
import { BookingDurationLabel } from '../../../sdk/constants/jobDuration'
import { TextWrapper } from '../../../sdk/components/Input/TextWrapper'
import { BottomLayout } from 'sdk/layouts/BottomLayout'
import PlaceIcon from '@mui/icons-material/Place'
import { useRouter } from 'next/router'

interface BookingInfo {
	loading: boolean
	bookingInfo: BookingPreview
}

const BookingInfo = ({ ...props }: BookingInfo) => {
	const { bookingInfo, loading } = props
	const isMobile = useMobile()
	const router = useRouter()

	const workerType = [
		{
			label: 'Technician',
			icon: Technician,

			count: bookingInfo?.booking?.peopleRequired?.TECHNICIAN,
			wage: bookingInfo?.booking?.rateCard?.TECHNICIAN,
		},
		{
			label: 'Helper',
			icon: Helper,

			count: bookingInfo?.booking?.peopleRequired?.HELPER,
			wage: bookingInfo?.booking?.rateCard?.HELPER,
		},

		{
			label: 'Supervisor',
			icon: Supervisor,

			count: bookingInfo?.booking?.peopleRequired?.SUPERVISOR,
			wage: bookingInfo?.booking?.rateCard?.SUPERVISOR,
		},
	]

	const CardChips = [
		{
			label: 'Accommodation',
			imgSrc: '/assets/icons/AccommodationIcon.svg',
		},
		{
			label: 'PF',
			imgSrc: '/assets/icons/PFIcon.svg',
		},
		{
			label: 'Food',
			imgSrc: '/assets/icons/FoodIcon.svg',
		},
		{
			label: 'Insurance',
			imgSrc: '/assets/icons/InsuranceIcon.svg',
		},
	]

	return (
		<>
			<Stack
				sx={{
					minHeight: isMobile ? 'calc(100vh - 260px)' : '',
					maxHeight: isMobile ? 'calc(100vh - 260px)' : '',
				}}>
				{loading ? (
					<Stack p={5} alignItems='center'>
						<CircularProgress size={50} />
					</Stack>
				) : (
					<Box mb={0}>
						<Stack direction={'column'} mb={6} spacing={3}>
							<Typography variant='h4' fontWeight={700}>
								Project Details
							</Typography>
							<Card
								sx={{
									width: isMobile ? '100%' : '33%',
								}}>
								<CardContent
									component={Paper}
									sx={{
										p: '10px',
									}}>
									<Stack direction={'column'} mb={1}>
										<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
											<Typography color={'#000'}>{bookingInfo?.project?.name}</Typography>
											<Button
												variant='text'
												sx={{ color: '#E58A51' }}
												onClick={() => {
													router.push(`/projects/${bookingInfo?.project?.id}/details`)
												}}>
												Edit Project
											</Button>
										</Stack>
										<Stack direction={'row'} alignItems={'flex-start'} spacing={0.5} width={'40%'}>
											<PlaceIcon
												sx={{
													color: '#EA5A4D',
													width: 16,
													height: 16,
													mt: 0.3,
												}}
											/>
											<Typography variant='subtitle2' color={'#000'}>
												{bookingInfo?.project?.state}, <br /> {bookingInfo?.project?.city}
												{', '}
												{bookingInfo?.project?.pincode}
											</Typography>
										</Stack>
									</Stack>
									<Divider />
									<Stack
										direction={isMobile ? 'column' : 'row'}
										spacing={1.5}
										mt={1}
										sx={{
											flexWrap: 'wrap',
										}}>
										{CardChips.map((x, index) => {
											return (
												<Box key={index}>
													<Chip
														size='small'
														avatar={<Avatar alt='img' src={x.imgSrc} />}
														label={x.label}
													/>
												</Box>
											)
										})}
									</Stack>
								</CardContent>
							</Card>
						</Stack>
						<Stack spacing={5}>
							<TextWrapper id={'trade'} label='Trade'>
								{JobTypeLabel[bookingInfo?.booking?.jobType || 'GYPSUM']}
							</TextWrapper>

							{bookingInfo?.booking?.tags.length > 0 && (
								<TextWrapper id={'skills'} label='Skills'>
									{bookingInfo?.booking?.tags.join(', ')}
								</TextWrapper>
							)}

							<TextWrapper
								id={'workerRequired'}
								label={`Workers Required & Daily Wagehhhh`}
								toolTip={'Daily wage per worker'}>
								{workerType.map((item, index) => {
									return (
										<Stack key={index} direction={'row'} pb={1}>
											<Box minWidth={50}>
												<Icon style={{ fontSize: 32, verticalAlign: 'middle' }}>
													<Image src={item.icon} style={{ width: 32, height: 32 }} />
												</Icon>
											</Box>
											<Box minWidth={100} style={{ verticalAlign: 'middle' }} mt={0.8}>
												{item?.label}
											</Box>
											<Box minWidth={50} style={{ verticalAlign: 'middle' }} mt={0.8}>
												{item?.count ?? 0}
											</Box>
											<Box minWidth={20} style={{ verticalAlign: 'middle' }} mt={0.8}>{`Rs. ${
												item?.wage ?? 0
											}`}</Box>
										</Stack>
									)
								})}
							</TextWrapper>

							<TextWrapper id={'jobDuration'} label={`Job Duration`}>
								{BookingDurationLabel[bookingInfo?.booking?.schedule?.bookingDuration]}
							</TextWrapper>

							<TextWrapper id={'shiftTime'} label={`Shift Time`}>
								{bookingInfo?.booking?.schedule?.shiftTime}
							</TextWrapper>
						</Stack>
					</Box>
				)}
			</Stack>
			{isMobile && (
				<Stack direction={'row'} justifyContent={'center'}>
					<BottomLayout />
				</Stack>
			)}
		</>
	)
}

export default BookingInfo

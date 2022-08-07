import { Box, CircularProgress, Grid, Icon, Stack } from '@mui/material'
import { BookingPreview, InputWrapper, JobTypeLabel, useMobile } from '../../../sdk'

import Helper from '../../../public/assets/icons/helper.svg'
import Supervisor from '../../../public/assets/icons/supervisor.svg'
import Technician from '../../../public/assets/icons/technician.svg'

import Image from 'next/image'
import { BookingDurationLabel } from '../../../sdk/constants/jobDuration'
import { TextWrapper } from '../../../sdk/components/Input/TextWrapper'
import { BottomLayout } from 'sdk/layouts/BottomLayout'

interface BookingInfo {
	loading: boolean
	bookingInfo: BookingPreview
}

const BookingInfo = ({ ...props }: BookingInfo) => {
	const { bookingInfo, loading } = props
	const isMobile = useMobile()

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

	return (
		<>
			<Stack
				sx={{
					maxHeight: 'calc(100vh - 300px)',
					minHeight: 'calc(100vh - 300px)',
				}}
			>
				{loading ? (
					<Stack p={5} alignItems='center'>
						<CircularProgress size={50} />
					</Stack>
				) : (
					<Box mb={0}>
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
								label={`Workers Required & Daily Wage`}
								toolTip={'Daily wage per worker'}
							>
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
											<Box
												minWidth={20}
												style={{ verticalAlign: 'middle' }}
												mt={0.8}
											>{`Rs. ${item?.wage}`}</Box>
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

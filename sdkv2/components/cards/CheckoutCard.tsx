import { Button, Card, IconButton, Stack, TextField, Typography } from '@mui/material'
import { FC, useMemo } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import BookingSuccess from 'modules/createBooking/components/bookingsuccess'

interface Props {}

const ProfileCard = ({ data }: { data: any }) => {
	return (
		<>
			<Stack borderBottom='1px solid' py='28px' direction='row'>
				<img src={data.img} />
				<Stack flexGrow={1} spacing='12px' ml={2}>
					<Typography variant='h5' fontWeight={500}>
						{data.job}
					</Typography>
					<Stack>
						<Typography variant='subtitle2' fontWeight={400}>
							Wage: &#8377; {`${data.wage} per day`}
						</Typography>
						{/* <IconButton>

                        </IconButton> */}
					</Stack>
				</Stack>
				<Stack direction='row' alignItems='center'>
					<IconButton>
						<RemoveCircleOutlineIcon sx={{ color: 'primary.main' }} />
					</IconButton>
					<TextField type='number' value={10} sx={{ maxWidth: 56 }} />
					<IconButton>
						<AddCircleOutlineIcon sx={{ color: 'primary.main' }} />
					</IconButton>
				</Stack>
			</Stack>
		</>
	)
}
export const CheckoutCard: FC<Props> = () => {
	const ProfileCardData = useMemo(
		() => [
			{
				img: '/assets/icons/jobs/technician.svg',
				job: 'Technician',
				wage: 650,
			},
			{
				img: '/assets/icons/jobs/helper.svg',
				job: 'Helper',
				wage: 350,
			},
			{
				img: '/assets/icons/jobs/supervisor.svg',
				job: 'Supervisor',
				wage: 850,
			},
		],
		[]
	)

	const billData = useMemo(
		() => [
			{
				label: 'Subtotal',
				value: 1250,
			},
			{
				label: 'Discount (First 15 applications free)',
				value: 750,
				discount: true,
			},
			{
				label: 'Before Taxes',
				value: 500,
			},
			{
				label: 'Taxes Applicable (GST@18%)',
				value: 90,
			},
		],
		[]
	)

	return (
		<>
			<Stack rowGap={4}>
				<Stack>
					<Typography fontSize='32px' fontWeight={600}>
						One platform to care of all your
						<Typography display='inline' fontSize='32px' fontWeight={600} color='primary.main'>
							{' '}
							Hiring needs!
						</Typography>
					</Typography>
				</Stack>
				<Card sx={{ borderRadius: '15px' }}>
					<Stack p={3} minWidth='766px'>
						<Stack spacing={'4px'}>
							<Typography variant='h3' fontWeight={600}>
								First
								<Typography display='inline' variant='h3' fontWeight={600} color='primary.main'>
									{' '}
									15 Hero applications
								</Typography>{' '}
								are FREE!
							</Typography>
							<Typography variant='body1' fontWeight={400}>
								₹50 per application thereafter
							</Typography>
						</Stack>
						<Stack>
							<Typography variant='body1' fontWeight={600}>
								You have selected
								<Typography display='inline' variant='body1' fontWeight={600} color='primary.main'>
									{' '}
									25 applications
								</Typography>{' '}
							</Typography>
							{ProfileCardData?.map((profile: any) => {
								return <ProfileCard key={profile.job} data={profile} />
							})}
						</Stack>
						<Stack rowGap={2} borderBottom='1px solid' py='24px'>
							<Typography variant='body1' fontWeight={500}>
								Billing Details
							</Typography>
							<Stack rowGap={2}>
								{billData?.map((i: any) => {
									return (
										<>
											<Stack direction='row' justifyContent='space-between'>
												<Typography
													sx={(theme) => ({
														color: i.discount ? theme.palette.success.dark : '',
													})}
													variant='h4'
													fontWeight={400}>
													{i.label}
												</Typography>
												<Typography
													variant='h4'
													fontWeight={400}
													sx={(theme) => ({
														color: i.discount ? theme.palette.success.dark : '',
													})}>
													{i.discount ? '-' : ''}&#8377;{i.value}
												</Typography>
											</Stack>
										</>
									)
								})}
							</Stack>
						</Stack>
						<Stack direction='row' justifyContent='space-between' py={4}>
							<Typography variant='h1' sx={{ color: 'primary.main' }}>
								&#8377; 590
							</Typography>
							<Button sx={{ backgroundColor: 'info.main' }}>
								<Typography mr={3} color='#000'>
									Pay and Book Now
								</Typography>
								<img src='/assets/icons/forward_round.svg' />
							</Button>
						</Stack>
					</Stack>
				</Card>
				<Stack
					borderRadius='15px'
					sx={{ backgroundColor: 'info.main' }}
					direction='row'
					alignItems='center'
					justifyContent='space-between'
                    p='30px 24px'>
					<Typography variant='h6' color='#000'>
						<Typography display='inline' variant='h6' fontWeight='bolder' color='#000'>
							Have a question?
						</Typography>{' '}
						Here to help.
					</Typography>
					<Stack direction='row' columnGap={3} >
						<Stack direction='row' alignItems='center'>
							<img src='/assets/icons/mail.svg' />
							<Typography ml={1} color='#000'>
								marketing@projecthero.in
							</Typography>
						</Stack>
						<Stack direction='row' alignItems='center'>
							<img src='assets/icons/phone_small.svg' />
							<Typography ml={1} color='#000'>
								+91-9151003513
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</>
	)
}

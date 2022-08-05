import { Button, Card, IconButton, Stack, TextField, Typography } from '@mui/material'
import { FC, useCallback, useMemo, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
// import BookingSuccess from 'modules/createBooking/components/bookingsuccess'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import { WageUpdateDialog } from '../dialog'
import { useCheckout } from 'modules/bookingId/hooks/useCheckout'

interface Props {}

const ProfileCard = ({
	data,
	setShowWageUpdate,
	handleChangePersonRequire,
	personRequire,
	setFieldName,
}: {
	data: any
	setShowWageUpdate: any
	handleChangePersonRequire: any
	personRequire: any
	setFieldName: any
}) => {
	return (
		<>
			<Stack borderBottom='1px solid' py='28px' direction='row'>
				<img src={data.img} />
				<Stack flexGrow={1} spacing='12px' ml={2}>
					<Typography variant='h5' fontWeight={500}>
						{data.job}
					</Typography>
					<Stack direction='row' alignItems='center'>
						<Typography variant='subtitle2' fontWeight={400}>
							Wage: &#8377; {`${data.wage} per day`}
						</Typography>
						<IconButton
							sx={{ p: '0px', ml: '6px' }}
							onClick={() => {
								setShowWageUpdate(true)
								setFieldName(data?.name)
							}}>
							<DriveFileRenameOutlineOutlinedIcon sx={{ color: 'primary.main' }} />
						</IconButton>
					</Stack>
				</Stack>
				<Stack direction='row' alignItems='center'>
					<IconButton>
						<RemoveCircleOutlineIcon sx={{ color: 'primary.main' }} />
					</IconButton>
					<TextField
						type='number'
						name={data?.name}
						value={personRequire[data?.name]}
						sx={{ maxWidth: 56 }}
						onChange={(e: any) => handleChangePersonRequire(e)}
					/>
					<IconButton>
						<AddCircleOutlineIcon sx={{ color: 'primary.main' }} />
					</IconButton>
				</Stack>
			</Stack>
		</>
	)
}
export const CheckoutCard: FC<Props> = () => {
	const [showWageUpdate, setShowWageUpdate] = useState<boolean>(false)
	const { handleChangePersonRequire, personRequire, wages, bookingData } = useCheckout()
	const [fieldName, setFieldName] = useState('')

	const ProfileCardData = useMemo(
		() => [
			{
				img: '/assets/icons/jobs/technician.svg',
				job: 'Technician',
				wage: wages.technician,
				name: 'technician',
			},
			{
				img: '/assets/icons/jobs/helper.svg',
				job: 'Helper',
				wage: wages.helper,
				name: 'helper',
			},
			{
				img: '/assets/icons/jobs/supervisor.svg',
				job: 'Supervisor',
				wage: wages.supervisor,
				name: 'supervisor',
			},
		],
		[[personRequire]]
	)

	const billData = useMemo(
		() => [
			{
				label: 'Subtotal',
				value: (personRequire.helper + personRequire.supervisor + personRequire.technician) * 50,
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
			{/* handleUpdateWages from useCheckout goes in  WageUpdateDialog  */}
			{WageUpdateDialog && (
				<WageUpdateDialog open={showWageUpdate} fieldName={fieldName} close={setShowWageUpdate} />
			)}
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
									{`${
										personRequire.helper + personRequire.supervisor + personRequire.technician
									}`}{' '}
									applications
								</Typography>{' '}
							</Typography>
							{ProfileCardData?.map((profile: any) => {
								return (
									<ProfileCard
										key={profile.job}
										personRequire={personRequire}
										data={profile}
										setShowWageUpdate={setShowWageUpdate}
										handleChangePersonRequire={handleChangePersonRequire}
										setFieldName={setFieldName}
									/>
								)
							})}
						</Stack>
						<Stack rowGap={2} borderBottom='1px solid' py='24px'>
							<Typography variant='body1' fontWeight={500}>
								Billing Details
							</Typography>
							<Stack rowGap={2}>
								{billData?.map((i: any) => {
									return (
										<Stack>
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
										</Stack>
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
					<Stack direction='row' columnGap={3}>
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

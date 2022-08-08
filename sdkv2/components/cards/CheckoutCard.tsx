import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Button, Card, CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material'
import { FC, useCallback, useMemo, useState } from 'react'
// import BookingSuccess from 'modules/createBooking/components/bookingsuccess'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import { postEasyBookingOrder, updateWages } from 'modules/bookingId/apis'
import { useCheckout } from 'modules/bookingId/hooks/useCheckout'
import { useRouter } from 'next/router'
import { useContractorAuth, useSnackbar } from 'sdk/providers'
import { usePayment } from 'sdk/providers/PaymentProvider'
import { AddEditWage } from '../dialog'

const ProfileCardData = [
	{
		img: '/assets/icons/jobs/helper.svg',
		job: 'Helper',
		wage: 'wageHelper',
		name: 'qtyHelper',
	},
	{
		img: '/assets/icons/jobs/technician.svg',
		job: 'Technician',
		wage: 'wageTechnician',
		name: 'qtyTechnician',
	},

	{
		img: '/assets/icons/jobs/supervisor.svg',
		job: 'Supervisor',
		wage: 'wageSupervisor',
		name: 'qtySupervisor',
	},
]
const billData = [
	{
		label: 'Subtotal',
		value: 'subTotal',
	},
	{
		label: 'Discount (First 15 applications free)',
		value: 'discount',
	},
	{
		label: 'Before Taxes',
		value: 'beforeTax',
	},
	{
		label: 'Taxes Applicable (GST@18%)',
		value: 'tax',
	},
]

export const CheckoutCard: FC = () => {
	const [addEditWageDialogProps, setAddEditWageDialogProps] = useState({
		open: false,
		fieldName: '',
		initialValue: 0,
	})
	const [updating, setUpdating] = useState<any>({})
	const { form, wage, bookingData, setWage, discountEligible } = useCheckout()
	const bill: any = useMemo(() => {
		const quantity = form.values['qtyHelper'] + form.values['qtyTechnician'] + form.values['qtySupervisor']
		const subTotal = quantity * 50
		const discount = discountEligible ? (subTotal > 750 ? 750 : subTotal) : 0
		const beforeTax = subTotal - discount
		const tax = beforeTax * 0.18
		const amountPayable = beforeTax + tax
		return {
			quantity: quantity,
			subTotal: subTotal,
			discount: discount,
			beforeTax: beforeTax,
			tax: tax,
			amountPayable: amountPayable,
		}
	}, [discountEligible, form.values])

	const router = useRouter()
	const { initiatePayment } = usePayment()
	const { user } = useContractorAuth()
	const { showSnackbar } = useSnackbar()

	const handelPayment = useCallback(async () => {
		const payload = {
			source: {
				id: router.query.bookingId,
				type: 'BOOKING_TOKEN',
			},
			buyerType: 'CONTRACTOR_PROJECT',
			sellerType: 'PROJECT_HERO',
			discount: {
				isDiscounted: discountEligible,
				discountCode: 'NEWUSER15',
			},
			total: bill.amountPayable,
			lineItems: [
				{
					itemName: 'HELPER',
					quantity: form.values.qtyHelper,
					category: bookingData?.booking?.jobType,
					amount: 50,
					totalAmount: form.values.qtyHelper * 50,
				},
				{
					itemName: 'TECHNICIAN',
					quantity: form.values.qtyTechnician,
					category: bookingData?.booking?.jobType,
					amount: 50,
					totalAmount: form.values.qtyTechnician * 50,
				},
				{
					itemName: 'SUPERVISOR',
					quantity: form.values.qtySupervisor,
					category: bookingData?.booking?.jobType,
					amount: 50,
					totalAmount: form.values.qtySupervisor * 50,
				},
			].filter((item) => item.quantity > 0),
		}
		try {
			const { data } = await postEasyBookingOrder(payload)
			if (data?.payload?.response?.state === 'CONFIRMED') {
				if (data?.payload?.response?.payment) {
					initiatePayment(
						data?.payload?.response?.payment,
						data?.payload?.response?.payment?.totalPaymentAmount
					)
				}
			} else {
				router.push(`/dashboard/projects/${router.query.projectId}`)
			}
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
	}, [
		bill.amountPayable,
		bookingData?.booking?.jobType,
		discountEligible,
		form.values.qtyHelper,
		form.values.qtySupervisor,
		form.values.qtyTechnician,
		initiatePayment,
		router,
		showSnackbar,
	])

	return (
		<>
			{/* handleUpdateWages from useCheckout goes in  WageUpdateDialog  */}
			{addEditWageDialogProps.open && (
				<AddEditWage
					{...addEditWageDialogProps}
					confirm={async (key: string, newWage: number) => {
						let updateWage: any = {}
						setWage((p: any) => {
							const a = { ...p, [key]: newWage }
							updateWage = a
							return a
						})
						setAddEditWageDialogProps((p: any) => ({ ...p, open: false }))
						setUpdating((p: any) => ({ ...p, [key]: true }))
						try {
							await updateWages(router.query.bookingId, router.query.projectId, {
								requirements: {
									HELPER: updateWage?.wageHelper
										? {
												count: 0,
												wage: updateWage?.wageHelper,
										  }
										: undefined,
									TECHNICIAN: updateWage?.wageTechnician
										? {
												count: 0,
												wage: updateWage?.wageTechnician,
										  }
										: undefined,
									SUPERVISOR: updateWage?.wageSupervisor
										? {
												count: 0,
												wage: updateWage?.wageSupervisor,
										  }
										: undefined,
								},
								shiftTime: '09:30 AM-06:30 PM',
								bookingDuration: bookingData?.booking?.schedule?.bookingDuration,
							})
						} catch (error) {}
						setUpdating((p: any) => ({ ...p, [key]: undefined }))
					}}
					close={() => {
						setAddEditWageDialogProps((p: any) => ({ ...p, open: false }))
					}}
				/>
			)}
			<Stack rowGap={4}>
				<Stack>
					<Typography fontSize='32px' fontWeight={600}>
						One platform to care of all your
						<br />
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
										(form.values.qtyHelper ?? 0) +
										(form.values.qtySupervisor ?? 0) +
										(form.values.qtyTechnician ?? 0)
									}`}{' '}
									applications
								</Typography>{' '}
							</Typography>
							{ProfileCardData?.map((profile: any) => {
								return (
									<Stack key={profile.job} borderBottom='1px solid' py='28px' direction='row'>
										<img src={profile.img} />
										<Stack flexGrow={1} spacing='12px' ml={2}>
											<Typography variant='h5' fontWeight={500}>
												{profile.job}
											</Typography>
											<Stack direction='row' alignItems='center'>
												<Typography variant='subtitle2' fontWeight={400}>
													Wage: &#8377; {`${wage ? wage[profile.wage] : 0} per day`}
												</Typography>

												{['RECEIVED', 'CONFIRMATION', 'ALLOCATION_IN_PROGRESS'].includes(
													bookingData.booking.status
												) && (
													<IconButton
														sx={{ p: '0px', ml: '6px' }}
														onClick={() => {
															setAddEditWageDialogProps({
																fieldName: profile.wage,
																initialValue: wage[profile.wage],
																open: true,
															})
														}}>
														{updating[profile.wage] ? (
															<CircularProgress size={24} color='primary' />
														) : (
															<DriveFileRenameOutlineOutlinedIcon color='primary' />
														)}
													</IconButton>
												)}
											</Stack>
										</Stack>
										<Stack direction='row' alignItems='center'>
											<IconButton
												onClick={(e) =>
													form.setFieldValue(
														profile?.name,
														Number(form.values[profile.name] - 1)
													)
												}>
												<RemoveCircleOutlineIcon sx={{ color: 'primary.main' }} />
											</IconButton>
											<TextField
												type='number'
												sx={{
													maxWidth: 56,
													input: {
														textAlign: 'center',
													},
												}}
												value={form.values[profile?.name]}
												onChange={(e) =>
													form.setFieldValue(profile?.name, Number(e.target.value))
												}
												name={profile?.name}
											/>
											<IconButton
												onClick={(e) =>
													form.setFieldValue(
														profile?.name,
														Number(form.values[profile.name] + 1)
													)
												}>
												<AddCircleOutlineIcon sx={{ color: 'primary.main' }} />
											</IconButton>
										</Stack>
									</Stack>
								)
							})}
						</Stack>
						<Stack spacing={2} borderBottom='1px solid' py='24px'>
							<Typography variant='body1' fontWeight={500}>
								Billing Details
							</Typography>
							{billData?.map((i: any) => {
								if (i.value === 'discount') {
									if (discountEligible) {
										return (
											<Stack key={i.value} direction='row' justifyContent='space-between'>
												<Typography color='success.dark' variant='h4' fontWeight={400}>
													{i.label}
												</Typography>
												<Typography color='success.dark' variant='h4' fontWeight={400}>
													-&#8377; {bill[i.value]}
												</Typography>
											</Stack>
										)
									}
								} else {
									return (
										<Stack key={i.value} direction='row' justifyContent='space-between'>
											<Typography variant='h4' fontWeight={400}>
												{i.label}
											</Typography>

											<Typography variant='h4' fontWeight={400}>
												&#8377; {bill[i.value]}
											</Typography>
										</Stack>
									)
								}
							})}
						</Stack>
						<Stack direction='row' justifyContent='space-between' pt={4}>
							<Typography variant='h1' sx={{ color: 'primary.main' }}>
								&#8377; {bill.amountPayable}
							</Typography>
							<Button
								color='info'
								disabled={bill.quantity <= 0}
								onClick={handelPayment}
								sx={{
									backgroundColor: '#ffffff !important',
									color: 'common.black',
									'&:disabled': {
										backgroundColor: '#cccccc !important',
									},
								}}
								endIcon={<img src='/assets/icons/forward_round.svg' />}>
								Pay and Book Now
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
							<img src='/assets/icons/phone_small.svg' />
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

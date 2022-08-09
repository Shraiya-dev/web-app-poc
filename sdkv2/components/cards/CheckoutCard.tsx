import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Button, Card, CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material'
import { FC, useCallback, useMemo, useState } from 'react'
// import BookingSuccess from 'modules/createBooking/components/bookingsuccess'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import { postEasyBookingOrder, updateWages } from 'modules/bookingId/apis'
import { useCheckout } from 'modules/bookingId/hooks/useCheckout'
import { useRouter } from 'next/router'
import { useSnackbar } from 'sdk/providers'
import { usePayment } from 'sdk/providers/PaymentProvider'
import { AddEditWage } from '../dialog'
import { useFormikProps } from 'sdk/hooks'
import { Add } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

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
	const { form, wage, bookingData, setWage, discountEligible, getBookingDetail } = useCheckout()
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
	const { showSnackbar } = useSnackbar()
	const [loading, setLoading] = useState(false)
	const handelPayment = useCallback(async () => {
		setLoading(true)
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
					setLoading(false)

					await initiatePayment(
						data?.payload?.response?.payment,
						data?.payload?.response?.payment?.totalPaymentAmount,
						() => {
							debugger
							router.push(`/bookings/${router.query.projectId}/${router.query.bookingId}/track-workers`)
						}
					)
				}
			} else {
				router.push(`/bookings/${router.query.projectId}/${router.query.bookingId}/track-workers`)
			}
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
		setLoading(false)
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
	const formikProps = useFormikProps<any>(form)
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
												count: bookingData?.booking?.peopleRequired['HELPER'],
												wage: updateWage?.wageHelper,
										  }
										: undefined,
									TECHNICIAN: updateWage?.wageTechnician
										? {
												count: bookingData?.booking?.peopleRequired['TECHNICIAN'],
												wage: updateWage?.wageTechnician,
										  }
										: undefined,
									SUPERVISOR: updateWage?.wageSupervisor
										? {
												count: bookingData?.booking?.peopleRequired['SUPERVISOR'],
												wage: updateWage?.wageSupervisor,
										  }
										: undefined,
								},
								shiftTime: '09:30 AM-06:30 PM',
								bookingDuration: bookingData?.booking?.schedule?.bookingDuration,
							})
							await getBookingDetail()
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
							{discountEligible && (
								<Typography variant='h3' fontWeight={600}>
									First
									<Typography display='inline' variant='h3' fontWeight={600} color='primary.main'>
										{' '}
										15 Hero applications
									</Typography>{' '}
									are FREE!
								</Typography>
							)}
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
										(Number(form.values.qtyHelper) ?? 0) +
										(Number(form.values.qtySupervisor) ?? 0) +
										(Number(form.values.qtyTechnician) ?? 0)
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

												{bookingData?.booking?.peopleRequired[profile?.job?.toUpperCase()] ===
													0 &&
													bookingData?.booking?.rateCard[profile?.job?.toUpperCase()] &&
													bookingData?.booking?.rateCard[profile?.job?.toUpperCase()] !==
														0 && (
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
										{!(
											bookingData?.booking?.rateCard[profile?.job?.toUpperCase()] &&
											bookingData?.booking?.rateCard[profile?.job?.toUpperCase()] !== 0
										) ? (
											<>
												<Button
													onClick={() => {
														setAddEditWageDialogProps({
															fieldName: profile.wage,
															initialValue: wage[profile.wage],
															open: true,
														})
													}}
													sx={{ justifyContent: 'flex-start', width: 150 }}
													variant='text'
													startIcon={<Add />}>
													{profile.job}
												</Button>
											</>
										) : (
											<Stack direction='row' alignItems='center'>
												<IconButton
													onClick={(e) =>
														form.setFieldValue(
															profile?.name,
															Number(form.values[profile.name] - 1) > 0
																? Number(form.values[profile.name] - 1)
																: 0
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
													onChange={(e) => {
														if (e.target.value === '') {
															form.setFieldValue(
																profile?.name,
																e.target.value.replace(/[e\+\-\.]/gi, '')
															)
														} else if (Number(e.target.value) > 0) {
															form.setFieldValue(
																profile?.name,
																Number(e.target.value.replace(/[e\+\-\.]/gi, ''))
															)
														}
													}}
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
										)}
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
									if (i.value === 'beforeTax' && !discountEligible) {
										return null
									}
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
							<LoadingButton
								color='info'
								disabled={bill.quantity <= 0}
								onClick={handelPayment}
								loading={loading}
								sx={{
									backgroundColor: '#ffffff !important',
									color: 'common.black',
									'&:disabled': {
										backgroundColor: '#cccccc !important',
									},
								}}
								endIcon={<img src='/assets/icons/forward_round.svg' />}>
								{bill.amountPayable !== 0 && 'Pay and'} Book Now
							</LoadingButton>
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
							<Typography component='a' href='mailto:marketing@projecthero.in' ml={1} color='#000'>
								marketing@projecthero.in
							</Typography>
						</Stack>
						<Stack direction='row' alignItems='center'>
							<img src='/assets/icons/phone_small.svg' />
							<Typography component='a' href='tel:+91 9151003513' ml={1} color='#000'>
								+91-9151003513
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</>
	)
}

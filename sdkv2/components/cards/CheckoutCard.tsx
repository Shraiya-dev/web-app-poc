import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import {
	Box,
	Button,
	Card,
	CircularProgress,
	FormHelperText,
	IconButton,
	Skeleton,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { FC, useCallback, useMemo, useState } from 'react'
// import BookingSuccess from 'modules/createBooking/components/bookingsuccess'
import { Add } from '@mui/icons-material'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import { LoadingButton } from '@mui/lab'
import { postEasyBookingOrder, updateWages } from 'modules/bookingId/apis'
import { useCheckout } from 'modules/bookingId/hooks/useCheckout'
import { useRouter } from 'next/router'
import { DataLayerPush, sendAnalytics } from 'sdk/analytics'
import { useFormikProps, useMobile } from 'sdk/hooks'
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
		initialQuantity: 0,
		edit: false,
	})
	const [updating, setUpdating] = useState<any>({})
	const { form, wage, bookingData, setWage, discountEligible, getBookingDetail, loading, dispatchLoading } =
		useCheckout()
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

	const isMobile = useMobile()
	const { user } = useContractorAuth()

	const handelPayment = useCallback(async () => {
		dispatchLoading({ payment: true })
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
					sendAnalytics({
						name: 'initiatePayment',
						action: 'ButtonClick',
						metaData: {
							origin: 'Booking checkout card',
						},
					})
					await initiatePayment(
						data?.payload?.response?.payment,
						data?.payload?.response?.payment?.amountPayable,
						() => {
							DataLayerPush({
								event: 'booking_done',
								phoneNumber: user?.phoneNumber,
								amount: bill?.amountPayable,
								discountEligible: discountEligible,
								discount: bill?.discount,
								currency: 'INR',
								eventInfo: {
									helperCount: form.values['qtyHelper'],
									supervisorCount: form.values['qtySupervisor'],
									technicianCount: form.values['qtyTechnician'],
									helperWage: wage['wageHelper'],
									supervisorWage: wage['wageSupervisor'],
									technicianWage: wage['wageTechnician'],
								},
							})
							sendAnalytics({
								name: 'CreateEasyBookWorker',
								action: 'ButtonClick',
								metaData: {
									step: 'Booking Complete',
								},
							})
							router.push(`/bookings/${router.query.projectId}/${router.query.bookingId}/track-workers`)
						},
						() => {
							dispatchLoading({ payment: false })
						}
					)
				}
			} else {
				DataLayerPush({
					event: 'booking_done',
					phoneNumber: user?.phoneNumber,
					amount: bill?.amountPayable,
					discountEligible: discountEligible,
					discount: bill?.discount,
					currency: 'INR',
					eventInfo: {
						helperCount: form.values['qtyHelper'],
						supervisorCount: form.values['qtySupervisor'],
						technicianCount: form.values['qtyTechnician'],
						helperWage: wage['wageHelper'],
						supervisorWage: wage['wageSupervisor'],
						technicianWage: wage['wageTechnician'],
					},
				})
				sendAnalytics({
					name: 'CreateEasyBookWorker',
					action: 'ButtonClick',
					metaData: {
						step: 'Booking Complete',
					},
				})
				router.push(`/bookings/${router.query.projectId}/${router.query.bookingId}/track-workers`)
			}
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
	}, [
		bill.amountPayable,
		bill?.discount,
		bookingData?.booking?.jobType,
		discountEligible,
		form.values,
		initiatePayment,
		router,
		showSnackbar,
		user?.phoneNumber,
		wage,
	])
	const formikProps = useFormikProps<any>(form)
	return (
		<>
			{/* handleUpdateWages from useCheckout goes in  WageUpdateDialog  */}
			{addEditWageDialogProps.open && (
				<AddEditWage
					{...addEditWageDialogProps}
					confirm={async (key: string, newWage: number, newQuantity: number) => {
						let updateWage: any = {}
						setWage((p: any) => {
							const a = { ...p, [key]: newWage }
							updateWage = a
							return a
						})
						form.setFieldValue(key.replace('wage', 'qty'), newQuantity)
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
			<Stack rowGap={4} maxWidth={766}>
				<Stack>
					<Typography fontSize={!isMobile ? '32px' : '24px'} fontWeight={600}>
						One platform to care of all your
						<br />
						<Typography
							display='inline'
							fontSize={!isMobile ? '32px' : '24px'}
							fontWeight={600}
							color='primary.main'>
							{' '}
							Hiring needs!
						</Typography>
					</Typography>
				</Stack>
				<Card sx={{ borderRadius: '15px' }}>
					{loading?.booking ? (
						<>
							<Stack minHeight={500} alignItems='center' justifyContent='center' flex={1}>
								<CircularProgress size={70} />
							</Stack>
						</>
					) : (
						<>
							<Stack p={{ xs: 2, md: 3 }} minWidth={!isMobile ? '766px' : '100%'}>
								<Stack spacing={'4px'}>
									{discountEligible && (
										<Typography variant='h3' fontWeight={600}>
											First
											<Typography
												display='inline'
												variant='h3'
												fontWeight={600}
												color='primary.main'>
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
										<Typography
											display='inline'
											variant='body1'
											fontWeight={600}
											color='primary.main'>
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
												<img src={profile.img} width={isMobile ? 50 : 70} />
												<Stack flexGrow={1} spacing='12px' ml={{ xs: 1, md: 2 }}>
													<Typography variant='h5' fontWeight={500}>
														{profile.job}
													</Typography>
													<Stack direction='row' alignItems='center'>
														<Typography variant='subtitle2' fontWeight={400}>
															Wage: &#8377; {`${wage ? wage[profile.wage] : 0}/day`}
														</Typography>

														{bookingData?.booking?.peopleRequired[
															profile?.job?.toUpperCase()
														] === 0 &&
															bookingData?.booking?.rateCard[
																profile?.job?.toUpperCase()
															] &&
															bookingData?.booking?.rateCard[
																profile?.job?.toUpperCase()
															] !== 0 && (
																<IconButton
																	sx={{ p: '0px' }}
																	onClick={() => {
																		setAddEditWageDialogProps({
																			fieldName: profile.wage,
																			initialValue: wage[profile.wage],
																			open: true,
																			edit: true,
																			initialQuantity: form.values[profile.name],
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
																	edit: false,
																	initialQuantity: form.values[profile.name],
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
															onClick={(e) => {
																if (
																	form.values[profile.name] <= 999 &&
																	form.values[profile.name] > 0
																) {
																	form.setFieldValue(
																		profile?.name,
																		Number(form.values[profile.name] - 1) > 0
																			? Number(form.values[profile.name] - 1)
																			: 0
																	)
																}
															}}>
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
															name={profile?.name}
															value={form.values[profile?.name]}
															onChange={(e) => {
																form.setFieldValue(
																	e.target.name,
																	e.target.value !== ''
																		? parseInt(e.target.value) > 999
																			? 999
																			: parseInt(e.target.value)
																		: e.target.value
																)
															}}
														/>
														<IconButton
															onClick={(e) => {
																if (
																	form.values[profile.name] < 999 &&
																	form.values[profile.name] >= 0
																) {
																	form.setFieldValue(
																		profile?.name,
																		Number(form.values[profile.name] + 1)
																	)
																}
															}}>
															<AddCircleOutlineIcon sx={{ color: 'primary.main' }} />
														</IconButton>
													</Stack>
												)}
											</Stack>
										)
									})}
								</Stack>
								<Stack spacing={2} borderBottom='1px solid' py='24px'>
									<Typography variant={!isMobile ? 'h4' : 'h6'} fontWeight={500}>
										Billing Details
									</Typography>
									{billData?.map((i: any) => {
										if (i.value === 'discount') {
											if (discountEligible) {
												return (
													<Stack key={i.value} direction='row' justifyContent='space-between'>
														<Typography
															color='success.dark'
															variant={!isMobile ? 'h4' : 'body2'}
															fontWeight={400}>
															{i.label}
														</Typography>
														<Typography
															color='success.dark'
															variant={!isMobile ? 'h4' : 'body2'}
															fontWeight={400}>
															-&#8377; {bill[i.value]}
														</Typography>
													</Stack>
												)
											}
										} else {
											return (
												<Stack key={i.value} direction='row' justifyContent='space-between'>
													<Typography variant={!isMobile ? 'h4' : 'body2'} fontWeight={400}>
														{i.label}
													</Typography>

													<Typography variant={!isMobile ? 'h4' : 'body2'} fontWeight={400}>
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
										loading={loading?.payment}
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
										{bill.amountPayable !== 0 && 'Pay and'} Book Now
									</LoadingButton>
								</Stack>
							</Stack>
						</>
					)}
				</Card>

				<Stack
					borderRadius='15px'
					sx={{ backgroundColor: 'info.main', zIndex: 1 }}
					direction={!isMobile ? 'row' : 'column'}
					alignItems={!isMobile ? 'center' : 'flex-start'}
					justifyContent='space-between'
					p='30px 24px'
					spacing={!isMobile ? '' : 4}>
					<Typography variant='h6' color='#000'>
						<Typography display='inline' variant='h6' fontWeight='bolder' color='#000'>
							Have a question?
						</Typography>{' '}
						Here to help.
					</Typography>
					<Stack direction={!isMobile ? 'row' : 'column'} columnGap={3} spacing={!isMobile ? '' : 2}>
						<Stack direction='row' alignItems='center'>
							<Box width={'30px'} height={'30px'}>
								<img height={'100%'} width={'100%'} src='/assets/icons/mail.svg' />
							</Box>
							<Typography ml={1} color='#000'>
								marketing@projecthero.in
							</Typography>
						</Stack>
						<Stack direction='row' alignItems='center'>
							<Box width={'30px'} height={'30px'}>
								<img height={'100%'} width={'100%'} src='/assets/icons/phone_small.svg' />
							</Box>
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

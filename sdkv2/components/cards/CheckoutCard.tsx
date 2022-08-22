import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import {
	Box,
	Button,
	Card,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	FormHelperText,
	IconButton,
	Skeleton,
	Stack,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
// import BookingSuccess from 'modules/createBooking/components/bookingsuccess'
import { Add, ContactsOutlined } from '@mui/icons-material'
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
import { primary } from 'sdk/constants'
import { updateProfile } from 'sdk/apis'
import { string } from 'yup'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import { StepIconProps } from '@mui/material/StepIcon'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

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

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 8px)',
		right: 'calc(50% + 8px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#4db07f',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#4db07f',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#4db07f',
		borderTopWidth: 3,
		borderRadius: 1,
	},
}))

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
	color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#4db07f',
	display: 'flex',
	height: 22,
	alignItems: 'center',
	...(ownerState.active && {
		color: '#4db07f',
	}),
	'& .QontoStepIcon-completedIcon': {
		color: '#4db07f',
		zIndex: 1,
		fontSize: 25,
	},
}))

function QontoStepIcon(props: StepIconProps) {
	const { active, completed, className } = props

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? (
				<CheckCircleIcon className='QontoStepIcon-completedIcon' />
			) : active ? (
				<AdjustOutlinedIcon className='QontoStepIcon-completedIcon' />
			) : (
				<RadioButtonUncheckedIcon className='QontoStepIcon-completedIcon' />
			)}
		</QontoStepIconRoot>
	)
}

const stepsName = ['Booking Details', 'Wage Details', 'Contact', 'Order Placed']

export const CheckoutCard: FC = () => {
	const [addEditWageDialogProps, setAddEditWageDialogProps] = useState({
		open: false,
		fieldName: '',
		initialValue: 0,
		initialQuantity: 0,
		edit: false,
	})

	const [activeStepValue, setActiveStepValue] = useState<number>(3)

	const [emailDialogBox, setEmailDialogBox] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [valid, setValid] = useState<boolean>(true)

	const [updating, setUpdating] = useState<any>({})
	const { form, wage, bookingData, setWage, discountDetails, getBookingDetail, loading, dispatchLoading } =
		useCheckout()
	const bill: any = useMemo(() => {
		const quantity = form.values['qtyHelper'] + form.values['qtyTechnician'] + form.values['qtySupervisor']
		const subTotal = quantity * 50
		const discount = discountDetails?.isEligible
			? subTotal > (discountDetails?.discount?.quantity ?? 15) * 50
				? (discountDetails?.discount?.quantity ?? 15) * 50
				: subTotal
			: 0
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
	}, [discountDetails?.discount?.quantity, discountDetails?.isEligible, form.values])
	const billData = useMemo(
		() => [
			{
				label: 'Subtotal',
				value: 'subTotal',
			},
			{
				label: `Discount (${
					discountDetails?.discount?.quantity && discountDetails?.discount?.quantity < 15
						? 'Remaining'
						: 'First'
				} ${discountDetails?.discount?.quantity} applications free)`,
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
		],
		[discountDetails?.discount?.quantity]
	)
	const router = useRouter()
	const { initiatePayment } = usePayment()
	const { showSnackbar } = useSnackbar()

	const isMobile = useMobile()
	const { user, getContactorUserInfo } = useContractorAuth()
	const [emailId, setEmailId] = useState<string>(user?.email ?? '')

	useEffect(() => {
		if (user?.email) {
			setEmailId(user?.email)
		}
	}, [user])

	const handleEmailDialogBox = useCallback(() => {
		setEmailDialogBox(!emailDialogBox)
	}, [emailDialogBox])

	const handelPayment = useCallback(
		async (email: string) => {
			dispatchLoading({ payment: true })
			const payload = {
				source: {
					id: router.query.bookingId,
					type: 'BOOKING_TOKEN',
				},
				buyerType: 'CONTRACTOR_PROJECT',
				sellerType: 'PROJECT_HERO',
				discount: {
					isDiscounted: !!discountDetails?.isEligible,
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
							email,

							() => {
								DataLayerPush({
									event: 'booking_done',
									phoneNumber: user?.phoneNumber,
									amount: bill?.amountPayable,
									discountEligible: !!discountDetails?.isEligible,
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
								router.replace(`/projects/${router.query.projectId}/bookings`)
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
						discountEligible: !!discountDetails?.isEligible,
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
					router.replace(`/projects/${router.query.projectId}/bookings`)
				}
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
		},
		[
			bill.amountPayable,
			bill?.discount,
			bookingData?.booking?.jobType,
			discountDetails?.isEligible,
			dispatchLoading,
			form.values,
			initiatePayment,
			router,
			showSnackbar,
			user?.phoneNumber,
			wage,
		]
	)
	const formikProps = useFormikProps<any>(form)

	const handlePaymentProcess = useCallback(async () => {
		setIsLoading(true)
		let payload = { email: emailId }
		try {
			if (emailId) {
				const { data, status } = await updateProfile(payload)
				await getContactorUserInfo()
				if (status === 200) {
					// console.log(data.payload.payload.email)
					setEmailId(data.payload.email)
					handelPayment(data.payload.email)
					handleEmailDialogBox()
					setIsLoading(false)
				}
			}
		} catch (error) {
			setIsLoading(false)
		}
	}, [emailId, getContactorUserInfo, handelPayment])

	const handleEmail = useCallback(
		(e) => {
			setEmailId(e.target.value)
			if (emailId === '') {
				setValid(true)
			} else if (e.target.value === '') {
				setValid(true)
			} else {
				setValid(!string().email().isValidSync(e.target.value))
			}
		},
		[emailId, valid]
	)

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
							sendAnalytics({
								name: 'editWage',
								action: 'ButtonClick',
								metaData: {
									origin: 'Checkout page',
									oldWage: {
										[key]: p[key],
									},
									newWage: {
										[key]: newWage,
									},
								},
							})
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
					<Typography fontSize={!isMobile ? '32px' : '24px'} fontWeight={600} color={primary.properDark}>
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
				<Stack
					my={2}
					sx={{
						width: { md: '45%', xs: '100%' },
					}}>
					<Stepper alternativeLabel activeStep={activeStepValue} connector={<QontoConnector />}>
						{stepsName.map((label) => (
							<Step key={label}>
								<StepLabel
									StepIconComponent={QontoStepIcon}
									sx={{
										// whiteSpace: 'nowrap',
										fontSize: '10px !important',
										'& .MuiStepLabel-label': {
											color: '#fff',
										},
									}}>
									{label}
								</StepLabel>
							</Step>
						))}
					</Stepper>
				</Stack>

				<Card sx={{ borderRadius: '15px', boxShadow: '0px 4px 35px rgba(0, 0, 0, 0.90)' }}>
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
									{!!discountDetails?.isEligible &&
										15 - (discountDetails?.discount?.quantity ?? 0) !== 0 && (
											<Typography
												display='inline'
												variant='h5'
												color='success.dark'
												fontWeight={600}>
												<Typography display='inline' color='common.white'>
													You have availed
												</Typography>{' '}
												{15 - (discountDetails?.discount?.quantity ?? 0)}/15 free applications
											</Typography>
										)}
									{!!discountDetails?.isEligible ? (
										<Typography variant='h3' fontWeight={600}>
											{discountDetails?.discount?.quantity &&
											discountDetails?.discount?.quantity < 15
												? 'Remaining'
												: 'First'}
											<Typography
												display='inline'
												variant='h3'
												fontWeight={600}
												color='primary.main'>
												{' '}
												{discountDetails?.discount?.quantity} Hero applications
											</Typography>{' '}
											are FREE!
										</Typography>
									) : (
										<Typography variant='h3' fontWeight={600}>
											Your Booking Details
										</Typography>
									)}
									<Typography variant='body1' fontWeight={400}>
										₹50 per application {!!discountDetails?.isEligible && 'thereafter'}
									</Typography>
								</Stack>
								<Stack mt={2}>
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
											if (discountDetails?.isEligible) {
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
										onClick={() => {
											if (user?.email) {
												handelPayment(user?.email)
											} else {
												handleEmailDialogBox()
											}
										}}
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

				<Dialog open={emailDialogBox} onClose={handleEmailDialogBox}>
					<DialogTitle>
						<IconButton onClick={handleEmailDialogBox}>
							<CloseIcon sx={{ color: primary.properDark }} />
						</IconButton>
					</DialogTitle>
					<DialogContent>
						<Stack direction={'column'} spacing={4}>
							<Stack direction={'column'} spacing={2}>
								<Typography
									variant='h2'
									fontFamily={' Saira ,sans-serif'}
									fontWeight={700}
									textAlign={'center'}
									color={primary.properDark}>
									Add Your Email
								</Typography>
								<Typography
									variant='body2'
									fontWeight={400}
									textAlign={'center'}
									fontFamily={'Karla , sans-serif'}
									color={primary.properDark}>
									We will send the copy of invoice on your email
								</Typography>
							</Stack>
							<TextField
								variant='outlined'
								type={'email'}
								placeholder='Enter Email'
								sx={{ outline: '1.8px solid #cccccc', overflow: 'hidden' }}
								value={emailId}
								onChange={(e) => {
									handleEmail(e)
								}}
							/>
							<LoadingButton
								variant='contained'
								disabled={valid}
								loading={isLoading}
								onClick={() => {
									handlePaymentProcess()
								}}>
								{bill.amountPayable !== 0 ? 'Proceed to pay' : 'Confirm and Book'}
							</LoadingButton>
						</Stack>
					</DialogContent>
				</Dialog>

				<Stack
					borderRadius='15px'
					sx={{ backgroundColor: 'info.main', zIndex: 1, boxShadow: '0px 4px 35px rgba(0, 0, 0, 0.90)' }}
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

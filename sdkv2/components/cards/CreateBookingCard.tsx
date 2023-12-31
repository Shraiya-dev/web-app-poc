import { ControlPoint, DeleteOutlined } from '@mui/icons-material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { LoadingButton } from '@mui/lab'
import {
	Autocomplete,
	Box,
	Button,
	Card,
	Checkbox,
	FormControlLabel,
	FormHelperText,
	IconButton,
	InputAdornment,
	ListSubheader,
	Stack,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { useFormik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { ListChildComponentProps, VariableSizeList } from 'react-window'
import { DataLayerPush, sendAnalytics } from 'sdk/analytics'
import { LinkButton, PhoneField } from 'sdk/components'
import { allCityList, primary } from 'sdk/constants'
import { useFormikProps } from 'sdk/hooks'
import { useContractorAuth, useSnackbar } from 'sdk/providers'
import { Dropdown, InputWrapper, useEasyBooking } from 'sdkv2/components'
import { JobType } from 'sdkv2/constants'
import * as Yup from 'yup'
import BookingStepper from '../EasyBookingStepper/BookingStepper'

interface Props {}

export const CreateBookingCard: FC<Props> = () => {
	const [step, setStep] = useState<number>(0)
	const { form, formikProps } = useEasyBooking()
	const { user, requestOtp, verifyOtp, createEasyBooking, otpMaxLimitReached } = useContractorAuth()
	const [timer, setTimer] = useState(0)
	const [otp, setOtp] = useState({
		sending: false,
		otp: '',
		error: false,
		edit: false,
		submitting: false,
		reSent: false,
		isWhatsAppOptIn: true,
	})
	useEffect(() => {
		if (!otp.reSent) return
		setTimer(30)
		const interval = setInterval(() => {
			setTimer((t) => {
				if (t <= 0) {
					return 0
				}
				return t - 1
			})
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [otp.reSent])
	const loginForm = useFormik({
		initialValues: {
			phoneNumber: '',
		},
		validationSchema: Yup.object({
			phoneNumber: Yup.number().required('Required*').min(1000000000, 'Valid Phone Number required'),
		}),
		onSubmit: () => {},
	})
	const [showLabel, setShowLabel] = useState<any>()

	const loginFormikProps = useFormikProps(loginForm)
	const { showSnackbar } = useSnackbar()
	return (
		<>
			<Card
				elevation={16}
				sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: !user?.hasProjects ? 550 : 0 }}>
				<>
					<Stack>
						<Stack p={2} sx={{ backgroundColor: '#000000' }}>
							{user?.hasProjects ? (
								<Stack
									p={{ xs: 0.5, md: 3 }}
									spacing={2}
									direction={{ xs: 'row', md: 'column' }}
									alignItems='center'
									justifyContent={'center'}>
									<Box
										component='img'
										sx={{ width: { xs: 50, md: 80 } }}
										src='/assets/landingv2/icons/live.svg'
									/>
									<Typography variant='h5' color='common.white'>
										You have already posted a job!
									</Typography>
								</Stack>
							) : (
								<>
									<Typography variant='h4' color='common.white' mb={2}>
										<Typography variant='inherit' component='span' color='primary.main'>
											Free
										</Typography>{' '}
										mein{' '}
										<Typography variant='inherit' component='span' color='primary.main'>
											Job Post Karen
										</Typography>{' '}
										aur ProjectHeroes ka number payen!
									</Typography>
									<BookingStepper step={step} />
								</>
							)}
						</Stack>
					</Stack>
					<Stack px={2} pt={step === 1 ? 0 : 2} pb={2} flex={1}>
						{user?.hasProjects ? (
							<Stack flex={1} p={{ xs: 0.5, md: 3 }} spacing={2}>
								<Stack flex={1}>
									<Typography
										fontWeight={400}
										variant='subtitle1'
										textAlign='center'
										alignItems='center'
										justifyContent={'center'}>
										Go to the contractor dashboard to view the phone numbers of all the
										ProjectHeroes who have applied to your job posting.
									</Typography>
								</Stack>
								<LinkButton
									fullWidth
									href='/dashboard'
									onClick={() => {
										sendAnalytics({
											name: 'goToDashboard',
											action: 'ButtonClick',
											metaData: {
												origin: 'overlay',
											},
										})
									}}>
									Go to Dashboard
								</LinkButton>
							</Stack>
						) : (
							<Box
								component='form'
								sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
								onSubmit={form.handleSubmit}>
								<Stack alignItems='flex-start' flex={1} spacing={1} justifyContent='space-between'>
									{step === 1 && (
										<Stack direction={'row'} justifyContent={'flex-start'}>
											<Button
												startIcon={<KeyboardBackspaceIcon sx={{ color: '#000' }} />}
												variant='text'
												sx={{
													color: primary.properDark,
												}}
												onClick={() => {
													setStep(0)
												}}>
												Back
											</Button>
										</Stack>
									)}
									{step === 0 && (
										<>
											<Typography fontWeight={700}>Work Details</Typography>
											<Autocomplete
												fullWidth
												disableListWrap
												ListboxComponent={ListboxComponent}
												options={allCityList}
												onChange={(e, v) => {
													form.setFieldValue('location', v?.value)
												}}
												groupBy={(option: { label: string; value: string }) =>
													option.label[0].toUpperCase()
												}
												renderInput={(params) => (
													<TextField
														error={formikProps('location').error}
														helperText={formikProps('location').helperText}
														placeholder='Site Location'
														{...params}
													/>
												)}
												renderOption={(props, option) =>
													[props, option.label] as React.ReactNode
												}
												renderGroup={(params) => params as unknown as React.ReactNode}
											/>
											<Dropdown
												fullWidth
												{...formikProps('jobType')}
												emptyState={{ label: 'Job Category', value: 'none' }}
												options={JobType}
											/>

											<Stack direction='row' width='100%' justifyContent='space-between'>
												<Typography variant='subtitle2' fontWeight={700}>
													Looking for
												</Typography>
												{(form.values.isHelper ||
													form.values.isSupervisor ||
													form.values.isTechnician) && (
													<Typography variant='subtitle2' color='grey.A400' fontWeight={700}>
														Daily Salary
													</Typography>
												)}
											</Stack>

											<Stack direction='row' width='100%' minHeight={56} alignItems='center'>
												{form.values.isHelper ? (
													<>
														<Typography
															flex={1}
															variant='body1'
															fontSize={14}
															fontWeight={700}>
															Helper
															{formikProps('helperWage').helperText && (
																<FormHelperText error={formikProps('helperWage').error}>
																	{formikProps('helperWage').helperText}
																</FormHelperText>
															)}
														</Typography>
														<TextField
															autoFocus
															disabled={!form.values.isHelper}
															sx={{
																maxWidth: { xs: '40%', md: 200 },
																'input::-webkit-input-placeholder': {
																	fontSize: { xs: '12px', md: '16px' },
																},
															}}
															type='number'
															placeholder='Enter Salary'
															label={showLabel?.isHelper ? 'Daily Salary' : undefined}
															{...formikProps('helperWage')}
															helperText={undefined}
															onClick={() => {
																setShowLabel({ isHelper: true })
															}}
															onChange={(e) => {
																form.setFieldValue(
																	e.target.name,
																	e.target.value !== ''
																		? parseInt(e.target.value)
																		: e.target.value
																)
															}}
															InputProps={{
																startAdornment: (
																	<InputAdornment
																		position='start'
																		sx={{
																			fontSize: { xs: '12px', md: '16px' },
																			'& .MuiTypography-root': {
																				color: '#4db07f',
																			},
																		}}>
																		&#8377;
																	</InputAdornment>
																),
																endAdornment: (
																	<InputAdornment
																		position='start'
																		sx={{
																			fontSize: { xs: '12px', md: '16px' },
																		}}>
																		/ day
																	</InputAdornment>
																),
															}}
														/>
														<IconButton
															color='error'
															onClick={() => {
																setShowLabel({ isHelper: false })

																form.setFieldValue('isHelper', false)
															}}>
															<DeleteOutlined />
														</IconButton>
													</>
												) : (
													<Button
														color='success'
														sx={{ color: 'success.dark' }}
														onClick={() => {
															setShowLabel({ isHelper: true })
															form.setFieldValue('isHelper', true)
														}}
														startIcon={<ControlPoint />}
														variant='text'>
														Add Helper
													</Button>
												)}
											</Stack>
											<Stack direction='row' width='100%' minHeight={56} alignItems='center'>
												{form.values.isTechnician ? (
													<>
														<Typography
															flex={1}
															variant='body1'
															fontSize={14}
															fontWeight={700}>
															Technician
															<FormHelperText error={formikProps('technicianWage').error}>
																{formikProps('technicianWage').helperText}
															</FormHelperText>
														</Typography>
														<TextField
															onClick={() => {
																setShowLabel({ isTechnician: true })
															}}
															autoFocus
															disabled={!form.values.isTechnician}
															sx={{
																maxWidth: { xs: '40%', md: 200 },
																'input::-webkit-input-placeholder': {
																	fontSize: { xs: '12px', md: '16px' },
																},
															}}
															type='number'
															placeholder='Enter Salary'
															label={showLabel?.isTechnician ? 'Daily Salary' : undefined}
															{...formikProps('technicianWage')}
															helperText={undefined}
															onChange={(e) => {
																form.setFieldValue(
																	e.target.name,
																	e.target.value !== ''
																		? parseInt(e.target.value)
																		: e.target.value
																)
															}}
															InputProps={{
																startAdornment: (
																	<InputAdornment
																		position='start'
																		sx={{
																			fontSize: { xs: '12px', md: '16px' },
																			'& .MuiTypography-root': {
																				color: '#4db07f',
																			},
																		}}>
																		&#8377;
																	</InputAdornment>
																),
																endAdornment: (
																	<InputAdornment
																		position='start'
																		sx={{
																			fontSize: { xs: '12px', md: '16px' },
																		}}>
																		/ day
																	</InputAdornment>
																),
															}}
														/>
														<IconButton
															color='error'
															onClick={() => {
																setShowLabel({ isTechnician: false })

																form.setFieldValue('isTechnician', false)
															}}>
															<DeleteOutlined />
														</IconButton>
													</>
												) : (
													<Button
														color='success'
														sx={{ color: 'success.dark' }}
														onClick={() => {
															setShowLabel({ isTechnician: true })

															form.setFieldValue('isTechnician', true)
														}}
														startIcon={<ControlPoint />}
														variant='text'>
														Add Technician
													</Button>
												)}
											</Stack>
											<Stack direction='row' width='100%' minHeight={56} alignItems='center'>
												{form.values.isSupervisor ? (
													<>
														<Typography
															flex={1}
															variant='body1'
															fontSize={14}
															fontWeight={700}>
															Supervisor
															<FormHelperText error={formikProps('supervisorWage').error}>
																{formikProps('supervisorWage').helperText}
															</FormHelperText>
														</Typography>
														<TextField
															onClick={() => {
																setShowLabel({ isSupervisor: true })
															}}
															autoFocus
															disabled={!form.values.isSupervisor}
															sx={{
																maxWidth: { xs: '40%', md: 200 },
																'input::-webkit-input-placeholder': {
																	fontSize: { xs: '12px', md: '16px' },
																},
															}}
															type='number'
															placeholder='Enter Salary'
															label={showLabel?.isSupervisor ? 'Daily Salary' : undefined}
															{...formikProps('supervisorWage')}
															helperText={undefined}
															onChange={(e) => {
																form.setFieldValue(
																	e.target.name,
																	e.target.value !== ''
																		? parseInt(e.target.value)
																		: e.target.value
																)
															}}
															InputProps={{
																startAdornment: (
																	<InputAdornment
																		position='start'
																		sx={{
																			fontSize: { xs: '12px', md: '16px' },
																			'& .MuiTypography-root': {
																				color: '#4db07f',
																			},
																		}}>
																		&#8377;
																	</InputAdornment>
																),
																endAdornment: (
																	<InputAdornment
																		position='start'
																		sx={{
																			fontSize: { xs: '12px', md: '16px' },
																		}}>
																		/ day
																	</InputAdornment>
																),
															}}
														/>
														<IconButton
															color='error'
															onClick={() => {
																setShowLabel({ isSupervisor: false })

																form.setFieldValue('isSupervisor', false)
															}}>
															<DeleteOutlined />
														</IconButton>
													</>
												) : (
													<Button
														color='success'
														sx={{ color: 'success.dark' }}
														onClick={() => {
															setShowLabel({ isSupervisor: true })

															form.setFieldValue('isSupervisor', true)
														}}
														startIcon={<ControlPoint />}
														variant='text'>
														Add Supervisor
													</Button>
												)}
											</Stack>
											<Button
												onClick={() => {
													setStep(1)
													sendAnalytics({
														name: 'postJobNotFormFill',
														action: 'ButtonClick',
														metaData: {
															values: {
																...form.values,
															},
														},
													})
													DataLayerPush({
														event: 'basic_info',
														location_name: form.values.location,
														job_category: form.values.jobType,
														helper_wages: form.values.isHelper
															? form.values.helperWage
															: undefined,
														technician_wages: form.values.isTechnician
															? form.values.technicianWage
															: undefined,
														Supervisor_wages: form.values.isSupervisor
															? form.values.supervisorWage
															: undefined,
													})
												}}
												disabled={
													!form.isValid ||
													!(
														form.values.isHelper ||
														form.values.isTechnician ||
														form.values.isSupervisor
													)
												}
												sx={{ alignSelf: 'flex-end', px: 5 }}>
												Next
											</Button>
										</>
									)}
									{step === 1 && (
										<Stack flex={1} width='100%' spacing={1}>
											<InputWrapper fullWidth label='Enter Phone Number'>
												<PhoneField
													autoFocus
													fullWidth
													disabled={otp.edit}
													{...loginFormikProps('phoneNumber')}
													InputProps={{
														startAdornment: (
															<InputAdornment position='start'>+91</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position='end'>
																{otp?.edit ? (
																	<Button
																		color='inherit'
																		disabled={loginFormikProps('phoneNumber').error}
																		variant='text'
																		sx={{ fontWeight: 'bold' }}
																		onClick={async () => {
																			setOtp((p) => ({ ...p, edit: false }))
																		}}>
																		Edit Number
																	</Button>
																) : (
																	<LoadingButton
																		loading={otp.sending}
																		color='success'
																		variant='contained'
																		sx={{ fontWeight: 'bold' }}
																		disabled={
																			loginFormikProps('phoneNumber').error ||
																			loginFormikProps('phoneNumber').value ===
																				'' ||
																			loginFormikProps('phoneNumber').value
																				.length !== 10
																		}
																		onClick={async () => {
																			setOtp((p) => ({
																				...p,
																				sending: true,
																				reSent: false,
																			}))
																			sendAnalytics({
																				name: 'sendOtp',
																				action: 'ButtonClick',
																				metaData: {
																					reSent: true,
																				},
																			})
																			DataLayerPush({
																				event: 'Discovery_request_otp',
																				Phone: loginForm.values.phoneNumber,
																			})
																			const { status, data } = await requestOtp(
																				'+91' + loginForm.values.phoneNumber
																			)
																			if (data.success) {
																				showSnackbar(
																					'OTP Sent Successfully',
																					'success'
																				)
																				setOtp((p) => ({
																					...p,
																					edit: true,
																					reSent: true,
																				}))
																			} else {
																				showSnackbar(
																					'Invalid PhoneNumber',
																					'error'
																				)
																			}
																			setOtp((p) => ({
																				...p,
																				sending: false,
																				otp: '',
																			}))
																		}}>
																		Send OTP
																	</LoadingButton>
																)}
															</InputAdornment>
														),
													}}
												/>
											</InputWrapper>
											<Stack spacing={2} flex={1}>
												<InputWrapper fullWidth label='Enter OTP'>
													<OtpInput
														value={otp.otp}
														onChange={(otp: any) => setOtp((p) => ({ ...p, otp: otp }))}
														numInputs={6}
														// isDisabled={!otp.edit}
														inputStyle={{
															borderRadius: '8px',
															width: 48,
															height: 48,
															border: '1px solid #afafaf',
															display: 'flex',
															justifyContent: 'space-between',
														}}
														focusStyle={{
															outline: '1px solid #EFC41A !important',
														}}
														isInputNum={true}
														hasErrored={otp.error}
														errorStyle={{ border: '1px solid #F70000' }}
														containerStyle={{ justifyContent: 'space-between' }}
													/>
												</InputWrapper>
												{otpMaxLimitReached ? (
													<Typography variant='caption' px={2} textAlign='center'>
														You have tried maximum login attemps. Please try again after 5
														mins
													</Typography>
												) : !otp.edit ? (
													<></>
												) : timer > 0 ? (
													<Typography variant='caption' textAlign='center'>
														Didn’t got OTP? Retry in 00:{timer >= 10 ? timer : '0' + timer}
													</Typography>
												) : (
													<LoadingButton
														sx={{ width: 'fit-content', alignSelf: 'center' }}
														variant='text'
														size='small'
														onClick={async () => {
															setOtp((p) => ({
																...p,
																sending: true,
																otp: '',
																reSent: false,
															}))
															sendAnalytics({
																name: 'sendOtp',
																action: 'ButtonClick',
																metaData: {
																	reSent: true,
																},
															})
															const { status, data } = await requestOtp(
																'+91' + loginForm.values.phoneNumber
															)
															if (data.success) {
																showSnackbar('OTP Sent Successfully', 'success')
																setOtp((p) => ({
																	...p,
																	reSent: true,
																}))
															} else {
																showSnackbar('Invalid PhoneNumber', 'error')
															}
															setOtp((p) => ({ ...p, sending: false }))
														}}
														color='inherit'>
														Resend
													</LoadingButton>
												)}
												<Stack flex={1}></Stack>
												<FormControlLabel
													onChange={(_, c) => setOtp((p) => ({ ...p, isWhatsAppOptIn: c }))}
													control={
														<Checkbox
															checked={otp.isWhatsAppOptIn}
															value={otp.isWhatsAppOptIn}
														/>
													}
													label='Send me WhatsApp updates'
													sx={{
														'& .MuiTypography-root': {
															color: primary.properDark,
														},
														'& .MuiFormControlLabel-root': {
															mt: '12px',
														},
													}}
												/>
												<LoadingButton
													disabled={otp.otp.length !== 6}
													onClick={async (e) => {
														setOtp((p) => ({ ...p, submitting: true }))
														const data = await verifyOtp(
															'+91' + loginForm.values.phoneNumber,
															otp.otp
														)
														if (!data.success) {
															setOtp((p) => ({
																...p,
																submitting: false,
																otp: '',
																error: true,
															}))
															sendAnalytics({
																name: 'otpVerification',
																action: 'ButtonClick',
																metaData: {
																	success: false,
																},
															})
															return
														}
														DataLayerPush({
															event: 'discovery_otp_verification',
														})
														if (otp.isWhatsAppOptIn) {
															sendAnalytics({
																name: 'whatsAppOptIn',
																action: 'ButtonClick',
																metaData: {
																	phoneNumber: loginForm.values.phoneNumber,
																},
															})
														}

														sendAnalytics({
															name: 'otpVerification',
															action: 'ButtonClick',
															metaData: {
																success: true,
															},
														})
														await createEasyBooking({
															...form.values,
															jobType: form.values.jobType,
															city: form.values.location.split(', ')[0],
															state: form.values.location.split(', ')[1],
														})

														setOtp((p) => ({ ...p, submitting: false }))
													}}
													loading={otp.submitting}
													variant='contained'>
													Confirm OTP and Post Job
												</LoadingButton>
											</Stack>
										</Stack>
									)}
								</Stack>
							</Box>
						)}
					</Stack>
				</>
			</Card>
		</>
	)
}

const LISTBOX_PADDING = 8 // px

function renderRow(props: ListChildComponentProps) {
	const { data, index, style } = props
	const dataSet = data[index]
	const inlineStyle = {
		...style,
		top: (style.top as number) + LISTBOX_PADDING,
	}

	if (dataSet.hasOwnProperty('group')) {
		return (
			<ListSubheader key={dataSet.key} component='div' style={inlineStyle}>
				{dataSet.group}
			</ListSubheader>
		)
	}

	return (
		<Typography component='li' {...dataSet[0]} noWrap style={inlineStyle}>
			{dataSet[1]}
		</Typography>
	)
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
	const outerProps = React.useContext(OuterElementContext)
	return <div ref={ref} {...props} {...outerProps} />
})
OuterElementType.displayName = 'OuterElementType'

function useResetCache(data: any) {
	const ref = React.useRef<VariableSizeList>(null)
	React.useEffect(() => {
		if (ref.current != null) {
			ref.current.resetAfterIndex(0, true)
		}
	}, [data])
	return ref
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function ListboxComponent(
	props,
	ref
) {
	const { children, ...other } = props
	const itemData: React.ReactChild[] = []
	;(children as React.ReactChild[]).forEach((item: React.ReactChild & { children?: React.ReactChild[] }) => {
		itemData.push(item)
		itemData.push(...(item.children || []))
	})

	const theme = useTheme()
	const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
		noSsr: true,
	})
	const itemCount = itemData.length
	const itemSize = smUp ? 36 : 48

	const getChildSize = (child: React.ReactChild) => {
		if (child.hasOwnProperty('group')) {
			return 48
		}

		return itemSize
	}

	const getHeight = () => {
		if (itemCount > 8) {
			return 8 * itemSize
		}
		return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
	}

	const gridRef = useResetCache(itemCount)

	return (
		<div ref={ref}>
			<OuterElementContext.Provider value={other}>
				<VariableSizeList
					itemData={itemData}
					height={getHeight() + 2 * LISTBOX_PADDING}
					width='100%'
					ref={gridRef}
					outerElementType={OuterElementType}
					innerElementType='ul'
					itemSize={(index) => getChildSize(itemData[index])}
					overscanCount={5}
					itemCount={itemCount}>
					{renderRow}
				</VariableSizeList>
			</OuterElementContext.Provider>
		</div>
	)
})

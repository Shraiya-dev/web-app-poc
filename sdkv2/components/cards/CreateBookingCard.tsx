import { ControlPoint, DeleteOutlined } from '@mui/icons-material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { LoadingButton } from '@mui/lab'
import {
	Autocomplete,
	Button,
	Card,
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
import { add, sub } from 'date-fns'
import { useFormik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { ListChildComponentProps, VariableSizeList } from 'react-window'
import { PhoneField } from 'sdk/components'
import { allCityList, primary } from 'sdk/constants'
import { useFormikProps } from 'sdk/hooks'
import { useContractorAuth, useSnackbar } from 'sdk/providers'
import { capitalize } from 'sdk/utils'
import { Dropdown, InputWrapper, useEasyBooking } from 'sdkv2/components'
import { JobType } from 'sdkv2/constants'
import * as Yup from 'yup'
import BookingStepper from '../EasyBookingStepper/BookingStepper'

interface Props {}

export const CreateBookingCard: FC<Props> = () => {
	const [step, setStep] = useState<number>(1)
	const { form, formikProps } = useEasyBooking()
	const { requestOtp } = useContractorAuth()
	const [timer, setTimer] = useState(0)
	const [otp, setOtp] = useState({
		sending: false,
		otp: '',
		error: false,
		edit: false,
		reSent: false,
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
		}, 100)

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
	const loginFormikProps = useFormikProps(loginForm)
	const { showSnackbar } = useSnackbar()

	return (
		<>
			<Card elevation={16} sx={{ flex: 1 }}>
				<Stack>
					<Stack p={2} sx={{ backgroundColor: '#000000' }}>
						<Typography variant='h4' color='common.white'>
							Job Posting is Completely{' '}
							<Typography display='inline' variant='h4' color='primary.main'>
								FREE!
							</Typography>
						</Typography>
						<BookingStepper />
					</Stack>
				</Stack>
				<Stack px={{ xs: 2 }}>
					<form onSubmit={form.handleSubmit}>
						<Stack alignItems='flex-start' spacing={1}>
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
										getOptionLabel={(options) => options.label}
										isOptionEqualToValue={(opt, v) => v.value === opt?.value}
										value={{
											label: capitalize(form.values.location ?? ''),
											value: form.values.location ?? '',
										}}
										onChange={(e, v) => {
											form.setFieldValue('location', v?.value)
										}}
										groupBy={(option: { label: string; value: string }) =>
											option.label[0].toUpperCase()
										}
										renderInput={(params) => (
											<TextField
												{...params}
												error={formikProps('location').error}
												helperText={formikProps('location').helperText}
												placeholder='Site Location'
											/>
										)}
										renderOption={(props, option) => [props, option.label] as React.ReactNode}
										renderGroup={(params) => params as unknown as React.ReactNode}
									/>
									<Dropdown
										fullWidth
										{...formikProps('jobType')}
										emptyState={{ label: 'Select Job Category', value: 'none' }}
										options={JobType}
									/>

									<Stack direction='row' width='100%' justifyContent='space-between'>
										<Typography variant='subtitle2' fontWeight={700}>
											Looking for
										</Typography>
										<Typography variant='subtitle2' fontWeight={700} color='grey.A400'>
											Daily Salary
										</Typography>
									</Stack>

									<Stack direction='row' width='100%' alignItems='flex-start'>
										<Typography flex={1} variant='body1' fontWeight={700}>
											Helper
											<FormHelperText error={formikProps('helperWage').error}>
												{formikProps('helperWage').helperText}
											</FormHelperText>
										</Typography>
										{form.values.isHelper ? (
											<>
												<TextField
													disabled={!form.values.isHelper}
													sx={{
														maxWidth: { xs: '50%', md: 200 },
														'input::-webkit-input-placeholder': {
															fontSize: { xs: '12px', md: '16px' },
														},
													}}
													type='number'
													placeholder='Enter Wage'
													{...formikProps('helperWage')}
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
													sx={{ mt: 1 }}
													onClick={() => {
														form.setFieldValue('isHelper', false)
														form.setFieldValue('helperWage', undefined)
														form.setFieldTouched('helperWage', false)
													}}>
													<DeleteOutlined />
												</IconButton>
											</>
										) : (
											<Button
												onClick={() => {
													form.setFieldValue('isHelper', true)
												}}
												startIcon={<ControlPoint />}
												variant='text'>
												Add Helper
											</Button>
										)}
									</Stack>
									<Stack direction='row' width='100%' alignItems='flex-start'>
										<Typography flex={1} variant='body1' fontWeight={700}>
											Technician
											<FormHelperText error={formikProps('technicianWage').error}>
												{formikProps('technicianWage').helperText}
											</FormHelperText>
										</Typography>
										{form.values.isTechnician ? (
											<>
												<TextField
													disabled={!form.values.isTechnician}
													sx={{
														maxWidth: { xs: '50%', md: 200 },
														'input::-webkit-input-placeholder': {
															fontSize: { xs: '12px', md: '16px' },
														},
													}}
													type='number'
													placeholder='Enter Wage'
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
													sx={{ mt: 1 }}
													onClick={() => {
														form.setFieldValue('isTechnician', false)
														form.setFieldValue('technicianWage', undefined)
														form.setFieldTouched('technicianWage', false)
													}}>
													<DeleteOutlined />
												</IconButton>
											</>
										) : (
											<Button
												onClick={() => {
													form.setFieldValue('isTechnician', true)
												}}
												startIcon={<ControlPoint />}
												variant='text'>
												Add Technician
											</Button>
										)}
									</Stack>
									<Stack direction='row' width='100%' alignItems='flex-start'>
										<Typography flex={1} variant='body1' fontWeight={700}>
											Supervisor
											<FormHelperText error={formikProps('supervisorWage').error}>
												{formikProps('supervisorWage').helperText}
											</FormHelperText>
										</Typography>
										{form.values.isSupervisor ? (
											<>
												<TextField
													disabled={!form.values.isSupervisor}
													sx={{
														maxWidth: { xs: '50%', md: 200 },
														'input::-webkit-input-placeholder': {
															fontSize: { xs: '12px', md: '16px' },
														},
													}}
													type='number'
													placeholder='Enter Wage'
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
													sx={{ mt: 1 }}
													onClick={() => {
														form.setFieldValue('isSupervisor', false)
														form.setFieldValue('supervisorWage', undefined)
														form.setFieldTouched('supervisorWage', false)
													}}>
													<DeleteOutlined />
												</IconButton>
											</>
										) : (
											<Button
												onClick={() => {
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
										}}
										disabled={
											!form.isValid ||
											!(form.values.isHelper || form.values.isHelper || form.values.isHelper)
										}
										sx={{ alignSelf: 'flex-end', px: 5 }}>
										Next
									</Button>
								</>
							)}
							{step === 1 && (
								<Stack width='100%' spacing={1}>
									<InputWrapper fullWidth label='Enter Phone Number'>
										<PhoneField
											fullWidth
											disabled={otp.edit}
											{...loginFormikProps('phoneNumber')}
											InputProps={{
												startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
												endAdornment: (
													<InputAdornment position='end'>
														{otp?.edit ? (
															<Button
																color='inherit'
																disabled={loginFormikProps('phoneNumber').error}
																variant='text'
																onClick={async () => {
																	setOtp((p) => ({ ...p, edit: false }))
																}}>
																Edit Number
															</Button>
														) : (
															<LoadingButton
																loading={otp.sending}
																color='success'
																disabled={
																	loginFormikProps('phoneNumber').error ||
																	loginFormikProps('phoneNumber').value === ''
																}
																variant='text'
																onClick={async () => {
																	setOtp((p) => ({
																		...p,
																		sending: true,
																		reSent: false,
																	}))

																	const { status, data } = await requestOtp(
																		'+91' + loginForm.values.phoneNumber
																	)
																	if (data.success) {
																		showSnackbar('Otp sent Successfully', 'success')
																		setOtp((p) => ({
																			...p,
																			edit: true,
																			reSent: true,
																		}))
																	} else {
																		showSnackbar('Invalid PhoneNumber', 'error')
																	}
																	setOtp((p) => ({ ...p, sending: false }))
																}}
																sx={{ color: 'success.dark' }}>
																Send Otp
															</LoadingButton>
														)}
													</InputAdornment>
												),
											}}
										/>
									</InputWrapper>
									<InputWrapper fullWidth label='Enter OTP'>
										<OtpInput
											value={otp.otp}
											onChange={(otp: any) => setOtp((p) => ({ ...p, otp: otp }))}
											numInputs={6}
											isDisabled={!otp.edit}
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
											shouldAutoFocus={true}
											isInputNum={true}
											hasErrored={otp.error}
											errorStyle={{ border: '1px solid #F70000' }}
											containerStyle={{ justifyContent: 'space-between' }}
										/>
									</InputWrapper>
									{!otp.edit ? (
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
												setOtp((p) => ({ ...p, sending: true, reSent: false }))

												const { status, data } = await requestOtp(
													'+91' + loginForm.values.phoneNumber
												)
												if (data.success) {
													showSnackbar('Otp sent Successfully', 'success')
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
								</Stack>
							)}
						</Stack>
					</form>
				</Stack>
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

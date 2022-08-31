import {
	Autocomplete,
	Box,
	Button,
	Card,
	Checkbox,
	DialogContent,
	FormControlLabel,
	IconButton,
	InputAdornment,
	InputLabel,
	ListSubheader,
	Paper,
	Stack,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { ListChildComponentProps, VariableSizeList } from 'react-window'
import { DataLayerPush, sendAnalytics } from 'sdk/analytics'
import { allCityList, primary, theme } from 'sdk/constants'
import { capitalize } from 'sdk/utils'
import { Dropdown, InputWrapper, useEasyBooking } from 'sdkv2/components'
import { JobType, projectDuration } from 'sdkv2/constants'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import { StepIconProps } from '@mui/material/StepIcon'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CloseIcon from '@mui/icons-material/Close'
import { CheckBoxOutlineBlank, Label } from '@mui/icons-material'
import { OTPVerification } from 'modules/auth/otp/components/OtpVerification'
import { LoginForm } from 'modules/auth/login/components/LoginForm'
import { useRouter } from 'next/router'
import { useContractorAuth } from 'sdk/providers'
import BookingStepper from '../EasyBookingStepper/BookingStepper'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import CheckIcon from '@mui/icons-material/Check'

interface Props {}

export const CreateBookingCard: FC<Props> = () => {
	const [step, setStep] = useState<number>(0)
	const { user } = useContractorAuth()
	const { form, formikProps } = useEasyBooking()
	const router = useRouter()
	const [activeStepValue, setActiveStepValue] = useState<number>(0)

	useEffect(() => {
		setActiveStepValue(Number(!!router?.query?.bookingFromStep) ? Number(router?.query?.bookingFromStep) : 0)
		if (Number(router?.query?.bookingFromStep) === 0) {
			setStep(0)
		} else if (Number(router?.query?.bookingFromStep) >= 1) {
			setStep(1)
		} else {
			setStep(0)
		}
	}, [router.query, step, activeStepValue])

	// const [wageDisable, setWageDisable] = useState({
	// 	helperWage: false,
	// 	technicianWage: false,
	// 	supervisorWage: false,
	// })

	return (
		<>
			<Card elevation={16}>
				<Stack px={{ xs: 2, md: 4 }} py={4}>
					<Stack>
						<Typography
							variant='h3'
							fontFamily={'Saira , sans-serif'}
							fontWeight={700}
							fontSize={{ md: '24px', xs: '16px' }}>
							First{' '}
							<Typography
								variant='h3'
								fontFamily={'Saira , sans-serif'}
								fontWeight={700}
								fontSize={{ md: '24px', xs: '16px' }}
								color='primary.main'
								display='inline'>
								15 HERO
							</Typography>{' '}
							applications for FREE!
						</Typography>
						<Typography
							mt={2}
							fontFamily={'Saira , sans-serif'}
							fontWeight={400}
							fontSize={{ md: '12px', xs: '12px' }}
							color={'#000'}>
							Only Rs 50 per HERO Application
						</Typography>
						<Typography
							variant='caption'
							fontFamily={'Saira , sans-serif'}
							fontWeight={400}
							fontSize={{ md: '12px', xs: '12px' }}
							color={'#000'}>
							*after receiving 15 applications
						</Typography>
					</Stack>
					<Stack my={2}>
						<BookingStepper isLogin={false} />
					</Stack>
					{step === 1 && (
						<Stack direction={'row'} justifyContent={'flex-start'}>
							<Button
								startIcon={<KeyboardBackspaceIcon sx={{ color: '#000' }} />}
								variant='text'
								sx={{
									color: primary.properDark,
								}}
								onClick={() => {
									router.push({
										pathname: '',
										query: { bookingFromStep: 0 },
									})
								}}>
								Back
							</Button>
						</Stack>
					)}
					<form onSubmit={form.handleSubmit}>
						<Stack spacing={2.5} my={2} alignItems='flex-start' pr={step === 0 ? 6 : { xs: 0, md: 3 }}>
							{step === 0 && (
								<>
									<InputWrapper fullWidth label='Select Location'>
										<Autocomplete
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
													error={formikProps('location').error}
													helperText={formikProps('location').helperText}
													placeholder='Select Location'
													{...params}
												/>
											)}
											renderOption={(props, option) => [props, option.label] as React.ReactNode}
											renderGroup={(params) => params as unknown as React.ReactNode}
										/>
										{/* <Dropdown
											fullWidth
											{...formikProps('location')}
											emptyState={{ label: 'Site Location', value: 'none' }}
											options={allCityList}
										/> */}
									</InputWrapper>
									<InputWrapper fullWidth label='Job Category'>
										<Dropdown
											fullWidth
											{...formikProps('jobType')}
											emptyState={{ label: 'Select Job Category', value: 'none' }}
											options={JobType}
										/>
									</InputWrapper>
									<InputWrapper
										fullWidth
										label={
											<>
												Work Duration
												<Typography display='inline' color='grey.A400'>
													&nbsp;*minimum 1 month
												</Typography>
											</>
										}>
										<Dropdown
											fullWidth
											{...formikProps('workDuration')}
											emptyState={{ label: 'Enter Work Duration', value: 'none' }}
											options={projectDuration}
										/>
									</InputWrapper>
									<Button
										disabled={
											!!(
												form.errors['location'] ||
												form.errors['jobType'] ||
												form.errors['workDuration']
											)
										}
										onClick={(e) => {
											if (
												!(
													form.errors['location'] ||
													form.errors['jobType'] ||
													form.errors['workDuration'] ||
													form.values['workDuration'] === 'none'
												)
											) {
												DataLayerPush({
													event: 'basic_info',
													location: form.values.location,
													jobType: form.values.jobType,
													workDuration: form.values.workDuration,
												})
												sendAnalytics({
													name: 'CreateEasyBookWorker',
													action: 'ButtonClick',
													metaData: {
														step: 'basic info',
														values: {
															location: form.values.location,
															workDuration: form.values.workDuration,
															jobType: form.values.jobType,
														},
													},
												})
												setStep(1)
												router.push({
													pathname: '',
													query: { bookingFromStep: 1 },
												})
											} else {
												form.setTouched({
													location: true,
													jobType: true,
													workDuration: true,
												})
												form.validateForm()
											}
										}}
										sx={{ width: '50%' }}
										size='large'
										variant='contained'>
										Next
									</Button>
								</>
							)}
							{step === 1 && (
								<>
									<InputWrapper fullWidth label='Specify booking details'>
										<Stack spacing={3} mt={2} pr={{ xs: 0, md: 5 }}>
											<Stack
												direction='row'
												justifyContent='space-between'
												alignItems='flex-start'>
												<FormControlLabel
													sx={{ mt: 1 }}
													control={
														<Checkbox
															checked={form.values.isHelper}
															checkedIcon={
																<CheckIcon
																	sx={{
																		color: '#000',
																		background: '#efc430',
																		fontSize: '24px',
																		borderRadius: '4px',
																	}}
																/>
															}
															onChange={(e, v) => {
																form.setFieldValue('helperWage', '')
																form.setFieldValue('isHelper', v)
															}}
															sx={{
																color: theme.palette.primary.main,
															}}
														/>
													}
													label='Helper'
												/>
												<TextField
													disabled={!form.values.isHelper}
													sx={{
														maxWidth: { xs: '56%', md: 200 },
														'input::-webkit-input-placeholder': {
															fontSize: { xs: '12px', md: '16px' },
														},
													}}
													type='number'
													InputProps={{
														startAdornment: (
															<InputAdornment
																position='start'
																sx={{
																	fontSize: {
																		xs: '12px',
																		md: '16px',
																	},
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
													placeholder='Enter Wage'
													{...formikProps('helperWage')}
													onChange={(e) => {
														form.setFieldValue(
															e.target.name,
															e.target.value !== ''
																? parseInt(e.target.value)
																: e.target.value
														)
													}}
												/>
											</Stack>
											<Stack
												direction='row'
												justifyContent='space-between'
												alignItems='flex-start'>
												<FormControlLabel
													sx={{ mt: 1 }}
													control={
														<Checkbox
															checked={form.values.isTechnician}
															checkedIcon={
																<CheckIcon
																	sx={{
																		color: '#000',
																		background: '#efc430',
																		fontSize: '24px',
																		borderRadius: '4px',
																	}}
																/>
															}
															onChange={(e, v) => {
																form.setFieldValue('technicianWage', '')
																form.setFieldValue('isTechnician', v)
															}}
															sx={{
																color: theme.palette.primary.main,
															}}
														/>
													}
													label='Technician'
												/>

												<TextField
													disabled={!form.values.isTechnician}
													sx={{
														maxWidth: { xs: '56%', md: 200 },
														'input::-webkit-input-placeholder': {
															fontSize: { xs: '12px', md: '16px' },
														},
													}}
													type='number'
													placeholder='Enter Wage'
													{...formikProps('technicianWage')}
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
											</Stack>
											<Stack
												direction='row'
												justifyContent='space-between'
												alignItems={'flex-start'}>
												<FormControlLabel
													sx={{ mt: 1 }}
													control={
														<Checkbox
															checked={form.values.isSupervisor}
															checkedIcon={
																<CheckIcon
																	sx={{
																		color: '#000',
																		background: '#efc430',
																		fontSize: '24px',
																		borderRadius: '4px',
																	}}
																/>
															}
															onChange={(e, v) => {
																form.setFieldValue('supervisorWage', '')
																form.setFieldValue('isSupervisor', v)
															}}
															sx={{
																color: theme.palette.primary.main,
															}}
														/>
													}
													label='Supervisor'
												/>

												<TextField
													disabled={!form.values.isSupervisor}
													sx={{
														maxWidth: { xs: '56%', md: 200 },
														'input::-webkit-input-placeholder': {
															fontSize: { xs: '12px', md: '16px' },
														},
													}}
													type='number'
													placeholder='Enter Wage'
													{...formikProps('supervisorWage')}
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
											</Stack>
										</Stack>
									</InputWrapper>
									<Button
										size='large'
										variant='contained'
										type='submit'
										disabled={
											!form.dirty ||
											!form.isValid ||
											!(
												form.values.isHelper ||
												form.values.isSupervisor ||
												form.values.isTechnician
											)
										}>
										Book Workers Now
									</Button>
								</>
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

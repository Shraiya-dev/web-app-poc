import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Chip, Container, Grid, Paper, Stack, styled, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Helper from '../../../public/assets/icons/helper.svg'
import Supervisor from '../../../public/assets/icons/supervisor.svg'
import Technician from '../../../public/assets/icons/technician.svg'
import { checkError, InputWrapper, primary, theme, useContractorAuth, useSnackbar } from '../../../sdk'
import { CustomTimePicker } from '../../../sdk/components/timepicker/customTimePicker'
import { useMobile } from '../../../sdk/hooks/useMobile'
import { createBooking } from '../apis/apis'
import useCreateBooking from '../hooks/useCreateBooking'
import { jobTypeInfo, moreJobType, projectDuration, tags } from '../utils/helperData'
import ConfirmCancel from './confirmCancel'
import BookingSvg from '../../../public/assets/icons/booking.svg'
import { TopBanner } from '../../../sdk/components/banner/formBanner'
import { useRouter } from 'next/router'
import { Analytic } from '../../../sdk/analytics'
import { ButtonClicked } from '../../../sdk/analytics/analyticsWrapper'

const CustomBookingStyle = styled(Box)(({ theme }) => ({
	'.main': {
		justifyContent: 'center',
		display: 'flex',
		padding: 24,
		marginBottom: 40,
	},

	'.stepper': {
		height: 6,
		width: 36,

		borderRadius: 2,
		margin: 4,
		background: theme.palette.primary.light,
	},

	'.viewcta': {
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		color: theme.palette.primary.main,
		padding: 10,
	},

	'.stickyBottomBox': {
		position: 'sticky',

		bottom: 0,
		marginTop: 50,

		overflowY: 'none',
		zIndex: 1,
	},
	'.header': {
		fontSize: 36,
		fontWeight: 600,
		color: theme.palette.primary.main,
	},
	'.subHeader': {
		fontSize: 18,
		color: theme.palette.primary.main,
		fontWeight: 400,
	},
	'.subInfo': {
		fontSize: 13,
		fontWeight: 500,
		color: theme.palette.secondary.main,
		paddingBottom: 8,
	},
	'.subInfoError': {
		fontSize: 13,
		fontWeight: 500,
		color: theme.palette.error.main,
		paddingBottom: 20,
	},
	'.bottomButton': {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',

		paddingBottom: 16,
		paddingTop: 16,
		background: 'white',
		overflow: 'hidden',
	},
	'.loadingcta': {
		borderRadius: 30,
		textTransform: 'inherit',
		padding: '12px 22px',
		background: theme.palette.primary.main,
		color: 'white',
		width: '10rem',
	},
	'.prevCta': {
		width: '10rem',
		marginLeft: '14%',
	},
	'.jobType': {
		borderRadius: 8,
		padding: 8,
		color: 'rgba(6, 31, 72, 0.7)',
		height: 100,
		width: 100,
		textTransform: 'none',
		border: '1px solid #C2C9D2',
		boxShadow: 'none',
		lineHeight: 1.4,
	},
	'.view': {
		verticalAlign: 'middle',
		display: 'flex',
	},
	'.borderCta': {
		borderRadius: 8,
		padding: 8,
		color: 'rgba(6, 31, 72, 0.7)',

		textTransform: 'none',
		border: '1px solid #C2C9D2',
		boxShadow: 'none',
		lineHeight: 1.4,
	},
}))

export const CreateBooking = () => {
	const {
		form,
		step,
		setStep,
		handlePrev,
		projectName,
		setProjectName,
		isSubmittable,
		setIsSubmittable,
		loading,
		setLoading,
	} = useCreateBooking()

	const [isMore, setIsmore] = useState(false)
	const [projectDurationInfo, setProjectDuration] = useState<string>()
	const [selectedJob, setSelectedjob] = useState('')
	const [shiftTiming, setShiftTiming] = useState('')

	//const [isSubmittable, setIsSubmittable] = useState<boolean>(false)
	//const [loading, setLoading] = useState<boolean>(false)

	const [onCloseDialog, setOncloseDialog] = useState(false)

	const isMobile = useMobile()
	const { user } = useContractorAuth()
	const router = useRouter()
	const { showSnackbar } = useSnackbar()

	const fixTiming = `09:00 AM - 06:00 PM`

	const workerType = [
		{
			label: 'Technician',
			icon: Technician,
			name: 'technician',
			wage: 'technicianWages',
			formvalue: form.values.technician,
			wageformvalue: form.values.technicianWages,
			error: form.errors.technician,
		},
		{
			label: 'Helper',
			icon: Helper,
			name: 'helper',
			wage: 'helperWages',
			formvalue: form.values.helper,
			wageformvalue: form.values.helperWages,
			error: form.errors.helper,
		},
		{
			label: 'Supervisor',
			icon: Supervisor,
			name: 'supervisor',
			wage: 'supervisorWages',
			formvalue: form.values.supervisor,
			wageformvalue: form.values.supervisorWages,
			error: form.errors.supervisor,
		},
	]

	useEffect(() => {
		let canSubmit: boolean =
			!form.values.jobType ||
			!form.isValid ||
			!form.values.BookingDuration ||
			!form.values.startTime ||
			!form.values.endTime ||
			form.values.startTime === 'none' ||
			form.values.endTime === 'none'

		setIsSubmittable(canSubmit)
	}, [form])

	const handleMoreJobType = () => {
		setIsmore((state) => !state)
	}

	const handleProjectDuration = (info: any) => {
		setProjectDuration(info)
		form.setFieldValue('BookingDuration', info)
	}

	const handleJobClick = (info: any) => {
		form.setFieldValue('jobType', info)
		form.setFieldValue('tags', [])
		setSelectedjob(info)
	}

	const handleShiftTiming = (info: any) => {
		form.setFieldValue('startTime', '09:00 AM')
		form.setFieldValue('endTime', '06:00 PM')
		setShiftTiming(info)
	}

	const getErrorString = () => {
		return form.errors.helper ||
			form.errors.technician ||
			form.errors.supervisor ||
			form.errors.helperWages ||
			form.errors.technicianWages ||
			form.errors.supervisorWages ? (
			<Typography className='subInfoError'>
				At least 1 technician, helper or supervisor is required with wages
			</Typography>
		) : (
			''
		)
	}
	return (
		<CustomBookingStyle>
			<TopBanner
				header={`Book Workers`}
				subHeader={`Book workers for the project `}
				bannerSvg={BookingSvg}
				onClick={() => {
					setOncloseDialog(true)
					ButtonClicked({
						action: 'Leave',
						page: 'Create Booking',
						projectId: router?.query?.projectId,
						url: router.asPath,
					})
				}}
				visibleCloseIcon={step === 1}
				linkHeader={projectName}
				link={`/projects/${router.query.projectId}/bookings`}
			/>

			<Container className='main' maxWidth={'md'}>
				<ConfirmCancel
					onCloseDialog={onCloseDialog}
					setOncloseDialog={setOncloseDialog}
					header={'Leave Booking Workers?'}
				/>

				<Box>
					<form onSubmit={form.handleSubmit}>
						<Stack spacing={5}>
							<InputWrapper id='jobType' label='Trade'>
								<Grid container item rowSpacing={2} columnSpacing={2} style={{ marginBottom: 10 }}>
									{jobTypeInfo.map((info, index) => {
										return (
											<Grid key={index} item xs={4} sm={4} md={2} lg={2}>
												<Button
													className='jobType'
													variant='outlined'
													onClick={() => handleJobClick(info?.value)}
													style={{
														background:
															selectedJob === info?.value
																? theme.palette.primary.light
																: 'white',

														border:
															selectedJob === info?.value
																? `2px solid ${theme.palette.primary.main}`
																: `1px solid ${theme.palette.secondary.light}`,
													}}>
													<Box>
														<Image src={info?.icon} />

														<Stack>{info?.label}</Stack>
													</Box>
												</Button>
											</Grid>
										)
									})}
								</Grid>

								{isMore && (
									<Box>
										<Grid container item rowSpacing={2} columnSpacing={2}>
											{moreJobType.map((info, index) => {
												return (
													<Grid key={index} item xs={4} sm={4} md={2} lg={2}>
														<Button
															className='jobType'
															onClick={() => handleJobClick(info?.value)}
															style={{
																background:
																	selectedJob === info?.value
																		? theme.palette.primary.light
																		: 'white',
																border:
																	selectedJob === info?.value
																		? `2px solid ${theme.palette.primary.main}`
																		: `1px solid ${theme.palette.secondary.light}`,
															}}>
															<Stack>
																<Image src={info?.icon} />

																<Stack>{info?.label}</Stack>
															</Stack>
														</Button>
													</Grid>
												)
											})}
										</Grid>
									</Box>
								)}
								<Grid
									container
									spacing={0}
									direction='column'
									alignItems='center'
									justifyContent='center'
									style={{ marginBottom: 10 }}>
									{!!checkError('jobType', form) && (
										<Typography style={{ color: 'red', padding: 10 }}>
											Please Select a JobType!!
										</Typography>
									)}
									<Stack
										className='viewcta'
										onClick={handleMoreJobType}
										style={{ textTransform: 'none' }}>
										{isMore ? (
											<Box>
												<Typography className='view' display='inline' color={'primary.main'}>
													View Less <KeyboardArrowUpIcon />
												</Typography>
											</Box>
										) : (
											<Box>
												<Typography className='view' display='inline' color={'primary.main'}>
													View More <KeyboardArrowDownIcon />
												</Typography>
											</Box>
										)}
									</Stack>
								</Grid>
							</InputWrapper>

							<InputWrapper id='skills' label='Skills'>
								<Typography className='subInfo'>
									Skills you are looking for the selected trade
								</Typography>
								<Grid item xs={12} md={12}>
									<Stack direction='row' flexWrap='wrap'>
										{tags[form.values.jobType]?.map((item: any) => {
											return (
												<Chip
													variant='outlined'
													style={{
														background: form.values.tags.includes(item)
															? theme.palette.primary.light
															: 'white',
														color: form.values.tags.includes(item)
															? theme.palette.primary.main
															: '',

														border: form.values.tags.includes(item)
															? `2px solid ${theme.palette.primary.main}`
															: ``,
													}}
													sx={{
														mr: 1,
														mb: 1,
													}}
													key={item}
													label={item}
													clickable
													onClick={
														!form.values.tags.includes(item)
															? () => {
																	form.setFieldValue('tags', [
																		...form.values.tags,
																		item,
																	])
															  }
															: undefined
													}
													onDelete={
														form.values.tags.includes(item)
															? () => {
																	form.setFieldValue('tags', [
																		...form.values.tags.filter(
																			(val) => val !== item
																		),
																	])
															  }
															: undefined
													}
												/>
											)
										})}
									</Stack>
								</Grid>
							</InputWrapper>

							<InputWrapper
								id='workerType'
								label={`Workers Required & Daily Wage`}
								toolTip={'Daily wage per worker'}>
								{getErrorString()}
								<Grid container spacing={4}>
									{workerType.map((info, index) => {
										return (
											<Grid
												key={index}
												container
												item
												alignItems={'flex-start'}
												display='flex'
												spacing={2}>
												<Grid container item xs={12} sm={12} md={2.5}>
													<Image src={info?.icon} style={{ float: 'left' }} />

													<Typography
														style={{
															float: 'right',
															margin: 16,
															fontSize: 16,
															color: 'rgba(6, 31, 72, 0.7)',
														}}>
														{info?.label}
													</Typography>
												</Grid>
												<Grid item xs={12} sm={12} md={2.5}>
													<TextField
														label={`${info?.label} Required`}
														placeholder={`Enter ${info?.label}`}
														id={info?.name}
														name={info?.name}
														value={info?.formvalue}
														type='number'
														onChange={(e: any) => {
															if (
																e.target.value >= 0 &&
																e.target.value <=
																	(info?.name === 'supervisor' ? 50 : 500)
															) {
																form.setFieldValue(e.target.name, e.target.value)
															}
														}}
														fullWidth
														onBlur={form.handleBlur}
														error={!!checkError(`${info?.name}`, form)}
													/>
												</Grid>
												<Grid item xs={12} sm={12} md={4}>
													<TextField
														label='Daily wage (Rs.)'
														placeholder='Enter wage'
														id={info?.wage}
														name={info?.wage}
														value={info?.wageformvalue > 0 ? info?.wageformvalue : ''}
														type='number'
														onChange={(e: any) => {
															if (e.target.value >= 0 && e.target.value <= 2000) {
																form.setFieldValue(
																	e.target.name,
																	Number(e.target.value)
																)
															}
														}}
														fullWidth
														onBlur={form.handleBlur}
														error={!!checkError(`${info?.wage}`, form)}
													/>
												</Grid>
											</Grid>
										)
									})}
								</Grid>
							</InputWrapper>

							{/* <Box>
										<InputWrapper id='overtime' label='Overtime Details'>
											<Typography className='subInfo'>
												This factor will be multiplied with daily wage to calculate overtime
												wage
											</Typography>
											<Grid
												container
												alignItems={'flex-start'}
												spacing={2}
												style={{ marginBottom: 10 }}>
												<Grid item xs={12} sm={12} md={4}>
													<FormControl fullWidth>
														<Select
															labelId='overTimeFactor'
															id='overTimeFactor'
															name='overTimeFactor'
															value={form.values.overTimeFactor}
															onChange={form.handleChange}>
															<MenuItem value={'none'}>Select Overtime Factor</MenuItem>
															{getSelectOptions(overTimefactor)}
														</Select>
													</FormControl>
												</Grid>
											</Grid>
										</InputWrapper>
									</Box> */}

							<InputWrapper id='BookingDuration' label='Job Duration'>
								<Grid container item rowGap={1}>
									{projectDuration.map((info, index) => {
										return (
											<Button
												className='borderCta'
												key={index}
												style={{
													background:
														projectDurationInfo === info?.value
															? theme.palette.primary.light
															: 'white',

													color:
														projectDurationInfo === info?.value
															? theme.palette.primary.main
															: '',
													marginRight: 10,
													textTransform: 'none',
													minWidth: 50,
													boxShadow: 'none',
													border:
														projectDurationInfo === info?.value
															? `2px solid ${theme.palette.primary.main}`
															: '',
												}}
												onClick={() => handleProjectDuration(info?.value)}>
												{info?.label}
											</Button>
										)
									})}
								</Grid>
							</InputWrapper>

							<InputWrapper id='shiftTiming' label='Shift Timing'>
								<Grid item container rowGap={1}>
									<Button
										className='borderCta'
										style={{
											background:
												shiftTiming === 'default' ? theme.palette.primary.light : 'white',
											border:
												shiftTiming === 'default'
													? `2px solid ${theme.palette.primary.main}`
													: '',

											color: 'black',
											marginRight: 10,
											minWidth: 50,
											boxShadow: 'none',
										}}
										onClick={() => handleShiftTiming('default')}>
										{fixTiming}
									</Button>

									<Button
										className='borderCta'
										style={{
											background:
												shiftTiming === 'Custom' ? theme.palette.primary.light : 'white',

											border:
												shiftTiming === 'Custom'
													? `2px solid ${theme.palette.primary.main}`
													: '',

											height: 35,
											width: 100,
											color: primary.main,
											boxShadow: 'none',
										}}
										onClick={() => handleShiftTiming('Custom')}>
										Custom
									</Button>
								</Grid>

								{shiftTiming === 'Custom' && (
									<Grid container spacing={4} style={{ marginTop: 10 }}>
										<Grid item xs={12} sm={12} md={6} lg={6}>
											<CustomTimePicker
												form={form}
												error={!!checkError('startTime', form)}
												labelId={'startTime'}
												id={'startTime'}
												name={'startTime'}
												value={form.values.startTime}
												timeOptions={'am'}
												onChange={(e: any) => {
													form.handleChange(e)
												}}
											/>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6}>
											<CustomTimePicker
												form={form}
												error={!!checkError('endTime', form)}
												labelId={'endTime'}
												id={'endTime'}
												name={'endTime'}
												value={form.values.endTime}
												timeOptions={'pm'}
												onChange={(e: any) => {
													form.handleChange(e)
												}}
											/>
										</Grid>
									</Grid>
								)}
							</InputWrapper>

							{/* TODO: Check if form level state is required */}
							<InputWrapper id='deployTime' label='Expected Time To Deployment'>
								<Typography>14 days</Typography>
							</InputWrapper>
						</Stack>

						{/* Project Details */}

						{/* {step === 2 && (
								<Stack spacing={5}>
									<Box>
										<InputWrapper id='startdate' label='Start Date'>
											<Grid container spacing={4}>
												<Grid item xs={12} sm={12} md={6} lg={6}>
													<LocalizationProvider dateAdapter={AdapterDateFns}>
														<DatePicker
															minDate={form.initialValues.StartDate}
															value={form.values.StartDate}
															onChange={(value) => form.setFieldValue('StartDate', value)}
															renderInput={(params) => (
																<TextField {...params} fullWidth />
															)}
															inputFormat='dd/MM/yyyy'
														/>
													</LocalizationProvider>
												</Grid>
											</Grid>
										</InputWrapper>
									</Box>

									<Box>
										<InputWrapper id='projectDuration' label='Project Duration'>
											<Grid container spacing={4}>
												<Grid container item rowGap={1}>
													{projectDuration.map((info, index) => {
														return (
															<Button
																className='borderCta'
																key={index}
																style={{
																	background:
																		projectDurationInfo === info?.label
																			? theme.palette.primary.light
																			: 'white',

																	color: '#061F48',
																	marginRight: 10,
																	textTransform: 'none',
																	minWidth: 50,
																}}
																onClick={() => handleProjectDuration(info?.label)}>
																{info?.label}
															</Button>
														)
													})}
												</Grid>
											</Grid>
										</InputWrapper>
									</Box>

									<Box>
										<InputWrapper id='shiftTiming' label='Shift Timing'>
											<Grid container spacing={4}>
												<Grid item container>
													<Button
														className='borderCta'
														style={{
															borderRadius: 4,
															padding: 4,
															background:
																shiftTiming === 'default'
																	? theme.palette.primary.light
																	: 'white',

															color: 'black',
															marginRight: 10,
															minWidth: 50,
														}}
														onClick={() => handleShiftTiming('default')}>
														{fixTiming}
													</Button>

													<Button
														className='borderCta'
														style={{
															background:
																shiftTiming === 'Custom'
																	? theme.palette.primary.light
																	: 'white',

															height: 35,
															width: 100,
															color: 'black',
														}}
														onClick={() => handleShiftTiming('Custom')}>
														Custom
													</Button>
												</Grid>
											</Grid>

											{shiftTiming === 'Custom' && (
												<Grid container spacing={4} style={{ marginTop: 10 }}>
													<Grid item xs={12} sm={12} md={6} lg={6}>
														<CustomTimePicker
															form={form}
															error={!!checkError('startTime', form)}
															labelId={'startTime'}
															id={'startTime'}
															name={'startTime'}
															value={form.values.startTime}
															timeOptions={'am'}
															onChange={(e: any) => {
																form.handleChange(e)
															}}
														/>
													</Grid>
													<Grid item xs={12} sm={12} md={6} lg={6}>
														<CustomTimePicker
															form={form}
															error={!!checkError('endTime', form)}
															labelId={'endTime'}
															id={'endTime'}
															name={'endTime'}
															value={form.values.endTime}
															timeOptions={'pm'}
															onChange={(e: any) => {
																form.handleChange(e)
															}}
														/>
													</Grid>
												</Grid>
											)}
										</InputWrapper>
									</Box>

									<Box>
										<Grid container columnSpacing={2} rowSpacing={5}>
											<Grid item xs={12} sm={12} md={6} lg={6} display='block'>
												<InputWrapper id='state' label='State'>
													<Select
														error={!!checkError('state', form)}
														labelId='state'
														id='state'
														name='state'
														value={form.values.state}
														//autoWidth={true}
														onChange={(e) => {
															form.handleChange(e)
														}}
														required={true}
														fullWidth>
														<MenuItem value={'none'}>Select State</MenuItem>
														{getSelectOptions(StatesOptions)}
													</Select>
												</InputWrapper>
											</Grid>
											<Grid item xs={12} sm={12} md={6} lg={6} display='block'>
												<InputWrapper id='city' label='City'>
													<Select
														labelId='city'
														id='city'
														name='city'
														error={!!checkError('city', form)}
														value={form.values.city}
														disabled={form.values.state === 'none'}
														onChange={(e) => {
															form.handleChange(e)
														}}
														fullWidth>
														<MenuItem value={'none'}>Select city</MenuItem>
														{CityOptions[form.values.state || 'none'].map((item: any) => {
															return (
																<MenuItem key={item.label} value={item.value}>
																	{item?.label}
																</MenuItem>
															)
														})}
													</Select>
												</InputWrapper>
											</Grid>
										</Grid>
									</Box>

									<Box>
										<InputWrapper id='siteAddress' label='Site Address'>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={12} md={12} lg={12}>
													<TextField
														placeholder='Enter Here'
														id='siteAddress'
														name='siteAddress'
														value={form.values.siteAddress}
														onChange={form.handleChange}
														minRows={4}
														maxRows={4}
														multiline
														fullWidth
														onBlur={form.handleBlur}
														error={!!checkError(`siteAddress`, form)}
														helperText={checkError(`siteAddress`, form)}
													/>
												</Grid>
											</Grid>
										</InputWrapper>
									</Box>
								</Stack>
							)}
							{/* Contact Details */}

						{/* {step === 3 && (
								<Stack spacing={5}>
									<Box>
										<InputWrapper id='name' label='Name'>
											<Grid container>
												<Grid item xs={12} sm={12} md={6} lg={6}>
													<TextField
														id='name'
														name='name'
														value={form.values.name}
														onChange={form.handleChange}
														placeholder='Enter Your Full Name'
														fullWidth
														onBlur={form.handleBlur}
														error={!!checkError(`name`, form)}
														helperText={checkError(`name`, form)}
													/>
												</Grid>
											</Grid>
										</InputWrapper>
									</Box>

									<Box>
										<InputWrapper id='companyEmail' label='Email'>
											<Grid container>
												<Grid item xs={12} sm={12} md={6} lg={6}>
													<TextField
														id='companyEmail'
														name='companyEmail'
														onChange={form.handleChange}
														value={form.values.companyEmail}
														placeholder='Enter Email'
														fullWidth
														onBlur={form.handleBlur}
														error={!!checkError(`companyEmail`, form)}
														helperText={checkError(`companyEmail`, form)}
													/>
												</Grid>
											</Grid>
										</InputWrapper>
									</Box>

									<Box>
										<InputWrapper id='phoneNumber' label='Phone Number'>
											<Grid container>
												<Grid item xs={12} sm={12} md={6} lg={6}>
													<PhoneField
														id='phoneNumber'
														name='phoneNumber'
														onChange={(e: any) => {
															if (e.target.value.length <= 10) {
																form.handleChange(e)
															}
														}}
														value={form.values.phoneNumber}
														type='tel'
														placeholder='Enter PhoneNumber'
														fullWidth
														onBlur={form.handleBlur}
														error={!!checkError(`phoneNumber`, form)}
														helperText={checkError(`phoneNumber`, form)}
													/>
												</Grid>
											</Grid>
										</InputWrapper>
									</Box>
								</Stack>
							)} */}

						<Box className='stickyBottomBox'>
							<Paper
								className='bottomButton'
								variant='outlined'
								sx={{ paddingRight: isMobile ? '6%' : '12%' }}>
								<Stack direction={'row'} justifyContent={'flex-end'}>
									{/* {(step === 2 || step === 3) && (
											<Button className='prevCta' onClick={handlePrev}>
												Previous
											</Button>
										)} */}

									<LoadingButton
										className='loadingcta'
										type='submit'
										variant='contained'
										loading={loading}
										disabled={!!isSubmittable || loading}
										// onClick={() => handleNext()}
										style={{
											minWidth: '10rem',
											marginRight: isMobile ? '' : '14%',
											background: isSubmittable || loading ? '#cccccc' : '',
										}}>
										{'Create Booking'}
									</LoadingButton>
								</Stack>
							</Paper>
						</Box>
					</form>
				</Box>

				{/* {step === 2 && (
					<Box style={{ verticalAlign: 'middle' }}>
						<BookingSuccess />
					</Box>
				)} */}
			</Container>
		</CustomBookingStyle>
	)
}

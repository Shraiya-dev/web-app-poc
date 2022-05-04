import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
	Box,
	Button,
	Chip,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
	styled,
	Paper,
	InputAdornment,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Helper from '../../../public/assets/icons/helper.svg'
import Supervisor from '../../../public/assets/icons/supervisor.svg'
import Technician from '../../../public/assets/icons/technician.svg'
import { checkError, theme } from '../../../sdk'
import useCreateBooking from '../hooks/useCreateBooking'

import { CitiesOptions, jobTypeInfo, moreJobType, projectDuration, StatesOptions, tags } from '../utils/helperData'
import BookingSuccess from './bookingsuccess'
import ConfirmCancel from './confirmCancel'

import { createBooking } from '../apis/apis'
import { useSnackbar, useContractorAuth } from '../../../sdk'
import { useMobile } from '../../../sdk/hooks/useMobile'

import { CustomTimePicker } from '../../../sdk/components/timepicker/customTimePicker'
import { timeDataAM, timeDataPM } from '../utils/helperData'

import { ArrowBack } from '@mui/icons-material'

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

	'.inputLabel': {
		fontSize: 18,
		fontWeight: 600,
		marginTop: 40,
		marginBottom: 10,
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
		//color: theme.palette.secondary.main,
	},
	'.subHeader': {
		fontSize: 20,
		fontWeight: 600,
		marginTop: 20,
		//color: theme.palette.secondary.main,
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
		paddingRight: '10%',
		paddingBottom: 20,
		paddingTop: 20,
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

export const CreateBooking = ({ ...props }) => {
	const { form, step, setStep, handlePrev } = useCreateBooking()

	const [isMore, setIsmore] = useState(false)
	const [projectDurationInfo, setProjectDuration] = useState<string>()
	const [selectedJob, setSelectedjob] = useState('')
	const [shiftTiming, setShiftTiming] = useState('')

	const [isSubmittable, setIsSubmittable] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const { showSnackbar } = useSnackbar()

	const [onCloseDialog, setOncloseDialog] = useState(false)

	const isMobile = useMobile()
	const { user } = useContractorAuth()
	const fixTiming = `09:00 am - 05:00 pm`

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

	const validateWorkerRequired = () => {
		var validate = false
		if (form.values.technician > 0 || form.values.technicianWages > 0) {
			validate = form.values.technician > 0 && form.values.technicianWages > 0
		}

		if (form.values.helper > 0 || form.values.helperWages > 0) {
			validate = form.values.helper > 0 && form.values.helperWages > 0
		}

		if (form.values.supervisor > 0 || form.values.supervisorWages > 0) {
			validate = form.values.supervisor > 0 && form.values.supervisorWages > 0
		}

		return validate
	}
	console.log(form)
	useEffect(() => {
		if (step === 1) {
			let canSubmit: boolean =
				!form.values.jobType || form.values.overTimeFactor === 'none' || !validateWorkerRequired()

			setIsSubmittable(canSubmit)
		}

		if (step === 2) {
			let canSubmit =
				form.values.city === 'none' ||
				form.values.state === 'none' ||
				!form.values.siteAddress ||
				!form.values.startTime ||
				!form.values.BookingDuration ||
				(shiftTiming === 'Custom'
					? form.values.startTime === 'none' || form.values.endTime === 'none'
					: !form.values.shiftTime)

			setIsSubmittable(canSubmit)
		}

		if (step === 3) {
			let canSubmit = !form.values.name || !form.values.companyEmail || !form.values.phoneNumber
			setIsSubmittable(canSubmit)
		}
	}, [form])

	const handleMoreJobType = () => {
		setIsmore((state) => !state)
	}

	const handleNext = (e: any) => {
		let ConvertedshiftTime = form.values.shiftTime
		if (shiftTiming === 'Custom') {
			ConvertedshiftTime = form.values.startTime + '-' + form.values.endTime

			form.setFieldValue('shiftTime', ConvertedshiftTime)
		}

		const payload = {
			city: form.values.city,
			state: form.values.state,
			companyName: user?.companyName,
			email: form.values.companyEmail,
			name: form.values.name,
			phoneNumber: '+91' + form.values.phoneNumber,
			siteAddress: form.values.siteAddress,
			schedule: {
				bookingDuration: form.values.BookingDuration,
				startDate: form.values.StartDate,
				shiftTime: ConvertedshiftTime,
			},
			peopleRequired: {
				SUPERVISOR: form.values.supervisor,
				HELPER: form.values.helper,
				TECHNICIAN: form.values.technician,
			},
			overTime: {
				rate: form.values.overTimeFactor,
			},
			earning: {
				HELPER: form.values.helperWages,
				TECHNICIAN: form.values.technicianWages,
				SUPERVISOR: form.values.supervisorWages,
			},
			tags: form.values.tags,
			jobType: form.values.jobType,
			userName: form.initialValues.name,
		}

		if (step < 4) {
			if (step === 3) {
				setLoading(true)
				createBooking(payload)
					.then((respone) => {
						setStep((state) => state + 1)
						setIsSubmittable(false)
						setLoading(false)
					})
					.catch((error: any) => {
						showSnackbar(error?.response?.data?.developerInfo, 'error')
						console.log(error)
						setLoading(false)
					})
			} else {
				setStep((state) => state + 1)
			}
		}
	}

	const getSelectOptions = (opt: any) => {
		return opt.map((item: any) => (
			<MenuItem key={item.label} value={item.value}>
				{item.label}
			</MenuItem>
		))
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
		form.setFieldValue('shiftTime', info)
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
			{step !== 4 && (
				<Box display='flex' alignItems='center'>
					<Button
						startIcon={<ArrowBack />}
						onClick={() => setOncloseDialog(true)}
						variant='text'
						color='primary'>
						Go Back
					</Button>
				</Box>
			)}
			<Container className='main' maxWidth={'md'}>
				<ConfirmCancel onCloseDialog={onCloseDialog} setOncloseDialog={setOncloseDialog} />

				<Box width={'100%'}>
					{step !== 4 && (
						<Box>
							<Box>
								<Typography className='header'>Book Workers</Typography>
							</Box>

							<Box display='flex'>
								<Grid container justifyContent='flex-start'>
									<Typography className='subHeader'>
										{step === 1
											? 'Add Workers Details'
											: step === 2
											? 'Project Details'
											: 'Add Contact Details'}
									</Typography>
								</Grid>

								<Grid container justifyContent='flex-end' style={{ marginTop: 20 }}>
									<Stack
										className='stepper'
										style={{
											background: `${
												step === 1 ? theme.palette.primary.main : theme.palette.primary.light
											}`,
										}}
									/>
									<Stack
										className='stepper'
										style={{
											background: `${
												step === 2 ? theme.palette.primary.main : theme.palette.primary.light
											}`,
										}}
									/>
									<Stack
										className='stepper'
										style={{
											background: `${
												step === 3 ? theme.palette.primary.main : theme.palette.primary.light
											}`,
										}}
									/>
								</Grid>
							</Box>
						</Box>
					)}

					<Box>
						<form onSubmit={form.handleSubmit}>
							{step === 1 && (
								<Stack>
									<Box>
										<InputLabel htmlFor='jobType' className='inputLabel'>
											Trade
										</InputLabel>
										<Grid
											container
											item
											rowSpacing={2}
											columnSpacing={2}
											style={{ marginBottom: 10 }}>
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

																border: !!checkError(`jobType`, form) ? 'red' : '',
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
														<Typography className='view' display='inline'>
															View Less <KeyboardArrowUpIcon />
														</Typography>
													</Box>
												) : (
													<Box>
														<Typography className='view' display='inline'>
															View More <KeyboardArrowDownIcon />
														</Typography>
													</Box>
												)}
											</Stack>
										</Grid>
									</Box>

									<Box>
										<InputLabel htmlFor='skills' className='inputLabel'>
											Skills
										</InputLabel>
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
																color: theme.palette.secondary.main,
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
									</Box>

									<Box>
										<InputLabel htmlFor='jobType' className='inputLabel'>
											{`Workers Required & Daily Wage`}
										</InputLabel>
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
														<Grid container item xs={12} sm={12} md={4}>
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
														<Grid item xs={12} sm={12} md={4}>
															<TextField
																label={`${info?.label} Required`}
																placeholder={`Enter ${info?.label}`}
																defaultValue=''
																id={info?.name}
																name={info?.name}
																value={info?.formvalue > 0 ? info?.formvalue : ''}
																type='tel'
																onChange={(e: any) => {
																	if (e.target.value >= 0) {
																		form.handleChange(e)
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
																defaultValue=''
																id={info?.wage}
																name={info?.wage}
																value={
																	info?.wageformvalue > 0 ? info?.wageformvalue : ''
																}
																type='tel'
																onChange={(e: any) => {
																	if (e.target.value >= 0) {
																		form.handleChange(e)
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

										<Box>
											<InputLabel htmlFor='overtime' className='inputLabel'>
												Overtime Details
											</InputLabel>
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
															<MenuItem value={10}>1</MenuItem>
															<MenuItem value={20}>1.5</MenuItem>
															<MenuItem value={30}>2</MenuItem>
														</Select>
													</FormControl>
												</Grid>
											</Grid>
										</Box>
									</Box>
								</Stack>
							)}

							{/* Project Details */}

							{step === 2 && (
								<Stack>
									<Box>
										<InputLabel htmlFor='startdate' className='inputLabel'>
											Start Date
										</InputLabel>
										<Grid container spacing={4}>
											<Grid item xs={12} sm={12} md={6} lg={6}>
												<LocalizationProvider dateAdapter={AdapterDateFns}>
													<DatePicker
														minDate={form.initialValues.StartDate}
														value={form.values.StartDate}
														onChange={(value) => form.setFieldValue('StartDate', value)}
														renderInput={(params) => <TextField {...params} fullWidth />}
													/>
												</LocalizationProvider>
											</Grid>
										</Grid>
									</Box>

									<Box>
										<InputLabel htmlFor='projectDuration' className='inputLabel'>
											Project Duration
										</InputLabel>

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
									</Box>

									<Box>
										<InputLabel htmlFor='shiftTiming' className='inputLabel'>
											Shift Timing
										</InputLabel>

										<Grid container spacing={4}>
											<Grid item container>
												<Button
													className='borderCta'
													style={{
														borderRadius: 4,
														padding: 4,
														background:
															shiftTiming === '09:00am-06:00pm'
																? theme.palette.primary.light
																: 'white',

														color: 'black',
														marginRight: 10,
														minWidth: 50,
													}}
													onClick={() => handleShiftTiming('09:00am-06:00pm')}>
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
														timeOptions={timeDataAM}
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
														timeOptions={timeDataPM}
														onChange={(e: any) => {
															form.handleChange(e)
														}}
													/>
												</Grid>
											</Grid>
										)}
									</Box>

									<Box>
										<Grid container columnSpacing={2}>
											<Grid item xs={12} sm={12} md={6} lg={6} display='block'>
												<InputLabel id='state' className='inputLabel'>
													State
												</InputLabel>

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
											</Grid>
											<Grid item xs={12} sm={12} md={6} lg={6} display='block'>
												<InputLabel className='inputLabel'>City</InputLabel>
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
													{CitiesOptions[form.values.state || 'none'].map((item: any) => {
														return (
															<MenuItem key={item.label} value={item.value}>
																{item?.label}
															</MenuItem>
														)
													})}
												</Select>
											</Grid>
										</Grid>
									</Box>

									<Box>
										<InputLabel className='inputLabel'>Site Address</InputLabel>

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
									</Box>
								</Stack>
							)}
							{/* Contact Details */}

							{step === 3 && (
								<Box>
									<Box>
										<InputLabel className='inputLabel'>Name</InputLabel>

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
									</Box>

									{/* <Box>
										<InputLabel id='company' className='inputLabel'>
											Company
										</InputLabel>

										<Grid container>
											<Grid item xs={12} sm={12} md={6} lg={6}>
												<TextField
													id='company'
													name='company'
													onChange={form.handleChange}
													value={form.values.company}
													placeholder='Enter Company Name'
													fullWidth
													onBlur={form.handleBlur}
													error={!!checkError(`company`, form)}
													helperText={checkError(`company`, form)}
												/>
											</Grid>
										</Grid>
									</Box> */}

									<Box>
										<InputLabel id='companyEmail' className='inputLabel'>
											Email
										</InputLabel>

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
									</Box>

									<Box>
										<InputLabel id='phoneNumber' className='inputLabel'>
											Phone Number
										</InputLabel>

										<Grid container>
											<Grid item xs={12} sm={12} md={6} lg={6}>
												<TextField
													id='phoneNumber'
													name='phoneNumber'
													onChange={(e: any) => {
														if (e.target.value.length <= 10) {
															form.handleChange(e)
														}
													}}
													value={form.values.phoneNumber}
													placeholder='9999988888'
													fullWidth
													onBlur={form.handleBlur}
													error={!!checkError(`phoneNumber`, form)}
													helperText={checkError(`phoneNumber`, form)}
													InputProps={{
														startAdornment: (
															<InputAdornment position='start'>+91</InputAdornment>
														),
													}}
												/>
											</Grid>
										</Grid>
									</Box>
								</Box>
							)}

							<Box className='stickyBottomBox'>
								<Paper className='bottomButton'>
									<Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
										{(step === 2 || step === 3) && (
											<Button className='prevCta' onClick={handlePrev}>
												Previous
											</Button>
										)}
										{step !== 4 && (
											<LoadingButton
												className='loadingcta'
												variant='contained'
												loading={loading}
												disabled={!!isSubmittable || loading}
												onClick={(e) => handleNext(e)}
												style={{
													minWidth: '10rem',
													marginRight: isMobile ? '' : '14%',
													background: isSubmittable || loading ? '#cccccc' : '',
												}}>
												{step === 3 ? 'Finish Booking' : 'Next'}
											</LoadingButton>
										)}
									</Stack>
								</Paper>
							</Box>
						</form>
					</Box>

					{step === 4 && (
						<Box style={{ verticalAlign: 'middle' }}>
							<BookingSuccess />
						</Box>
					)}
				</Box>
			</Container>
		</CustomBookingStyle>
	)
}

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
	BottomNavigation,
	Paper,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Helper from '../../../public/assets/icons/helper.svg'
import Supervisor from '../../../public/assets/icons/supervisor.svg'
import Technician from '../../../public/assets/icons/technician.svg'
import { checkError, theme } from '../../../sdk'
import useCreateBooking from '../hooks/useCreateBooking'
import {
	CitiesOptions,
	jobTypeInfo,
	moreJobType,
	projectDuration,
	ShiftTime,
	StatesOptions,
	tags,
} from '../utils/helperData'
import BookingSuccess from './bookingsuccess'
import ConfirmCancel from './confirmCancel'
import { getCustomerDetails } from '../../../sdk/apis'

import { createBooking } from '../apis/apis'
import { useSnackbar } from '../../../sdk'

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
		fontSize: 16,
		fontWeight: 700,
		marginTop: 40,
		marginBottom: 10,
	},
	'.stickyBottomBox': {
		position: 'sticky',

		bottom: 0,
		paddingTop: 20,

		overflowY: 'none',
	},
	'.header': {
		fontSize: 36,
		fontWeight: 700,
		color: theme.palette.secondary.main,
	},
	'.subHeader': {
		fontSize: 20,
		fontWeight: 600,
		marginTop: 20,
		color: theme.palette.secondary.main,
	},
	'.subInfo': {
		fontSize: 13,
		fontWeight: 500,
		color: theme.palette.secondary.main,
		paddingBottom: 8,
	},
	'.bottomButton': {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		paddingRight: '10%',
		paddingBottom: 20,
		paddingTop: 10,
		background: 'white',
		overflow: 'hidden',
	},
	'.loadingcta': {
		borderRadius: 30,
		textTransform: 'inherit',
		padding: '12px 22px',
		background: theme.palette.primary.main,
		color: 'white',
	},
	'.prevCta': {
		width: '10rem',
		marginLeft: '10%',
	},
	'.jobType': {
		borderRadius: 8,
		padding: 8,
		color: 'rgba(6, 31, 72, 0.7)',
		height: 100,
		width: 100,
		textTransform: 'none',
	},
	'.view': {
		verticalAlign: 'middle',
		display: 'flex',
	},
}))

export const CreateBooking = ({ ...props }) => {
	const { toggleBookingForm, onCloseDialog, setOncloseDialog, bookingFormOpen, setBookingFormOpen } = props
	const { form, step, setStep, userInitialInfo, setUserInitialInfo, timeConvert, handlePrev } = useCreateBooking()

	const [isMore, setIsmore] = useState(false)
	const [projectDurationInfo, setProjectDuration] = useState<string>()
	const [selectedJob, setSelectedjob] = useState('')
	const [shiftTiming, setShiftTiming] = useState('')

	const [isSubmittable, setIsSubmittable] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const { showSnackbar } = useSnackbar()

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
		if (form.values.technician > 0 || form.values.technicianWages > 0) {
			return form.values.technician > 0 && form.values.technicianWages > 0
		}

		if (form.values.helper > 0 || form.values.helperWages > 0) {
			return form.values.helper > 0 && form.values.helperWages > 0
		}

		if (form.values.supervisor > 0 || form.values.supervisorWages > 0) {
			return form.values.supervisor > 0 && form.values.supervisorWages > 0
		}

		return false
	}

	useEffect(() => {
		getCustomerDetails()
			.then((data: any) => {
				console.log('basic', data)
				setUserInitialInfo(data?.data?.payload)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])
	useEffect(() => {
		if (step === 1) {
			var canSubmit: boolean =
				!form.values.jobType || form.values.overTimeFactor === 'none' || !validateWorkerRequired()

			setIsSubmittable(canSubmit)
		}

		if (step === 2) {
			var canSubmit =
				form.values.city === 'none' ||
				form.values.state === 'none' ||
				!form.values.siteAddress ||
				!form.values.shiftTime ||
				!form.values.startTime ||
				!form.values.BookingDuration

			setIsSubmittable(canSubmit)
		}

		if (step === 3) {
			var canSubmit =
				!form.values.name || !form.values.company || !form.values.companyEmail || !form.values.phoneNumber
			setIsSubmittable(canSubmit)
		}
	}, [form])

	const handleMoreJobType = () => {
		setIsmore((state) => !state)
	}

	const handleNext = (e: any) => {
		var ConvertedshiftTime = form.values.shiftTime
		if (shiftTiming === 'Custom') {
			ConvertedshiftTime = timeConvert(form.values.startTime) + '-' + timeConvert(form.values.endTime)
			form.setFieldValue('shiftTime', ConvertedshiftTime)
		}
		const payload = {
			city: form.values.city,
			state: form.values.state,
			companyName: form.values.company,
			email: form.values.companyEmail,
			name: form.values.name,
			phoneNumber: form.values.phoneNumber,
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
				console.log('payload', payload)
				setLoading(true)
				createBooking(payload)
					.then((respone) => {
						console.log('res', respone)
						setStep((state) => state + 1)
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
		setSelectedjob(info)
	}

	const handleShiftTiming = (info: any) => {
		form.setFieldValue('shiftTime', info)
		setShiftTiming(info)
	}

	return (
		<CustomBookingStyle>
			<Container className='main' maxWidth={'md'}>
				<ConfirmCancel
					onCloseDialog={onCloseDialog}
					setOncloseDialog={setOncloseDialog}
					toggleBookingForm={toggleBookingForm}
					bookingFormOpen={bookingFormOpen}
					setBookingFormOpen={setBookingFormOpen}
				/>
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
																	<Box>
																		<Image src={info?.icon} />

																		<Stack>{info?.label}</Stack>
																	</Box>
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
															// color={
															// 	form.values.tags.includes(item) ? 'primary' : undefined
															// }
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
																id={info?.name}
																name={info?.name}
																value={info?.formvalue}
																type='tel'
																onChange={(e: any) => {
																	if (e.target.value >= 0) {
																		form.handleChange(e)
																	}
																}}
																fullWidth
																onBlur={form.handleBlur}
																error={!!checkError(`${info?.name}`, form)}
																helperText={checkError(`${info?.name}`, form)}
															/>
														</Grid>
														<Grid item xs={12} sm={12} md={4}>
															<TextField
																label='Daily wage (Rs.)'
																id={info?.wage}
																name={info?.wage}
																value={info?.wageformvalue}
																type='tel'
																onChange={(e: any) => {
																	if (e.target.value >= 0) {
																		form.handleChange(e)
																	}
																}}
																fullWidth
																onBlur={form.handleBlur}
																error={!!checkError(`${info?.wage}`, form)}
																helperText={checkError(`${info?.wage}`, form)}
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
												<Grid item xs={12} sm={12} md={6}>
													<FormControl fullWidth>
														{/* <InputLabel id='overTimeFactor'>Overtime Factor</InputLabel> */}
														<Select
															labelId='overTimeFactor'
															id='overTimeFactor'
															name='overTimeFactor'
															value={form.values.overTimeFactor}
															autoWidth={true}
															//label='Overtime Factor'
															onChange={form.handleChange}>
															<MenuItem value={'none'}>Select Overtime Factor</MenuItem>
															<MenuItem value={10}>1</MenuItem>
															<MenuItem value={20}>1.5</MenuItem>
															<MenuItem value={30}>2</MenuItem>
														</Select>
													</FormControl>
												</Grid>

												{/* <Grid item xs={4} sm={4} md={4}>
												<FormControl fullWidth>
													<InputLabel id='overTimeFactor'>Overtime Buffer</InputLabel>
													<Select
														labelId='overTimeFactor'
														id='overTimeFactor'
														value={form.values.projectType}
														label='Overtime Factor'
														onChange={form.handleChange}>
														<MenuItem value={10}>Ten</MenuItem>
														<MenuItem value={20}>Twenty</MenuItem>
														<MenuItem value={30}>Thirty</MenuItem>
													</Select>
												</FormControl>
											</Grid> */}

												{/* <Grid item xs={12} sm={12} md={6}>
												<FormControl fullWidth>
													<InputLabel id='overTime'>Minutes</InputLabel>
													<Select
														labelId='overTime'
														id='overTime'
														name='overTime'
														value={form.values.overTime}
														label='Minutes'
														onChange={form.handleChange}>
														<MenuItem value={10}>Ten</MenuItem>
														<MenuItem value={20}>Twenty</MenuItem>
														<MenuItem value={30}>Thirty</MenuItem>
													</Select>
												</FormControl>
											</Grid> */}
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
											<Grid item xs={12} sm={12} md={8} lg={8}>
												{projectDuration.map((info, index) => {
													return (
														<Button
															key={index}
															style={{
																borderRadius: 4,
																padding: 8,
																background:
																	projectDurationInfo === info?.label
																		? theme.palette.primary.light
																		: 'white',

																// height: 35,

																color: '#061F48',
																marginRight: 10,
																textTransform: 'none',
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
											<Grid item xs={12} sm={12} md={8} lg={8}>
												<Button
													style={{
														borderRadius: 4,
														padding: 4,
														background:
															shiftTiming === '9am-6pm'
																? theme.palette.primary.light
																: 'white',

														height: 35,
														width: 100,
														color: 'black',
														marginRight: 10,
													}}
													onClick={() => handleShiftTiming('9am-6pm')}>
													9am-6pm
												</Button>

												<Button
													style={{
														borderRadius: 4,
														padding: 4,
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
													<LocalizationProvider dateAdapter={AdapterDateFns}>
														<TimePicker
															value={form.values.startTime}
															onChange={(value) => form.setFieldValue('startTime', value)}
															//onChange={form.handleChange}
															renderInput={(params) => (
																<TextField
																	{...params}
																	placeholder='Select Start Time'
																	fullWidth
																/>
															)}
														/>
													</LocalizationProvider>
												</Grid>
												<Grid item xs={12} sm={12} md={6} lg={6}>
													<LocalizationProvider dateAdapter={AdapterDateFns}>
														<TimePicker
															onChange={(value) => {
																form.setFieldValue('endTime', value),
																	console.log('endTime', value)
															}}
															value={form.values.endTime}
															renderInput={(params) => (
																<TextField
																	{...params}
																	// onChange={(value) =>
																	// 	form.setFieldValue('endTime', value)
																	// }
																	//value={form.values.endTime}
																	placeholder='Select End Time'
																	fullWidth
																/>
															)}
														/>
													</LocalizationProvider>
												</Grid>
											</Grid>
										)}
									</Box>

									<Box>
										<Grid container spacing={2}>
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
													autoWidth={true}
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
													autoWidth={true}
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
													rows={4}
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

									<Box>
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
									</Box>

									<Box>
										<InputLabel id='companyEmail' className='inputLabel'>
											Company Email
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
													onChange={form.handleChange}
													value={form.values.phoneNumber}
													placeholder='9999988888'
													fullWidth
													onBlur={form.handleBlur}
													error={!!checkError(`phoneNumber`, form)}
													helperText={checkError(`phoneNumber`, form)}
												/>
											</Grid>
										</Grid>
									</Box>
								</Box>
							)}

							<Box className='stickyBottomBox'>
								<Paper elevation={0} className='bottomButton'>
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
												//loadingPosition={'end'}
												disabled={isSubmittable}
												onClick={(e) => handleNext(e)}
												style={{ width: '10rem' }}>
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
							<BookingSuccess bookingFormOpen={bookingFormOpen} setBookingFormOpen={setBookingFormOpen} />
						</Box>
					)}
				</Box>
			</Container>
		</CustomBookingStyle>
	)
}

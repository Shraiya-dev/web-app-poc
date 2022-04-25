import {
	Stack,
	TextField,
	Button,
	InputLabel,
	Typography,
	Select,
	MenuItem,
	Box,
	Grid,
	FormControl,
	Chip,
	Container,
} from '@mui/material'
import { theme } from '../../../sdk'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import useCreateBooking from '../hooks/useCreateBooking'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import BookingSuccess from './bookingsuccess'
import ConfirmCancel from './confirmCancel'
import Image from 'next/image'

import _without from 'lodash/without'

import { checkError } from '../../../sdk'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { tags, StatesOptions, CitiesOptions, jobTypeInfo, moreJobType, projectDuration } from '../utils/helperData'

import Technician from '../../../public/assets/icons/technician.svg'
import Helper from '../../../public/assets/icons/helper.svg'
import Supervisor from '../../../public/assets/icons/supervisor.svg'

const useStyles = makeStyles({
	main: {
		justifyContent: 'center',
		display: 'flex',
		padding: 10,
	},
	stepper: {
		height: 6,
		width: 36,

		borderRadius: 2,
		margin: 4,
		background: theme.palette.primary.light,
	},

	viewcta: {
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		color: theme.palette.primary.main,
		padding: 10,
	},

	inputLabel: {
		marginTop: 20,
		marginBottom: 10,
	},
})

export const CreateBooking = ({ ...props }) => {
	const { toggleBookingForm, onCloseDialog, setOncloseDialog, bookingFormOpen, setBookingFormOpen } = props
	const { form, step, setStep } = useCreateBooking()

	const [isMore, setIsmore] = useState(false)
	const [projectDur, setProjectDuration] = useState<string>('less than 7 days')
	const [selectedJob, setSelectedjob] = useState('')
	const [shiftTiming, setShiftTiming] = useState('')

	const [isSubmittable, setIsSubmittable] = useState<boolean>(false)

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
		if (step === 1) {
			var canSubmit: boolean =
				!form.values.jobType || (!form.values.technician && !form.values.helper && !form.values.supervisor)

			setIsSubmittable(canSubmit)
		}

		if (step === 2) {
			var canSubmit = !form.values.city || !form.values.state || !form.values.siteAddress

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

	const handleNext = () => {
		if (step < 4) {
			setStep((state) => state + 1)
		}
	}

	const handlePrev = () => {
		if (step > 1) {
			setStep((state) => state - 1)
		}
	}

	const getSelectOptions = (opt: any) => {
		return opt.map((item: any) => (
			<MenuItem key={item.label} value={item.value}>
				{item.label}
			</MenuItem>
		))
	}

	const classes = useStyles()

	const handleProjectDuration = (info: any) => {
		setProjectDuration(info)
	}

	const handleJobClick = (info: any) => {
		form.setFieldValue('jobType', info)
		setSelectedjob(info)
	}

	const handleShiftTiming = (info: any) => {
		setShiftTiming(info)
	}

	return (
		<Container className={classes.main} maxWidth={'md'}>
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
							<Typography variant='h4' style={{ fontSize: 36 }}>
								Book Workers
							</Typography>
						</Box>

						<Box display='flex'>
							<Grid container justifyContent='flex-start'>
								<Typography variant='h4' style={{ fontSize: 18, marginTop: 20 }}>
									{step === 1
										? 'Add Workers Details'
										: step === 2
										? 'Project Details'
										: 'Add Contact Details'}
								</Typography>
							</Grid>

							<Grid container justifyContent='flex-end' style={{ marginTop: 20 }}>
								<Stack
									className={classes.stepper}
									style={{
										background: `${
											step === 1 ? theme.palette.primary.main : theme.palette.primary.light
										}`,
									}}
								/>
								<Stack
									className={classes.stepper}
									style={{
										background: `${
											step === 2 ? theme.palette.primary.main : theme.palette.primary.light
										}`,
									}}
								/>
								<Stack
									className={classes.stepper}
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
									<InputLabel htmlFor='jobType' className={classes.inputLabel}>
										Trade
									</InputLabel>
									<Grid container item rowSpacing={2} columnSpacing={2} style={{ marginBottom: 10 }}>
										{jobTypeInfo.map((info) => {
											return (
												<Grid item xs={4} sm={4} md={2} lg={2}>
													<Button
														onClick={() => handleJobClick(info?.value)}
														style={{
															borderRadius: 8,
															padding: 8,
															background:
																selectedJob === info?.value
																	? theme.palette.primary.light
																	: 'white',
															color: 'rgba(6, 31, 72, 0.7)',
															height: 100,
															width: 100,
															textTransform: 'none',
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
												{moreJobType.map((info) => {
													return (
														<Grid item xs={4} sm={4} md={2} lg={2}>
															<Button
																onClick={() => handleJobClick(info?.value)}
																style={{
																	borderRadius: 8,
																	padding: 8,
																	background:
																		selectedJob === info?.value
																			? theme.palette.primary.light
																			: 'white',
																	color: 'rgba(6, 31, 72, 0.7)',
																	height: 100,
																	width: 100,
																	textTransform: 'none',
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
											className={classes.viewcta}
											onClick={handleMoreJobType}
											style={{ textTransform: 'none' }}>
											{isMore ? (
												<Box>
													<Typography
														display='inline'
														style={{ verticalAlign: 'middle', display: 'flex' }}>
														View Less <KeyboardArrowUpIcon />
													</Typography>
												</Box>
											) : (
												<Box>
													<Typography
														display='inline'
														style={{ verticalAlign: 'middle', display: 'flex' }}>
														View More <KeyboardArrowDownIcon />
													</Typography>
												</Box>
											)}
										</Stack>
									</Grid>
								</Box>

								<Box>
									<InputLabel htmlFor='skills' className={classes.inputLabel}>
										Skills
									</InputLabel>
									<Grid item xs={12} md={12}>
										<Stack direction='row' flexWrap='wrap'>
											{tags[form.values.jobType]?.map((item:any) => {
												return (
													<Chip
														sx={{
															m: 1,
														}}
														color={form?.values?.tags?.includes(item) ? 'primary' : undefined}
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
									<InputLabel htmlFor='jobType' className={classes.inputLabel}>
										{`Workers Required & Daily Wage`}
									</InputLabel>

									{workerType.map((info) => {
										return (
											<Grid
												container
												alignItems={'flex-start'}
												spacing={2}
												style={{ marginBottom: 10 }}>
												<Grid item xs={4} sm={4} md={4}>
													<Image src={info?.icon} />
													<Typography
														style={{
															textAlign: 'center',
															margin: 8,
															color: 'rgba(6, 31, 72, 0.7)',
														}}>
														{info?.label}
													</Typography>
												</Grid>
												<Grid item xs={4} sm={4} md={4}>
													<TextField
														placeholder={`${info?.label} Required`}
														id={info?.name}
														name={info?.name}
														value={info?.formvalue}
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
												<Grid item xs={4} sm={4} md={4}>
													<TextField
														placeholder='Daily wage (Rs.)'
														id={info?.wage}
														name={info?.wage}
														value={info?.wageformvalue}
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

									<Box>
										<InputLabel htmlFor='overtime' className={classes.inputLabel}>
											Overtime Details
										</InputLabel>
										<Grid
											container
											alignItems={'flex-start'}
											spacing={2}
											style={{ marginBottom: 10 }}>
											<Grid item xs={12} sm={12} md={6}>
												<FormControl fullWidth>
													<InputLabel id='overTimeFactor'>Overtime Factor</InputLabel>
													<Select
														labelId='overTimeFactor'
														id='overTimeFactor'
														name='overTimeFactor'
														value={form.values.overTimeFactor}
														label='Overtime Factor'
														onChange={form.handleChange}>
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

											<Grid item xs={12} sm={12} md={6}>
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
									<InputLabel htmlFor='startdate' className={classes.inputLabel}>
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
									<InputLabel htmlFor='shiftTiming' className={classes.inputLabel}>
										Project Duration
									</InputLabel>

									<Grid container spacing={4}>
										<Grid item xs={12} sm={12} md={8} lg={8}>
											{projectDuration.map((info) => {
												return (
													<Button
														style={{
															borderRadius: 4,
															padding: 8,
															background:
																projectDur === info?.label
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
									<InputLabel htmlFor='shiftTiming' className={classes.inputLabel}>
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
														value={form.values.endTime}
														onChange={(value) => form.setFieldValue('endTime', value)}
														renderInput={(params) => (
															<TextField
																{...params}
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
											<InputLabel id='state' className={classes.inputLabel}>
												State
											</InputLabel>

											<Select
												error={!!checkError('state', form)}
												labelId='state'
												id='state'
												name='state'
												value={form.values.state}
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
											<InputLabel className={classes.inputLabel}>City</InputLabel>
											<Select
												labelId='city'
												id='city'
												name='city'
												error={!!checkError('city', form)}
												value={form.values.city}
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
									<InputLabel className={classes.inputLabel}>Site Address</InputLabel>

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
									<InputLabel className={classes.inputLabel}>Name</InputLabel>

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
									<InputLabel id='company' className={classes.inputLabel}>
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
									<InputLabel id='companyEmail' className={classes.inputLabel}>
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
									<InputLabel id='phoneNumber' className={classes.inputLabel}>
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

						<Box
							style={{
								position: 'sticky',

								bottom: 0,
								paddingTop: 20,
								background: 'white',
							}}>
							<Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
								{(step === 2 || step === 3) && (
									<Button onClick={handlePrev} style={{ width: '10rem' }}>
										Previous
									</Button>
								)}
								{step !== 4 && (
									<Button
										//type='submit'
										disabled={isSubmittable}
										onClick={handleNext}
										style={{ width: '10rem', marginLeft: 20 }}>
										{step === 3 ? 'Finish Booking' : 'Next'}
									</Button>
								)}
							</Stack>
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
	)
}

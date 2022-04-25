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
	Autocomplete,
	Chip,
	Paper,
} from '@mui/material'
import { theme } from '../../../sdk'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import useCreateBooking from '../hooks/useCreateBooking'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { fontWeight, styled } from '@mui/system'

import BookingSuccess from './bookingsuccess'
import ConfirmCancel from './confirmCancel'
import Image from 'next/image'

import Mason from '../../../public/assets/icons/mason.svg'
import Barbender from '../../../public/assets/icons/barbender.svg'
import Plumber from '../../../public/assets/icons/plumber.svg'
import Electrician from '../../../public/assets/icons/electrical.svg'
import Carpenter from '../../../public/assets/icons/carpenter.svg'

import Gypsum from '../../../public/assets/icons/gypsum.svg'
import GeneralWorker from '../../../public/assets/icons/generalworker.svg'
import Painter from '../../../public/assets/icons/painter.svg'
import Stone from '../../../public/assets/icons/stone.svg'
import Hvac from '../../../public/assets/icons/hvac.svg'
import Welderfitter from '../../../public/assets/icons/welderfitter.svg'
import Shuttering from '../../../public/assets/icons/shuttering.svg'

import Technician from '../../../public/assets/icons/technician.svg'
import Helper from '../../../public/assets/icons/helper.svg'
import Supervisor from '../../../public/assets/icons/supervisor.svg'
import _without from 'lodash/without'

import { checkError } from '../../../sdk'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { tags } from '../../../sdk'

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
	const { form } = useCreateBooking()

	const [step, setStep] = useState(1)
	const [isMore, setIsmore] = useState(false)
	const [projectDur, setProjectDuration] = useState<string>('less than 7 days')
	const [selectedJob, setSelectedjob] = useState('')
	const [shiftTiming, setShiftTiming] = useState('')

	const [isSubmittable, setIsSubmittable] = useState(false)

	useEffect(() => {
		if (step === 1) {
			var canSubmit =
				!form.values.jobType || !form.values.technician || !form.values.helper || !form.values.supervisor

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

	const jobTypeInfo = [
		{ icon: Mason, label: 'Mason', value: 'MASON' },
		{ icon: Barbender, label: 'Barbender', value: 'BAR_BENDER' },
		{ icon: Carpenter, label: 'Carpenter', value: 'CARPENTER' },
		{ icon: Plumber, label: 'Plumber', value: 'PLUMBING' },
		{ icon: Electrician, label: 'Electrical', value: 'ELECTRICAL' },

		{ icon: Gypsum, label: 'Gypsum', value: 'GYPSUM' },
	]

	const moreJobType = [
		{ icon: GeneralWorker, label: 'General Worker', value: 'GENERAL_HELPER' },
		{ icon: Painter, label: 'Painter', value: 'PAINTER' },
		{ icon: Stone, label: 'Stone', value: 'STONE_TILE_MARBLE_LAYER' },
		{ icon: Hvac, label: 'Hvac', value: 'HVAC' },

		{ icon: Welderfitter, label: 'Welder fitter', value: 'WELDER_FITTER' },
		{ icon: Shuttering, label: 'Shuttering', value: 'SHUTTERING_CARPENTER' },
	]

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

	const skillsType = {
		Mason: ['Manual Barbending', 'Barbending Machine Operator', 'Other'],
	}

	const projectDuration = [
		{ label: 'less than 7 days' },

		{ label: '7-45 days' },
		{ label: '45-90 days' },
		{ label: '90+ days' },
	]

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
		<Box className={classes.main}>
			<ConfirmCancel
				onCloseDialog={onCloseDialog}
				setOncloseDialog={setOncloseDialog}
				toggleBookingForm={toggleBookingForm}
				bookingFormOpen={bookingFormOpen}
				setBookingFormOpen={setBookingFormOpen}
			/>
			<Box>
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
								style={{ background: `${step === 1 && theme.palette.primary.main}` }}
							/>
							<Stack
								className={classes.stepper}
								style={{ background: `${step === 2 && theme.palette.primary.main}` }}
							/>
							<Stack
								className={classes.stepper}
								style={{ background: `${step === 3 && theme.palette.primary.main}` }}
							/>
						</Grid>
					</Box>
				</Box>

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
											{tags[form.values.jobType]?.map((item: any) => {
												return (
													<Chip
														sx={{
															m: 1,
														}}
														color={form.values.tags.includes(item) ? 'primary' : undefined}
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
										Workers Required & Daily Wage
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
														error={!!checkError(`${info?.name}`, form)}
														placeholder={`${info?.label} Required`}
														id={info?.name}
														name={info?.name}
														value={info?.formvalue}
														onChange={form.handleChange}
														fullWidth
														helperText={info?.error}
														required={true}
													/>
												</Grid>
												<Grid item xs={4} sm={4} md={4}>
													<TextField
														placeholder='Daily wage (Rs.)'
														id={info?.wage}
														name={info?.wage}
														value={info?.wageformvalue}
														onChange={form.handleChange}
														fullWidth
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
													value={form.values.StartDate || new Date()}
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
													color: '#244CB3',
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
													color: '#244CB3',
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
												onChange={form.handleChange}
												required={true}
												fullWidth>
												<MenuItem value={10}>Ten</MenuItem>
												<MenuItem value={20}>Twenty</MenuItem>
												<MenuItem value={30}>Thirty</MenuItem>
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
												onChange={form.handleChange}
												fullWidth>
												<MenuItem value={10}>Ten</MenuItem>
												<MenuItem value={20}>Twenty</MenuItem>
												<MenuItem value={30}>Thirty</MenuItem>
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
												error={!!checkError('siteAddress', form)}
												helperText={form.errors.siteAddress}
												value={form.values.siteAddress}
												onChange={form.handleChange}
												rows={4}
												multiline
												fullWidth
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
												error={!!checkError(`name`, form)}
												helperText={form.errors.name}
												id='name'
												name='name'
												value={form.values.name}
												onChange={form.handleChange}
												placeholder='Enter Your Full Name'
												fullWidth
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
												error={!!checkError(`company`, form)}
												helperText={form.errors.company}
												id='company'
												name='company'
												onChange={form.handleChange}
												value={form.values.company}
												placeholder='Enter Company Name'
												fullWidth
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
												error={!!checkError(`companyEmail`, form)}
												helperText={form.errors.companyEmail}
												id='companyEmail'
												name='companyEmail'
												onChange={form.handleChange}
												value={form.values.companyEmail}
												placeholder='Enter Email'
												fullWidth
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
												error={!!checkError(`phoneNumber`, form)}
												helperText={form.errors.phoneNumber}
												id='phoneNumber'
												name='phoneNumber'
												onChange={form.handleChange}
												value={form.values.phoneNumber}
												placeholder='9999988888'
												fullWidth
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
							<Grid container columnSpacing={40}>
								<Grid item xs={0} sm={0} md={0} lg={0}></Grid>
								<Grid item xs={12} sm={12} md={12} lg={12}>
									{(step === 2 || step === 3) && (
										<Button onClick={handlePrev} style={{ width: '10rem' }}>
											Previous
										</Button>
									)}
									{step !== 4 && (
										<Button
											type='submit'
											disabled={isSubmittable}
											onClick={handleNext}
											style={{ width: '10rem', marginLeft: 20 }}>
											{step === 3 ? 'Finish Booking' : 'Next'}
										</Button>
									)}
								</Grid>
							</Grid>
						</Box>
					</form>
				</Box>

				{step === 4 && (
					<Box style={{ verticalAlign: 'middle' }}>
						<BookingSuccess bookingFormOpen={bookingFormOpen} setBookingFormOpen={setBookingFormOpen} />
					</Box>
				)}
			</Box>
		</Box>
	)
}

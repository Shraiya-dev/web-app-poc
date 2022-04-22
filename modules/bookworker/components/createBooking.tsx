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
	Modal,
} from '@mui/material'
import { useState } from 'react'
import useCreateBooking from '../hooks/useCreateBooking'
import Counter from './counter'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { JobType } from './jobType'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import Link from 'next/link'

import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/system'
import { red } from '@mui/material/colors'
import { theme } from '../../../sdk'

import BookingSuccess from './bookingsuccess'
import ConfirmCancel from './confirmCancel'

export const CreateBooking = ({ toggleBookingForm
}) => {
	const { form } = useCreateBooking()

	const [step, setStep] = useState(1)
	const [isMore, setIsmore] = useState(false)
	
	// const [openDialog, setOpenDialog] = useState(false)
	// const [helper, setHelper] = useState(0)
	// const [supervisor, setSupervisor] = useState(0)
	// const [technician, setTechnician] = useState(0)

	const handleMoreJobType = () => {
		setIsmore((state) => !state)
	}

	const handleNext = () => {
		if (step < 3) {
			setStep((state) => state + 1)
		}
	}

	const handlePrev = () => {
		if (step > 1) {
			setStep((state) => state - 1)
		}
	}

	const jobTypeInfo = [
		{ icon: <ArrowBackIosIcon style={{ fontSize: '24px' }} />, value: '1' },
		{ icon: <ArrowBackIosIcon style={{ fontSize: '24px' }} />, value: '2' },
		{ icon: <ArrowBackIosIcon style={{ fontSize: '24px' }} />, value: '3' },
		{ icon: <ArrowBackIosIcon style={{ fontSize: '24px' }} />, value: '4' },
		{ icon: <ArrowBackIosIcon style={{ fontSize: '24px' }} />, value: '5' },
		{ icon: <ArrowBackIosIcon style={{ fontSize: '24px' }} />, value: '6' },
	]

	const workerType = [
		{
			label: 'Technician',
			icon: <ArrowBackIosIcon style={{ fontSize: '12px' }} />,
			name: 'technician',
			wage: 'technicianWages',
		},
		{
			label: 'Helper',
			icon: <ArrowBackIosIcon style={{ fontSize: '12px' }} />,
			name: 'helper',
			wage: 'helperWages',
		},
		{
			label: 'Supervisor',
			icon: <ArrowBackIosIcon style={{ fontSize: '12px' }} />,
			name: 'supervisor',
			wage: 'supervisorWages',
		},
	]

	const CustomizeDashboard = styled(Box)(({ theme }) => ({
		justifyContent: 'center',
		display: 'flex',
		padding: 10,

		'.stepper': {
			height: 6,
			width: 36,

			borderRadius: 2,
			margin: 4,
			background: theme.palette.primary.light,
		},

		'.viewcta': {
			background: 'transparent',
			boxShadow: 'none',
			display: 'flex',
			justifyContent: 'center',
			textAlign: 'center',
			color: theme.palette.primary.main,
		},

		'.inputLabel': {
			marginTop: 20,
			marginBottom: 10,
		},
	}))

	const CustomizeButton = styled(Button)(({ theme }) => ({}))
	//TODO: Style and color need to be sanitized

	return (
		<CustomizeDashboard>
			{/* <ConfirmCancel
				onCloseDialog={onCloseDialog}
				setOncloseDialog={setOncloseDialog}
				toggleBookingForm={toggleBookingForm}
			/> */}
			<Box>
				<Box>
					<Typography variant='h4' style={{ fontSize: 24 }}>
						Book Workers
					</Typography>
				</Box>
				<Box display='flex'>
					<Grid container justifyContent='flex-start'>
						<Typography variant='h4' style={{ fontSize: 16, marginTop: 20 }}>
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
							style={{ background: `${step === 1 && theme.palette.primary.main}` }}
						/>
						<Stack
							className='stepper'
							style={{ background: `${step === 2 && theme.palette.primary.main}` }}
						/>
						<Stack
							className='stepper'
							style={{ background: `${step === 3 && theme.palette.primary.main}` }}
						/>
					</Grid>
				</Box>

				<Box>
					<form onSubmit={form.handleSubmit}>
						{step === 1 && (
							<Stack>
								<Box>
									<InputLabel htmlFor='jobType' className='inputLabel'>
										Trade
									</InputLabel>
									<Grid container item rowSpacing={2} columnSpacing={2} style={{ marginBottom: 10 }}>
										{jobTypeInfo.map((info) => {
											return <JobType icon={info.icon} jobName={info.value} />
										})}
									</Grid>

									{isMore && (
										<Box>
											<Grid container item rowSpacing={2} columnSpacing={2}>
												{jobTypeInfo.map((info) => {
													return <JobType icon={info.icon} jobName={info.value} />
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
										<Button className='viewcta' onClick={handleMoreJobType}>
											View More
										</Button>
									</Grid>
								</Box>

								<Box>
									<InputLabel htmlFor='jobType' className='inputLabel'>
										Skills
									</InputLabel>
									<Stack display='inline'>
										<Chip
											label='Custom delete icon'
											//   onClick={handleClick}
											//   onDelete={handleDelete}
										/>
										<Chip
											label='Custom delete icon'
											//   onClick={handleClick}
											//   onDelete={handleDelete}

											variant='outlined'
										/>
									</Stack>
								</Box>

								<Box>
									<InputLabel htmlFor='jobType' className='inputLabel'>
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
													<Typography>
														<ArrowBackIosIcon style={{ fontSize: '12px' }} /> {info?.label}
													</Typography>
												</Grid>
												<Grid item xs={4} sm={4} md={4}>
													<TextField
														placeholder={`${info?.label} Required`}
														id={info?.name}
														name={info?.name}
														value={form.values.technician}
														onChange={form.handleChange}
														fullWidth
													/>
												</Grid>
												<Grid item xs={4} sm={4} md={4}>
													<TextField
														placeholder='Daily wage (Rs.)'
														id={info?.wage}
														name={info?.wage}
														value={form.values.technicianWages}
														onChange={form.handleChange}
														fullWidth
													/>
												</Grid>
											</Grid>
										)
									})}

									<Box>
										<InputLabel htmlFor='overtime' className='inputLabel'>
											Overtime Details
										</InputLabel>
										<Grid
											container
											alignItems={'flex-start'}
											spacing={2}
											style={{ marginBottom: 10 }}>
											<Grid item xs={4} sm={4} md={4}>
												<FormControl fullWidth>
													<InputLabel id='overTimeBuffer'>Overtime Buffer</InputLabel>
													<Select
														labelId='overTimeBuffer'
														id='overTimeBuffer'
														value={form.values.projectType}
														label='Overtime Buffer'
														onChange={form.handleChange}>
														<MenuItem value={10}>Ten</MenuItem>
														<MenuItem value={20}>Twenty</MenuItem>
														<MenuItem value={30}>Thirty</MenuItem>
													</Select>
												</FormControl>
											</Grid>

											<Grid item xs={4} sm={4} md={4}>
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
											</Grid>

											<Grid item xs={4} sm={4} md={4}>
												<FormControl fullWidth>
													<InputLabel id='overTime'>Minutes</InputLabel>
													<Select
														labelId='overTime'
														id='overTime'
														value={form.values.projectType}
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
									<InputLabel htmlFor='projectName' className='inputLabel'>
										Enter Project Name
									</InputLabel>
									<Grid container>
										<Grid item xs={12} sm={12} md={6} lg={6}>
											<TextField
												placeholder='Enter Here'
												id='projectName'
												name='projectName'
												value={form.values.projectName}
												onChange={form.handleChange}
												fullWidth
											/>
										</Grid>
									</Grid>
								</Box>

								<Box>
									<InputLabel htmlFor='projectType' className='inputLabel'>
										Choose Project Type
									</InputLabel>

									<Grid container>
										<Grid item xs={12} sm={12} md={6} lg={6}>
											<Select
												labelId='projectType'
												id='projectType'
												value={form.values.projectType}
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
									<InputLabel htmlFor='shiftTiming' className='inputLabel'>
										Shift Timing
									</InputLabel>

									<Grid container spacing={4}>
										<Grid item xs={12} sm={12} md={8} lg={8}>
											<Button
												style={{
													borderRadius: 4,
													padding: 4,
													background: 'white',

													height: 35,
													width: 100,
													color: '#244CB3',
													marginRight: 10,
												}}>
												9am-6pm
											</Button>

											<Button
												style={{
													borderRadius: 4,
													padding: 4,
													background: 'white',

													height: 35,
													width: 100,
													color: '#244CB3',
													marginRight: 10,
												}}>
												6pm-5am
											</Button>

											<Button
												style={{
													borderRadius: 4,
													padding: 4,
													background: 'white',

													height: 35,
													width: 100,
													color: '#244CB3',
												}}>
												Custom
											</Button>
										</Grid>
									</Grid>
								</Box>

								<Box>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={12} md={6} lg={6} display='block'>
											<InputLabel id='projectType' className='inputLabel'>
												State
											</InputLabel>
											<Select
												labelId='projectType'
												id='projectType'
												value={form.values.projectType}
												onChange={form.handleChange}
												fullWidth>
												<MenuItem value={10}>Ten</MenuItem>
												<MenuItem value={20}>Twenty</MenuItem>
												<MenuItem value={30}>Thirty</MenuItem>
											</Select>
											{/* <Select
												labelId='state'
												id='state'
												value={form.values.state}
												onChange={form.handleChange}
												fullWidth>
												<MenuItem value={10}>Ten</MenuItem>
												<MenuItem value={20}>Twenty</MenuItem>
												<MenuItem value={30}>Thirty</MenuItem>
											</Select> */}
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} display='block'>
											<InputLabel className='inputLabel'>City</InputLabel>
											<Select
												labelId='city'
												id='city'
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
											/>
										</Grid>
									</Grid>
								</Box>
							</Box>
						)}
					</form>
				</Box>

				{/* Submit/prev/Next */}

				<Box style={{ position: 'sticky', textAlign: 'center', bottom: 0, padding: 30, background: 'white' }}>
					<Grid container spacing={10}>
						<Grid item alignItems={'flex-start'} xs={6} sm={6} md={6} lg={6}>
							{(step === 2 || step === 3) && (
								<Button fullWidth onClick={handlePrev}>
									Previous
								</Button>
							)}
						</Grid>
						<Grid item alignItems={'flex-end'} xs={6} sm={6} md={6} lg={6}>
							<Button fullWidth onClick={handleNext}>
								{step === 3 ? 'Finish Booking' : 'Next'}
							</Button>
						</Grid>
					</Grid>
				</Box>
				{/* <Box>
					<BookingSuccess />
				</Box> */}
			</Box>
		</CustomizeDashboard>
	)
}

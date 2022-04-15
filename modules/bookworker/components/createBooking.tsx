import {
	Container,
	Stack,
	TextField,
	InputAdornment,
	Button,
	InputLabel,
	Typography,
	Select,
	MenuItem,
	Dialog,
	DialogTitle,
	Box,
	Grid,
	FormControl,
} from '@mui/material'
import { useState } from 'react'
import useCreateBooking from '../hooks/useCreateBooking'
import Counter from './counter'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { JobType } from './jobType'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export const CreateBooking = () => {
	const { form } = useCreateBooking()

	// const [openDialog, setOpenDialog] = useState(false)
	// const [helper, setHelper] = useState(0)
	// const [supervisor, setSupervisor] = useState(0)
	// const [technician, setTechnician] = useState(0)

	// const handleDialog = () => {
	// 	setOpenDialog((state) => !state)
	// }

	//TODO: Style and color need to be sanitized

	return (
		<Box style={{ display: 'flex', justifyContent: 'center' }}>
			<Box>
				<form onSubmit={form.handleSubmit}>
					<Stack spacing={1} direction='column' style={{ padding: 20 }}>
						<Box>
							<Button
								href='/booking'
								startIcon={<ArrowBackIosIcon style={{ fontSize: '24px' }} />}
								variant='text'>
								Back
							</Button>

							<Typography variant='h4'>Booking Details</Typography>
						</Box>

						<Box>
							<InputLabel htmlFor='jobType'>Job Type</InputLabel>
							<Grid container spacing={2}>
								<JobType icon={<ArrowBackIosIcon style={{ fontSize: '24px' }} />} jobName='Hello' />
								<JobType icon={<ArrowBackIosIcon style={{ fontSize: '24px' }} />} jobName='Hello' />
								<JobType icon={<ArrowBackIosIcon style={{ fontSize: '24px' }} />} jobName='Hello' />
								<JobType icon={<ArrowBackIosIcon style={{ fontSize: '24px' }} />} jobName='Hello' />
								<JobType icon={<ArrowBackIosIcon style={{ fontSize: '24px' }} />} jobName='Hello' />
								<JobType icon={<ArrowBackIosIcon style={{ fontSize: '24px' }} />} jobName='Hello' />
							</Grid>
							<Button variant='standard'>Show More</Button>
						</Box>

						<Box>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={6} lg={6}>
									<InputLabel htmlFor='ChooseSpecific'>Choose Specifics</InputLabel>
									<TextField
										placeholder='Enter Here'
										id='otherSpecific'
										name='otherSpecific'
										value={form.values.otherSpecific}
										onChange={form.handleChange}
										fullWidth
									/>
								</Grid>

								<Grid item xs={12} sm={12} md={6} lg={6}>
									<InputLabel htmlFor='otherSpecific'>Other Specifics</InputLabel>
									<Select
										labelId='ChooseSpecific'
										id='ChooseSpecific'
										value={form.values.ChooseSpecific}
										onChange={form.handleChange}
										fullWidth>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</Grid>
							</Grid>

							<Grid container columnSpacing={2}>
								<Grid item xs={4} sm={4} md={4} lg={4}>
									<InputLabel htmlFor='helper'>Helper</InputLabel>
									<TextField
										id='helper'
										name='helper'
										value={form.values.helper}
										onChange={form.handleChange}
										fullWidth
									/>
								</Grid>
								<Grid item xs={4} sm={4} md={4} lg={4}>
									<InputLabel htmlFor='technician'>Technician</InputLabel>

									<TextField
										id='technician'
										name='technician'
										value={form.values.technician}
										onChange={form.handleChange}
										fullWidth
									/>
								</Grid>
								<Grid item xs={4} sm={4} md={4} lg={4}>
									<InputLabel htmlFor='supervisor'>Supervisor</InputLabel>

									<TextField
										id='supervisor'
										name='supervisor'
										value={form.values.supervisor}
										onChange={form.handleChange}
										fullWidth
									/>
								</Grid>
							</Grid>

							{/* Add Requirement */}
							{/* <Button onClick={handleDialog}>Click me</Button> */}

							{/* <Dialog onClose={handleDialog} open={openDialog}>
								<Box style={{ margin: 30 }}>
									<DialogTitle style={{ padding: 0 }}>Add Project Requirements</DialogTitle>
									<Typography>Requirement</Typography>

									<Box style={{ display: 'flex' }}>
										<TextField
											placeholder='Helper'
											id='helper'
											name='helper'
											value={form.values.helper}
											onChange={form.handleChange}
											style={{ marginRight: 20, marginBottom: 20 }}
										/>
										<Counter info={helper} setInfo={setHelper} />
									</Box>

									<Box style={{ display: 'flex' }}>
										<TextField
											placeholder='Supervisor'
											id='supervisor'
											name='supervisor'
											value={form.values.supervisor}
											onChange={form.handleChange}
											style={{ marginRight: 20, marginBottom: 20 }}
										/>
										<Counter info={supervisor} setInfo={setSupervisor} />
									</Box>
									<Box style={{ display: 'flex' }}>
										<TextField
											placeholder='Technician'
											id='technician'
											name='technician'
											value={form.values.technician}
											onChange={form.handleChange}
											style={{ marginRight: 20, marginBottom: 20 }}
										/>
										<Counter info={technician} setInfo={setTechnician} />
									</Box>

									<Box style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'center' }}>
										<Button>Add Requirement</Button>
									</Box>
								</Box>
							</Dialog> */}
							<Grid container columnSpacing={2}>
								<Grid item xs={12} sm={12} md={6} lg={6}>
									<InputLabel htmlFor='BookingDuration'>Booking Duration</InputLabel>
									<Select
										labelId='BookingDuration'
										id='BookingDuration'
										value={form.values.BookingDuration}
										onChange={form.handleChange}
										fullWidth>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</Grid>
							</Grid>
						</Box>

						<div>
							{/* <Typography>Project Details</Typography>

							<InputLabel htmlFor='projectName'>Enter Project Name</InputLabel>
							<TextField
								placeholder='Enter Here'
								id='projectName'
								name='projectName'
								value={form.values.projectName}
								onChange={form.handleChange}
							/>

							<InputLabel htmlFor='projectType'>Choose Project Type</InputLabel>
							<Select
								labelId='projectType'
								id='projectType'
								value={form.values.projectType}
								onChange={form.handleChange}>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select> */}

							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={6} lg={6}>
									<InputLabel htmlFor='shiftTiming'>Shift Timing</InputLabel>
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

								<Grid item xs={12} sm={12} md={6} lg={6}>
									<InputLabel id='startdate'>Start Date</InputLabel>

									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											value={form.values.StartDate}
											onChange={(value) => form.setFieldValue('StartDate', value)}
											renderInput={(params) => <TextField {...params} fullWidth />}
										/>
									</LocalizationProvider>
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={6} lg={6}>
									<InputLabel id='state'>State</InputLabel>
									<Select
										labelId='state'
										id='state'
										value={form.values.state}
										onChange={form.handleChange}
										fullWidth>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</Grid>
								<Grid item xs={12} sm={12} md={6} lg={6}>
									<InputLabel id='city'>City</InputLabel>
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

							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={12} lg={12}>
									<InputLabel id='siteAddress'>Site Address</InputLabel>
									<TextField
										placeholder='Enter Here'
										id='siteAddress'
										name='siteAddress'
										value={form.values.siteAddress}
										onChange={form.handleChange}
										multiline
										fullWidth
									/>
								</Grid>
							</Grid>
						</div>
						<Grid container spacing={2}>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Button variant='outlined' type='submit' fullWidth>
									Cancel
								</Button>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Button type='submit' fullWidth>
									Book Workers
								</Button>
							</Grid>
						</Grid>
					</Stack>
				</form>
			</Box>
		</Box>
	)
}

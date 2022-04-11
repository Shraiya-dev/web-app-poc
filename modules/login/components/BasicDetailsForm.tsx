import { useState } from 'react'
import { useFormik } from 'formik'
import { TextField, Typography, Box, Stack } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/system'

export const BasicDetailsForm = () => {
	const router = useRouter()

	const [loading, setLoading] = useState(false)

	console.log('router', router)
	const form = useFormik({
		initialValues: {
			name: '',
			company: '',
			companyEmail: '',
			phoneNumber: '',
		},
		onSubmit: (values) => {
			router.push('/booking')
		},
	})

	const handlePrev = () => {
		router.push('/login')
	}

	const CustomizedBasicDetails = styled(Box)(({ theme }) => ({
		'.back': {
			paddingTop: '4em',
			paddingLeft: '7em',
		},

		'.cta': {
			marginTop: '1em',
			width: '100%',
			background: '#244CB3',
			color: 'white',
			cursor: 'pointer',
		},
		'.form-info': {
			display: 'flex',
			justifyContent: 'center',
			paddingTop: '12%',
		},
		'.text-field':{
			width: '36.25ch', marginBottom: '1em', height: '6ch'
		}
	}))

	return (
		<CustomizedBasicDetails>
			<Box>
				<Box className='back'>
					<Stack
						display='inline'
						style={{ cursor: 'pointer', background: 'none', fontFamily: 'Mulish' }}
						onClick={() => handlePrev()}>
						<ArrowBackIosIcon style={{ fontSize: '24px', marginRight: '12', verticalAlign: 'middle' }} />
						<Typography display='inline' style={{ verticalAlign: 'middle' }}>
							Back
						</Typography>
					</Stack>
				</Box>

				<Box className='form-info'>
					<form onSubmit={form.handleSubmit} style={{ width: '36.25ch' }}>
						<Typography variant='h5' style={{ paddingBottom: '0.5em' }}>
							Basic Details
						</Typography>

						<Typography>Name</Typography>
						<TextField
							id='name'
							name='name'
							onChange={form.handleChange}
							value={form.values.name}
							placeholder='Enter Your Full Name'
							required={true}
							className='text-field'
						/>

						<Typography>Company</Typography>
						<TextField
							id='company'
							name='company'
							onChange={form.handleChange}
							value={form.values.company}
							placeholder='Enter Company Name'
							required={true}
							className='text-field'
						/>

						<Typography>Company Email</Typography>
						<TextField
							id='companyEmail'
							name='companyEmail'
							onChange={form.handleChange}
							value={form.values.companyEmail}
							placeholder='Enter Email'
							required={true}
							className='text-field'
						/>

						<Typography>Phone Number</Typography>
						<TextField
							id='phoneNumber'
							name='phoneNumber'
							onChange={form.handleChange}
							value={form.values.phoneNumber}
							placeholder='9999988888'
							required={true}
							className='text-field'
						/>
						<LoadingButton
							type='submit'
							loading={loading}
							loadingPosition='start'
							variant='contained'
							className='cta'>
							Next
						</LoadingButton>
					</form>
				</Box>
			</Box>
		</CustomizedBasicDetails>
	)
}

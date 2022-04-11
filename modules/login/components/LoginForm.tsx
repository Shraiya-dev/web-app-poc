import { useFormik } from 'formik'
import OtpInput from 'react-otp-input'
import { TextField, Typography, Box } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useContractorAuth } from '../../../sdk'
import { styled } from '@mui/system'

export const LoginForm = () => {
	const router = useRouter()
	const { requestOtp, verifyOtp, logOut } = useContractorAuth()

	const [otp, setOtp] = useState('')
	const [loading, setLoading] = useState(false)

	const form = useFormik({
		initialValues: {
			phoneNumber: '',
		},
		onSubmit: (values) => {
			console.log('values', values)
			setLoading(true)
			requestOtp(values.phoneNumber)
			setLoading(false)
			router.push('/onboarding')
		},
	})

	const handleChange = (otpInfo:any) => {
		setOtp(otpInfo)
	}

	return (
		<Box style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
			<form onSubmit={form.handleSubmit}>
				<Typography variant='h4' style={{ paddingBottom: '1em' }}>
					Log In
				</Typography>

				<Typography>Phone Number</Typography>
				<TextField
					id='phoneNumber'
					name='phoneNumber'
					placeholder='Enter Phone Number'
					//required={true}
					sx={{ width: '21.5em', marginBottom: '1.5em' }}
					InputProps={{
						startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
					}}
					value={form.values.phoneNumber}
					onChange={form.handleChange}
				/>
				<Typography>Enter OTP</Typography>
				<OtpInput
					value={otp}
					onChange={handleChange}
					numInputs={6}
					inputStyle={{
						marginRight: '0.5rem',
						borderRadius: '4px',
						width: '3.8em',
						height: '3.8em',
						border: '1px solid #C4C4C4',
					}}
					focusStyle={{ border: '1px solid #C4C4C4' }}
					separator={<span> </span>}
				/>

				<LoadingButton
					type='submit'
					loading={loading}
					loadingPosition='start'
					variant='contained'
					style={{
						marginTop: '1.5em',
						width: '100%',
						background: '#244CB3',
						color: 'white',
						cursor: 'pointer',
					}}>
					Submit
				</LoadingButton>
			</form>
		</Box>
	)
}

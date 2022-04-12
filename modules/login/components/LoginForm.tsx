import { useFormik, FormikErrors } from 'formik'
import OtpInput from 'react-otp-input'
import { TextField, Typography, Box, Stack } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useContractorAuth } from '../../../sdk'
import { styled } from '@mui/system'
import * as Yup from 'yup'
import { checkError } from '../../../sdk'

export const LoginForm = () => {
	const router = useRouter()
	const { requestOtp} = useContractorAuth()

	const [otp, setOtp] = useState('')
	const [loading, setLoading] = useState(false)

	const form = useFormik({
		initialValues: {
			phoneNumber: '',
		},

		validate: (values) => {
			const errors = {}

			if (values.phoneNumber === '' || Number.isNaN(Number(values.phoneNumber))) {
				errors.phoneNumber = 'Enter Valid phone Number'
			}
			return errors
		},
		onSubmit: (values) => {
			console.log('values', values)
			setLoading(true)
			requestOtp(values.phoneNumber)
			setLoading(false)
			router.push('/verifyOTP')
		},
	})

	const handleChange = (otpInfo: any) => {
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
					error={!!checkError('phoneNumber', form)}
					id='phoneNumber'
					name='phoneNumber'
					placeholder='Enter Phone Number'
					//required={true}
					sx={{ width: '100%', marginBottom: "10" }}
					InputProps={{
						startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
					}}
					value={form.values.phoneNumber}
					onChange={form.handleChange}
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

import { useFormik } from 'formik'
import OtpInput from 'react-otp-input'
import { Button, TextField, Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const LoginForm = ({ setIsBasicDetails }) => {
	const router = useRouter()

	console.log('router', router)
	const [otp, setOtp] = useState()
	const [loading, setLoading] = useState(false)
	const formik = useFormik({
		initialValues: {
			phone: '',
		},
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2))
			setLoading(true)
			setIsBasicDetails(true)
		},
	})

	const handleChange = (e) => {
		console.log('event', e)
		setOtp(e)
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
			<form onSubmit={formik.handleSubmit}>
				<Typography variant='h5' style={{ paddingBottom: '0.5em' }}>
					Log In
				</Typography>

				<Typography>Phone Number</Typography>
				<TextField
					id='phone'
					name='phone'
					type='phone'
					placeholder='Enter Phone Number'
					required={true}
					sx={{ width: '21.5em', marginBottom: '1em' }}
					InputProps={{
						startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
					}}
				/>
				<Typography>Enter OTP</Typography>
				<OtpInput
					onChange={(otp) => handleChange(otp)}
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
					value={otp}
				/>

				<LoadingButton
					type='submit'
					//   onClick={handleClick}
					//   endIcon={<SendIcon />}
					loading={loading}
					loadingPosition='start'
					variant='contained'
					style={{
						marginTop: '1em',
						width: '100%',
						background: '#244CB3',
						color: 'white',
						cursor: 'pointer',
					}}>
					Submit
				</LoadingButton>
			</form>
		</div>
	)
}

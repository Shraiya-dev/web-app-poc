import { Typography, Box, Stack, Button } from '@mui/material'

import OtpInput from 'react-otp-input'
import useOtp from '../hooks/useOtp'
import { CircularProgress } from '@mui/material'

export const OTPVerification = () => {
	const { otp, form, status, error, handleChange } = useOtp()

	return (
		<Box style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
			<form onSubmit={form.handleSubmit}>
				<Typography variant='h4'>Enter OTP</Typography>

				<OtpInput
					value={otp.otp}
					onChange={handleChange}
					numInputs={6}
					inputStyle={{
						marginTop: 20,
						marginRight: '1rem',
						borderRadius: '4px',
						width: '3.8em',
						height: '3.8em',
						border: '1px solid #C4C4C4',
					}}
					focusStyle={{ border: '1px solid #C4C4C4' }}
					separator={<span> </span>}
					isInputNum={true}
					hasErrored={!!error}
					errorStyle={{ border: '1px solid #F70000' }}
				/>
				<Stack
					style={{
						cursor: 'pointer',
						marginTop: 10,
						marginBottom: 20,
						marginRight: 15,
						textAlign: 'center',
					}}>
					Resend OTP
				</Stack>

				<Button type='submit' variant='contained' color='primary' fullWidth disabled={status === 'loading'}>
					{status === 'loading' ? <CircularProgress size={30} /> : `Verify OTP`}
				</Button>
			</form>
		</Box>
	)
}

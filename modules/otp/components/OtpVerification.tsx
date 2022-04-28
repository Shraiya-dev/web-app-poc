import { Typography, Box, Stack, Button, styled } from '@mui/material'

import OtpInput from 'react-otp-input'
import useOtp from '../hooks/useOtp'
import { CircularProgress } from '@mui/material'
import { theme } from '../../../sdk'

const CustomOTPStyles = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	padding: 20,
	paddingTop: '37%',

	'.headerInfo': {
		paddingBottom: '0.5em',
		fontSize: 36,
		fontWeight: 700,
	},
	'.subHeader': {
		cursor: 'pointer',
		marginTop: 10,
		marginBottom: 20,
		marginRight: 15,
		textAlign: 'center',
		fontSize: 12,
	},
	'.cta': {
		marginTop: '1.5em',
		width: '100%',
		background: '#244CB3',
		color: 'white',
		cursor: 'pointer',
	},
}))

export const OTPVerification = () => {
	const { otp, form, status, error, handleChange, resendOTP, otpState } = useOtp()

	return (
		<CustomOTPStyles>
			<Box>
				<form onSubmit={form.handleSubmit}>
					<Typography style={{ fontSize: 36, fontWeight: 700 }}>Enter OTP</Typography>

					<OtpInput
						value={otp.otp}
						onChange={handleChange}
						numInputs={6}
						inputStyle={{
							marginTop: 20,
							marginRight: '1rem',
							borderRadius: '4px',
							width: '3em',
							height: '3em',
							border: '1px solid #C4C4C4',
							display: 'flex',
							justifyContent: 'center',
						}}
						shouldAutoFocus={true}
						separator={<span> </span>}
						isInputNum={true}
						hasErrored={!!error || !!otpState.error}
						errorStyle={{ border: '1px solid #F70000' }}
					/>
					<Stack className='subHeader' onClick={resendOTP}>
						Resend OTP
					</Stack>

					<Button type='submit' variant='contained' color='primary' fullWidth disabled={status === 'loading'}>
						{status === 'loading' ? <CircularProgress size={30} /> : `Verify OTP`}
					</Button>
				</form>
			</Box>
		</CustomOTPStyles>
	)
}

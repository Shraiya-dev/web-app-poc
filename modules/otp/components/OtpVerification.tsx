import { Typography, Box, Stack, Button } from '@mui/material'

import OtpInput from 'react-otp-input'
import useOtp from '../hooks/useOtp'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { CircularProgress } from '@mui/material'

export const OTPVerification = () => {
	const { otp, form, status, handleChange, handleOTPSubmit } = useOtp()
	return (
		<Box style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
			<form onSubmit={form.handleSubmit}>
				<Typography variant='h4'>OTP Verification</Typography>

				<Stack style={{ marginTop: 20, marginBottom: 10 }}>Enter OTP</Stack>

				<OtpInput
					value={otp.otp}
					onChange={handleChange}
					numInputs={6}
					inputStyle={{
						marginRight: '1rem',
						borderRadius: '4px',
						width: '3.8em',
						height: '3.8em',
						border: '1px solid #C4C4C4',
					}}
					focusStyle={{ border: '1px solid #C4C4C4' }}
					separator={<span> </span>}
                    isInputNum={true}
                   // hasErrored={true}
                    errorStyle={{border: '1px solid #F70000'}}
				/>
				<Stack style={{ float: 'right', cursor: 'pointer', marginTop: 10, marginBottom: 20, marginRight: 15 }}>
					Resend OTP
				</Stack>

				<Button
					onClick={handleOTPSubmit}
					variant='contained'
					color='primary'
					fullWidth
					endIcon={status !== 'loading' && <ArrowRightAltIcon />}
					disabled={status === 'loading'}>
					{status === 'loading' ? <CircularProgress size={30} /> : `Submit OTP`}
				</Button>
			</form>
		</Box>
	)
}

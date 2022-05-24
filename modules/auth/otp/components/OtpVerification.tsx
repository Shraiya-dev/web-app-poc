import { Typography, Box, Stack, Button, styled } from '@mui/material'

import OtpInput from 'react-otp-input'
import useOtp from '../hooks/useOtp'
import { CircularProgress } from '@mui/material'
import { primary, theme } from '../../../../sdk'
import Link from 'next/link'
import { LoadingButton } from '@mui/lab'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useRouter } from 'next/router'

const CustomOTPStyles = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	// padding: 16,
	// paddingTop: '37%',

	'.headerInfo': {
		paddingBottom: '0.5em',
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 700,
	},
	'.subHeader': {
		cursor: 'pointer',
		marginTop: 10,
		marginBottom: 10,
		//marginRight: 15,
		textAlign: 'center',
		fontSize: 14,
	},
	'.cta': {
		marginTop: '1.5em',
		width: '100%',
		background: '#244CB3',
		color: 'white',
		cursor: 'pointer',
	},
	'.otpFocus': {
		border: '1px solid red',
	},
	// [theme.breakpoints.down('md')]: {
	// 	paddingTop: 16,
	// },
}))

export const OTPVerification = ({ ...props }) => {
	const { otp, form, status, error, handleChange, resendOTP, otpState, loading, setLoading } = useOtp()
	const { isOtpSent, setIsOtpSent } = props
	const router = useRouter()
	const handleChangeNumber = () => {
		setIsOtpSent(false)
	}

	return (
		<CustomOTPStyles>
			<>
				<form onSubmit={form.handleSubmit}>
					<ArrowBackIosNewIcon
						onClick={() => router.push('https://www.projecthero.in/')}
						sx={{
							verticalAlign: 'middle',
							color: primary.main,
							fontSize: 24,
							cursor: 'pointer',
						}}
					/>
					<Typography className='headerInfo'>Enter OTP</Typography>

					<OtpInput
						value={otp.otp}
						onChange={handleChange}
						numInputs={6}
						inputStyle={{
							marginTop: 20,

							borderRadius: '4px',
							width: '3.4em',
							height: '3.4em',
							border: '1px solid #C4C4C4',
							display: 'flex',
							justifyContent: 'center',
						}}
						shouldAutoFocus={true}
						separator={<span> &nbsp;&nbsp;&nbsp;</span>}
						isInputNum={true}
						hasErrored={!status}
						errorStyle={{ border: '1px solid #F70000' }}
					/>
					<Stack className='subHeader' onClick={resendOTP}>
						Resend OTP
					</Stack>

					{/* <Button type='submit' variant='contained' color='primary' fullWidth disabled={status === 'loading'}>
						{status === 'loading' ? <CircularProgress size={30} /> : `Verify OTP`}
					</Button> */}

					<LoadingButton type='submit' loading={loading} disabled={loading} variant='contained' fullWidth>
						{`Verify OTP`}
					</LoadingButton>

					<Typography
						sx={{ textDecoration: 'underline', textAlign: 'center', cursor: 'pointer' }}
						color='primary.main'
						mt={'16px'}
						onClick={handleChangeNumber}>
						Change Number
					</Typography>
				</form>
			</>
		</CustomOTPStyles>
	)
}

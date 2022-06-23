import { Typography, Box, Stack, styled, Button } from '@mui/material'

import OtpInput from 'react-otp-input'
import useOtp from '../hooks/useOtp'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import { ButtonClicked } from '../../../../sdk/analytics/analyticsWrapper'
import BackButton from '../../../../sdk/components/backButton/backButtom'
import { textAlign } from '@mui/system'
import { OnboardingCard } from '../../../../sdk/layouts/OrganisationCard'

const CustomOTPStyles = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	// padding: 16,
	// paddingTop: '37%',

	'.headerInfo': {
		paddingBottom: 8,
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 700,
	},
	'.subHeader': {
		//cursor: 'pointer',
		marginTop: 16,
		//marginBottom: 10,
		//marginRight: 15,
		textAlign: 'center',
		fontSize: 14,
	},
	'.subInfo': {
		color: theme.palette.secondary.main,
		textAlign: 'center',
		marginBottom: 48,
	},
	'.cta': {
		marginTop: 48,
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
	const { otp, form, status, error, handleChange, resendOTP, otpState, loading, setLoading, phoneNumber } = useOtp()
	const { isOtpSent, setIsOtpSent } = props
	const router = useRouter()
	const handleChangeNumber = () => {
		ButtonClicked({
			action: 'Change Number',
			page: 'Login',
			url: router.asPath,
		})
		setIsOtpSent(false)
	}

	return (
		<CustomOTPStyles>
			<>
				<form onSubmit={form.handleSubmit}>
					<Typography className='headerInfo'>Verify Mobile</Typography>

					<Typography className='subInfo'>
						Enter{' '}
						<Box fontWeight='1000' fontStyle={'bolder'} display='inline' color={'black'}>
							OTP
						</Box>{' '}
						sent to your mobile number{' '}
						<Box fontWeight='1000' display='inline' color={'black'}>
							{phoneNumber}
						</Box>
					</Typography>

					<OtpInput
						value={otp.otp}
						onChange={handleChange}
						numInputs={6}
						inputStyle={{
							//marginTop: 20,

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
						containerStyle={{ justifyContent: 'center' }}
					/>
					<Stack className='subHeader' direction={'row'} justifyContent='center'>
						<Button onClick={resendOTP} variant='text'>
							Resend OTP
						</Button>
						<Button onClick={handleChangeNumber} variant='text'>
							Change Number
						</Button>
					</Stack>

					{/* <Button type='submit' variant='contained' color='primary' fullWidth disabled={status === 'loading'}>
						{status === 'loading' ? <CircularProgress size={30} /> : `Verify OTP`}
					</Button> */}

					<LoadingButton
						type='submit'
						loading={loading}
						disabled={loading}
						variant='contained'
						fullWidth
						sx={{ marginTop: 6 }}>
						{`Verify OTP`}
					</LoadingButton>

					{/* <Typography
						sx={{ textDecoration: 'underline', textAlign: 'center', cursor: 'pointer' }}
						color='primary.main'
						mt={'16px'}
						onClick={handleChangeNumber}>
						Change Number
					</Typography> */}
				</form>
			</>
		</CustomOTPStyles>
	)
}

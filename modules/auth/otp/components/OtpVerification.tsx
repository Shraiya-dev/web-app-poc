import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, CircularProgress, Stack, styled, Typography } from '@mui/material'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import OtpInput from 'react-otp-input'
import { getCookie, primary, useContractorAuth } from 'sdk'
import { ButtonClicked } from '../../../../sdk/analytics/analyticsWrapper'
import useOtp from '../hooks/useOtp'

const CustomOTPStyles = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',

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
		color: theme.palette.secondary.dark,
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
	const { isOtpSent, setIsOtpSent, fromHome } = props
	const { user } = useContractorAuth()
	const router = useRouter()
	const handleChangeNumber = () => {
		ButtonClicked({
			action: 'Change Number',
			page: 'Login',
			url: router.asPath,
		})
		setIsOtpSent(false)
	}

	// useEffect(() => {
	// 	if (loading) {

	// 	}
	// }, [loading, router])

	return (
		<CustomOTPStyles>
			<>
				<form onSubmit={form.handleSubmit}>
					<Typography
						className='headerInfo'
						sx={{
							color: !!fromHome ? primary?.properDark : '#ccc',
						}}>
						Verify Mobile
					</Typography>

					<Typography className='subInfo' color={'#ccc'}>
						Enter <strong>OTP</strong> sent to your mobile number
						<br /> <strong>{phoneNumber}</strong>
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

					{loading ? (
						<Button
							fullWidth
							sx={{
								marginTop: 6,
							}}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '20px',
								}}>
								<CircularProgress
									size={'medium'}
									sx={{
										color: '#000',
										width: '30px',
										height: '30px',
									}}
								/>
							</Box>
						</Button>
					) : (
						<LoadingButton
							type='submit'
							disabled={loading}
							variant='contained'
							fullWidth
							sx={{ marginTop: 6, background: '#efc430' }}>
							{`Verify OTP`}
						</LoadingButton>
					)}

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

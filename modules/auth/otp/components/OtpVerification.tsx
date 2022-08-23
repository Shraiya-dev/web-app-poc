import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, CircularProgress, Stack, styled, Typography } from '@mui/material'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { getCookie, primary, useContractorAuth } from 'sdk'
import BookingStepper from 'sdkv2/components/EasyBookingStepper/BookingStepper'
import { ButtonClicked } from '../../../../sdk/analytics/analyticsWrapper'
import useOtp from '../hooks/useOtp'

const CustomOTPStyles = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',

	'.headerInfo': {
		paddingBottom: 16,
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 700,
		fontFamily: 'Saira,sans-serif',
		color: primary?.properDark,
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
		color: '#4d4d4d',
		textAlign: 'center',
		marginBottom: 30,
		marginTop: 18,
		fontFamily: 'Karla ,sans-serif',
		fontWeight: 400,
		fontSize: '14px',
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
	const [isDiscoveryBooking, setIsDiscoveryBooking] = useState<boolean>(false)
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

	useEffect(() => {
		if (!!getCookie('discoveryBooking')) setIsDiscoveryBooking(true)
		else setIsDiscoveryBooking(false)
	}, [isDiscoveryBooking, router])

	return (
		<CustomOTPStyles>
			<form onSubmit={form.handleSubmit}>
				<Typography className='headerInfo'>Verify Mobile</Typography>

				{!!isDiscoveryBooking ? (
					<>
						<BookingStepper />
					</>
				) : (
					''
				)}

				<Typography className='subInfo'>
					Enter <span style={{ fontWeight: 900 }}>OTP</span> sent to your mobile number
					<br /> <strong style={{ fontWeight: 900 }}>{phoneNumber}</strong>
				</Typography>

				<OtpInput
					value={otp.otp}
					onChange={handleChange}
					numInputs={6}
					inputStyle={{
						//marginTop: 20,
						borderRadius: '4px',
						width: '2.8em',
						height: '3.2em',
						border: '1px solid #000',
						display: 'flex',
						justifyContent: 'center',
						'& :hover': {
							background: 'red !important',
						},
					}}
					shouldAutoFocus={true}
					separator={<span> &nbsp;&nbsp;&nbsp;</span>}
					isInputNum={true}
					hasErrored={!status}
					errorStyle={{ border: '1px solid #F70000' }}
					containerStyle={{ justifyContent: 'center' }}
				/>
				<Stack className='subHeader' direction={'row'} justifyContent='center'>
					<Button
						onClick={handleChangeNumber}
						variant='text'
						sx={{
							color: primary.properDark,
							fontFamily: 'Karla,sans-serif',
							fontSize: '12px',
							fontWeight: 500,
						}}>
						Edit Mobile
					</Button>
					<Button
						onClick={resendOTP}
						variant='text'
						sx={{
							color: primary.properDark,
							fontFamily: 'Karla,sans-serif',
							fontSize: '12px',
							fontWeight: 500,
						}}>
						Resend OTP
					</Button>
				</Stack>

				{/* <Button type='submit' variant='contained' color='primary' fullWidth disabled={status === 'loading'}>
						{status === 'loading' ? <CircularProgress size={30} /> : `Verify OTP`}
					</Button> */}

				{loading ? (
					<Button
						fullWidth
						sx={{
							mt: 4,
							mb: '19px',
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
						sx={{ marginTop: 4, background: '#efc430' }}>
						Verify OTP
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
		</CustomOTPStyles>
	)
}

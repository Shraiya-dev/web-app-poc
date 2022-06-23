import { Typography, Box, styled, Stack, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import { useRouter } from 'next/router'
import OtpInput from 'react-otp-input'
import useEmailOtpVerification from '../hooks/useEmailOtpVerification'
import BackButton from '../../../../sdk/components/backButton/backButtom'
import { useEffect } from 'react'
import { OnboardingCard } from '../../../../sdk/layouts/OrganisationCard'

const CustomEmailOtpVerifyStyles = styled(Box)(({ theme }) => ({
	'.header': {
		marginBottom: 8,
		fontSize: 30,
		fontWeight: 700,
		textAlign: 'center',
	},
	'.subInfo': {
		color: theme.palette.secondary.main,
		textAlign: 'center',
		marginBottom: 48,
	},

	'.cta': {
		marginTop: 48,
		width: '100%',
		color: 'white',
		cursor: 'pointer',
	},
}))
export const EmailOtpVerification = ({ ...props }) => {
	const { handleChangeEmail } = props
	const { otp, form, status, error, handleChange, resendOTP, loading, user } = useEmailOtpVerification()

	const router = useRouter()

	useEffect(() => {
		resendOTP()
	}, [router.pathname === '/verify-email'])

	return (
		<OnboardingCard>
			<CustomEmailOtpVerifyStyles>
				<form onSubmit={form.handleSubmit}>
					<Typography className='header'>Verify Email</Typography>

					<Box className='subInfo'>
						Enter{' '}
						<Typography fontWeight='1000' fontStyle={'bolder'} display='inline' color={'black'}>
							OTP
						</Typography>{' '}
						sent to your email{' '}
						<Typography fontWeight='1000' display='inline' color={'black'}>
							{user?.email}
						</Typography>
					</Box>

					<Stack spacing={3}>
						<OtpInput
							value={otp.otp}
							onChange={handleChange}
							numInputs={6}
							inputStyle={{
								borderRadius: '4px',

								width: 44,
								height: 44,
								border: '1px solid #C4C4C4',
								display: 'flex',
								justifyContent: 'center',
							}}
							shouldAutoFocus={true}
							separator={<span> &nbsp;&nbsp;&nbsp;</span>}
							isInputNum={true}
							hasErrored={status === 'success' ? false : !status}
							errorStyle={{ border: '1px solid #F70000' }}
							containerStyle={{ justifyContent: 'center' }}
						/>
					</Stack>

					<Stack className='subHeader' direction={'row'} justifyContent='center'>
						<Button onClick={resendOTP} variant='text'>
							Resend OTP
						</Button>
						<Button onClick={() => handleChangeEmail()} variant='text'>
							Edit Email
						</Button>
					</Stack>

					<LoadingButton className='cta' type='submit' loading={!!loading} variant='contained'>
						Continue
					</LoadingButton>
				</form>
			</CustomEmailOtpVerifyStyles>
		</OnboardingCard>
	)
}

import { Typography, Box, styled, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import { useRouter } from 'next/router'
import BackButton from '../../../../sdk/components/backButton/backButtom'
import { EmailOtpVerification } from './emailOtpVerify'
import { checkError, InputWrapper } from '../../../../sdk'
import useEditEmail from '../hooks/useEditEmail'
import { useEffect } from 'react'

const CustomLoginStyles = styled(Box)(({ theme }) => ({
	margin: 8,

	'.headerInfo': {
		marginTop: 24,
		marginBottom: 48,
		fontSize: 30,
		fontWeight: 700,
		textAlign: 'center',
	},

	'.subHeader': {
		marginTop: 16,
		textAlign: 'center',
		fontSize: 14,
	},

	'.cta': {
		marginTop: 48,
		width: '100%',
		color: 'white',
		cursor: 'pointer',
	},
}))
export const VerifyEmailOtp = () => {
	const { form, loading, isChangeEmail, setIsChangeEmail, handleChangeEmail } = useEditEmail()

	const router = useRouter()

	const EmailScreen = () => {
		if (!isChangeEmail) {
			return <EmailOtpVerification handleChangeEmail={handleChangeEmail} />
		} else {
			return (
				<>
					<Typography className='headerInfo'>Edit Email</Typography>
					<form onSubmit={form.handleSubmit}>
						<InputWrapper
							id='email'
							label='Company Email'
							toolTip='Use email with your company domain e.g. rahul@gecpl.com'>
							<TextField
								id='email'
								name='email'
								value={form.values.email ?? form.initialValues.email}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								placeholder='name@company.com'
								error={!!checkError('email', form)}
								helperText={checkError('email', form)}
							/>
						</InputWrapper>
						<LoadingButton
							type='submit'
							className='cta'
							variant='contained'
							loading={loading}
							disabled={loading}>
							Continue
						</LoadingButton>
					</form>
				</>
			)
		}
	}

	return (
		<CustomLoginStyles>
			{/* <EmailOtpVerification handleChangeEmail={handleChangeEmail} /> */}
			{!isChangeEmail ? (
				<EmailOtpVerification handleChangeEmail={handleChangeEmail} />
			) : (
				<>
					<BackButton onClick={() => router.push('https://www.projecthero.in/')} />

					<Typography className='headerInfo'>Edit Email</Typography>
					<form onSubmit={form.handleSubmit}>
						<InputWrapper
							id='email'
							label='Company Email'
							toolTip='Use email with your company domain e.g. rahul@gecpl.com'>
							<TextField
								id='email'
								name='email'
								value={form.values.email ?? form.initialValues.email}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								placeholder='name@company.com'
								error={!!checkError('email', form)}
								helperText={checkError('email', form)}
							/>
						</InputWrapper>
						<LoadingButton type='submit' className='cta' variant='contained' loading={loading}>
							Continue
						</LoadingButton>
					</form>
				</>
			)}
		</CustomLoginStyles>
	)
}

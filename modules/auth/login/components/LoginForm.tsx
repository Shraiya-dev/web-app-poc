import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, InputLabel, Stack, styled, Typography } from '@mui/material'

import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { InputWrapper } from 'sdkv2/components'
import { checkError, getCookie } from '../../../../sdk'
import { PhoneField } from '../../../../sdk/components/Input/PhoneField'
import useLogin from '../hooks/useLogin'

const CustomLoginStyles = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',

	'.info': {
		margin: 10,
	},
	'.headerInfo': {
		//paddingBottom: 48,
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 700,
	},
	'.subHeader': {
		fontSize: 14,
		paddingBottom: 8,
		marginTop: 48,
	},
	'.cta': {
		marginTop: 48,
		width: '100%',
		//background: '#244CB3',
		cursor: 'pointer',
	},
	'.register': {
		paddingTop: 24,
		textAlign: 'center',
		justifyContent: 'center',
	},
}))

export const LoginForm = ({ ...props }) => {
	const { form, loading, error, isRegister, handleLogin, status } = useLogin()
	const { isOtpSent, setIsOtpSent, fromHome, setActiveStepValue } = props

	const router = useRouter()

	useEffect(() => {
		if (status === 'success') {
			setIsOtpSent(true)
		}
	}, [form, status])

	useEffect(() => {
		if (loading) {
			setActiveStepValue(3)
		}
	}, [loading, setActiveStepValue])

	return (
		<form onSubmit={form.handleSubmit}>
			<CustomLoginStyles>
				<Stack spacing={3} width='100%'>
					{!!fromHome ? (
						<Typography variant='h1' textAlign={'center'}>
							{isRegister ? 'Register' : 'Login'}
						</Typography>
					) : (
						<Typography textAlign='center' fontSize={34} variant='h1'>
							{isRegister ? 'Register' : 'Login'}
						</Typography>
					)}

					<InputWrapper label='Phone Number'>
						<PhoneField
							error={!!checkError('phoneNumber', form)}
							id='phoneNumber'
							name='phoneNumber'
							placeholder='Enter Phone Number'
							helperText={
								checkError('phoneNumber', form) !== 'valid' ? checkError('phoneNumber', form) : ''
							}
							sx={{ width: '100%', mt: 1 }}
							// InputProps={{
							// 	startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
							// }}
							value={form.values.phoneNumber}
							onChange={form.handleChange}
						/>
					</InputWrapper>

					<LoadingButton fullWidth type='submit' loading={!!loading} variant='contained'>
						{isRegister ? 'Register' : 'Login'}
					</LoadingButton>

					<Stack className='register' direction={'row'} style={{ cursor: 'pointer' }}>
						<Typography>{isRegister ? `Already have an account?` : `Don't have an account?`}</Typography>
						<Button
							onClick={handleLogin}
							variant='text'
							//disabled={!form.isValid}
							style={{
								textDecoration: 'underline',
								cursor: 'pointer',
								color: 'primary.main',
								padding: 0,
								fontSize: 14,
							}}>
							{isRegister ? 'Login' : 'Register'}
						</Button>
					</Stack>
				</Stack>
			</CustomLoginStyles>
		</form>
	)
}

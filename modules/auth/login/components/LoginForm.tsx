import { TextField, Typography, Box, Stack, styled, Button } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'

import { checkError, InputWrapper, primary, theme } from '../../../../sdk'
import useLogin from '../hooks/useLogin'
import Link from 'next/link'
import { useEffect } from 'react'
import { PhoneField } from '../../../../sdk/components/Input/PhoneField'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useRouter } from 'next/router'
import BackButton from '../../../../sdk/components/backButton/backButtom'

const CustomLoginStyles = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',

	'.info': {
		margin: 10,
	},
	'.headerInfo': {
		paddingTop: 24,
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
		color: 'white',
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
	const { isOtpSent, setIsOtpSent } = props

	const router = useRouter()

	useEffect(() => {
		if (status === 'success') {
			setIsOtpSent(true)
		}
	}, [form, status])

	return (
		<CustomLoginStyles>
			<Box>
				<BackButton onClick={() => router.push('https://www.projecthero.in/')} />

				<form onSubmit={form.handleSubmit}>
					<Typography className='headerInfo'>{isRegister ? 'Register' : 'Log In'} </Typography>

					{isRegister && (
						<Typography sx={{ color: theme.palette.error.main, textAlign: 'center', marginTop: 1 }}>
							{`Company Email & GSTIN is required in the next step`}
						</Typography>
					)}

					<Typography className='subHeader'>Phone Number</Typography>

					<PhoneField
						error={!!checkError('phoneNumber', form)}
						id='phoneNumber'
						name='phoneNumber'
						placeholder='Enter Phone Number'
						helperText={checkError('phoneNumber', form) !== 'valid' ? checkError('phoneNumber', form) : ''}
						sx={{ width: '100%', marginBottom: '10' }}
						// InputProps={{
						// 	startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
						// }}
						value={form.values.phoneNumber}
						onChange={form.handleChange}
					/>

					<LoadingButton className='cta' type='submit' loading={!!loading} variant='contained'>
						{isRegister ? 'Register' : 'Login'}
					</LoadingButton>

					<Stack className='register' direction={'row'} style={{ cursor: 'pointer' }}>
						<Typography>{isRegister ? `Already have an account?` : `Don’t have an account?`}</Typography>
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
				</form>
			</Box>
		</CustomLoginStyles>
	)
}

import { TextField, Typography, Box, Stack, styled } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'

import { checkError } from '../../../sdk'
import useLogin from '../hooks/useLogin'
import Link from 'next/link'

const CustomLoginStyles = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	padding: 20,
	paddingTop: '37%',
	'.main': {
		width: 328,
		height: 274,
	},

	'.info': {
		margin: 10,
	},
	'.headerInfo': {
		paddingBottom: '0.5em',
		fontSize: 36,
	},
	'.subHeader': {
		fontSize: 14,
		paddingBottom: 8,
	},
	'.cta': {
		marginTop: '1.5em',
		width: '100%',
	},
	'.register': {
		paddingTop: 16,
	},
	[theme.breakpoints.down('md')]: {
		padding: 20,
		paddingTop: 20,
	},
}))

export const LoginForm = () => {
	const { form, loading, setLoading, error, isRegister, handleLogin } = useLogin()

	return (
		<CustomLoginStyles>
			<Box className='main'>
				<form onSubmit={form.handleSubmit}>
					<Typography className='headerInfo'>{isRegister ? 'Register' : 'Log In'} </Typography>

					<Typography className='subHeader'>Phone Number</Typography>
					<TextField
						error={!!checkError('phoneNumber', form)}
						id='phoneNumber'
						name='phoneNumber'
						placeholder='Enter Phone Number'
						//required={true}
						helperText={checkError('phoneNumber', form) !== 'valid' ? checkError('phoneNumber', form) : ''}
						sx={{ width: '100%', marginBottom: '10' }}
						InputProps={{
							startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
						}}
						value={form.values.phoneNumber}
						onChange={(e: any) => {
							if (e.target.value.length <= 10) {
								form.handleChange(e)
							}
						}}
					/>
					<LoadingButton
						className='cta'
						type='submit'
						loading={loading}
						disabled={loading}
						variant='contained'>
						{isRegister ? 'Register' : 'Login'}
					</LoadingButton>

					<Stack className='register' direction={'row'}>
						<Typography>Don’t have an account?</Typography>
						<a>
							<Typography
								sx={{ textDecoration: 'underline' }}
								onClick={handleLogin}
								color='primary.main'
								component={'span'}
								ml={'8px'}
								style={{ cursor: 'pointer' }}>
								{isRegister ? 'Login' : 'Register'}
							</Typography>
						</a>
					</Stack>
				</form>
			</Box>
		</CustomLoginStyles>
	)
}

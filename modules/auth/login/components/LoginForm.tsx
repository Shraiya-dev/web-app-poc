import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Checkbox, FormControlLabel, InputLabel, Stack, styled, Typography } from '@mui/material'

import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { InputWrapper } from 'sdkv2/components'
import { checkError, getCookie, primary } from '../../../../sdk'
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
	const { isOtpSent, setIsOtpSent, fromHome } = props

	const router = useRouter()

	useEffect(() => {
		if (status === 'success') {
			setIsOtpSent(true)
		}
	}, [form, status])

	// useEffect(() => {
	// 	if (loading) {
	// 		router.push({
	// 			pathname: '',
	// 			query: { bookingFromStep: 3 },
	// 		})
	// 	}
	// }, [loading, router])

	return (
		<form onSubmit={form.handleSubmit}>
			<CustomLoginStyles>
				<Stack spacing={1.5} width='100%' px={1.06}>
					{!!fromHome ? (
						<Typography
							variant='h1'
							textAlign={'center'}
							sx={{
								color: !!fromHome ? primary?.properDark : '#fff',
							}}>
							{isRegister ? 'Register' : 'Login'}
						</Typography>
					) : (
						<Typography
							textAlign='center'
							fontSize={34}
							variant='h1'
							sx={{
								color: !!fromHome ? primary?.properDark : '#ccc',
							}}>
							{isRegister ? 'Register' : 'Login'}
						</Typography>
					)}

					<InputWrapper
						label='Phone Number'
						sx={{
							color: !!fromHome ? '#000' : '#ccc',
							my: { md: 2, xs: 1 },
						}}>
						<PhoneField
							error={!!checkError('phoneNumber', form)}
							id='phoneNumber'
							name='phoneNumber'
							placeholder='Enter Phone Number'
							helperText={
								checkError('phoneNumber', form) !== 'valid' ? checkError('phoneNumber', form) : ''
							}
							sx={{
								width: '100%',
								'& .MuiOutlinedInput-root': {
									// outline: '1px solid #ccc',
									border: '1px solid #ccc',
									overflow: 'hidden',
								},
							}}
							// InputProps={{
							// 	startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
							// }}
							value={form.values.phoneNumber}
							onChange={form.handleChange}
						/>
					</InputWrapper>
					{/* <FormControlLabel
						control={<Checkbox defaultChecked />}
						label='Send me whatsapp updates'
						sx={{
							'& .MuiTypography-root': {
								color: primary.properDark,
							},
						}}
					/> */}
					<LoadingButton fullWidth type='submit' loading={!!loading} variant='contained'>
						{isRegister ? 'Register' : 'Login'}
					</LoadingButton>

					<Stack className='register' direction={'row'} style={{ cursor: 'pointer' }}>
						<Typography color={primary?.properDark}>
							{isRegister ? `Already have an account?` : `Don't have an account?`}
						</Typography>
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

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
	'.info': {
		margin: 10,
	},
	'.headerInfo': {
		paddingBottom: '0.5em',
		fontSize: 36,
	},
	'.subHeader': {
		fontSize: 14,
	},
	'.cta': {
		marginTop: '1.5em',
		width: '100%',
		background: '#244CB3',
		color: 'white',
		cursor: 'pointer',
	},
}))

export const LoginForm = () => {
	const { form, loading, error } = useLogin()

	console.log('loading', loading)

	return (
		<CustomLoginStyles>
			<form onSubmit={form.handleSubmit}>
				<Typography className='headerInfo'>Log In</Typography>

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
				{console.log(checkError('phoneNumber', form))}
				<LoadingButton className='cta' type='submit' loading={!!loading} variant='contained'>
					Submit
				</LoadingButton>
			</form>
		</CustomLoginStyles>
	)
}

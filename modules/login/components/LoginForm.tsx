import { TextField, Typography, Box, Stack } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'

import { checkError } from '../../../sdk'
import useLogin from '../hooks/useLogin'

export const LoginForm = () => {
	const { form, loading, error } = useLogin()

	return (
		<Box style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
			<form onSubmit={form.handleSubmit}>
				<Typography variant='h4' style={{ paddingBottom: '1em' }}>
					Log In
				</Typography>

				<Typography>Phone Number</Typography>
				<TextField
					error={!!checkError('phoneNumber', form)}
					id='phoneNumber'
					name='phoneNumber'
					placeholder='Enter Phone Number'
					//required={true}
					helperText={checkError('phoneNumber', form) !== 'valid' ? checkError('phoneNumber', form) : 'll'}
					sx={{ width: '100%', marginBottom: '10' }}
					InputProps={{
						startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
					}}
					value={form.values.phoneNumber}
					onChange={form.handleChange}
				/>
				{console.log(checkError('phoneNumber', form))}
				<LoadingButton
					type='submit'
					loading={loading}
					loadingPosition='start'
					variant='contained'
					style={{
						marginTop: '1.5em',
						width: '100%',
						background: '#244CB3',
						color: 'white',
						cursor: 'pointer',
					}}>
					Submit
				</LoadingButton>
			</form>
		</Box>
	)
}

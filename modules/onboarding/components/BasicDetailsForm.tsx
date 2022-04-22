import { TextField, Typography, Box, Button, InputLabel, Stack } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/system'

import useOnboarding from '../hooks/useOnboard'

import { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit'

export const BasicDetailsForm = () => {
	const { form, loading } = useOnboarding()

	const router = useRouter()

	console.log('--', router)

	// const CustomizedBasicDetails = styled(Box)(({ theme }) => ({
	// 	'.back': {
	// 		paddingTop: '4em',
	// 		paddingLeft: '7em',
	// 	},

	// 	'.cta': {
	// 		marginTop: '1em',
	// 		width: '100%',
	// 		background: '#244CB3',
	// 		color: 'white',
	// 		cursor: 'pointer',
	// 	},
	// 	'.form-info': {
	// 		display: 'flex',
	// 		justifyContent: 'center',
	// 		paddingTop: '12%',
	// 	},
	// 	'.text-field': {
	// 		width: '36.25ch',
	// 		marginBottom: '1em',
	// 		height: '6ch',
	// 	},
	// }))

	return (
		<Box>
			<Box style={{ display: 'flex', justifyContent: 'center', paddingTop: '12%' }}>
				<form onSubmit={form.handleSubmit} style={{ width: '36.25ch' }}>
					<Stack>
						<Typography variant='h5' display='inline' style={{ paddingBottom: '0.5em' }}>
							Basic Details
							{router.asPath === '/profile' && (
								<Button variant='text' style={{ float: 'right' }} endIcon={<EditIcon />}>
									Edit
								</Button>
							)}
						</Typography>

						<InputLabel id='name' style={{ paddingTop: 10, paddingBottom: 6 }}>
							Name
						</InputLabel>
						<TextField
							id='name'
							name='name'
							value={form.values.name}
							onChange={form.handleChange}
							placeholder='Enter Your Full Name'
							required={true}
							//className='text-field'
						/>

						<InputLabel id='company' style={{ paddingTop: 10, paddingBottom: 6 }}>
							Company
						</InputLabel>
						<TextField
							id='company'
							name='company'
							onChange={form.handleChange}
							value={form.values.company}
							placeholder='Enter Company Name'
							required={true}
							//className='text-field'
						/>

						<InputLabel id='companyEmail' style={{ paddingTop: 10, paddingBottom: 6 }}>
							Company Email
						</InputLabel>
						<TextField
							id='companyEmail'
							name='companyEmail'
							onChange={form.handleChange}
							value={form.values.companyEmail}
							placeholder='Enter Email'
							required={true}
							//className='text-field'
						/>

						<InputLabel id='phoneNumber' style={{ paddingTop: 10, paddingBottom: 6 }}>
							Phone Number
						</InputLabel>
						<TextField
							id='phoneNumber'
							name='phoneNumber'
							onChange={form.handleChange}
							value={form.values.phoneNumber}
							placeholder='9999988888'
							required={true}
							//className='text-field'
						/>
						<LoadingButton
							type='submit'
							loading={loading}
							//loadingPosition='start'
							variant='contained'
							style={{
								marginTop: '1em',
								width: '100%',
								background: '#244CB3',
								color: 'white',
								cursor: 'pointer',
							}}>
							{router.asPath === '/profile' ? 'Save' : 'Next'}
						</LoadingButton>
					</Stack>
				</form>
			</Box>
		</Box>
	)
}

import { TextField, Typography, Box, Button, InputLabel, Stack, Input } from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/system'

import useOnboarding from '../hooks/useOnboard'

import { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit'

import { useState } from 'react'

export const BasicDetailsForm = () => {
	const { form, loading } = useOnboarding()

	const router = useRouter()
	const [editInfo, setEditInfo] = useState(false)

	const handleEdit = () => {
		setEditInfo((state) => !state)
	}

	return (
		<Box>
			<Box style={{ display: 'flex', justifyContent: 'center', paddingTop: '12%' }}>
				<form onSubmit={form.handleSubmit} style={{ width: '36.25ch' }}>
					<Stack>
						<Typography variant='h5' display='inline' style={{ paddingBottom: '0.5em' }}>
							Basic Details
							{router.asPath === '/profile' && (
								<Button
									variant='text'
									style={{ float: 'right' }}
									endIcon={<EditIcon />}
									onClick={handleEdit}>
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
							variant={router.asPath === '/profile' && editInfo ? 'outlined' : 'standard'}
							disabled={!(router.asPath === '/profile' && editInfo)}
							InputProps={{
								disableUnderline: !(router.asPath === '/profile' && editInfo),
							}}
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
							variant={router.asPath === '/profile' && editInfo ? 'outlined' : 'standard'}
							disabled={!(router.asPath === '/profile' && editInfo)}
							InputProps={{
								disableUnderline: !(router.asPath === '/profile' && editInfo),
							}}
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
							variant={router.asPath === '/profile' && editInfo ? 'outlined' : 'standard'}
							disabled={!(router.asPath === '/profile' && editInfo)}
							InputProps={{
								disableUnderline: !(router.asPath === '/profile' && editInfo),
							}}
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
							variant={router.asPath === '/profile' && editInfo ? 'outlined' : 'standard'}
							disabled={!(router.asPath === '/profile' && editInfo)}
							InputProps={{
								disableUnderline: !(router.asPath === '/profile' && editInfo),
							}}
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

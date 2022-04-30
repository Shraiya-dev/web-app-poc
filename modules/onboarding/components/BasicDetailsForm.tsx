import { TextField, Typography, Box, Button, InputLabel, Stack, Input, styled } from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'
import useBasicForm from '../hooks/useBasicForm'
import { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit'
import { checkError } from '../../../sdk'
import { Cancel } from '@mui/icons-material'

const BasicFormStyle = styled(Box)(({ theme }) => ({
	padding:20,
	'.cta': {
		marginTop: '1em',
		width: '100%',
		background: '#244CB3',
		color: 'white',
		cursor: 'pointer',
	},
	'.inputLabel': {
		paddingTop: 10,
		paddingBottom: 6,
	},
}))

export const BasicDetailsForm = () => {
	const { form, loading, editInfo, setEditInfo, handleEdit } = useBasicForm()

	const router = useRouter()

	return (
		<BasicFormStyle>
			<Box>
				<Box
					style={{
						display: 'flex',
						justifyContent: 'center',
						paddingTop: router.asPath === '/profile' ? '10%' : '20%',
					}}>
					<form onSubmit={form.handleSubmit} style={{ width: '36.25ch' }}>
						<Stack>
							<Typography  display='inline' style={{ paddingBottom: '0.5em', fontSize:36,width:'100%' }}>
								Basic Details
								{router.asPath === '/profile' && (
									<Button
										variant='text'
										style={{ float: 'right', }}
										endIcon={editInfo?<Cancel />:<EditIcon />}
										onClick={handleEdit}>

											{editInfo?'Cancel':'Edit'}
										
									</Button>
								)}
							</Typography>

							<InputLabel id='name' className='inputLabel'>
								Name
							</InputLabel>
							<TextField
								id='name'
								name='name'
								value={form.values.name}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								InputProps={{
									disableUnderline: !(router.asPath === '/profile' && editInfo),
								}}
								placeholder='Enter Your Full Name'
								//variant={router.asPath === '/profile'  ? editInfo? 'outlined' : 'standard':'outlined'}
								disabled={router.asPath === '/profile' ? !editInfo : false}
								error={!!checkError('name', form)}
								helperText={checkError('name', form)}
								style={{ fontSize: '18px' }}
							/>

							<InputLabel id='company' className='inputLabel'>
								Company
							</InputLabel>
							<TextField
								id='company'
								name='company'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								value={form.values.company}
								placeholder='Enter Company Name'
								//variant={router.asPath === '/profile'  ? editInfo? 'outlined' : 'standard':'outlined'}
								disabled={router.asPath === '/profile' ? !editInfo : false}
								InputProps={{
									disableUnderline: !(router.asPath === '/profile' && editInfo),
								}}
								error={!!checkError('company', form)}
								helperText={checkError('company', form)}
							/>

							<InputLabel id='companyEmail' className='inputLabel'>
								Company Email
							</InputLabel>
							<TextField
								id='companyEmail'
								name='companyEmail'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								value={form.values.companyEmail}
								placeholder='Enter Email'
								//variant={router.asPath === '/profile'  ? editInfo? 'outlined' : 'standard':'outlined'}
								disabled={router.asPath === '/profile' ? !editInfo : false}
								InputProps={{
									disableUnderline: !(router.asPath === '/profile' && editInfo),
								}}
								error={!!checkError('companyEmail', form)}
								helperText={checkError('companyEmail', form)}
							/>

							<InputLabel id='phoneNumber' className='inputLabel'>
								Phone Number
							</InputLabel>

							<TextField
								id='phoneNumber'
								name='phoneNumber'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								value={form.values.phoneNumber}
								placeholder='9999988888'
								//variant={router.asPath === '/profile'  ? editInfo? 'outlined' : 'standard':'outlined'}
								disabled={true}
								InputProps={{
									disableUnderline: !(router.asPath === '/profile' && editInfo),
								}}
								error={!!checkError('phoneNumber', form)}
								helperText={checkError('phoneNumber', form)}
							/>
							{((editInfo && router.asPath === '/profile') || router.asPath === '/onboarding') && (
								<LoadingButton type='submit' loading={loading} variant='contained' className='cta'>
									{router.asPath === '/profile' ? 'Save' : 'Next'}
								</LoadingButton>
							)}
						</Stack>
					</form>
				</Box>
			</Box>
		</BasicFormStyle>
	)
}

import { TextField, Typography, Box, Button, InputLabel, Stack, Input, styled, InputAdornment } from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'
import useBasicForm from '../hooks/useBasicForm'
import { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit'
import { checkError, InputWrapper } from '../../../sdk'
import { Cancel } from '@mui/icons-material'

const BasicFormStyle = styled(Box)(({ theme }) => ({
	padding: 16,
	marginTop: '14%',
	'.cta': {
		marginTop: '1em',
		width: '100%',
	},
	'.inputLabel': {
		paddingTop: 10,
		paddingBottom: 6,
	},
	[theme.breakpoints.down('md')]: {
		padding: 16,
		paddingTop: 16,
		marginTop: 0,
	},
}))

export const BasicDetailsForm = () => {
	const { form, loading, setLoading, editInfo, setEditInfo, handleEdit } = useBasicForm()

	const router = useRouter()

	return (
		<BasicFormStyle>
			<Box>
				<Box
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}>
					<form onSubmit={form.handleSubmit} style={{ width: '36.25ch' }}>
						<Stack spacing={2}>
							<Typography display='inline' style={{ fontSize: 36, width: '100%' }}>
								Basic Details
								{router.asPath === '/profile' && (
									<Button
										variant='text'
										style={{ float: 'right' }}
										endIcon={editInfo ? <Cancel /> : <EditIcon />}
										onClick={handleEdit}>
										{editInfo ? 'Cancel' : 'Edit'}
									</Button>
								)}
							</Typography>

							<InputWrapper id='name' label='Name'>
								<TextField
									id='name'
									name='name'
									value={form.values.name}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									placeholder='Enter Your Full Name'
									variant={
										router.asPath === '/profile' ? (editInfo ? 'outlined' : 'standard') : 'outlined'
									}
									disabled={router.asPath === '/profile' ? !editInfo : false}
									error={!!checkError('name', form)}
									helperText={checkError('name', form)}
									style={{ fontSize: '18px' }}
								/>
							</InputWrapper>

							<InputWrapper id='company' label='Company'>
								<TextField
									id='company'
									name='company'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									value={form.values.company}
									placeholder='Enter Company Name'
									variant={
										router.asPath === '/profile' ? (editInfo ? 'outlined' : 'standard') : 'outlined'
									}
									disabled={router.asPath === '/profile' ? !editInfo : false}
									error={!!checkError('company', form)}
									helperText={checkError('company', form)}
								/>
							</InputWrapper>

							<InputWrapper id='companyEmail' label='Company Email'>
								<TextField
									id='companyEmail'
									name='companyEmail'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									value={form.values.companyEmail}
									placeholder='Enter Email'
									variant={
										router.asPath === '/profile' ? (editInfo ? 'outlined' : 'standard') : 'outlined'
									}
									disabled={router.asPath === '/profile' ? !editInfo : false}
									error={!!checkError('companyEmail', form)}
									helperText={checkError('companyEmail', form)}
								/>
							</InputWrapper>

							<InputWrapper id='phoneNumber' label='Phone Number'>
								<TextField
									id='phoneNumber'
									name='phoneNumber'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									value={form.values.phoneNumber}
									InputProps={{
										startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
									}}
									placeholder='Enter Phone Number'
									variant={
										router.asPath === '/profile' ? (editInfo ? 'outlined' : 'standard') : 'outlined'
									}
									disabled={true}
									error={!!checkError('phoneNumber', form)}
									helperText={checkError('phoneNumber', form)}
								/>
							</InputWrapper>

							{((editInfo && router.asPath === '/profile') || router.asPath === '/onboarding') && (
								<LoadingButton
									type='submit'
									loading={loading}
									variant='contained'
									className='cta'
									disabled={loading}>
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

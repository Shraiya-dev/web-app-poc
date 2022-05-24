import { Cancel } from '@mui/icons-material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import EditIcon from '@mui/icons-material/Edit'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Stack, styled, TextField, Typography } from '@mui/material'
import { padding } from '@mui/system'
import { useRouter } from 'next/router'
import { checkError, InputWrapper, primary, theme, useContractorAuth, useMobile } from '../../../sdk'
import { PhoneField } from '../../../sdk/components/Input/PhoneField'
import { TextWrapper } from '../../../sdk/components/Input/TextWrapper'
import { CustomTopBar } from '../../../sdk/components/topBar/customTopBar'
import useBasicForm from '../hooks/useBasicForm'

const BasicFormStyle = styled(Box)(({ theme }) => ({
	padding: 16,
	background: 'white',

	'.headerInfo': {
		fontSize: 30,
		width: '100%',
		//textAlign: 'center',
	},

	'.cta': {
		marginTop: 32,
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
	const { form, loading, editInfo, handleEdit } = useBasicForm()

	const router = useRouter()
	const isMobile = useMobile()
	const { user } = useContractorAuth()

	return (
		<BasicFormStyle>
			{router.asPath === '/profile' && (
				<CustomTopBar>
					<Stack mb={3}>
						<Typography
							style={{
								fontSize: isMobile ? 20 : 26,
								fontWeight: 700,
								color: theme.palette.secondary.main,
							}}>
							Company Profile
						</Typography>
						<Typography style={{ fontSize: 14, color: theme.palette.secondary.main }}>
							{user?.companyName}
						</Typography>
					</Stack>
				</CustomTopBar>
			)}
			<form onSubmit={form.handleSubmit}>
				<Stack spacing={3} className='main'>
					{/* <Button
					startIcon={<Logout />}
					onClick={logOut}
					variant='text'
					color='primary'
					style={{ float: 'right' }}>
					LogOut
				</Button> */}

					{router.asPath !== '/profile' && (
						<ArrowBackIosNewIcon
							onClick={() => router.push('https://www.projecthero.in/')}
							sx={{
								verticalAlign: 'middle',
								color: primary.main,
								fontSize: 24,
								cursor: 'pointer',
							}}
						/>
					)}
					{!editInfo && (
						<Typography display='inline' className='headerInfo'>
							{router.asPath !== '/profile' ? 'Add Company Details' : ''}
							{router.asPath === '/profile' && (
								<Button
									variant='text'
									style={{ float: 'left', padding: 0 }}
									endIcon={<EditIcon />}
									onClick={handleEdit}>
									{'Edit Profile'}
								</Button>
							)}
						</Typography>
					)}

					{/* <TextWrapper id='name' label='Name'> {form.values.name}</TextWrapper> */}

					<InputWrapper id='name' label='Name'>
						<TextField
							id='name'
							name='name'
							value={form.values.name}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							placeholder='Full Name'
							variant={router.asPath === '/profile' ? (editInfo ? 'outlined' : 'standard') : 'outlined'}
							//disabled={router.asPath === '/profile' ? !editInfo : false}
							error={!!checkError('name', form)}
							helperText={checkError('name', form)}
							style={{ fontSize: '18px', width: isMobile || router.asPath !== '/profile' ? '' : '25%' }}
							inputProps={{ readOnly: router.asPath === '/profile' ? !editInfo : false }}
						/>
					</InputWrapper>

					{router.asPath === '/profile' && (
						<InputWrapper id='phoneNumber' label='Phone Number'>
							<PhoneField
								id='phoneNumber'
								name='phoneNumber'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								value={form.values.phoneNumber}
								placeholder='Enter Phone Number'
								variant={
									router.asPath === '/profile' ? (editInfo ? 'outlined' : 'standard') : 'outlined'
								}
								disabled={true}
								error={!!checkError('phoneNumber', form)}
								helperText={checkError('phoneNumber', form)}
								style={{
									fontSize: '18px',
									width: isMobile || router.asPath !== '/profile' ? '' : '25%',
								}}
								inputProps={{ readOnly: true }}
							/>
						</InputWrapper>
					)}

					<InputWrapper id='company' label='Company'>
						<TextField
							id='company'
							name='company'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.company}
							placeholder='e.g. Hindustan Construction Company'
							variant={router.asPath === '/profile' ? (editInfo ? 'outlined' : 'standard') : 'outlined'}
							//disabled={router.asPath === '/profile' ? !editInfo : false}
							error={!!checkError('company', form)}
							helperText={checkError('company', form)}
							style={{ fontSize: '18px', width: isMobile || router.asPath !== '/profile' ? '' : '25%' }}
							inputProps={{ readOnly: router.asPath === '/profile' ? !editInfo : false }}
						/>
					</InputWrapper>

					<InputWrapper id='companyEmail' label='Company Email'>
						<TextField
							id='companyEmail'
							name='companyEmail'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.companyEmail}
							placeholder='name@company.com'
							variant={router.asPath === '/profile' ? (editInfo ? 'outlined' : 'standard') : 'outlined'}
							//disabled={router.asPath === '/profile' ? !editInfo : false}
							error={!!checkError('companyEmail', form)}
							helperText={checkError('companyEmail', form)}
							style={{ fontSize: '18px', width: isMobile || router.asPath !== '/profile' ? '' : '25%' }}
							inputProps={{ readOnly: router.asPath === '/profile' ? !editInfo : false }}
						/>
					</InputWrapper>

					<InputWrapper id='GSTIN' label='GSTIN'>
						<TextField
							id='GSTIN'
							name='GSTIN'
							onChange={(e) => {
								if (e.target.value.length <= 15) {
									form.handleChange(e)
								}
							}}
							onBlur={form.handleBlur}
							value={form.values.GSTIN}
							placeholder='15 Digits GSTIN'
							variant={router.asPath === '/profile' ? (editInfo ? 'outlined' : 'standard') : 'outlined'}
							//disabled={router.asPath === '/profile' ? !editInfo : false}
							error={!!checkError('GSTIN', form)}
							helperText={checkError('GSTIN', form)}
							style={{ fontSize: '18px', width: isMobile || router.asPath !== '/profile' ? '' : '25%' }}
							inputProps={{
								style: { textTransform: 'uppercase' },
								readOnly: router.asPath === '/profile' ? !editInfo : false,
							}}
						/>
					</InputWrapper>

					<Stack
						direction='row'
						style={{ fontSize: '18px', width: isMobile || router.asPath !== '/profile' ? '' : '25%' }}
						spacing={2}>
						{editInfo && router.asPath === '/profile' && (
							<Button
								fullWidth
								onClick={handleEdit}
								style={{
									border: `1px solid ${primary.main}`,
									background: primary.light,
									color: primary.main,
									boxShadow: 'none',
								}}>
								Cancel
							</Button>
						)}

						{((editInfo && router.asPath === '/profile') || router.asPath === '/onboarding') && (
							<LoadingButton
								type='submit'
								loading={loading}
								variant='contained'
								//	className='cta'
								disabled={loading || !form.isValid}
								fullWidth>
								{router.asPath === '/profile' ? 'Save' : 'Next'}
							</LoadingButton>
						)}
					</Stack>
				</Stack>
			</form>
		</BasicFormStyle>
	)
}

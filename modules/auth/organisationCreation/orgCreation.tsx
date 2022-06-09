import { Typography, Box, styled, TextField, Stack, Grid, IconButton, CircularProgress } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import useCreateProfile from './hooks/useOrgCreation'
import { useRouter } from 'next/router'
import { checkError, FileInput, InputWrapper, primary } from '../../../sdk'
import { Add, Close } from '@mui/icons-material'
import BackButton from '../../../sdk/components/backButton/backButtom'
import { CompanyNameField } from '../../../sdk/components/Input/companyNameField'

const CustomOrgCreationStyles = styled(Box)(({ theme }) => ({
	margin: 8,

	'.headerInfo': {
		marginTop: 24,
		//marginBottom: 48,
		fontSize: 30,
		fontWeight: 700,
		//textAlign: 'center',
	},
	'.info': {
		marginTop: 16,
		marginBottom: 32,
		fontSize: 13,
		color: theme.palette.secondary.main,
	},

	'.cta': {
		marginTop: 48,
		width: '100%',
		color: 'white',
		cursor: 'pointer',
	},
}))

export const OrgCreationForm = () => {
	const { form, loading, isGSTINDocUploaded, uploadFiles } = useCreateProfile()

	const router = useRouter()

	return (
		<CustomOrgCreationStyles>
			<BackButton onClick={() => router.push('https://www.projecthero.in/')} />

			<form onSubmit={form.handleSubmit}>
				<Typography className='headerInfo'>Tell us about your company </Typography>
				<Typography className='info'>
					Create a company profile where you can see other members of your company who’re using Project Hero.
					You can also manage them and assign projects later on.{' '}
				</Typography>
				<Stack spacing={3}>
					<InputWrapper id='companyName' label='Company Name'>
						<CompanyNameField
							id='companyName'
							name='companyName'
							value={form.values.companyName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							placeholder='Full Name'
							error={!!checkError('companyName', form)}
							helperText={checkError('companyName', form)}
							fullWidth
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
							error={!!checkError('GSTIN', form)}
							helperText={checkError('GSTIN', form)}
							inputProps={{
								style: { textTransform: 'uppercase' },
							}}
						/>
					</InputWrapper>

					<InputWrapper id='GSTINDoc' label='Upload GSTIN Certificate'>
						<Grid container item xs={12} sm={12} md={12} lg={12} rowSpacing={1}>
							<FileInput
								sx={{
									width: 150,

									marginRight: 1,
									marginTop: 1,
								}}
								accept='image/*'
								icon={
									isGSTINDocUploaded ? (
										<CircularProgress
											style={{
												textAlign: 'center',
												justifyContent: 'center',
												width: 32,
												height: 32,
												fontWeight: 100,
											}}
										/>
									) : (
										<Add
											style={{
												textAlign: 'center',
												justifyContent: 'center',
												width: 32,
												height: 32,
												fontWeight: 100,
											}}
										/>
									)
								}
								id='GSTINDocument-upload'
								variant='outlined'
								onChange={(e: any) => {
									uploadFiles([...e.target.files])
									e.target.value = ''
								}}
							/>
							{form.values.GSTINDocuments?.map((url: any, index: any) => {
								return (
									<>
										<Grid item xs={3} md={3} key={index} mr={2}>
											<Stack sx={{ position: 'relative', marginRight: 1 }}>
												<IconButton
													size='small'
													onClick={() => {
														form.setFieldValue(
															'GSTINDocuments',
															form.values.GSTINDocuments.filter((file) => file !== url)
														)
													}}
													sx={(theme) => ({
														backgroundColor: theme.palette.grey[100],
														color: primary.main,
														position: 'absolute',

														top: -10,
														right: -10,
													})}>
													<Close />
												</IconButton>

												<img
													style={{
														height: 84,
														width: 84,
														objectFit: 'cover',
														borderRadius: 8,
														marginBottom: 0,
													}}
													src={url}
													// src={
													// 	url.substr(url.lastIndexOf('.') + 1) === 'pdf'
													// 		? '/assets/icons/pdf.svg'
													// 		: url
													// }
													alt={'image'}
												/>
											</Stack>
										</Grid>
									</>
								)
							})}
						</Grid>
					</InputWrapper>
				</Stack>

				<LoadingButton
					className='cta'
					type='submit'
					loading={!!loading}
					variant='contained'
					disabled={
						!form.isValid ||
						!form.values.companyName ||
						!form.values.GSTIN ||
						form.values.GSTINDocuments.length === 0
					}>
					Continue
				</LoadingButton>
			</form>
		</CustomOrgCreationStyles>
	)
}

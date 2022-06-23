import LoadingButton from '@mui/lab/LoadingButton'
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	IconButton,
	InputAdornment,
	Stack,
	styled,
	TextField,
	Typography,
} from '@mui/material'

import { Add, CheckCircle, Close } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { checkError, FileInput, InputWrapper, primary, useFormikProps } from '../../../sdk'
import BackButton from '../../../sdk/components/backButton/backButtom'
import { CompanyNameField } from '../../../sdk/components/Input/companyNameField'
import useCreateProfile from './hooks/useOrgCreation'
import { OnboardingCard } from '../../../sdk/layouts/OrganisationCard'
import { LogoutAndRedirect } from '../../../sdk/utils/logoutHelper'

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
	const {
		form,
		loading,
		isGSTINDocUploaded,
		uploadFiles,
		component,
		GSTINForm,
		orgDetails,
		isGSTINVerified,
		setIsGSTINVerified,
	} = useCreateProfile()
	const router = useRouter()
	const gstinFormikProps = useFormikProps(GSTINForm)
	return (
		<>
			<OnboardingCard confirmation={component === 'ORG'} title='Leave without completing profile?'>
				<CustomOrgCreationStyles>
					{component === 'ORG' && (
						<>
							<Typography className='headerInfo'>Tell us about your company </Typography>
							<Typography className='info'>
								Create a company profile where you can see other members of your company who’re using
								Project Hero. You can also manage them and assign projects later on.{' '}
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

								<form onSubmit={GSTINForm.handleSubmit}>
									<InputWrapper id='GSTIN' label='GSTIN'>
										<TextField
											placeholder='15 Digits GSTIN'
											{...gstinFormikProps('gstin')}
											onChange={(e) => {
												if (e.target.value.length <= 15) {
													setIsGSTINVerified(false)
													GSTINForm.handleChange(e)
												}
											}}
											inputProps={{
												style: { textTransform: 'uppercase' },
											}}
											InputProps={{
												endAdornment: (
													<InputAdornment position='end'>
														{isGSTINVerified ? (
															<CheckCircle color='success' />
														) : (
															<LoadingButton
																type='submit'
																size='small'
																disabled={
																	!!GSTINForm.errors.gstin || !GSTINForm.values.gstin
																}
																loading={!!loading}
																variant='contained'>
																Verify
															</LoadingButton>
														)}
													</InputAdornment>
												),
											}}
										/>
									</InputWrapper>
								</form>

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
																		form.values.GSTINDocuments.filter(
																			(file) => file !== url
																		)
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
								onClick={(e: any) => form.handleSubmit(e)}
								loading={!!loading}
								variant='contained'
								disabled={
									!form.values.companyName ||
									!form.values.GSTIN ||
									form.values.GSTINDocuments.length === 0 ||
									!isGSTINVerified
								}>
								Continue
							</LoadingButton>
						</>
					)}
					{component === 'ERROR' && (
						<Stack spacing={4}>
							<Typography color='secondary.main'>
								Company <span style={{ fontWeight: 700 }}>{orgDetails?.companyName}</span> already
								exists on Project Hero for the GSTIN{' '}
								<span style={{ fontWeight: 700 }}>{orgDetails?.GSTIN} </span> you provided
							</Typography>
							{orgDetails?.contactDetails ? (
								<Typography color='error.main'>
									Please ask{' '}
									<span style={{ fontWeight: 700 }}>
										{orgDetails?.contactDetails?.name} ({orgDetails?.contactDetails?.phoneNumber})
									</span>
									, your company admin, to add you to the company account
								</Typography>
							) : (
								<Typography color='error.main'>
									Please ask <span style={{ fontWeight: 700 }}>Project Hero admin</span> to add you to
									the company account
								</Typography>
							)}
							<Button onClick={() => LogoutAndRedirect()}>Got It</Button>
						</Stack>
					)}
				</CustomOrgCreationStyles>
			</OnboardingCard>
		</>
	)
}

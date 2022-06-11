import { Box, Button, CircularProgress, Grid, IconButton, Stack, styled, TextField } from '@mui/material'
import {
	checkError,
	CompanyNameField,
	FileInput,
	getCustomerDetails,
	InputWrapper,
	primary,
	useContractorAuth,
	useMobile,
} from '../../../sdk'

import { ButtonClicked } from '../../../sdk/analytics/analyticsWrapper'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import useCompanyDetails from '../hooks/useCompanyDetails'
import { Add, Close } from '@mui/icons-material'
import { useCallback, useEffect } from 'react'
import { updateOrganisation } from '../apis/apis'

const EditCompanyInfoStyle = styled(Box)(({ theme }) => ({}))

const EditCompanyInfo = ({ ...props }) => {
	const { form, loading, isGSTINDocUploaded, uploadFiles, getOrgDetails, orgDetails } = useCompanyDetails()
	const { isCmpDetailsEditable, setIsCmpDetailsEditable } = props
	const router = useRouter()
	const { user } = useContractorAuth()

	const isMobile = useMobile()

	const updateOrg = useCallback(async () => {
		const payload = {
			companyName: form.values.companyName,
			GSTIN: form.values.GSTIN.toUpperCase(),
			GstinCertificate: form.values.GSTINDocuments[0],
		}
		const orgId = user?.organisationId
		const { data } = await updateOrganisation(payload, orgId)
		//	getOrgDetails()
		router.push('/profile/details')
	}, [form])

	useEffect(() => {
		if (user?.organisationId) {
			getOrgDetails(user?.organisationId)
		} else {
			getCustomerDetails()
				.then((res) => getOrgDetails(res?.data?.payload?.linkedOrganisation?.organisationId))
				.catch((error) => {
					console.log('error', error)
				})
		}
	}, [])

	return (
		<EditCompanyInfoStyle>
			<Stack spacing={3} width={isMobile ? '100%' : '25%'}>
				<form onSubmit={form.handleSubmit}>
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

					<Stack direction='row' style={{ fontSize: '18px', paddingTop: 32 }} spacing={2}>
						<Button
							fullWidth
							onClick={() => {
								setIsCmpDetailsEditable((state: any) => !state)
								ButtonClicked({
									action: 'Cancel Edit Profile',
									page: 'Company Profile',
									url: router.asPath,
								})
							}}
							style={{
								border: `1px solid ${primary.main}`,
								background: primary.light,
								color: primary.main,
								boxShadow: 'none',
							}}>
							Cancel
						</Button>

						<LoadingButton
							//type='submit'
							onClick={async () => {
								await updateOrg()
								//getOrgDetails()
								setIsCmpDetailsEditable((state: any) => !state)

								ButtonClicked({
									action: 'Save Edit Profile',
									page: 'Company Profile',
									url: router.asPath,
								})
							}}
							loading={loading}
							variant='contained'
							disabled={
								loading ||
								!form.isValid ||
								!form.values.GSTIN ||
								!form.values.companyName ||
								form.values.GSTINDocuments.length === 0
							}
							fullWidth>
							Save
						</LoadingButton>
					</Stack>
				</form>
			</Stack>
		</EditCompanyInfoStyle>
	)
}

export default EditCompanyInfo

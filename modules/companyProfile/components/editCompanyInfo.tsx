import { Box, Button, InputAdornment, Stack, styled, TextField, Typography } from '@mui/material'
import {
	checkError,
	CompanyNameField,
	InputWrapper,
	primary,
	theme,
	useContractorAuth,
	useMobile,
	useSnackbar,
} from '../../../sdk'

import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { ButtonClicked } from '../../../sdk/analytics/analyticsWrapper'
import { updateOrganisation } from '../apis/apis'
import useCompanyDetails from '../hooks/useCompanyDetails'

const EditCompanyInfoStyle = styled(Box)(({ theme }) => ({}))

const EditCompanyInfo = ({ ...props }) => {
	const {
		form,
		loading,
		isGSTINDocUploaded,
		uploadFiles,
		getOrgDetails,
		orgDetails,
		getGSTDetail,
		isValidGST,
		validGSTResponse,
		setIsValidGST,
		hasUpdateValue,
		setHasUpdateValue,
		isGSTLoaded,
		setLoading,
		showGSTValidate,
		setShowGSTValidate,
	} = useCompanyDetails()
	const { isCmpDetailsEditable, setIsCmpDetailsEditable } = props
	const router = useRouter()
	const { user } = useContractorAuth()
	const { showSnackbar } = useSnackbar()

	const isMobile = useMobile()

	const updateOrg = useCallback(async () => {
		setLoading(true)
		const payload = {
			companyName: form.values.companyName,
			GSTIN: form.values.GSTIN.toUpperCase(),
			// GstinCertificate: form.values.GSTINDocuments[0],
		}
		const orgId = user?.organisationId

		try {
			const { data, status } = await updateOrganisation(payload)

			if (status === 200) {
				showSnackbar('Updated Successfully', 'success')
				setIsCmpDetailsEditable(false)
				router.push('/profile/details')
				setLoading(false)
			} else {
				showSnackbar(`${data?.messageToUser}`, 'error')
				setLoading(false)
			}
		} catch (error) {
			showSnackbar(`Unable to Update`, 'error')
			setLoading(false)
		}

		//	getOrgDetails()
	}, [
		form.values.GSTIN,
		form.values.companyName,
		router,
		setIsCmpDetailsEditable,
		setLoading,
		showSnackbar,
		user?.organisationId,
	])

	// useEffect(() => {
	// 	if (user?.organisationId) {
	// 		getOrgDetails(user?.organisationId)
	// 	} else {
	// 		getCustomerDetails()
	// 			.then((res) => getOrgDetails(res?.data?.payload?.linkedOrganisation?.organisationId))
	// 			.catch((error) => {
	// 				console.log('error', error)
	// 			})
	// 	}
	// }, [])

	useEffect(() => {
		getOrgDetails()
	}, [])

	useEffect(() => {
		if (form.values.GSTIN === '') {
			setHasUpdateValue(true)
			setShowGSTValidate(true)
		} else {
			setHasUpdateValue(false)
		}
	}, [form.values.GSTIN])

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
								onChange={(e) => {
									setHasUpdateValue(true)
									form.handleChange(e)
								}}
								onBlur={form.handleBlur}
								placeholder='Full Name'
								error={!!checkError('companyName', form)}
								helperText={checkError('companyName', form)}
								fullWidth
							/>
						</InputWrapper>

						<Stack direction={'column'} spacing={1}>
							<InputWrapper id='GSTIN' label='GSTIN'>
								<TextField
									id='GSTIN'
									name='GSTIN'
									onChange={(e) => {
										if (e.target.value.length <= 15) {
											form.handleChange(e)
											setShowGSTValidate(false)
										}
									}}
									onBlur={form.handleBlur}
									value={form.values.GSTIN}
									placeholder='15 Digits GSTIN'
									error={!!checkError('GSTIN', form)}
									helperText={checkError('GSTIN', form)}
									inputProps={{
										sx: { textTransform: 'uppercase', color: '#000' },
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<LoadingButton
													sx={{
														'&.Mui-disabled': {
															backgroundColor: 'rgba(0,0,0,0.3)',
														},
													}}
													loading={isGSTLoaded}
													fullWidth
													variant='contained'
													size='small'
													disabled={showGSTValidate}
													onClick={getGSTDetail}>
													Validate
												</LoadingButton>
											</InputAdornment>
										),
									}}
								/>
							</InputWrapper>
							{isValidGST && (
								<Typography variant='subtitle2' sx={{ color: '#fff' }}>
									{validGSTResponse}
								</Typography>
							)}
						</Stack>

						{/* <InputWrapper id='GSTINDoc' label='Upload GSTIN Certificate'>
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
						</InputWrapper> */}
					</Stack>

					<Stack direction='row' sx={{ fontSize: '18px', paddingTop: 4 }} spacing={2}>
						<Button
							fullWidth
							variant='outlined'
							onClick={() => {
								setIsCmpDetailsEditable((state: any) => !state)
								ButtonClicked({
									action: 'Cancel Edit Profile',
									page: 'Company Profile',
									url: router.asPath,
								})
							}}
							// sx={{
							// 	border: `1px solid ${primary.main}`,
							// 	background: primary.light,
							// 	color: primary.main,
							// 	boxShadow: 'none',
							// }}
						>
							Cancel
						</Button>

						<LoadingButton
							//type='submit'
							onClick={async () => {
								await updateOrg()
								//getOrgDetails()

								ButtonClicked({
									action: 'Save Edit Profile',
									page: 'Company Profile',
									url: router.asPath,
								})
							}}
							loading={loading}
							variant='contained'
							disabled={
								!form.isValid || (form.values.GSTIN ? !isValidGST : false)
								// form.values.GSTINDocuments.length === 0
							}
							sx={{
								background: theme.palette.primary.main,
								color: primary.properDark,
							}}
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

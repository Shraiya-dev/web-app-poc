import { Add, Close } from '@mui/icons-material'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import { LoadingButton } from '@mui/lab'
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	IconButton,
	MenuItem,
	Paper,
	Select,
	Stack,
	styled,
	TextField,
} from '@mui/material'
import { useProjectInfo } from 'modules/ProjectInfo/hooks/useProjectInfo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ProjectSvg from '../../../public/assets/icons/project.svg'
import { checkError, getSelectOptions, InputWrapper, primary, theme, useMobile, useSnackbar } from '../../../sdk'
import { Analytic } from '../../../sdk/analytics'
import { TopBanner } from '../../../sdk/components/banner/formBanner'
import { FileInput } from '../../../sdk/components/Input/fileInput'
import { PinCodeField } from '../../../sdk/components/Input/PincodeField'
import { CityOptions } from '../../../sdk/constants/city'
import { StatesOptions } from '../../../sdk/constants/state'
import ConfirmCancel from '../../createBooking/components/confirmCancel'
import { overTimefactor } from '../../createBooking/utils/helperData'
import useCreateProject from '../hooks/useProjects'
import { CustomToggle } from './CustomToggle'

const CustomProjectStyle = styled(Box)(({ theme }) => ({
	'.main': {
		padding: 16,
		marginBottom: 80,
	},

	'.header': {
		fontSize: 36,
		fontWeight: 600,
		color: primary.properDark,
	},
	'.subHeader': {
		fontSize: 18,
		color: primary.properDark,
		fontWeight: 400,
	},

	'.stickyBottomBox': {
		position: 'sticky',

		bottom: 0,
		marginTop: 50,

		overflowY: 'none',
		zIndex: 1,
	},
	'.bottomButton': {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		background: primary.properDark,
		padding: 16,

		//background: 'white',
	},
	'.loadingcta': {
		borderRadius: 30,
		textTransform: 'inherit',
		padding: '12px 22px',
		background: theme.palette.primary.main,
		color: 'white',
		width: '10rem',
	},
	'.prevCta': {
		width: '10rem',
		marginLeft: '14%',
	},
	'.borderCta': {
		borderRadius: 8,
		padding: 8,
		color: 'rgba(6, 31, 72, 0.7)',

		textTransform: 'none',
		border: '1px solid #C2C9D2',
		lineHeight: 1.4,
	},
}))

export const CreateProject = () => {
	const {
		form,
		step,
		handlePrev,
		handleNext,
		uploadImages,
		isSubmitable,
		setIsSubmitable,
		onCloseDialog,
		setOncloseDialog,
		isUploadingImages,
		loading,
		isProjectId,
	} = useCreateProject()

	const router = useRouter()

	const isMobile = useMobile()

	useEffect(() => {
		if (step === 1) {
			// TODO: sitePhotos: any
			let isEmptyField =
				!form.values.projectName ||
				form.values.state === 'none' ||
				form.values.city === 'none' ||
				!form.values.siteAddress ||
				!form.values.pinCode ||
				form.values.sitePhotos.length === 0 ||
				!form.isValid

			setIsSubmitable(isEmptyField)
		}

		if (step === 2) {
			// TODO: accomodationPhotos
			let isEmptyField =
				form.values.pfAvailable === undefined ||
				form.values.esiProvided === undefined ||
				form.values.accomodationProvided === undefined ||
				form.values.foodProvided === undefined ||
				(form.values.accomodationProvided && form.values.accomodationPhotos.length === 0) ||
				form.values.overTimeFactor === 'none'

			setIsSubmitable(isEmptyField)
		}
	}, [form])

	return (
		<CustomProjectStyle>
			<Box>
				{step !== 3 && (
					<TopBanner
						header={
							step === 1
								? isProjectId
									? 'Edit Project'
									: 'New Project'
								: isProjectId
								? 'Edit Worker Benefits'
								: 'Worker Benefits'
						}
						subHeader={step === 1 ? `Tell us project details` : `Add worker benefits for the project `}
						bannerSvg={ProjectSvg}
						onClick={() => {
							setOncloseDialog(true)
							Analytic.track('ButtonClicked', {
								action: 'Leave',
								page: 'Create Project',
								step: step,
								url: router.asPath,
							})
						}}
						visibleCloseIcon={true}
						stepperRequired={true}
						step={step}
						paddingLeft={100}
					/>
				)}
			</Box>

			<Container className='main' maxWidth={'md'}>
				<ConfirmCancel
					onCloseDialog={onCloseDialog}
					setOncloseDialog={setOncloseDialog}
					header={'Leave without creating project?'}
				/>

				<form onSubmit={form.handleSubmit}>
					{step === 1 && (
						<Stack spacing={4}>
							<InputWrapper id='projectName' label='Project Name'>
								<Grid container item xs={12} sm={12} md={6}>
									<TextField
										name='projectName'
										placeholder='Enter project name'
										fullWidth
										value={form.values.projectName}
										onBlur={() => {
											form.setFieldValue('projectName', form?.values?.projectName?.trim())
										}}
										onChange={(e) => {
											form.handleChange(e)
										}}
									/>
								</Grid>
							</InputWrapper>

							<InputWrapper id='state' label='State'>
								<Grid container item xs={12} sm={12} md={6}>
									<Select
										error={!!checkError('state', form)}
										labelId='state'
										id='state'
										name='state'
										value={form.values.state}
										onChange={(e) => {
											form.handleChange(e)
											form.setFieldValue('city', 'none')
										}}
										required={true}
										fullWidth>
										<MenuItem value={'none'}>Select State</MenuItem>
										{getSelectOptions(StatesOptions)}
									</Select>
								</Grid>
							</InputWrapper>

							<InputWrapper id='city' label='City'>
								<Grid container item xs={12} sm={12} md={6}>
									<Select
										labelId='city'
										id='city'
										name='city'
										error={!!checkError('city', form)}
										value={form.values.city}
										disabled={form.values.state === 'none'}
										onChange={(e) => {
											form.handleChange(e)
										}}
										fullWidth>
										<MenuItem value={'none'}>Select city</MenuItem>
										{CityOptions[form.values.state].map((item: any) => {
											return (
												<MenuItem key={item.label} value={item.value}>
													{item?.label}
												</MenuItem>
											)
										})}
									</Select>
								</Grid>
							</InputWrapper>

							<InputWrapper id='pinCode' label='Project Site Pincode'>
								<Grid container item xs={12} sm={12} md={6}>
									<PinCodeField
										name='pinCode'
										placeholder='Enter pincode'
										fullWidth
										value={form.values.pinCode}
										type='number'
										onChange={form.handleChange}
										onBlur={form.handleBlur}
										error={!!checkError(`pinCode`, form)}
										helperText={checkError(`pinCode`, form)}
									/>
								</Grid>
							</InputWrapper>

							<InputWrapper id='siteAddress' label='Site Address'>
								<Grid container item xs={12} sm={12} md={6} lg={6}>
									<TextField
										placeholder='Enter site address'
										id='siteAddress'
										name='siteAddress'
										value={form.values.siteAddress}
										onChange={form.handleChange}
										minRows={4}
										maxRows={4}
										multiline
										fullWidth
										onBlur={form.handleBlur}
										error={!!checkError(`siteAddress`, form)}
										helperText={checkError(`siteAddress`, form)}
									/>
								</Grid>
							</InputWrapper>
							<InputWrapper id='sitePhotos' label='Add Site Photos'>
								<Grid container item xs={12} sm={12} md={6} lg={6}>
									<FileInput
										sx={{
											width: 150,
										}}
										accept='image/*'
										icon={
											isUploadingImages.site ? (
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
														color: '#fff',
													}}
												/>
											)
										}
										id='siteImages-upload'
										multiple
										variant='outlined'
										onChange={(e: any) => {
											uploadImages('site', [...e.target.files])
											e.target.value = ''
										}}
									/>
									{form.values.sitePhotos?.map((url: any, index: any) => {
										return (
											<>
												<Grid item xs={3} md={3} key={index}>
													<Box
														sx={{
															position: 'relative',
															marginLeft: 1,
														}}>
														<IconButton
															// disabled={formDisabled}
															size='small'
															onClick={() => {
																form.setFieldValue(
																	'sitePhotos',
																	form.values.sitePhotos.filter((img) => img !== url)
																)
															}}
															sx={(theme) => ({
																color: '#fff',
																position: 'absolute',
																// zIndex: 100,
																top: -10,
																right: -10,
															})}>
															<CancelRoundedIcon />
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
															alt={'image'}
														/>
													</Box>
												</Grid>
											</>
										)
									})}
								</Grid>
							</InputWrapper>
						</Stack>
					)}

					{step === 2 && (
						<Stack spacing={4}>
							<InputWrapper id='overTimeFactor' label={`Over Time Wage `}>
								<Grid container item xs={12} sm={12} md={6} lg={6}>
									<Select
										labelId='overTimeFactor'
										id='overTimeFactor'
										name='overTimeFactor'
										value={form.values.overTimeFactor}
										onChange={form.handleChange}
										fullWidth>
										<MenuItem value={'none'}>Select over time wage</MenuItem>
										{getSelectOptions(overTimefactor)}
									</Select>
								</Grid>
							</InputWrapper>
							<InputWrapper id='pfAvailable' label='Provident Fund (PF) available?'>
								<CustomToggle name={'pfAvailable'} form={form} infoValues={form.values.pfAvailable} />
							</InputWrapper>

							<InputWrapper id='esiProvided' label='Employee State Insurance (ESI) provided?'>
								<CustomToggle name={'esiProvided'} form={form} infoValues={form.values.esiProvided} />
							</InputWrapper>

							<InputWrapper id='accomodationProvided' label='Accommodation provided?'>
								<CustomToggle
									name={'accomodationProvided'}
									form={form}
									infoValues={form.values.accomodationProvided}
								/>
							</InputWrapper>

							{form.values.accomodationProvided && (
								<InputWrapper id='accomodationPhotos' label='Add accommodation photos'>
									<Grid container item xs={12} sm={12} md={6} lg={6}>
										<FileInput
											sx={{
												width: 150,
											}}
											accept='image/*'
											icon={
												isUploadingImages.accomodation ? (
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
															color: '#fff',
														}}
													/>
												)
											}
											id='accomoImages-upload'
											multiple
											variant='outlined'
											onChange={(e: any) => {
												uploadImages('accomodation', [...e.target.files])
												e.target.value = ''
											}}
										/>
										{form.values.accomodationPhotos?.map((url: any, index: any) => {
											return (
												<>
													<Grid item xs={3} md={3} key={index}>
														<Box
															sx={{
																position: 'relative',
																marginLeft: 1,
															}}>
															<IconButton
																// disabled={formDisabled}
																size='small'
																onClick={() => {
																	form.setFieldValue(
																		'accomodationPhotos',
																		form.values.accomodationPhotos.filter(
																			(img) => img !== url
																		)
																	)
																}}
																sx={(theme) => ({
																	// backgroundColor: theme.palette.grey[100],
																	color: primary.main,
																	position: 'absolute',
																	//zIndex: 100,
																	top: -10,
																	right: -10,
																})}>
																<CancelRoundedIcon />
															</IconButton>

															<img
																style={{
																	height: 84,
																	width: 84,
																	objectFit: 'cover',
																	borderRadius: 8,
																}}
																src={url}
																alt={'image'}
															/>
														</Box>
													</Grid>
												</>
											)
										})}
									</Grid>
								</InputWrapper>
							)}

							<InputWrapper id='foodProvided' label='Food provided?'>
								<CustomToggle name={'foodProvided'} form={form} infoValues={form.values.foodProvided} />
							</InputWrapper>
						</Stack>
					)}

					<Paper className='bottomButton' variant='outlined'>
						<Container maxWidth={'md'}>
							<Grid container item xs={12} sm={12} md={6} lg={6}>
								<Stack direction={'row'} justifyContent={'flex-start'} flex={1}>
									{step > 1 && (
										<Button
											variant='outlined'
											onClick={handlePrev}
											style={{ minWidth: '10em', float: 'right', display: 'flex' }}>
											Go Back
										</Button>
									)}
								</Stack>

								<Stack direction={'row'} justifyContent={'flex-end'} flex={1}>
									<LoadingButton
										variant='contained'
										onClick={handleNext}
										loading={loading}
										disabled={!!isSubmitable || loading}
										style={{
											background: theme.palette.primary.main,
											// isSubmitable || loading ?  : theme.palette.primary.main,
											opacity: !!isSubmitable || loading ? 0.4 : 1,
											minWidth: '10em',
											color: primary.properDark,
										}}>
										{step === 2 ? (isProjectId ? 'Update Project' : 'Create Project') : 'Continue'}
									</LoadingButton>
								</Stack>
							</Grid>
						</Container>
					</Paper>
				</form>
			</Container>

			{/* Bottom Button */}
		</CustomProjectStyle>
	)
}

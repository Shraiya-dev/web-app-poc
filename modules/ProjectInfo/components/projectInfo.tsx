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
	TextField,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
	ButtonClicked,
	checkError,
	CityOptions,
	FileInput,
	getSelectOptions,
	InputWrapper,
	PinCodeField,
	primary,
	StatesOptions,
	theme,
} from '../../../sdk'
import { TextWrapper } from '../../../sdk/components/Input/TextWrapper'
import ViewImage from '../../../sdk/components/viewImage/viewImage'
import { JobBenefits } from '../../../sdk/types/jobBenefits'
import { overTimefactor, overTimeLabel } from '../../createBooking/utils'
import { useProjectInfo } from '../hooks/useProjectInfo'
import { Add, Close } from '@mui/icons-material'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import { CustomToggle } from 'modules/createProject/components'
import useCreateProject from 'modules/createProject/hooks/useProjects'
import { LoadingButton } from '@mui/lab'

const ProjectInfo = ({ setProjectName }: any) => {
	const router = useRouter()
	const {
		form,
		handleNext,
		uploadImages,
		isSubmitable,
		setIsSubmitable,
		isUploadingImages,
		ProjectUpdate,
		isEditable,
		setIsEditable,
	} = useCreateProject()
	const { projectInfo, loading, getProjectInfo } = useProjectInfo()
	const [viewSiteImg, setViewSiteImg] = useState(false)
	const [viewAccomodationImg, setViewAccomodationImg] = useState(false)

	const handleSiteView = () => {
		setViewSiteImg((state) => !state)
	}

	const handleAccomodationView = () => {
		setViewAccomodationImg((state) => !state)
	}
	useEffect(() => {
		getProjectInfo()
	}, [isEditable, getProjectInfo])

	useEffect(() => {
		setProjectName({
			name: projectInfo?.name,
			state: projectInfo?.state,
			city: projectInfo?.city,
		})
	}, [projectInfo?.name, projectInfo?.state, projectInfo?.city, setProjectName])

	return (
		<>
			<ViewImage open={viewSiteImg} onClick={handleSiteView} imageSrc={projectInfo?.images?.site ?? ''} />
			<ViewImage
				open={viewAccomodationImg}
				onClick={handleAccomodationView}
				imageSrc={projectInfo?.images?.accommodations ?? ''}
			/>

			{loading ? (
				<Stack p={5} alignItems='center'>
					<CircularProgress size={50} />
				</Stack>
			) : !isEditable ? (
				<Box mb={0}>
					<Stack direction={'row'} justifyContent='space-between'>
						<Typography fontWeight={700} fontSize={24} pb={2}>
							Site
						</Typography>
						<Button
							variant='contained'
							onClick={() => {
								// router.push({
								// 	pathname: '/projects/create',
								// 	query: { projectId: router.query.projectId },
								// })
								setIsEditable(!isEditable)
							}}>
							Edit Project
						</Button>
					</Stack>
					<Stack spacing={5}>
						<TextWrapper id={'siteAddress'} label='Site Address'>
							<Typography fontFamily={'Saira,sans-serif'} fontWeight={400}>
								{projectInfo?.siteAddress ||
									'' + ',' + projectInfo?.city ||
									'' + ',' + projectInfo?.state ||
									'' + ',' + projectInfo?.pincode ||
									''}
							</Typography>
						</TextWrapper>

						<TextWrapper id='sitePhotos' label='Site Photos'>
							<Grid container onClick={() => handleSiteView()} sx={{ cursor: 'pointer' }}>
								{projectInfo?.images?.site?.map((url: any, index: any) => {
									return (
										<Grid item key={index}>
											<Box
												sx={{
													position: 'relative',
													marginRight: 1,
												}}>
												<img
													style={{
														height: 84,
														width: 84,
														objectFit: 'contain',
														borderRadius: 8,
													}}
													src={url}
													alt={'image'}
												/>
											</Box>
										</Grid>
									)
								})}
							</Grid>
						</TextWrapper>
					</Stack>
					<Typography fontSize={24} fontWeight={700} pb={2} pt={8}>
						Worker Benefits
					</Typography>
					<Stack spacing={5}>
						<TextWrapper id='overTimeFactor' label='Over Time Wage'>
							{overTimeLabel[projectInfo?.overTime?.rate || 1]}
						</TextWrapper>
						<TextWrapper id='pfAvailable' label='Provident Fund (PF)'>
							{projectInfo?.benefits?.includes(JobBenefits?.PF) ? 'Yes' : 'No'}
						</TextWrapper>
						<TextWrapper id='esiAvailabe' label='Employee State Insurance (ESI)'>
							{projectInfo?.benefits?.includes(JobBenefits?.INSURANCE) ? 'Yes' : 'No'}
						</TextWrapper>
						<TextWrapper id='isAccomodation' label='Accommodation'>
							{projectInfo?.benefits?.includes(JobBenefits?.ACCOMODATION) ? 'Yes' : 'No'}
						</TextWrapper>

						{projectInfo?.benefits?.includes(JobBenefits?.ACCOMODATION) && (
							<TextWrapper id='accomodationPhotos' label='Accommodation Photos'>
								<Grid container onClick={() => handleAccomodationView()} sx={{ cursor: 'pointer' }}>
									{projectInfo?.images?.accommodations?.map((url: any, index: any) => {
										return (
											<Grid item key={index}>
												<Box
													sx={{
														position: 'relative',
														marginRight: 1,
													}}>
													<img
														style={{
															height: 84,
															width: 84,
															objectFit: 'contain',
															borderRadius: 8,
														}}
														src={url}
														alt={'image'}
													/>
												</Box>
											</Grid>
										)
									})}
								</Grid>
							</TextWrapper>
						)}
						<TextWrapper id='foodAvailable' label='Food'>
							{projectInfo?.benefits?.includes(JobBenefits?.FOOD) ? 'Yes' : 'No'}
						</TextWrapper>
					</Stack>
				</Box>
			) : (
				<form onSubmit={form.handleSubmit}>
					<Stack spacing={4}>
						<InputWrapper id='projectName' label='Project Name'>
							<Grid container item xs={12} sm={12} md={6}>
								<TextField
									name='projectName'
									placeholder='Enter project name'
									fullWidth
									value={form.values.projectName}
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
												sx={{
													textAlign: 'center',
													justifyContent: 'center',
													width: 32,
													height: 32,
													fontWeight: 100,
												}}
											/>
										) : (
											<Add
												sx={{
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
													sx={{
														textAlign: 'center',
														justifyContent: 'center',
														width: 32,
														height: 32,
														fontWeight: 100,
													}}
												/>
											) : (
												<Add
													sx={{
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
																color: '#fff',
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

					<Stack direction={'row'} justifyContent={'space-between'} width={'50%'} mt={4}>
						<Button
							variant='outlined'
							onClick={() => {
								setIsEditable(!isEditable)
							}}
							sx={{ minWidth: '10em', float: 'right', display: 'flex' }}>
							Cancel
						</Button>

						<LoadingButton
							variant='contained'
							onClick={() => {
								ProjectUpdate(router.query.projectId)
							}}
							loading={loading}
							sx={{
								background: theme.palette.primary.main,
								opacity: !!isSubmitable || loading ? 0.4 : 1,
								minWidth: '10em',
								color: primary.properDark,
							}}>
							Update Project
						</LoadingButton>
					</Stack>
				</form>
			)}
		</>
	)
}

export default ProjectInfo

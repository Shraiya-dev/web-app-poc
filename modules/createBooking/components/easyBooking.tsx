import {
	Autocomplete,
	Box,
	Button,
	Checkbox,
	Chip,
	Container,
	Grid,
	InputAdornment,
	ListSubheader,
	Paper,
	Stack,
	styled,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
	allCityList,
	ButtonClicked,
	capitalize,
	checkError,
	InputWrapper,
	primary,
	theme,
	useContractorAuth,
	useMobile,
} from 'sdk'
import { TopBanner } from 'sdk/components/banner/formBanner'
import BookingSvg from '../../../public/assets/icons/project.svg'
import { jobTypeInfo, moreJobType, projectDuration } from '../utils'
import ConfirmCancel from './confirmCancel'
import CancelIcon from '@mui/icons-material/Cancel'
import Helper from '../../../public/assets/icons/helper.svg'
import Supervisor from '../../../public/assets/icons/supervisor.svg'
import Technician from '../../../public/assets/icons/technician.svg'
import { LoadingButton } from '@mui/lab'
import { ListChildComponentProps, VariableSizeList } from 'react-window'
import { useEasyBookingInternal } from 'sdkv2/components/hooks/useEasyBookingInternal'

const CustomBookingStyle = styled(Box)(({ theme }) => ({
	'.main': {
		justifyContent: 'center',
		display: 'flex',
		padding: 24,
		marginBottom: 40,
	},

	'.stepper': {
		height: 6,
		width: 36,

		borderRadius: 2,
		margin: 4,
		background: theme.palette.primary.light,
	},

	'.viewcta': {
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		color: theme.palette.primary.main,
		padding: 10,
	},

	'.stickyBottomBox': {
		position: 'sticky',
		bottom: 0,
		marginTop: 50,

		overflowY: 'none',
		zIndex: 1,
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
	'.subInfo': {
		fontSize: 13,
		fontWeight: 500,
		color: theme.palette.secondary.main,
		paddingBottom: 8,
	},
	'.subInfoError': {
		fontSize: 13,
		fontWeight: 500,
		color: theme.palette.error.main,
		paddingBottom: 20,
	},
	'.bottomButton': {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		background: primary.properDark,
		paddingBottom: 16,
		paddingTop: 16,
		overflow: 'hidden',
	},
	'.loadingcta': {
		borderRadius: 30,
		textTransform: 'inherit',
		padding: '12px 22px',
		background: theme.palette.primary.main,
		color: 'white',
		width: '10rem',
		'& :hover': {
			background: theme.palette.primary.light,
		},
	},
	'.prevCta': {
		width: '10rem',
		marginLeft: '14%',
	},
	'.jobType': {
		borderRadius: 8,
		padding: 8,
		color: 'rgba(6, 31, 72, 0.7)',
		height: 100,
		width: 100,
		textTransform: 'none',
		border: '1px solid #C2C9D2',
		boxShadow: 'none',
		lineHeight: 1.4,
	},

	'.view': {
		verticalAlign: 'middle',
		display: 'flex',
	},
	'.borderCta': {
		borderRadius: 8,
		padding: 8,
		color: 'rgba(6, 31, 72, 0.7)',

		textTransform: 'none',
		border: '1px solid #C2C9D2',
		boxShadow: 'none',
		lineHeight: 1.4,
	},
}))

export const EasyBooking = () => {
	const [onCloseDialog, setOncloseDialog] = useState(false)
	const [selectedJob, setSelectedjob] = useState('')
	const [projectDurationInfo, setProjectDuration] = useState<string>()
	const [isMore, setIsmore] = useState(false)
	const router = useRouter()
	const isMobile = useMobile()
	const { user } = useContractorAuth()

	const { form, formikProps, isSubmittable, setIsSubmittable } = useEasyBookingInternal()

	const workerType = [
		{
			label: 'Helper',
			icon: Helper,
			name: 'helper',
			isPresent: form.values.isHelper,
			CheckboxName: 'isHelper',
			wage: 'helperWage',
			wageformvalue: form.values.helperWage,
			error: form.errors.isHelper,
		},
		{
			label: 'Technician',
			icon: Technician,
			isPresent: form.values.isTechnician,
			name: 'technician',
			CheckboxName: 'isTechnician',
			wage: 'technicianWage',
			wageformvalue: form.values.technicianWage,
			error: form.errors.isTechnician,
		},

		{
			label: 'Supervisor',
			icon: Supervisor,
			isPresent: form.values.isSupervisor,
			CheckboxName: 'isSupervisor',
			name: 'supervisor',
			wage: 'supervisorWage',
			wageformvalue: form.values.supervisorWage,
			error: form.errors.isSupervisor,
		},
	]

	useEffect(() => {
		// let canSubmit: boolean =
		// 	!!form.values.jobType ||
		// 	!form.isValid ||
		// 	!!form.values.BookingDuration ||
		// 	!form.values.startTime ||
		// 	!form.values.endTime ||
		// 	form.values.startTime === 'none' ||
		// 	form.values.endTime === 'none'

		let canSubmit: boolean =
			!!form.values.jobType &&
			(!!form.values.isHelper || !!form.values.isTechnician || !!form.values.isSupervisor) &&
			!!form.values.workDuration &&
			!!form.values.location

		setIsSubmittable(canSubmit)
	}, [form, isSubmittable])

	const handleJobClick = (info: any) => {
		form.setFieldValue('jobType', info)
		setSelectedjob(info)
	}
	const handleMoreJobType = () => {
		setIsmore((state) => !state)
	}

	const handleProjectDuration = (info: any) => {
		setProjectDuration(info)
		form.setFieldValue('workDuration', info)
	}

	const getErrorString = () => {
		return form.errors.isHelper ||
			form.errors.isTechnician ||
			form.errors.isSupervisor ||
			form.errors.helperWage ||
			form.errors.technicianWage ||
			form.errors.supervisorWage ? (
			<Typography className='subInfoError'>
				At least 1 technician, helper or supervisor is required with wages
			</Typography>
		) : (
			''
		)
	}

	return (
		<CustomBookingStyle>
			<TopBanner
				header={`Book Workers`}
				subHeader={`Book workers for the project `}
				bannerSvg={BookingSvg}
				onClick={() => {
					setOncloseDialog(true)
					ButtonClicked({
						action: 'Leave',
						page: 'Create Booking',
						projectId: router?.query?.projectId,
						url: router.asPath,
					})
				}}
				// visibleCloseIcon={step === 1}
				visibleCloseIcon={!user?.hasProjects}
				linkHeader={''}
				link={`/projects/${router.query.projectId}/bookings`}
			/>
			<Container className='main' maxWidth={'md'}>
				<ConfirmCancel
					onCloseDialog={onCloseDialog}
					setOncloseDialog={setOncloseDialog}
					header={'Leave Booking Workers?'}
				/>
				<Box>
					<form onSubmit={form.handleSubmit}>
						<Stack spacing={5}>
							<InputWrapper id='jobType' label='Trade'>
								<Grid container item rowSpacing={2} columnSpacing={2} style={{ marginBottom: 10 }}>
									{jobTypeInfo.map((info, index) => {
										return (
											<Grid key={index} item xs={4} sm={4} md={2} lg={2}>
												<Button
													className='jobType'
													variant='outlined'
													onClick={() => handleJobClick(info?.value)}
													style={{
														background:
															selectedJob === info?.value
																? theme.palette.primary.light
																: 'white',

														// border:
														// 	selectedJob === info?.value
														// 		? `2px solid ${theme.palette.primary.main}`
														// 		: `1px solid ${theme.palette.secondary.light}`,
													}}>
													<Box>
														<Image src={info?.icon} />

														<Stack>{info?.label}</Stack>
													</Box>
												</Button>
											</Grid>
										)
									})}
								</Grid>
								{isMore && (
									<Grid container item rowSpacing={2} columnSpacing={2}>
										{moreJobType.map((info, index) => {
											return (
												<Grid key={index} item xs={4} sm={4} md={2} lg={2}>
													<Button
														className='jobType'
														onClick={() => handleJobClick(info?.value)}
														style={{
															boxShadow: 'none',
															background:
																selectedJob === info?.value
																	? theme.palette.primary.light
																	: 'white',
															border:
																selectedJob === info?.value
																	? `2px solid ${theme.palette.primary.main}`
																	: `1px solid ${theme.palette.secondary.light}`,
														}}>
														<Box>
															<Image src={info?.icon} />

															<Stack>{info?.label}</Stack>
														</Box>
													</Button>
												</Grid>
											)
										})}
									</Grid>
								)}
								<Grid
									container
									spacing={0}
									direction='column'
									alignItems='center'
									justifyContent='center'
									style={{ marginBottom: 10 }}>
									{!!checkError('jobType', form) && (
										<Typography style={{ color: 'red', padding: 10 }}>
											Please Select a JobType!!
										</Typography>
									)}
									<Stack
										className='viewcta'
										onClick={handleMoreJobType}
										style={{ textTransform: 'none' }}>
										{isMore ? (
											<Box>
												<Typography
													className='view'
													display='inline'
													color={theme.palette.info.main}>
													View Less <KeyboardArrowUpIcon />
												</Typography>
											</Box>
										) : (
											<Box>
												<Typography
													className='view'
													display='inline'
													color={theme.palette.info.main}>
													View More <KeyboardArrowDownIcon />
												</Typography>
											</Box>
										)}
									</Stack>
								</Grid>
							</InputWrapper>

							<Autocomplete
								disableListWrap
								ListboxComponent={ListboxComponent}
								options={allCityList}
								getOptionLabel={(options) => options.label}
								isOptionEqualToValue={(opt, v) => v.value === opt?.value}
								value={{
									label: capitalize(form.values.location ?? ''),
									value: form.values.location ?? '',
								}}
								onChange={(e, v) => {
									form.setFieldValue('location', v?.value)
								}}
								groupBy={(option: { label: string; value: string }) => option.label[0].toUpperCase()}
								renderInput={(params) => (
									<TextField
										error={formikProps('location').error}
										helperText={formikProps('location').helperText}
										placeholder='Select Location'
										{...params}
										sx={{
											color: '#000 !important',
											background: '#fff !important',
										}}
									/>
								)}
								sx={{
									width: { xs: '100%', md: '50%' },
									'& .MuiInputBase-root': {
										color: '#000!important',
									},
									'& .MuiSvgIcon-root': {
										color: '#000',
									},
									'& .MuiButtonBase-root': {
										color: '#000',
									},
								}}
								renderOption={(props, option) => [props, option.label] as React.ReactNode}
								renderGroup={(params) => params as unknown as React.ReactNode}
							/>

							{/* {form.values.jobType && (
								<InputWrapper id='skills' label='Skills'>
									<Typography className='subInfo'>
										Skills you are looking for the selected trade
									</Typography>
									<Grid item xs={12} md={12}>
										<Stack direction='row' flexWrap='wrap'>
											{tags[form.values.jobType]?.map((item: any) => {
												return (
													<Chip
														variant='outlined'
														style={{
															background: form.values.tags.includes(item)
																? theme.palette.primary.light
																: 'white',
															color: form.values.tags.includes(item)
																? primary.properDark
																: '',

															border: form.values.tags.includes(item)
																? `2px solid ${theme.palette.primary.main}`
																: ``,
														}}
														sx={{
															mr: 1,
															mb: 1,
														}}
														key={item}
														label={item}
														clickable
														deleteIcon={<CancelIcon style={{ color: '#000' }} />}
														onClick={
															!form.values.tags.includes(item)
																? () => {
																		form.setFieldValue('tags', [
																			...form.values.tags,
																			item,
																		])
																  }
																: undefined
														}
														onDelete={
															form.values.tags.includes(item)
																? () => {
																		form.setFieldValue('tags', [
																			...form.values.tags.filter(
																				(val) => val !== item
																			),
																		])
																  }
																: undefined
														}
													/>
												)
											})}
										</Stack>
									</Grid>
								</InputWrapper>
							)} */}

							<InputWrapper
								id='workerType'
								label={`Workers Required & Daily Wage`}
								toolTip={'Daily wage per worker'}>
								{/* {getErrorString()} */}
								<Grid container spacing={4}>
									{workerType.map((info, index) => {
										return (
											<Grid
												key={index}
												container
												item
												alignItems={'flex-start'}
												display='flex'
												spacing={2}>
												<Grid container item xs={12} sm={12} md={4.5}>
													<FormControlLabel
														control={<Checkbox />}
														name={info.CheckboxName}
														value={info.isPresent}
														label={''}
														onChange={() => {
															form.setFieldValue(info.CheckboxName, !info.isPresent)
														}}
													/>
													<Image src={info?.icon} style={{ float: 'left' }} />

													<Typography
														style={{
															float: 'right',
															margin: 16,
															fontSize: 16,
														}}>
														{info?.label}
													</Typography>
												</Grid>
												{/* <Grid item xs={12} sm={12} md={2.5}>
													<TextField
														// label={`${info?.label} Required`}
														placeholder={`Enter ${info?.label}`}
														id={info?.name}
														name={info?.name}
														value={info?.formvalue}
														type='tel'
														onChange={(e: any) => {
															if (
																e.target.value >= 0 &&
																e.target.value <=
																	(info?.name === 'supervisor' ? 50 : 500)
															) {
																form.setFieldValue(e.target.name, e.target.value)
															}
														}}
														fullWidth
														onBlur={form.handleBlur}
														error={!!checkError(`${info?.name}`, form)}
													/>
												</Grid> */}
												<Grid item xs={12} sm={12} md={4}>
													<TextField
														// label='Daily wage (Rs.)'
														placeholder='Enter wage'
														id={info?.wage}
														name={info?.wage}
														value={
															info?.wageformvalue && info?.wageformvalue > 0
																? info?.wageformvalue
																: ''
														}
														type='tel'
														disabled={!info.isPresent}
														onChange={(e: any) => {
															if (e.target.value >= 0 && e.target.value <= 2000) {
																form.setFieldValue(
																	e.target.name,
																	Number(e.target.value)
																)
															}
														}}
														InputProps={{
															endAdornment: (
																<InputAdornment position='end'>/day</InputAdornment>
															),
															startAdornment: (
																<InputAdornment position='start'>
																	<Typography
																		sx={{
																			color: '#57cca5 !important',
																		}}>
																		&#8377;
																	</Typography>
																</InputAdornment>
															),
														}}
														fullWidth
														onBlur={form.handleBlur}
														error={!!checkError(`${info?.wage}`, form)}
														// sx={{
														// 	'& .MuiFormLabel-root': {
														// 		color: theme.palette.primary.dark
														// 	},
														// }}
													/>
												</Grid>
											</Grid>
										)
									})}
								</Grid>
							</InputWrapper>

							<InputWrapper id='workDuration' label='Job Duration'>
								<Grid container item rowGap={1}>
									{projectDuration.map((info: any, index: any) => {
										return (
											<Button
												className='borderCta'
												key={index}
												style={{
													background:
														projectDurationInfo === info?.value
															? theme.palette.primary.light
															: 'white',

													color:
														projectDurationInfo === info?.value
															? primary.properDark
															: primary.properDark,
													marginRight: 10,
													textTransform: 'none',
													minWidth: 50,
													boxShadow: 'none',
													border:
														projectDurationInfo === info?.value
															? `2px solid ${theme.palette.primary.main}`
															: '',
												}}
												onClick={() => handleProjectDuration(info?.value)}>
												{info?.label}
											</Button>
										)
									})}
								</Grid>
							</InputWrapper>
						</Stack>
						<Box className='stickyBottomBox'>
							<Paper
								className='bottomButton'
								variant='outlined'
								sx={{ paddingRight: isMobile ? '6%' : '12%' }}>
								<Stack direction={'row'} justifyContent={'flex-end'}>
									<LoadingButton
										className='loadingcta'
										type='submit'
										variant='contained'
										// loading={loading}
										disabled={!isSubmittable}
										// onClick={() => handleNext()}
										style={{
											minWidth: '10rem',
											marginRight: isMobile ? '' : '14%',
											background: isSubmittable
												? theme.palette.primary.main
												: theme.palette.primary.dark,
											color: '#000',
										}}>
										{'Create Booking'}
									</LoadingButton>
								</Stack>
							</Paper>
						</Box>
					</form>
				</Box>
			</Container>
		</CustomBookingStyle>
	)
}

const LISTBOX_PADDING = 8 // px

function renderRow(props: ListChildComponentProps) {
	const { data, index, style } = props
	const dataSet = data[index]
	const inlineStyle = {
		...style,
		top: (style.top as number) + LISTBOX_PADDING,
		color: '#000',
	}

	if (dataSet.hasOwnProperty('group')) {
		return (
			<ListSubheader key={dataSet.key} component='div' style={inlineStyle}>
				{dataSet.group}
			</ListSubheader>
		)
	}

	return (
		<Typography component='li' {...dataSet[0]} noWrap style={inlineStyle}>
			{dataSet[1]}
		</Typography>
	)
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
	const outerProps = React.useContext(OuterElementContext)
	return <div ref={ref} {...props} {...outerProps} />
})
OuterElementType.displayName = 'OuterElementType'

function useResetCache(data: any) {
	const ref = React.useRef<VariableSizeList>(null)
	React.useEffect(() => {
		if (ref.current != null) {
			ref.current.resetAfterIndex(0, true)
		}
	}, [data])
	return ref
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function ListboxComponent(
	props,
	ref
) {
	const { children, ...other } = props
	const itemData: React.ReactChild[] = []
	;(children as React.ReactChild[]).forEach((item: React.ReactChild & { children?: React.ReactChild[] }) => {
		itemData.push(item)
		itemData.push(...(item.children || []))
	})

	const theme = useTheme()
	const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
		noSsr: true,
	})
	const itemCount = itemData.length
	const itemSize = smUp ? 36 : 48

	const getChildSize = (child: React.ReactChild) => {
		if (child.hasOwnProperty('group')) {
			return 48
		}

		return itemSize
	}

	const getHeight = () => {
		if (itemCount > 8) {
			return 8 * itemSize
		}
		return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
	}

	const gridRef = useResetCache(itemCount)

	return (
		<div ref={ref}>
			<OuterElementContext.Provider value={other}>
				<VariableSizeList
					itemData={itemData}
					height={getHeight() + 2 * LISTBOX_PADDING}
					width='100%'
					ref={gridRef}
					outerElementType={OuterElementType}
					innerElementType='ul'
					itemSize={(index) => getChildSize(itemData[index])}
					overscanCount={5}
					itemCount={itemCount}>
					{renderRow}
				</VariableSizeList>
			</OuterElementContext.Provider>
		</div>
	)
})

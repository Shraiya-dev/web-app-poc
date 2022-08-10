import {
	Autocomplete,
	Button,
	Card,
	Checkbox,
	FormControlLabel,
	InputAdornment,
	ListSubheader,
	Stack,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import React, { FC, useState } from 'react'
import { ListChildComponentProps, VariableSizeList } from 'react-window'
import { DataLayerPush, sendAnalytics } from 'sdk/analytics'
import { allCityList } from 'sdk/constants'
import { capitalize } from 'sdk/utils'
import { Dropdown, InputWrapper, useEasyBooking } from 'sdkv2/components'
import { JobType, projectDuration } from 'sdkv2/constants'

interface Props {}
export const CreateBookingCard: FC<Props> = () => {
	const [step, setStep] = useState<number>(0)
	const { form, formikProps } = useEasyBooking()
	// const [wageDisable, setWageDisable] = useState({
	// 	helperWage: false,
	// 	technicianWage: false,
	// 	supervisorWage: false,
	// })
	return (
		<>
			<Card elevation={16}>
				<Stack p={4}>
					<Stack>
						<Typography variant='h3'>
							First{' '}
							<Typography variant='h3' color='primary.main' display='inline'>
								15 applications
							</Typography>{' '}
							for FREE!
						</Typography>
						<Typography mt={2}>Only Rs 50 per HERO Application</Typography>
						<Typography variant='caption'>*after receiving 15 applications</Typography>
					</Stack>
					<form onSubmit={form.handleSubmit}>
						<Stack spacing={2.5} my={2} alignItems='flex-start' pr={step === 0 ? 6 : 3}>
							{step === 0 && (
								<>
									<InputWrapper fullWidth label='Select Location'>
										<Autocomplete
											disableListWrap
											ListboxComponent={ListboxComponent}
											options={allCityList}
											value={capitalize(form.values.location ?? '') as any}
											isOptionEqualToValue={(opt, v) => v?.value?.toLowerCase() === opt?.value}
											onChange={(e, v) => {
												form.setFieldValue('location', v?.value)
											}}
											groupBy={(option: { label: string; value: string }) =>
												option.label[0].toUpperCase()
											}
											renderInput={(params) => (
												<TextField
													error={formikProps('location').error}
													helperText={formikProps('location').helperText}
													placeholder='Select Location'
													{...params}
												/>
											)}
											renderOption={(props, option) => [props, option.label] as React.ReactNode}
											renderGroup={(params) => params as unknown as React.ReactNode}
										/>
										{/* <Dropdown
											fullWidth
											{...formikProps('location')}
											emptyState={{ label: 'Site Location', value: 'none' }}
											options={allCityList}
										/> */}
									</InputWrapper>
									<InputWrapper fullWidth label='Job Category'>
										<Dropdown
											fullWidth
											{...formikProps('jobType')}
											emptyState={{ label: 'Select Job Category', value: 'none' }}
											options={JobType}
										/>
									</InputWrapper>
									<InputWrapper
										fullWidth
										label={
											<>
												Work Duration
												<Typography display='inline' color='grey.A400'>
													&nbsp;*minimum 1 month
												</Typography>
											</>
										}>
										<Dropdown
											fullWidth
											{...formikProps('workDuration')}
											emptyState={{ label: 'Enter Work Duration', value: 'none' }}
											options={projectDuration}
										/>
									</InputWrapper>
									<Button
										disabled={
											!!(
												form.errors['location'] ||
												form.errors['jobType'] ||
												form.errors['workDuration']
											)
										}
										onClick={(e) => {
											if (
												!(
													form.errors['location'] ||
													form.errors['jobType'] ||
													form.errors['workDuration'] ||
													form.values['workDuration'] === 'none'
												)
											) {
												DataLayerPush({ event: 'basic_info' })
												sendAnalytics({
													name: 'CreateEasyBookWorker',
													action: 'ButtonClick',
													metaData: {
														step: 'basic info',
														values: {
															location: form.values.location,
															workDuration: form.values.workDuration,
															jobType: form.values.jobType,
														},
													},
												})
												setStep(1)
											} else {
												form.setTouched({
													location: true,
													jobType: true,
													workDuration: true,
												})
												form.validateForm()
											}
										}}
										sx={{ width: '50%' }}
										size='large'
										variant='contained'>
										Next
									</Button>
								</>
							)}
							{step === 1 && (
								<>
									<InputWrapper fullWidth label='Specify booking details'>
										<Stack spacing={3} mt={2} pr={{ md: 5 }}>
											<Stack
												direction='row'
												justifyContent='space-between'
												alignItems='flex-start'>
												<FormControlLabel
													sx={{ mt: 1 }}
													control={
														<Checkbox
															checked={form.values.isHelper}
															onChange={(e, v) => {
																form.setFieldValue('helperWage', '')
																form.setFieldValue('isHelper', v)
															}}
															style={{
																color: '#000',
															}}
														/>
													}
													label='Helper'
												/>
												<TextField
													disabled={!form.values.isHelper}
													sx={{ maxWidth: 200 }}
													type='number'
													InputProps={{
														startAdornment: (
															<InputAdornment position='start'>&#8377;</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position='start'>/ day</InputAdornment>
														),
													}}
													placeholder='Enter Wage'
													{...formikProps('helperWage')}
													onChange={(e) => {
														form.setFieldValue(
															e.target.name,
															e.target.value !== ''
																? parseInt(e.target.value)
																: e.target.value
														)
													}}
												/>
											</Stack>
											<Stack
												direction='row'
												justifyContent='space-between'
												alignItems='flex-start'>
												<FormControlLabel
													sx={{ mt: 1 }}
													control={
														<Checkbox
															checked={form.values.isTechnician}
															onChange={(e, v) => {
																form.setFieldValue('technicianWage', '')
																form.setFieldValue('isTechnician', v)
															}}
															style={{
																color: '#000',
															}}
														/>
													}
													label='Technician'
												/>

												<TextField
													disabled={!form.values.isTechnician}
													sx={{ maxWidth: 200 }}
													type='number'
													placeholder='Enter Wage'
													{...formikProps('technicianWage')}
													onChange={(e) => {
														form.setFieldValue(
															e.target.name,
															e.target.value !== ''
																? parseInt(e.target.value)
																: e.target.value
														)
													}}
													InputProps={{
														startAdornment: (
															<InputAdornment position='start'>&#8377;</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position='start'>/ day</InputAdornment>
														),
													}}
												/>
											</Stack>
											<Stack
												direction='row'
												justifyContent='space-between'
												alignItems={'flex-start'}>
												<FormControlLabel
													sx={{ mt: 1 }}
													control={
														<Checkbox
															checked={form.values.isSupervisor}
															onChange={(e, v) => {
																form.setFieldValue('supervisorWage', '')
																form.setFieldValue('isSupervisor', v)
															}}
															style={{
																color: '#000',
															}}
														/>
													}
													label='Supervisor'
												/>

												<TextField
													disabled={!form.values.isSupervisor}
													sx={{ maxWidth: 200 }}
													type='number'
													placeholder='Enter Wage'
													{...formikProps('supervisorWage')}
													onChange={(e) => {
														form.setFieldValue(
															e.target.name,
															e.target.value !== ''
																? parseInt(e.target.value)
																: e.target.value
														)
													}}
													InputProps={{
														startAdornment: (
															<InputAdornment position='start'>&#8377;</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position='start'>/ day</InputAdornment>
														),
													}}
												/>
											</Stack>
										</Stack>
									</InputWrapper>
									<Button
										size='large'
										variant='contained'
										type='submit'
										disabled={
											!form.dirty ||
											!form.isValid ||
											!(
												form.values.isHelper ||
												form.values.isSupervisor ||
												form.values.isTechnician
											)
										}>
										Book Workers Now
									</Button>
								</>
							)}
						</Stack>
					</form>
				</Stack>
			</Card>
		</>
	)
}

const LISTBOX_PADDING = 8 // px

function renderRow(props: ListChildComponentProps) {
	const { data, index, style } = props
	const dataSet = data[index]
	const inlineStyle = {
		...style,
		top: (style.top as number) + LISTBOX_PADDING,
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

import {
	Badge,
	Button,
	Checkbox,
	CircularProgress,
	Drawer,
	FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	Pagination,
	Stack,
	Typography,
} from '@mui/material'
import {
	BottomLayout,
	JobCardCard,
	primary,
	sendAnalytics,
	useMobile,
	WORKER_APPLICATION_STATUS,
	WORKER_TYPES,
} from '../../../sdk'

import { Close } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FC, useEffect, useMemo, useState } from 'react'
import { useBookingId } from '../hooks'
import { ChipFilter } from './ChipFilter'

interface handleLength {
	handleRequiredTotal: (jobCardsLength: any) => void
}

const WorkerTracking = ({ handleRequiredTotal }: handleLength) => {
	const router = useRouter()
	const isMobile = useMobile()

	const {
		jobCardsLength,
		jobCards,
		bookingSummary,
		isLoading,
		SetPageNumber,
		updateContractorFeedback,
		pageNumber,
		hasMore,
		getJobCards,
		setJobCards,
	} = useBookingId()

	const { helperCount, technicianCount, supervisorCount, totalCount } = useMemo(() => {
		const helper = bookingSummary?.stats?.jobCardCountsBySkill.HELPER ?? 0
		const technician = bookingSummary?.stats?.jobCardCountsBySkill.TECHNICIAN ?? 0
		const supervisor = bookingSummary?.stats?.jobCardCountsBySkill.SUPERVISOR ?? 0
		const total = helper + technician + supervisor
		return {
			helperCount: helper,
			technicianCount: technician,
			supervisorCount: supervisor,
			totalCount: total,
		}
	}, [bookingSummary])

	handleRequiredTotal(totalCount ?? 0)

	const skillFilterOptions: { label: string; value: WORKER_TYPES }[] = [
		{ label: `Supervisor`, value: WORKER_TYPES.SUPERVISOR },
		{ label: `Helper`, value: WORKER_TYPES.HELPER },
		{ label: `Technician`, value: WORKER_TYPES.TECHNICIAN },
	]

	const workerCardStatusFilterOptions: { label: string; value: WORKER_APPLICATION_STATUS }[] = [
		{ label: `Could not connect`, value: WORKER_APPLICATION_STATUS.COULD_NOT_CONNECT },
		{ label: `Hired`, value: WORKER_APPLICATION_STATUS.HIRED },
		{ label: `In progress`, value: WORKER_APPLICATION_STATUS.IN_PROGRESS },
		{ label: `Rejected`, value: WORKER_APPLICATION_STATUS.REJECTED },
		{ label: `Work Started`, value: WORKER_APPLICATION_STATUS.WORK_STARTED },
	]

	useEffect(() => {
		let pageNumber = `${Number(router.query.pageNumber) > 0 ? Number(router.query.pageNumber) - 1 : '0'}`
		getJobCards(pageNumber)
	}, [getJobCards, router.query.pageNumber])
	const [filterDrawer, setFilterDrawer] = useState<{
		open: boolean
		options: { label: string; value: any }[]
		filterKey: string
		title: string
	}>({
		open: false,
		options: [],
		filterKey: '',
		title: '',
	})
	return (
		<>
			<Stack spacing={2}>
				{isMobile ? (
					<Stack direction='row' spacing={2}>
						<Button
							variant='outlined'
							startIcon={
								router.query['skillType'] ? (
									<Badge
										sx={{ marginLeft: -1 }}
										badgeContent={((router.query['skillType'] as string) ?? '').split(',').length}
										color='primary'
									/>
								) : undefined
							}
							color='info'
							sx={{ borderRadius: 3, pl: router.query['skillType'] ? 4 : undefined }}
							onClick={() =>
								setFilterDrawer({
									open: true,
									filterKey: 'skillType',
									options: skillFilterOptions,
									title: 'Select Skill',
								})
							}>
							Select Skill
						</Button>
						<Button
							variant='outlined'
							color='info'
							startIcon={
								router.query['contractorFeedbackCode'] ? (
									<Badge
										sx={{ marginLeft: -1 }}
										badgeContent={
											((router.query['contractorFeedbackCode'] as string) ?? '').split(',').length
										}
										color='primary'
									/>
								) : undefined
							}
							sx={{ borderRadius: 3, pl: router.query['contractorFeedbackCode'] ? 4 : undefined }}
							onClick={() =>
								setFilterDrawer({
									open: true,
									filterKey: 'contractorFeedbackCode',
									options: workerCardStatusFilterOptions,
									title: 'Select Status',
								})
							}>
							Select Status
						</Button>
						<FilterDrawer
							{...filterDrawer}
							onClose={() => setFilterDrawer((p) => ({ ...p, open: false }))}
						/>
					</Stack>
				) : (
					<Stack spacing={2}>
						<Stack direction='row' flexWrap={'wrap'} spacing={2} alignItems='center'>
							<Typography noWrap>Skills :</Typography>
							<ChipFilter filterKey='skillType' filterOptions={skillFilterOptions} />
							{/* <Pagination
								sx={{ alignSelf: 'flex-end' }}
								page={router.query.pageNumber ? Number(router.query.pageNumber) : 1}
								hidePrevButton={
									!Number(router.query.pageNumber) || Number(router.query.pageNumber) === 1
								}
								hideNextButton={!hasMore}
								count={hasMore ? 35 : Number(router.query.pageNumber)}
								siblingCount={0}
								disabled={isLoading}
								boundaryCount={0}
								showFirstButton={false}
								showLastButton={false}
								color='primary'
								onChange={(e, page) => {
									router.push(
										{
											query: { ...router.query, pageNumber: page },
										},
										undefined,
										{}
									)
									let pageNum = page - 1 + ''

									SetPageNumber(`${pageNum}`)
								}}
							/> */}
						</Stack>
						<Stack direction='row' flexWrap={'wrap'} spacing={2} alignItems='center'>
							<Typography noWrap>Status :</Typography>
							<ChipFilter
								selectedColor='success'
								filterKey='contractorFeedbackCode'
								chipStyle='filled'
								filterOptions={workerCardStatusFilterOptions}
							/>
						</Stack>
					</Stack>
				)}

				<Stack>
					{isLoading ? (
						<Stack p={5} alignItems='center'>
							<CircularProgress size={50} />
						</Stack>
					) : jobCards.length === 0 ? (
						<Stack
							flex={1}
							mt={20}
							spacing={1}
							mx={'auto'}
							maxWidth={'80%'}
							direction={'column'}
							alignItems='center'>
							<Typography textAlign={'center'} variant='h6' color={primary.yellow}>
								Aapki job post live ho chuki hai
							</Typography>
							<Typography
								textAlign={'center'}
								variant='h6'
								fontSize={12}
								fontWeight={400}
								color={'common.white'}>
								Jaise hi ProjectHeroes aapke job pe apply karte hai, unke phone numbers aapko yahaan
								dikhege
							</Typography>
						</Stack>
					) : (
						<>
							<Grid container spacing={2}>
								{jobCards.map((jobCardInfo, index) => {
									return (
										<Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
											<JobCardCard
												jobCard={jobCardInfo}
												updateJobCard={updateContractorFeedback}
											/>
										</Grid>
									)
								})}
							</Grid>
							<Stack
								p={1}
								alignItems='center'
								sx={{
									'*': {
										color: '#ffffff',
									},
								}}>
								<Pagination
									page={router.query['pageNumber'] ? Number(router.query['pageNumber'] as string) : 1}
									hideNextButton={!hasMore}
									count={hasMore ? 35 : Number(router.query['pageNumber'] as string)}
									siblingCount={0}
									disabled={isLoading}
									boundaryCount={0}
									showFirstButton={false}
									showLastButton={false}
									color='primary'
									onChange={(e, page) => {
										router.query.pageNumber = String(page)
										router.replace(router)
									}}
								/>
							</Stack>
						</>
					)}
				</Stack>

				{/* <FilterDrawer open={openFilterDrawer} onClose={handelDrawerToggle} /> */}

				{/* {hasMore && (
				<Stack
					sx={{
						marginTop: 3,
						marginBottom: 3,
						justifyContent: 'center',
						display: 'flex',
						alignItems: 'center',
					}}
					direction='row'>
					<Button
						variant='text'
						onClick={() => {
							SetPageNumber((state) => state + 1)
							router.query.pageNumber = `${pageNumber + 1}`
							router.replace(router)
						}}>
						See More
					</Button>
				</Stack>
			)} */}
				{isMobile && (
					<Stack direction={'row'} justifyContent={'center'}>
						<BottomLayout />
					</Stack>
				)}
			</Stack>
		</>
	)
}

export default WorkerTracking

interface Props {
	open: boolean
	options: { label: string; value: any }[]
	filterKey: string
	title: string
	onClose: () => void
}
export const FilterDrawer: FC<Props> = ({ filterKey, open, options, title, onClose }) => {
	const router = useRouter()
	const [filterSelected, setFilterSelected] = useState<any[]>([])
	useEffect(() => {
		setFilterSelected([...((router.query[filterKey] as string)?.split(',') ?? [])])
	}, [filterKey, router.query])
	return (
		<Drawer
			onClose={onClose}
			open={open}
			anchor='bottom'
			PaperProps={{
				sx: {
					borderRadius: ' 12px 12px 0 0',
					backgroundColor: '#FFFFFF',
					p: 2,
				},
			}}>
			<Stack direction='row' alignItems='center' justifyContent='space-between'>
				<Typography variant='h3' color='common.black'>
					{title}
				</Typography>
				<IconButton onClick={onClose} sx={{ color: 'common.black' }}>
					<Close />
				</IconButton>
			</Stack>
			<Stack minHeight={300}>
				<FormGroup>
					{options.map((option) => (
						<FormControlLabel
							checked={filterSelected.includes(option.value)}
							onChange={(e, checked) => {
								if (checked) {
									sendAnalytics({
										name: 'filters',
										action: 'ButtonClick',
										metaData: {
											type: filterKey,
											value: option.value,
										},
									})
									setFilterSelected((p) => [...p, option.value])
								} else {
									setFilterSelected((p) => p.filter((item) => item !== option.value))
								}
							}}
							key={option.value}
							control={<Checkbox />}
							label={option.label}
							componentsProps={{
								typography: {
									color: 'common.black',
								},
							}}
						/>
					))}
				</FormGroup>
			</Stack>
			<Stack direction='row' justifyContent='space-evenly' spacing={2}>
				<Button fullWidth variant='outlined' color='inherit' onClick={onClose}>
					Cancel
				</Button>
				<Button
					fullWidth
					onClick={() => {
						if (filterSelected.length === 0) {
							delete router.query[filterKey]
						} else {
							router.query[filterKey] = filterSelected.join(',')
						}

						router.replace(router)
						onClose()
					}}>
					Apply
				</Button>
			</Stack>
		</Drawer>
	)
}

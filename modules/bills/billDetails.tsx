import { ArrowBackIosNew } from '@mui/icons-material'
import {
	Avatar,
	CircularProgress,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
	colors,
	JobTypeLabel,
	JOB_TYPES,
	PaginationWithHasMore,
	SkillTypeLabel,
	useContractorAuth,
	useMobile,
	WORKER_TYPES,
} from '../../sdk'
import { DateStack } from '../../sdk/components/date/DateStack'
import { StyledTableHeadCell } from '../../sdk/styledComponents/Tables'
import { useProjectDetails } from '../projectDetails/hooks'
import { ApproveConfirmationDialog, ApproveConfirmationDialogProps } from './components'
import { useBill } from './hooks'

export const BillDetails = () => {
	const router = useRouter()
	const { projectDetails, isLoading: isProjectLoading } = useProjectDetails()
	const {
		isLoading,
		billDetailsResponse,
		billSummaryResponse,
		approveWorkReport,
		disputeWorkReport,
		downloadWorkReport,
	} = useBill()
	const { user } = useContractorAuth()
	const [rasingDispute, setRasingDispute] = useState(false)

	const [approveConfirmationDialogProps, setApproveConfirmationDialogProps] =
		useState<ApproveConfirmationDialogProps>({
			open: false,
		})
	const [disputeReason, setDisputeReason] = useState('')
	const [searchText, setSearchText] = useState('')
	useEffect(() => {
		setSearchText((router.query.phoneNumber as string) ?? '')
	}, [router])
	const isMobile = useMobile()
	return (
		<>
			<ApproveConfirmationDialog {...approveConfirmationDialogProps} />
			<Stack
				p={isMobile ? 1 : 2}
				direction={isMobile ? 'column' : 'row'}
				alignItems='Stretch'
				justifyContent='space-between'>
				<Stack spacing={2} direction={isMobile ? 'column' : 'row'}>
					{/* {isProjectLoading ? (
						<Stack flex={1} justifyContent='center'>
							<CircularProgress />
						</Stack>
					) : ( */}
					<Stack direction='row'>
						<IconButton color='primary' onClick={router.back}>
							<ArrowBackIosNew />
						</IconButton>
						<DateStack date={billDetailsResponse?.displayDate} />
						<Stack ml={2}>
							<Typography variant='h5' fontWeight={700}>
								Heroes Bills
							</Typography>
							<Typography variant='caption' color='grey.600'>
								{projectDetails?.name}
							</Typography>
						</Stack>
					</Stack>
					{/* )} */}
				</Stack>
				{/* <Stack
					direction='row'
					alignItems='center'
					justifyContent={isMobile ? 'center' : undefined}
					spacing={1}
					mt={1}>
					// {workReportByIDResponse?.response?.status == WorkReportStatus.PENDING_APPROVAL && (
						<>
							<LoadingButton
								variant='contained'
								loading={isLoading.approving}
								disabled={rasingDispute}
								onClick={() => {
									ButtonClicked({
										action: 'Approve Daily Work Report',
										page: 'Work report Detail',
										url: router.asPath,
									})
									setApproveConfirmationDialogProps({
										open: true,
										confirm: () => {
											approveWorkReport(router.query.workReportId as string)
											setApproveConfirmationDialogProps({ open: false })
										},
										cancel: () => {
											setApproveConfirmationDialogProps({ open: false })
										},
										// date: workReportByIDResponse?.response?.date,
									})
								}}>
								Approve
							</LoadingButton>

							<LoadingButton
								loading={isLoading.disputing}
								disabled={rasingDispute}
								variant='outlined'
								onClick={() => setRasingDispute(true)}>
								Raise Dispute
							</LoadingButton>
						</>
					)}
					<LoadingButton
						loading={isLoading.downloading[(router.query.workReportId as string) ?? '']}
						disabled={rasingDispute}
						variant='outlined'
						onClick={() => {
							ButtonClicked({
								action: 'Download Daily Work Report',
								page: 'Work report detail',
								url: router.asPath,
							})
							downloadWorkReport(
								router.query.workReportId as string,
								// workReportByIDResponse?.response?.date ?? ''
							)
						}}>
						<FileDownloadOutlined />
					</LoadingButton>
				</Stack> */}
			</Stack>
			{/* {rasingDispute && (
				<Paper
					sx={{
						backgroundColor: 'grey.A200',
						display: 'flex',
						justifyContent: 'flex-end',
						height: 203,
					}}>
					<form
						style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
						onSubmit={async (e) => {
							e.preventDefault()
							ButtonClicked({
								action: 'Raise Dispute for Daily Work Report',
								page: 'Work report Detail',
								url: router.asPath,
							})
							await disputeWorkReport(router.query.workReportId as string, {
								description: disputeReason,
							})
							setRasingDispute(false)
						}}>
						<Stack maxWidth={isMobile ? undefined : 600} p={2} flex={1} alignItems='flex-end' spacing={2}>
							<TextField
								value={disputeReason}
								fullWidth
								onChange={(e) => setDisputeReason(e.target.value)}
								multiline
								minRows={4}
								maxRows={4}
								sx={{ backgroundColor: 'common.white', borderRadius: 2 }}
								placeholder='Tell us the heroes names and issues with their attendances. We will raise a ticket and our customer support team will resolve it. '
							/>
							<Stack direction='row' spacing={1.5} justifyContent='flex-end'>
								<Button
									size='small'
									variant='outlined'
									sx={{ backgroundColor: 'common.white' }}
									onClick={() => setRasingDispute(false)}>
									Cancel
								</Button>
								<Button size='small' type='submit' variant='contained' disabled={!!!disputeReason}>
									Submit
								</Button>
							</Stack>
						</Stack>
					</form>
				</Paper>
			)} */}
			<Stack p={isMobile ? 1 : 2} spacing={1}>
				<Stack
					direction={isMobile ? 'column' : 'row'}
					justifyContent='flex-end'
					spacing={1}
					alignItems='stretch'>
					{/* <form
						onSubmit={async (e) => {
							e.preventDefault()
							router.query.phoneNumber = searchText
							delete router.query.pageNumber

							await router.replace(router, undefined, { shallow: true })
						}}>
						<Stack direction='row' spacing={1}>
							<TextField
								size='small'
								placeholder='Search a worker phone'
								name='phoneNumber'
								fullWidth={isMobile}
								value={searchText}
								sx={{ minHeight: 0 }}
								onChange={(e) => {
									if (e.target.value.length <= 10 && !isNaN(Number(e.target.value))) {
										setSearchText(e.target.value)
									}
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end' sx={{ mr: '-10px' }}>
											<IconButton size='small' type='submit'>
												<Search />
											</IconButton>
										</InputAdornment>
									),
								}}
								inputProps={{
									sx: {
										py: 0.6,
									},
								}}
							/>
							<Button
								size='small'
								variant='outlined'
								onClick={() => {
									router.replace(router.asPath.split('?')[0])
								}}>
								clear
							</Button>
						</Stack>
					</form> */}
					<Stack direction='row' alignItems='center' justifyContent={isMobile ? 'space-between' : undefined}>
						<Typography variant='subtitle2'>
							Rows per page: {billDetailsResponse?.bills?.length ?? 10}
						</Typography>
						<PaginationWithHasMore hasMore={billDetailsResponse?.hasMore} loading={isLoading?.fetching} />
					</Stack>
				</Stack>
				<Stack mt={2}>
					<TableContainer
						component={Paper}
						sx={{
							height: isMobile ? 'calc(100vh - 120px)' : 'calc(100vh - 170px)',
						}}>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									{TableHeaderList.map((item) => (
										<StyledTableHeadCell key={item.label as any} sx={item.sx}>
											<Typography noWrap fontWeight={600}>
												{item.label}
											</Typography>
										</StyledTableHeadCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody sx={{ overflowY: 'auto' }}>
								{/* {isLoading?.fetching ? (
									<TableRow sx={{ height: '' }}>
										<TableCell sx={{ borderBottom: 'none' }} colSpan={100} align='center'>
											<CircularProgress />
										</TableCell>
									</TableRow>
								) : ( */}
								<>
									<TableRow
										sx={{
											position: 'sticky',
											top: 57,
											backgroundColor: colors.FloralWhite,
											zIndex: 100,
											'&:hover': {
												backgroundColor: colors.AliceBlue,
											},
										}}>
										<TableCell
											sx={{
												position: 'sticky',
												left: 0,
												width: 80,
												background: colors.FloralWhite,
											}}></TableCell>
										<TableCell
											sx={{
												position: 'sticky',
												left: 80,
												background: colors.FloralWhite,
											}}>
											<Typography fontWeight={600} noWrap>
												{billSummaryResponse?.summary?.heroCount}
											</Typography>
											<Typography color='secondary.main' variant='caption' noWrap>
												Heroes
											</Typography>
										</TableCell>
										<TableCell></TableCell>
										<TableCell></TableCell>
										<TableCell>
											<Stack>
												<Typography fontWeight={600} noWrap>
													{billSummaryResponse?.summary?.baseWage}
												</Typography>
												<Typography color='secondary.main' variant='caption' noWrap>
													Base Wage
												</Typography>
											</Stack>
										</TableCell>
										{/* <TableCell></TableCell> */}
										<TableCell>
											<Typography fontWeight={600} noWrap>
												{billSummaryResponse?.summary?.otWage}
											</Typography>
											<Typography color='secondary.main' variant='caption' noWrap>
												OT Wage
											</Typography>
										</TableCell>
										<TableCell>
											<Typography fontWeight={600} noWrap>
												{billSummaryResponse?.summary?.grossWage}
											</Typography>
											<Typography color='secondary.main' variant='caption' noWrap>
												Gross Wage
											</Typography>
										</TableCell>
										<TableCell>
											<Typography fontWeight={600} noWrap>
												{billSummaryResponse?.summary?.pf}
											</Typography>
											<Typography color='secondary.main' variant='caption' noWrap>
												Total PF
											</Typography>
										</TableCell>
										<TableCell>
											<Typography fontWeight={600} noWrap>
												{billSummaryResponse?.summary?.esi}
											</Typography>
											<Typography color='secondary.main' variant='caption' noWrap>
												Total ESI
											</Typography>
										</TableCell>
										<TableCell>
											<Typography fontWeight={600} noWrap>
												{billSummaryResponse?.summary?.totalPayable}
											</Typography>
											<Typography color='secondary.main' variant='caption' noWrap>
												Total Payable
											</Typography>
										</TableCell>
									</TableRow>
									{billDetailsResponse?.bills?.map(({ bill, worker }) => (
										<TableRow
											key={worker?.id}
											sx={{
												'&:hover': {
													backgroundColor: colors.AliceBlue,
												},
											}}>
											<TableCell
												sx={{
													position: 'sticky',
													left: 0,
													minWidth: 80,
													maxWidth: 80,

													background: '#ffffff',
													'&:hover': {
														backgroundColor: colors.AliceBlue,
													},
												}}>
												<Avatar
													sx={{ width: 48, height: 48 }}
													src={worker.profilePicture ?? '/assets/icons/workerIcon.svg'}
												/>
											</TableCell>
											<TableCell
												sx={{
													position: 'sticky',
													left: 80,
													background: '#ffffff',
													'&:hover': {
														backgroundColor: colors.AliceBlue,
													},
												}}>
												<Typography noWrap>{worker?.name ?? 'NA'}</Typography>
												<Typography variant='caption' color='secondary.main'>
													{worker?.phoneNumber ?? 'NA'}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography noWrap>
													{JobTypeLabel[worker?.workDetails?.jobType as JOB_TYPES]}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography noWrap>
													{SkillTypeLabel[worker?.workDetails?.workerType as WORKER_TYPES]}
												</Typography>
											</TableCell>

											<TableCell>
												<Typography noWrap>{bill?.baseWage ?? 'NA'}</Typography>
											</TableCell>
											{/* <TableCell>
													<Typography noWrap>{bill?.otFactor ?? 'NA'}</Typography>
												</TableCell> */}
											<TableCell>
												<Typography noWrap>{bill?.otWage ?? 'NA'}</Typography>
											</TableCell>
											<TableCell>
												<Typography noWrap>{bill?.grossWage ?? 'NA'}</Typography>
											</TableCell>
											<TableCell>
												<Typography noWrap>{bill?.pf ?? 'NA'}</Typography>
											</TableCell>
											<TableCell>
												<Typography noWrap>{bill?.esi ?? 'NA'}</Typography>
											</TableCell>
											<TableCell>
												<Typography noWrap>{bill?.netWage ?? 'NA'}</Typography>
											</TableCell>
										</TableRow>
									))}
								</>
								{/* )} */}
							</TableBody>
						</Table>
					</TableContainer>
				</Stack>
			</Stack>
		</>
	)
}
const TableHeaderList: { label?: string; sx?: any }[] = [
	{ sx: { position: 'sticky', left: '0 !important', top: 0, background: '#f2f9fb', zIndex: 10, width: 80 } },
	{ label: 'Name', sx: { position: 'sticky', left: '80px !important', top: 0, background: '#f2f9fb', zIndex: 10 } },
	{ label: 'Trade' },
	{ label: 'Skill' },
	{ label: 'Base Wage' },
	// { label: 'OT Factor' },
	{ label: 'OT Wage' },
	{ label: 'Gross Wage' },
	{ label: 'PF' },
	{ label: 'ESI' },
	{ label: 'Net Wage' },
]

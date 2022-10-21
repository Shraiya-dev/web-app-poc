import { ArrowBackIosNew, FileDownloadOutlined, Search } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
	alpha,
	Avatar,
	Button,
	Chip,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	Pagination,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
	colors,
	JOB_TYPES,
	JobTypeLabel,
	primary,
	SkillTypeLabel,
	useContractorAuth,
	useMobile,
	WORKER_TYPES,
} from '../../sdk'
import { ButtonClicked } from '../../sdk/analytics/analyticsWrapper'
import { DateStack } from '../../sdk/components/date/DateStack'
import { StyledTableHeadCell } from '../../sdk/styledComponents/Tables'
import { useProjectDetails } from '../projectDetails/hooks'
import { ApproveConfirmationDialog, ApproveConfirmationDialogProps } from './components'
import { WorkReportStatusColor, WorkReportStatusLabel } from './constants'
import { useWorkReport } from './hooks'
import { WorkReportStatus } from './types'
import CancelIcon from '@mui/icons-material/Cancel'

export const WorkReportDetails = () => {
	const router = useRouter()
	const { projectDetails } = useProjectDetails()
	const { isLoading, workReportByIDResponse, approveWorkReport, disputeWorkReport, downloadWorkReport } =
		useWorkReport()
	const { user } = useContractorAuth()
	const [rasingDispute, setRasingDispute] = useState(false)
	const [mobileRasingDispute, setMobileRasingDispute] = useState(false)

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

	const handleMobileRasingDispute = useCallback(() => {
		setMobileRasingDispute(false)
	}, [mobileRasingDispute])

	return (
		<>
			<ApproveConfirmationDialog {...approveConfirmationDialogProps} />
			{!isMobile ? (
				<>
					<Stack
						p={isMobile ? 1 : 2}
						direction={isMobile ? 'column' : 'row'}
						alignItems='Stretch'
						justifyContent='space-between'
						sx={{
							background: primary.darkGrey,
						}}>
						<Stack spacing={5} direction={isMobile ? 'column' : 'row'}>
							<Stack direction='row'>
								<IconButton color='primary' onClick={router.back}>
									<ArrowBackIosNew />
								</IconButton>
								<DateStack date={workReportByIDResponse?.response?.date} />
								<Stack ml={2}>
									<Typography fontFamily={'Saira ,sans-serif'} fontWeight={700} variant='h5'>
										Work Report
									</Typography>
									<Typography
										fontFamily={'Karla ,sans-serif'}
										fontWeight={700}
										variant='caption'
										color={primary.light}>
										{projectDetails?.name}
									</Typography>
								</Stack>
							</Stack>
							<Stack
								direction={isMobile ? 'column' : 'row'}
								alignItems='flex-start'
								pl={isMobile ? 12 : 0}
								spacing={2}>
								<Chip
									variant='filled'
									sx={(theme) => ({
										px: 1,
										backgroundColor: alpha(
											WorkReportStatusColor[
												workReportByIDResponse?.response?.status ?? WorkReportStatus.DRAFT
											],
											0.2
										),
									})}
									label={
										WorkReportStatusLabel[
											workReportByIDResponse?.response?.status ?? WorkReportStatus.DRAFT
										]
									}
								/>
								{workReportByIDResponse?.response?.ticketId &&
									workReportByIDResponse?.response?.status !== WorkReportStatus.APPROVED && (
										<Typography variant='h6' color='error.main' textAlign='center'>
											Your ticket id is {workReportByIDResponse?.response?.ticketId}
										</Typography>
									)}
							</Stack>
						</Stack>
						<Stack
							direction='row'
							alignItems='center'
							justifyContent={isMobile ? 'center' : undefined}
							spacing={1}
							mt={1}>
							{workReportByIDResponse?.response?.status === WorkReportStatus.PENDING_APPROVAL && (
								<>
									<LoadingButton
										variant='contained'
										loading={isLoading.approving[router.query?.workReportId as string]}
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
												date: workReportByIDResponse?.response?.date,
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
										workReportByIDResponse?.response?.date ?? ''
									)
								}}>
								<FileDownloadOutlined />
							</LoadingButton>
						</Stack>
					</Stack>
					{rasingDispute && (
						<Paper
							sx={{
								backgroundColor: '#585858',
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
								<Stack
									maxWidth={isMobile ? undefined : 600}
									p={2}
									flex={1}
									alignItems='flex-end'
									spacing={2}>
									<TextField
										value={disputeReason}
										fullWidth
										onChange={(e) => setDisputeReason(e.target.value)}
										multiline
										minRows={4}
										maxRows={4}
										sx={{ backgroundColor: 'common.white', borderRadius: 2 }}
										placeholder='Tell us the projectheroes names and issues with their attendances. We willl raise a ticket and our customer support team will resolve it. '
									/>
									<Stack direction='row' spacing={1.5} justifyContent='flex-end'>
										<Button
											size='small'
											variant='outlined'
											sx={{ backgroundColor: 'common.white' }}
											onClick={() => setRasingDispute(false)}>
											Cancel
										</Button>
										<Button
											size='small'
											type='submit'
											variant='contained'
											disabled={!!!disputeReason}>
											Submit
										</Button>
									</Stack>
								</Stack>
							</form>
						</Paper>
					)}
					<Stack p={isMobile ? 1 : 2} spacing={1}>
						<Stack
							direction={isMobile ? 'column' : 'row'}
							justifyContent='space-between'
							spacing={1}
							alignItems='stretch'>
							<form
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
														<Search sx={{ color: primary.properDark }} />
													</IconButton>
												</InputAdornment>
											),
										}}
										inputProps={{
											sx: {
												py: 0.6,
												color: primary.properDark,
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
							</form>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent={isMobile ? 'space-between' : undefined}>
								<Typography variant='subtitle2'>
									Rows per page: {workReportByIDResponse?.response?.workerDetails?.length ?? 10}
								</Typography>
								<Pagination
									shape='rounded'
									count={workReportByIDResponse?.totalPages}
									color='primary'
									page={Number(router.query.pageNumber ?? 0) + 1}
									onChange={async (e, pageNumber) => {
										router.query.pageNumber = String(pageNumber - 1)
										await router.replace(router, undefined, { shallow: true })
									}}
								/>
							</Stack>
						</Stack>
						<Stack mt={2}>
							<TableContainer
								component={Paper}
								sx={{
									height: isMobile
										? 'calc(100vh - 310px)'
										: rasingDispute
										? 'calc(100vh - 400px)'
										: 'calc(100vh - 170px)',
								}}>
								<Table stickyHeader>
									<TableHead>
										<TableRow>
											{TableHeaderList.map((item) => (
												<StyledTableHeadCell
													key={item.label as any}
													sx={item.sx}
													style={{
														background: '#fffCF1',
													}}>
													<Typography noWrap fontWeight={600} color={primary.properDark}>
														{item.label}
													</Typography>
												</StyledTableHeadCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody sx={{ overflowY: 'auto' }}>
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
												}}></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell>
												<Stack>
													<Typography fontWeight={600} noWrap color={primary.properDark}>
														{
															workReportByIDResponse?.response?.footerDetails
																?.presentPercentage
														}{' '}
														({workReportByIDResponse?.response?.footerDetails?.totalPresent}
														/{workReportByIDResponse?.response?.footerDetails?.totalCount})
													</Typography>
													<Typography
														sx={{ color: primary.darkGrey }}
														variant='caption'
														noWrap>
														Attendance %
													</Typography>
												</Stack>
											</TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell>
												<Typography fontWeight={600} noWrap color={primary.properDark}>
													{workReportByIDResponse?.response?.footerDetails?.totalShiftHours}
												</Typography>
												<Typography sx={{ color: primary.darkGrey }} variant='caption' noWrap>
													Total Hours
												</Typography>
											</TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell>
												<Typography fontWeight={600} noWrap color={primary.properDark}>
													{workReportByIDResponse?.response?.footerDetails?.totalOtHours}
												</Typography>
												<Typography sx={{ color: primary.darkGrey }} variant='caption' noWrap>
													Total OT Hours
												</Typography>
											</TableCell>
										</TableRow>
										{workReportByIDResponse?.response?.workerDetails?.map((item) => (
											<TableRow
												key={item?.workerId}
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
														src={item.profilePicture ?? '/assets/icons/workerIcon.svg'}
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
													<Typography color={primary.properDark}>
														{item?.name ?? 'NA'}
													</Typography>
													<Typography variant='caption' sx={{ color: primary.darkGrey }}>
														{item?.phoneNumber ?? 'NA'}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography color={primary.properDark}>
														{JobTypeLabel[item?.jobType as JOB_TYPES]}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography color={primary.properDark}>
														{SkillTypeLabel[item?.skillType as WORKER_TYPES]}
													</Typography>
												</TableCell>
												<TableCell>
													{item.isPresent ? (
														<Chip
															size='small'
															sx={(theme) => ({
																px: 0.5,
																backgroundColor: alpha(theme.palette.success.main, 0.2),
															})}
															label='P'
														/>
													) : (
														<Chip
															size='small'
															sx={(theme) => ({
																px: 0.5,
																backgroundColor: alpha(theme.palette.error.main, 0.2),
															})}
															label='A'
														/>
													)}
												</TableCell>
												<TableCell>
													<Typography color={primary.properDark}>
														{item?.checkIn ?? 'NA'}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography color={primary.properDark}>
														{item?.checkOut ?? 'NA'}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography color={primary.properDark}>
														{item?.shiftHours ?? 'NA'}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography color={primary.properDark}>
														{item?.otCheckIn ?? 'NA'}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography color={primary.properDark}>
														{item?.otCheckOut ?? 'NA'}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography color={primary.properDark}>
														{item?.otHours ?? 'NA'}
													</Typography>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Stack>
					</Stack>
				</>
			) : (
				// mobile view
				<>
					{/* dispute dialog  */}
					<Dialog onClose={handleMobileRasingDispute} open={mobileRasingDispute} fullWidth>
						<DialogTitle>
							<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
								<Typography variant='subtitle1' fontWeight={700} color={primary.properDark}>
									Raise Dispute
								</Typography>
								<IconButton onClick={handleMobileRasingDispute}>
									<CancelIcon sx={{ color: primary.properDark }} />
								</IconButton>
							</Stack>
						</DialogTitle>
						<DialogContent>
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
									handleMobileRasingDispute()
								}}>
								<Stack direction={'column'} sx={{ width: '100%' }}>
									<TextField
										value={disputeReason}
										fullWidth
										onChange={(e) => setDisputeReason(e.target.value)}
										multiline
										minRows={4}
										maxRows={4}
										sx={{
											backgroundColor: 'common.white',
											borderRadius: 2,
											border: '1px solid grey',
										}}
										placeholder='Tell us the projectheroes names and issues with their attendances. '
									/>
									<Stack direction='row' spacing={1.5} justifyContent='flex-end' pt={2}>
										<Button
											size='small'
											variant='outlined'
											sx={{ backgroundColor: 'common.white' }}
											onClick={handleMobileRasingDispute}>
											Cancel
										</Button>
										<Button
											size='small'
											type='submit'
											variant='contained'
											disabled={!!!disputeReason}>
											Submit
										</Button>
									</Stack>
								</Stack>
							</form>
						</DialogContent>
					</Dialog>
					{/* end dispute dialog */}
					<Box
						sx={{
							height: '100vh',
						}}>
						<Box>
							<Stack
								direction={'column'}
								justifyContent={'center'}
								sx={{
									pt: 2,
									pb: 1,
								}}>
								<Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} px={2}>
									<Stack direction={'row'} mb={2}>
										<IconButton color='primary' onClick={router.back}>
											<ArrowBackIosNew sx={{ fontSize: '30px' }} />
										</IconButton>
										<DateStack date={workReportByIDResponse?.response?.date} />
									</Stack>
									<Stack direction={'column'}>
										<Stack ml={2}>
											<Typography variant='h4' fontWeight={700}>
												Work Report
											</Typography>
											<Typography variant='caption' color={primary.light} mt={'7px'}>
												{projectDetails?.name}
											</Typography>
										</Stack>
									</Stack>
								</Stack>
							</Stack>
							<Stack
								direction={'row'}
								justifyContent={'flex-start'}
								alignItems={'center'}
								sx={{
									paddingLeft: '115px',
								}}>
								<Chip
									variant='filled'
									sx={(theme) => ({
										px: 1,
										backgroundColor: alpha(
											WorkReportStatusColor[
												workReportByIDResponse?.response?.status ?? WorkReportStatus.DRAFT
											],
											0.2
										),
									})}
									label={
										WorkReportStatusLabel[
											workReportByIDResponse?.response?.status ?? WorkReportStatus.DRAFT
										]
									}
								/>
							</Stack>
						</Box>
						{/* attendance, total hours and total ot block */}
						<Stack direction={'row'} justifyContent={'space-around'} alignItems={'center'} pt={2.4}>
							<Stack>
								<Typography fontWeight={600} noWrap>
									{workReportByIDResponse?.response?.footerDetails?.presentPercentage} (
									{workReportByIDResponse?.response?.footerDetails?.totalPresent}/
									{workReportByIDResponse?.response?.footerDetails?.totalCount})
								</Typography>
								<Typography color='secondary.main' variant='caption' noWrap>
									Attendance %
								</Typography>
							</Stack>
							<Stack>
								<Typography fontWeight={600} noWrap>
									{workReportByIDResponse?.response?.footerDetails?.totalShiftHours}
								</Typography>
								<Typography color='secondary.main' variant='caption' noWrap>
									Total Hours
								</Typography>
							</Stack>
							<Stack>
								<Typography fontWeight={600} noWrap>
									{workReportByIDResponse?.response?.footerDetails?.totalOtHours}
								</Typography>
								<Typography color='secondary.main' variant='caption' noWrap>
									Total OT Hours
								</Typography>
							</Stack>
						</Stack>
						{/* profile card */}

						<Stack
							sx={{
								height: 'calc(100vh - 265px)',
								overflowY: 'scroll',
							}}>
							{workReportByIDResponse?.response?.workerDetails?.map((item, index) => {
								return (
									<>
										<Box
											key={item?.workerId}
											sx={{
												mx: '10px',
												mt: '20px',
											}}>
											<Stack direction={'row'} justifyContent={'space-between'} p={'16px'}>
												<Stack direction={'row'} spacing={1.3}>
													<Avatar
														sx={{ width: 48, height: 48 }}
														src={item.profilePicture ?? '/assets/icons/workerIcon.svg'}
													/>
													<Stack direction={'column'}>
														<Typography>{item?.name ?? 'NA'}</Typography>
														<Stack direction={'row'}>
															<Typography
																variant='caption'
																color={primary.light}
																sx={{ fontWeight: '400' }}>
																{JobTypeLabel[item?.jobType as JOB_TYPES]}/
															</Typography>
															<Typography
																variant='caption'
																color={primary.light}
																sx={{ fontWeight: '400' }}>
																{SkillTypeLabel[item?.skillType as WORKER_TYPES]}
															</Typography>
														</Stack>
														<Typography variant='caption' color='secondary.main'>
															{item?.phoneNumber ?? 'NA'}
														</Typography>
													</Stack>
												</Stack>
												{item.isPresent ? (
													<Chip
														size='small'
														sx={(theme) => ({
															px: 0.5,
															backgroundColor: alpha(theme.palette.success.main, 0.2),
														})}
														label='P'
													/>
												) : (
													<Chip
														size='small'
														sx={(theme) => ({
															px: 0.5,
															backgroundColor: alpha(theme.palette.error.main, 0.2),
														})}
														label='A'
													/>
												)}
											</Stack>
											<Box
												sx={{
													height: '95px',
													background: '#F9F9F9',
													mx: '10px',
													my: '10px',
													px: 2,
													pt: 1,
													borderRadius: '8px',
												}}>
												<Grid container>
													<Grid item xs={4}>
														<Stack direction={'column'}>
															<Typography
																variant='caption'
																color={primary.properDark}
																sx={{
																	fontWeight: '400',
																}}>
																Check-In
															</Typography>
															<Typography variant='caption' color={primary.properDark}>
																{item?.checkIn ?? 'NA'}
															</Typography>
														</Stack>
													</Grid>
													<Grid item xs={4}>
														<Stack direction={'column'}>
															<Typography
																variant='caption'
																color={primary.properDark}
																sx={{
																	fontWeight: '400',
																}}>
																OT Check-In
															</Typography>
															<Typography variant='caption' color={primary.properDark}>
																{item?.otCheckIn ?? 'NA'}
															</Typography>
														</Stack>
													</Grid>
													<Grid item xs={4}>
														<Stack direction={'column'}>
															<Typography
																variant='caption'
																color={primary.properDark}
																sx={{
																	fontWeight: '400',
																}}>
																Hours
															</Typography>
															<Typography variant='caption' color={primary.properDark}>
																{item?.shiftHours ?? 'NA'}
															</Typography>
														</Stack>
													</Grid>
												</Grid>
												<Grid container>
													<Grid item xs={4}>
														<Stack direction={'column'}>
															<Typography
																variant='caption'
																color={primary.properDark}
																sx={{
																	fontWeight: '400',
																}}>
																Check-Out
															</Typography>
															<Typography variant='caption' color={primary.properDark}>
																{item?.checkOut ?? 'NA'}
															</Typography>
														</Stack>
													</Grid>
													<Grid item xs={4}>
														<Stack direction={'column'}>
															<Typography
																variant='caption'
																color={primary.properDark}
																sx={{
																	fontWeight: '400',
																}}>
																OT Check-Out
															</Typography>
															<Typography variant='caption' color={primary.properDark}>
																{item?.otCheckOut ?? 'NA'}
															</Typography>
														</Stack>
													</Grid>
													<Grid item xs={4}>
														<Stack direction={'column'}>
															<Typography
																variant='caption'
																color={primary.properDark}
																sx={{
																	fontWeight: '400',
																}}>
																OT Hours
															</Typography>
															<Typography variant='caption' color={primary.properDark}>
																{item?.otHours ?? 'NA'}
															</Typography>
														</Stack>
													</Grid>
												</Grid>
											</Box>
											<Divider />
										</Box>
									</>
								)
							})}
						</Stack>
						<Stack
							direction='row'
							alignItems='center'
							justifyContent={isMobile ? 'space-around' : undefined}
							spacing={1}
							mt={1}
							sx={{
								background: primary.properDark,
								borderTop: '1px solid #C5C5C5',
								position: 'absolute',
								bottom: 0,
								width: '100%',
								py: 2,
							}}>
							{workReportByIDResponse?.response?.status === WorkReportStatus.PENDING_APPROVAL && (
								<>
									<LoadingButton
										variant='contained'
										loading={isLoading.approving[router.query?.workReportId as string]}
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
												date: workReportByIDResponse?.response?.date,
											})
										}}>
										Approve
									</LoadingButton>
									<LoadingButton
										loading={isLoading.disputing}
										disabled={rasingDispute}
										variant='outlined'
										onClick={() => {
											setMobileRasingDispute(true)
										}}>
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
										workReportByIDResponse?.response?.date ?? ''
									)
								}}>
								<FileDownloadOutlined />
							</LoadingButton>
						</Stack>
					</Box>
				</>
			)}
		</>
	)
}

const TableHeaderList: { label?: string; sx?: any }[] = [
	{ sx: { position: 'sticky', left: '0 !important', top: 0, background: '#f2f9fb', zIndex: 10, width: 80 } },
	{ label: 'Name', sx: { position: 'sticky', left: '80px !important', top: 0, background: '#f2f9fb', zIndex: 10 } },
	{ label: 'Trade' },
	{ label: 'Skill' },
	{ label: 'Attendance' },
	{ label: 'Check In' },
	{ label: 'Check Out' },
	{ label: 'Hours' },
	{ label: 'OT Check In' },
	{ label: 'OT Check Out' },
	{ label: 'OT Hours' },
]

import { ArrowBackIosNew } from '@mui/icons-material'
import {
	Avatar,
	Collapse,
	Divider,
	Grid,
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
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
	colors,
	JOB_TYPES,
	JobTypeLabel,
	PaginationWithHasMore,
	primary,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

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
	const [boxOpen, setBoxOpen] = useState(false)

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

	const handleBox = useCallback(() => {
		setBoxOpen(!boxOpen)
	}, [boxOpen])

	return (
		<>
			<ApproveConfirmationDialog {...approveConfirmationDialogProps} />
			{!isMobile ? (
				<>
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
									<Typography fontFamily={'Saira,sans-serif'} fontWeight={700} variant='h5'>
										ProjectHeroes Bills
									</Typography>
									<Typography
										fontFamily={'Karla,sans-serif'}
										fontWeight={500}
										variant='caption'
										color={primary.light}>
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
								placeholder='Tell us the ProjectHeroes names and issues with their attendances. We will raise a ticket and our customer support team will resolve it. '
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
							<Stack
								direction='row'
								alignItems='center'
								justifyContent={isMobile ? 'space-between' : undefined}>
								<Typography variant='subtitle2'>
									Rows per page: {billDetailsResponse?.bills?.length ?? 10}
								</Typography>
								<PaginationWithHasMore
									hasMore={billDetailsResponse?.hasMore}
									loading={isLoading?.fetching}
								/>
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
													<Typography noWrap fontWeight={600} color={primary.properDark}>
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
													<Typography fontWeight={600} noWrap color={primary.properDark}>
														{billSummaryResponse?.summary?.heroCount}
													</Typography>
													<Typography
														// color={primary.properDark}
														variant='caption'
														color={primary.properDark}
														noWrap>
														ProjectHeroes
													</Typography>
												</TableCell>
												<TableCell></TableCell>
												<TableCell></TableCell>
												<TableCell>
													<Stack>
														<Typography fontWeight={600} noWrap color={primary.properDark}>
															{billSummaryResponse?.summary?.baseWage}
														</Typography>
														<Typography color={primary.properDark} variant='caption' noWrap>
															Base Wage
														</Typography>
													</Stack>
												</TableCell>
												{/* <TableCell></TableCell> */}
												<TableCell>
													<Typography fontWeight={600} noWrap color={primary.properDark}>
														{billSummaryResponse?.summary?.otWage}
													</Typography>
													<Typography color={primary.properDark} variant='caption' noWrap>
														OT Wage
													</Typography>
												</TableCell>
												<TableCell>
													<Typography fontWeight={600} noWrap color={primary.properDark}>
														{billSummaryResponse?.summary?.grossWage}
													</Typography>
													<Typography color={primary.properDark} variant='caption' noWrap>
														Gross Wage
													</Typography>
												</TableCell>
												<TableCell>
													<Typography fontWeight={600} noWrap color={primary.properDark}>
														{billSummaryResponse?.summary?.pf}
													</Typography>
													<Typography color={primary.properDark} variant='caption' noWrap>
														Total PF
													</Typography>
												</TableCell>
												<TableCell>
													<Typography fontWeight={600} noWrap color={primary.properDark}>
														{billSummaryResponse?.summary?.esi}
													</Typography>
													<Typography color={primary.properDark} variant='caption' noWrap>
														Total ESI
													</Typography>
												</TableCell>
												<TableCell>
													<Typography fontWeight={600} noWrap color={primary.properDark}>
														{billSummaryResponse?.summary?.totalPayable}
													</Typography>
													<Typography color={primary.properDark} variant='caption' noWrap>
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
															src={
																worker.profilePicture ?? '/assets/icons/workerIcon.svg'
															}
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
														<Typography noWrap color={primary.properDark}>
															{worker?.name ?? 'NA'}
														</Typography>
														<Typography variant='caption' color={primary.properDark}>
															{worker?.phoneNumber ?? 'NA'}
														</Typography>
													</TableCell>
													<TableCell>
														<Typography noWrap color={primary.properDark}>
															{JobTypeLabel[worker?.workDetails?.jobType as JOB_TYPES]}
														</Typography>
													</TableCell>
													<TableCell>
														<Typography noWrap color={primary.properDark}>
															{
																SkillTypeLabel[
																	worker?.workDetails?.workerType as WORKER_TYPES
																]
															}
														</Typography>
													</TableCell>

													<TableCell>
														<Typography noWrap color={primary.properDark}>
															{bill?.baseWage ?? 'NA'}
														</Typography>
													</TableCell>
													{/* <TableCell>
													<Typography noWrap>{bill?.otFactor ?? 'NA'}</Typography>
												</TableCell> */}
													<TableCell>
														<Typography noWrap color={primary.properDark}>
															{bill?.otWage ?? 'NA'}
														</Typography>
													</TableCell>
													<TableCell>
														<Typography noWrap color={primary.properDark}>
															{bill?.grossWage ?? 'NA'}
														</Typography>
													</TableCell>
													<TableCell>
														<Typography noWrap color={primary.properDark}>
															{bill?.pf ?? 'NA'}
														</Typography>
													</TableCell>
													<TableCell>
														<Typography noWrap color={primary.properDark}>
															{bill?.esi ?? 'NA'}
														</Typography>
													</TableCell>
													<TableCell>
														<Typography noWrap color={primary.properDark}>
															{bill?.netWage ?? 'NA'}
														</Typography>
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
			) : (
				// Mobile view
				<Box sx={{ maxHeight: '100vh' }}>
					{/* header */}
					<Stack direction={'column'}>
						<Stack
							direction={'row'}
							justifyContent={'space-between'}
							sx={{
								p: '16px 10px 10px 16px',
							}}>
							<Stack direction={'row'}>
								<IconButton color='primary' onClick={router.back}>
									<ArrowBackIosNew sx={{ fontSize: '30px' }} />
								</IconButton>
								<DateStack date={billDetailsResponse?.displayDate} />
								<Stack ml={2}>
									<Typography variant='h4' fontWeight={700}>
										ProjectHeroes Bills
									</Typography>
									<Typography variant='caption' color='grey.600' fontWeight={500}>
										{projectDetails?.name}
									</Typography>
								</Stack>
							</Stack>
							{/* <IconButton>
								<Image src={DownloadImage} alt='downloadImage' height={'24px'} width={'24px'} />
							</IconButton> */}
						</Stack>
						{/* <Stack
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
									backgroundColor: '#F69E5433',
								})}
								label={'Pending Payment'}
							/>
						</Stack> */}
					</Stack>

					{/* base wage , grossWage , otwage, totalpf , totalEsi ,totalPayable */}
					<Stack
						direction={'column'}
						sx={{
							height: '72px',
							background: '#FFFCF1',
							mt: '22px',
						}}>
						<Stack
							direction={'row'}
							sx={{
								p: '16px 16px',
							}}>
							<Grid container>
								<Grid item xs={4}>
									<Stack direction={'column'}>
										<Typography fontWeight={600} noWrap color={primary.properDark}>
											{billSummaryResponse?.summary?.baseWage}
										</Typography>
										<Typography color={primary.properDark} variant='caption' noWrap>
											Base Wage
										</Typography>
									</Stack>
								</Grid>
								<Grid item xs={4}>
									<Stack direction={'column'}>
										<Typography fontWeight={600} noWrap color={primary.properDark}>
											{billSummaryResponse?.summary?.grossWage}
										</Typography>
										<Typography color={primary.properDark} variant='caption' noWrap>
											Gross Wage
										</Typography>
									</Stack>
								</Grid>
								<Grid item xs={4}>
									<Stack direction={'column'}>
										<Typography color='#0FAF7F' fontWeight={600} noWrap>
											{billSummaryResponse?.summary?.totalPayable}
										</Typography>
										<Typography color={primary.properDark} variant='caption' noWrap>
											Total Payable
										</Typography>
									</Stack>
								</Grid>
							</Grid>
							<IconButton onClick={handleBox}>
								{!boxOpen ? (
									<ExpandMoreIcon
										sx={{
											color: primary.properDark,
										}}
									/>
								) : (
									<KeyboardArrowUpIcon
										sx={{
											color: primary.properDark,
										}}
									/>
								)}
							</IconButton>
						</Stack>
					</Stack>
					<Collapse
						in={boxOpen}
						timeout={550}
						sx={{
							background: '#FFFCF1',
						}}>
						<Stack
							direction={'row'}
							sx={{
								p: '16px 16px',
							}}>
							<Grid container>
								<Grid item xs={4}>
									<Stack direction={'column'} justifyContent={'flex-start'}>
										<Typography fontWeight={600} noWrap color={primary.properDark}>
											{billSummaryResponse?.summary?.otWage}
										</Typography>
										<Typography color={primary.properDark} variant='caption' noWrap>
											OT Wage
										</Typography>
									</Stack>
								</Grid>
								<Grid item xs={4}>
									<Stack direction={'column'} justifyContent={'flex-start'}>
										<Typography fontWeight={600} noWrap color={primary.properDark}>
											{billSummaryResponse?.summary?.pf}
										</Typography>
										<Typography color={primary.properDark} variant='caption' noWrap>
											Total PF
										</Typography>
									</Stack>
								</Grid>
								<Grid item xs={4}>
									<Stack direction={'column'} justifyContent={'flex-start'}>
										<Typography fontWeight={600} noWrap color={primary.properDark}>
											{billSummaryResponse?.summary?.esi}
										</Typography>
										<Typography color={primary.properDark} variant='caption' noWrap>
											Total ESI
										</Typography>
									</Stack>
								</Grid>
							</Grid>
							{/* this icon button -> balance the distance */}
							<IconButton sx={{ visibility: 'hidden' }}>
								<ExpandMoreIcon />
							</IconButton>
						</Stack>
					</Collapse>
					<Box
						sx={{
							maxHeight: `calc(100vh - ${boxOpen ? '270px' : '210px'})`,
							overflowY: 'scroll',
						}}>
						{billDetailsResponse?.bills?.map(({ bill, worker }) => {
							return (
								<>
									<Stack direction={'column'} key={worker?.id} px={'8px'} pb={'15px'}>
										<Stack direction={'row'} p={'16px 8px'} justifyContent={'space-between'}>
											<Stack direction={'row'} spacing={1.5}>
												<Avatar
													sx={{ width: 48, height: 48 }}
													src={worker.profilePicture ?? '/assets/icons/workerIcon.svg'}
												/>
												<Stack direction={'column'}>
													<Typography noWrap sx={{ fontSize: '14px', fontWeight: '700' }}>
														{worker?.name ?? 'NA'}
													</Typography>
													<Typography noWrap variant='caption' sx={{ fontWeight: '400' }}>
														{JobTypeLabel[worker?.workDetails?.jobType as JOB_TYPES]}/
														{
															SkillTypeLabel[
																worker?.workDetails?.workerType as WORKER_TYPES
															]
														}
													</Typography>
												</Stack>
											</Stack>
											{/* <Chip
												variant='filled'
												sx={(theme) => ({
													px: 1,
													width: 'fit-content',
													height: '24px',
													backgroundColor: '#F69E5433',
													fontSize: '12px',
												})}
												label={'Pending Payment'}
											/> */}
										</Stack>
										<Box
											sx={{
												background: '#F9F9F9',
												borderRadius: '8px',
												p: '12px 18px 12px 12px',
											}}>
											<Stack direction={'row'} justifyContent={'space-between'}>
												<Stack
													direction={'row'}
													width='50%'
													alignItems={'center'}
													maxWidth={'200px'}
													spacing={2}
													justifyContent={'space-between'}>
													<Typography
														color={primary.properDark}
														variant='caption'
														fontWeight={400}
														noWrap>
														Base Wage
													</Typography>
													<Typography
														width={60}
														fontWeight={400}
														color='#000'
														variant='caption'
														noWrap>
														{bill?.baseWage ?? 'NA'}
													</Typography>
												</Stack>
												{/* <Stack direction={'row'} alignItems={'center'} spacing={2}>
													<Typography
														color={primary.properDark}
														fontWeight={400}
														variant='caption'
														noWrap>
														OT Factor
													</Typography>
													<Typography color='#000' fontWeight={400} variant='caption' noWrap>
														{bill?.otFactor ?? 'NA'}
													</Typography>
												</Stack> */}
											</Stack>
											<Stack
												direction={'row'}
												width='50%'
												maxWidth={'200px'}
												alignItems={'center'}
												spacing={2}
												justifyContent={'space-between'}>
												<Typography
													color={primary.properDark}
													fontWeight={400}
													variant='caption'
													noWrap>
													OT Wage
												</Typography>
												<Typography
													width={60}
													color='#000'
													fontWeight={400}
													variant='caption'
													noWrap>
													{bill?.otWage ?? 'NA'}
												</Typography>
											</Stack>
											<Stack
												direction={'row'}
												width='50%'
												maxWidth={'200px'}
												alignItems={'center'}
												spacing={2}
												justifyContent={'space-between'}>
												<Typography
													color={primary.properDark}
													fontWeight={400}
													variant='caption'
													noWrap>
													Gross Wage
												</Typography>
												<Typography
													width={60}
													color='#000'
													fontWeight={400}
													variant='caption'
													noWrap>
													{bill?.grossWage ?? 'NA'}
												</Typography>
											</Stack>
											<Stack
												direction={'row'}
												width='50%'
												maxWidth={'200px'}
												alignItems={'center'}
												spacing={2}
												justifyContent={'space-between'}>
												<Typography
													color={primary.properDark}
													fontWeight={400}
													variant='caption'
													noWrap>
													PF
												</Typography>
												<Typography
													width={60}
													color='#000'
													fontWeight={400}
													variant='caption'
													noWrap>
													{bill?.pf ?? 'NA'}
												</Typography>
											</Stack>
											<Stack
												direction={'row'}
												width='50%'
												maxWidth={'200px'}
												alignItems={'center'}
												spacing={2}
												justifyContent={'space-between'}>
												<Typography
													color={primary.properDark}
													fontWeight={400}
													variant='caption'
													noWrap>
													ESI
												</Typography>
												<Typography
													width={60}
													color='#000'
													fontWeight={400}
													variant='caption'
													noWrap>
													{' '}
													{bill?.esi ?? 'NA'}
												</Typography>
											</Stack>
											<Stack
												direction={'row'}
												width='50%'
												maxWidth={'200px'}
												alignItems={'center'}
												justifyContent={'space-between'}>
												<Typography
													color={primary.properDark}
													fontWeight={400}
													variant='caption'
													noWrap>
													Net Wage
												</Typography>
												<Typography
													width={60}
													color='#0FAF7F'
													fontWeight={400}
													variant='caption'
													noWrap>
													{' '}
													{bill?.netWage ?? 'NA'}
												</Typography>
											</Stack>
										</Box>
									</Stack>
									<Divider />
								</>
							)
						})}
					</Box>
				</Box>
			)}
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

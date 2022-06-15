import { ArrowBackIosNew, FileDownloadOutlined, Search } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
	alpha,
	Avatar,
	Button,
	Chip,
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
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { colors, useContractorAuth, useMobile } from '../../sdk'
import { ButtonClicked } from '../../sdk/analytics/analyticsWrapper'
import { DateStack } from '../../sdk/components/date/DateStack'
import { StyledTableHeadCell } from '../../sdk/styledComponents/Tables'
import { useProjectDetails } from '../projectDetails/hooks'
import { ApproveConfirmationDialog, ApproveConfirmationDialogProps } from './components'
import { WorkReportStatusColor, WorkReportStatusLabel } from './constants'
import { useWorkReport } from './hooks'
import { WorkReportStatus } from './types'

export const WorkReportDetails = () => {
	const router = useRouter()
	const { projectDetails } = useProjectDetails()
	const { isLoading, workReportByIDResponse, approveWorkReport, disputeWorkReport, downloadWorkReport } =
		useWorkReport()
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
					<Stack direction='row'>
						<IconButton color='primary' onClick={router.back}>
							<ArrowBackIosNew />
						</IconButton>
						<DateStack date={workReportByIDResponse?.response?.date} />
						<Stack ml={2}>
							<Typography variant='h5' fontWeight={700}>
								Work Report
							</Typography>
							<Typography variant='caption' color='grey.600'>
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
					{workReportByIDResponse?.response?.status == WorkReportStatus.PENDING_APPROVAL && (
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
								placeholder='Tell us the heroes names and issues with their attendances. We willl raise a ticket and our customer support team will resolve it. '
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
					</form>
					<Stack direction='row' alignItems='center' justifyContent={isMobile ? 'space-between' : undefined}>
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
										<StyledTableHeadCell key={item.label as any} sx={item.sx}>
											<Typography noWrap fontWeight={600}>
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
											<Typography fontWeight={600} noWrap>
												{workReportByIDResponse?.response?.footerDetails?.presentPercentage} (
												{workReportByIDResponse?.response?.footerDetails?.totalPresent}/
												{workReportByIDResponse?.response?.footerDetails?.totalCount})
											</Typography>
											<Typography color='secondary.main' variant='caption' noWrap>
												Attendance %
											</Typography>
										</Stack>
									</TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell>
										<Typography fontWeight={600} noWrap>
											{workReportByIDResponse?.response?.footerDetails?.totalShiftHours}
										</Typography>
										<Typography color='secondary.main' variant='caption' noWrap>
											Total Hours
										</Typography>
									</TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell>
										<Typography fontWeight={600} noWrap>
											{workReportByIDResponse?.response?.footerDetails?.totalOtHours}
										</Typography>
										<Typography color='secondary.main' variant='caption' noWrap>
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
											<Avatar sx={{ width: 48, height: 48 }} src='/assets/icons/workerIcon.svg' />
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
											<Typography>{item?.name ?? 'NA'}</Typography>
											<Typography variant='caption' color='secondary.main'>
												{item?.phoneNumber ?? 'NA'}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography>{item?.jobType ?? 'NA'}</Typography>
										</TableCell>
										<TableCell>
											<Typography>{item?.skillType ?? 'NA'}</Typography>
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
											<Typography>{item?.checkIn ?? 'NA'}</Typography>
										</TableCell>
										<TableCell>
											<Typography>{item?.checkOut ?? 'NA'}</Typography>
										</TableCell>
										<TableCell>
											<Typography>{item?.shiftHours ?? 'NA'}</Typography>
										</TableCell>
										<TableCell>
											<Typography>{item?.otCheckIn ?? 'NA'}</Typography>
										</TableCell>
										<TableCell>
											<Typography>{item?.otCheckOut ?? 'NA'}</Typography>
										</TableCell>
										<TableCell>
											<Typography>{item?.otHours ?? 'NA'}</Typography>
										</TableCell>
									</TableRow>
								))}
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
	{ label: 'Attendance' },
	{ label: 'Check In' },
	{ label: 'Check Out' },
	{ label: 'Hours' },
	{ label: 'OT Check In' },
	{ label: 'OT Check Out' },
	{ label: 'OT Hours' },
]

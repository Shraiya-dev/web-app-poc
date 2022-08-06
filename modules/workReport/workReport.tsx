import { LoadingButton } from '@mui/lab'
import {
	alpha,
	Box,
	Button,
	Chip,
	Divider,
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
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format, parse } from 'date-fns'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { colors, primary, useMobile } from '../../sdk'
import { ButtonClicked } from '../../sdk/analytics/analyticsWrapper'
import { DateStack } from '../../sdk/components/date/DateStack'
import { StyledTableHeadCell } from '../../sdk/styledComponents/Tables'
import { ApproveConfirmationDialog, ApproveConfirmationDialogProps } from './components'
import { StatusFilterOptions, WorkReportStatusColor, WorkReportStatusLabel } from './constants'
import { useWorkReport } from './hooks'
import { WorkReportStatus } from './types'

export const WorkReport = () => {
	const { workReportResponse, isLoading, approveWorkReport, downloadWorkReport } = useWorkReport()
	const router = useRouter()
	const isMobile = useMobile()
	const handelStatusFilter = useCallback(
		(key: WorkReportStatus) => {
			let queryArr = (router.query.status as string)?.split(',') ?? []
			if (queryArr.includes(key)) {
				queryArr = queryArr.filter((item) => item !== key)
			} else {
				queryArr.push(key)
			}
			router.query.status = queryArr.join(',')
			if (router.query.status.length === 0) delete router.query.status
			router.replace(router)
		},
		[router]
	)
	const [approveConfirmationDialogProps, setApproveConfirmationDialogProps] =
		useState<ApproveConfirmationDialogProps>({
			open: false,
		})
	useEffect(() => {
		if (!router.isReady) return
		if (!router.query.fromDate || !router.query.toDate) {
			if (!router.query.fromDate) {
				router.query.fromDate = format(new Date().setDate(1), 'dd/MM/yy')
			}
			if (!router.query.toDate) {
				router.query.toDate = format(new Date(), 'dd/MM/yy')
			}
			router.replace(router)
		}
	}, [router])

	return (
		<>
			<ApproveConfirmationDialog {...approveConfirmationDialogProps} />
			<Stack>
				<Stack
					direction='row'
					py={1}
					spacing={1}
					alignItems='center'
					sx={{
						overflowX: 'auto',

						'&.scrollhost::-webkit-scrollbar': {
							display: 'none',
						},
						'&.scrollhost ::-moz-scrollbar ': {
							display: 'none',
						},

						'&.scrollhost': {
							overflow: 'auto',
							'-ms-overflow-style': 'none',
							scrollbarColor: 'transparent transparent' /*just hides the scrollbar for firefox */,
						},
						'&::-webkit-scrollbar': {
							display: 'none',
						},
					}}
				>
					{StatusFilterOptions.map((item) => (
						<Chip
							key={item.value}
							variant={'outlined'}
							clickable
							onClick={() => {
								handelStatusFilter(item.value)
							}}
							onDelete={
								(router.query.status as string)?.split(',').includes(item.value)
									? () => {
											handelStatusFilter(item.value)
									  }
									: undefined
							}
							color={
								(router.query.status as string)?.split(',').includes(item.value)
									? 'primary'
									: 'secondary'
							}
							sx={{ borderRadius: 2 }}
							label={`${item.label} ${
								workReportResponse?.response?.dwrSummary[item.value] &&
								item.value !== WorkReportStatus.APPROVED
									? '(' + workReportResponse?.response?.dwrSummary[item.value] + ')'
									: ''
							}`}
						/>
					))}
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
							disableFuture
							// components={{}}
							label='From date'
							inputFormat='dd/MM/yy'
							mask='__/__/__'
							value={
								(router.query.fromDate as string)
									? parse(router.query.fromDate as string, 'dd/MM/yy', new Date())
									: new Date().setDate(1)
							}
							onChange={async (date: Date | null) => {
								date && (router.query.fromDate = format(date, 'dd/MM/yy'))
								await router.replace(router)
							}}
							renderInput={({ inputProps, ...params }) => (
								<TextField
									sx={{ minHeight: 0, minWidth: 150, maxWidth: 150 }}
									size='small'
									{...params}
									inputProps={{
										...inputProps,
										sx: {
											py: 0.6,
										},
									}}
									style={{
										background: '#2e2e2e',
									}}
								/>
							)}
							PaperProps={{
								sx: {
									'& .MuiCalendarPicker-root': {
										background: '#fff',
									},
									'& .css-1u04tdt': {
										color: '#000',
									},
									'& .MuiButtonBase-root': {
										color: '#000',
									},
									'& .MuiSvgIcon-root': {
										color: '#000',
									},
								},
							}}
						/>
						<DesktopDatePicker
							disableFuture
							label='To date'
							inputFormat='dd/MM/yy'
							mask='__/__/__'
							minDate={
								(router.query.fromDate as string)
									? parse(router.query.fromDate as string, 'dd/MM/yy', new Date())
									: new Date()
							}
							value={
								(router.query.toDate as string)
									? parse(router.query.toDate as string, 'dd/MM/yy', new Date())
									: new Date()
							}
							onChange={async (date: Date | null) => {
								date && (router.query.toDate = format(date, 'dd/MM/yy'))
								await router.replace(router)
							}}
							renderInput={({ inputProps, ...params }) => (
								<TextField
									sx={{ minHeight: 0, minWidth: 150, maxWidth: 150 }}
									size='small'
									{...params}
									inputProps={{
										...inputProps,
										sx: {
											py: 0.6,
										},
									}}
									style={{
										background: '#2e2e2e',
									}}
								/>
							)}
							PaperProps={{
								sx: {
									'& .MuiCalendarPicker-root': {
										background: '#fff',
									},
									'& .css-1u04tdt': {
										color: '#000',
									},
									'& .MuiButtonBase-root': {
										color: '#000',
									},
									'& .MuiSvgIcon-root': {
										color: '#000',
									},
								},
							}}
						/>
					</LocalizationProvider>
					<Button
						size='small'
						variant='outlined'
						onClick={() => {
							router.replace(router.asPath.split('?')[0])
						}}
					>
						clear
					</Button>
				</Stack>
				<Stack mt={2}>
					{!isMobile ? (
						<TableContainer component={Paper} sx={{ height: 'calc(100vh - 230px)' }}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										{TableHeaderList.map((item, index) => (
											<StyledTableHeadCell
												key={String(item.label)}
												sx={item.sx}
												style={{
													background: '#fffCF1',
												}}
											>
												<Typography noWrap fontWeight={600} sx={{ color: '#000' }}>
													{item.label}
												</Typography>
											</StyledTableHeadCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody sx={{ overflowY: 'auto' }}>
									{workReportResponse?.response?.dwrDetails?.map((item) => (
										<TableRow
											key={item?.dwrId}
											sx={{
												cursor: 'pointer',
												'&:hover': {
													backgroundColor: colors.AliceBlue,
												},
											}}
											onClick={() => {
												router.push(
													`/projects/${router.query.projectId}/attendance/${item?._id}`
												)
											}}
										>
											<TableCell
												sx={{
													position: 'sticky',
													left: 0,
													// backgroundColor: '#ffffff',
													width: 80,
													'&:hover': {
														backgroundColor: colors.AliceBlue,
													},
												}}
											>
												<DateStack date={item?.date} />
											</TableCell>
											<TableCell>
												<Stack>
													<Typography
														color='secondary.main'
														variant='body1'
														sx={{ color: '#000' }}
													>
														{item?.presentPercentage ?? 'NA'}
													</Typography>

													<Typography
														variant='body2'
														color={`grey.600`}
														sx={{ color: primary.darkGrey }}
													>
														{item?.totalPresent ?? 'NA'} / {item?.totalCount ?? 'NA'}
													</Typography>
												</Stack>
											</TableCell>
											<TableCell>
												<Typography color='secondary.main' sx={{ color: '#000' }}>
													{item?.avgShiftHours ?? 'NA'}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography color='secondary.main' sx={{ color: '#000' }}>
													{item?.totalOtHours ?? 'NA'}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography color='secondary.main' sx={{ color: '#000' }}>
													{item?.avgOTHours ?? 'NA'}
												</Typography>
											</TableCell>
											<TableCell>
												<Chip
													size='small'
													variant='filled'
													sx={(theme) => ({
														px: 1,
														backgroundColor: alpha(
															WorkReportStatusColor[
																item?.status ?? WorkReportStatus.DRAFT
															],
															0.2
														),
														// color: '#000'
														fontSize: '12px',
														fontWeight: '500',
													})}
													label={WorkReportStatusLabel[item?.status]}
												/>
											</TableCell>
											<TableCell sx={{ maxWidth: 150, zIndex: 1000 }}>
												<Stack direction='row' spacing={1} justifyContent='flex-end'>
													{item.status === WorkReportStatus.PENDING_APPROVAL && (
														<LoadingButton
															variant='contained'
															loading={isLoading.approving[item.dwrId]}
															size={'small'}
															onClick={(e) => {
																e.stopPropagation()
																ButtonClicked({
																	action: 'Approve Daily Work Report',
																	page: 'Work report List',
																	url: router.asPath,
																})

																setApproveConfirmationDialogProps({
																	open: true,
																	confirm: () => {
																		approveWorkReport(item.dwrId)
																		setApproveConfirmationDialogProps({
																			open: false,
																		})
																	},
																	cancel: () => {
																		setApproveConfirmationDialogProps({
																			open: false,
																		})
																	},
																	date: item.date,
																})
															}}
														>
															Approve
														</LoadingButton>
													)}
													<LoadingButton
														loading={isLoading.downloading[item.dwrId]}
														size={'small'}
														onClick={(e) => {
															ButtonClicked({
																action: 'Download Daily Work Report',
																page: 'Work report List',
																url: router.asPath,
															})
															e.stopPropagation()
															downloadWorkReport(item.dwrId, item.date)
														}}
													>
														<img
															width={'100%'}
															height={'100%'}
															src={'/assets/icons/buttonDownload.svg'}
															alt=''
														/>
													</LoadingButton>
												</Stack>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					) : (
						<Box>
							{workReportResponse?.response?.dwrDetails?.map((item) => {
								return (
									<>
										<Box
											key={item?.dwrId}
											onClick={() => {
												router.push(
													`/projects/${router.query.projectId}/attendance/${item?._id}`
												)
											}}
											sx={{
												background: '#fff',
												width: '100%',
												marginTop: '24px',
											}}
										>
											{/* card header  */}
											<Stack direction={'row'} justifyContent={'space-between'} px={1.5}>
												<Stack direction={'row'} spacing={2}>
													<DateStack date={item?.date} />
													<Stack direction={'column'}>
														<Stack direction={'row'} alignItems={'center'} spacing={0.6}>
															<Typography
																color='#000'
																fontWeight={600}
																variant='subtitle2'
															>
																{item?.presentPercentage ?? 'NA'}
															</Typography>
															<Typography
																variant='subtitle2'
																color={`grey.600`}
																sx={{ fontSize: '11px' }}
															>
																({item?.totalPresent ?? 'NA'} /{' '}
																{item?.totalCount ?? 'NA'})
															</Typography>
														</Stack>

														<Typography
															color='secondary.main'
															variant='subtitle2'
															fontSize={'11px'}
															fontWeight={400}
														>
															Attendance %
														</Typography>
													</Stack>
												</Stack>
												<Stack direction={'row'}>
													<Chip
														size='small'
														variant='filled'
														sx={(theme) => ({
															px: 1,
															backgroundColor: alpha(
																WorkReportStatusColor[
																	item?.status ?? WorkReportStatus.DRAFT
																],
																0.2
															),
															fontSize: '11px',
															fontWeight: '500',
														})}
														label={WorkReportStatusLabel[item?.status]}
													/>
												</Stack>
											</Stack>
											{/* card center  */}
											<Box
												sx={{
													margin: '12px 0',
												}}
											>
												<Stack
													direction={'row'}
													justifyContent={'space-between'}
													sx={{
														borderRadius: '8px',
														background: '#F9F9F9',
														p: '8px',
													}}
												>
													<Stack direction={'column'} spacing={0.5}>
														<Typography
															variant='subtitle2'
															sx={{ fontSize: '10px', color: '#061F48B2' }}
														>
															Avg Shift Duration
														</Typography>
														<Typography
															variant='subtitle2'
															sx={{ fontSize: '12px', color: '#000000' }}
														>
															{item?.avgShiftHours ?? 'NA'}
														</Typography>
													</Stack>
													<Stack direction={'column'} spacing={0.5}>
														<Typography
															variant='subtitle2'
															sx={{ fontSize: '10px', color: '#061F48B2' }}
														>
															Total OT
														</Typography>
														<Typography
															variant='subtitle2'
															sx={{ fontSize: '12px', color: '#000000' }}
														>
															{item?.totalOtHours ?? 'NA'}
														</Typography>
													</Stack>
													<Stack direction={'column'} spacing={0.5}>
														<Typography
															variant='subtitle2'
															sx={{ fontSize: '10px', color: '#061F48B2' }}
														>
															Avg OT
														</Typography>
														<Typography
															variant='subtitle2'
															sx={{ fontSize: '12px', color: '#000000' }}
														>
															{item?.avgOTHours ?? 'NA'}
														</Typography>
													</Stack>
												</Stack>
											</Box>
											<Stack
												direction='row'
												spacing={1}
												justifyContent='space-between'
												sx={{
													marginBottom: '15px',
												}}
											>
												{item.status === WorkReportStatus.PENDING_APPROVAL ? (
													<LoadingButton
														variant='contained'
														loading={isLoading.approving[item.dwrId]}
														size={'small'}
														onClick={(e) => {
															e.stopPropagation()
															ButtonClicked({
																action: 'Approve Daily Work Report',
																page: 'Work report List',
																url: router.asPath,
															})

															setApproveConfirmationDialogProps({
																open: true,
																confirm: () => {
																	approveWorkReport(item.dwrId)
																	setApproveConfirmationDialogProps({
																		open: false,
																	})
																},
																cancel: () => {
																	setApproveConfirmationDialogProps({
																		open: false,
																	})
																},
																date: item.date,
															})
														}}
													>
														Approve
													</LoadingButton>
												) : (
													<div></div>
												)}
												<LoadingButton
													loading={isLoading.downloading[item.dwrId]}
													size={'small'}
													onClick={(e) => {
														ButtonClicked({
															action: 'Download Daily Work Report',
															page: 'Work report List',
															url: router.asPath,
														})
														e.stopPropagation()
														downloadWorkReport(item.dwrId, item.date)
													}}
												>
													<img
														width={'100%'}
														height={'100%'}
														src={'/assets/icons/buttonDownload.svg'}
														alt=''
													/>
												</LoadingButton>
											</Stack>
										</Box>

										<Divider />
									</>
								)
							})}
						</Box>
					)}
				</Stack>
			</Stack>
		</>
	)
}

const TableHeaderList: { label: String; sx?: any }[] = [
	{
		label: 'Day',
		sx: { position: 'sticky', left: '0 !important', top: 0, background: '#f2f9fb', zIndex: 10 },
	},
	{ label: 'Attendance' },
	{ label: 'Average Shift Duration' },
	{ label: 'Total OT' },
	{ label: 'Average OT' },
	{ label: 'Status' },
	{ label: '' },
]

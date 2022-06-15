import { FileDownloadOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
	alpha,
	Button,
	Chip,
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
import { colors } from '../../sdk'
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
				<Stack direction='row' py={1} spacing={1} alignItems='center' sx={{ overflowX: 'auto' }}>
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
								/>
							)}
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
								/>
							)}
						/>
					</LocalizationProvider>
					<Button
						size='small'
						variant='outlined'
						onClick={() => {
							router.replace(router.asPath.split('?')[0])
						}}>
						clear
					</Button>
				</Stack>
				<Stack mt={2}>
					<TableContainer component={Paper} sx={{ height: 'calc(100vh - 300px)' }}>
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
											router.push(`/projects/${router.query.projectId}/attendance/${item?._id}`)
										}}>
										<TableCell
											sx={{
												position: 'sticky',
												left: 0,
												backgroundColor: '#ffffff',
												width: 80,
												'&:hover': {
													backgroundColor: colors.AliceBlue,
												},
											}}>
											<DateStack date={item?.date} />
										</TableCell>
										<TableCell>
											<Stack>
												<Typography color='secondary.main' variant='body1'>
													{item?.presentPercentage ?? 'NA'}
												</Typography>

												<Typography variant='body2' color={`grey.600`}>
													{item?.totalPresent ?? 'NA'} / {item?.totalCount ?? 'NA'}
												</Typography>
											</Stack>
										</TableCell>
										<TableCell>
											<Typography color='secondary.main'>
												{item?.avgShiftHours ?? 'NA'}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography color='secondary.main'>{item?.totalOtHours ?? 'NA'}</Typography>
										</TableCell>
										<TableCell>
											<Typography color='secondary.main'>{item?.avgOTHours ?? 'NA'}</Typography>
										</TableCell>
										<TableCell>
											<Chip
												size='small'
												variant='filled'
												sx={(theme) => ({
													px: 1,
													backgroundColor: alpha(
														WorkReportStatusColor[item?.status ?? WorkReportStatus.DRAFT],
														0.2
													),
												})}
												label={WorkReportStatusLabel[item?.status]}
											/>
										</TableCell>
										<TableCell sx={{ maxWidth: 150, zIndex: 1000 }}>
											<Stack direction='row' spacing={1} justifyContent='flex-end'>
												{item.status === WorkReportStatus.PENDING_APPROVAL && (
													<LoadingButton
														variant='contained'
														loading={isLoading.approving}
														size={'small'}
														onClick={(e) => {
															ButtonClicked({
																action: 'Approve Daily Work Report',
																page: 'Work report List',
																url: router.asPath,
															})
															e.stopPropagation()

															setApproveConfirmationDialogProps({
																open: true,
																confirm: () => {
																	approveWorkReport(item.dwrId)
																	setApproveConfirmationDialogProps({ open: false })
																},
																cancel: () => {
																	setApproveConfirmationDialogProps({ open: false })
																},
																date: item.date,
															})
														}}>
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
													}}>
													<FileDownloadOutlined />
												</LoadingButton>
											</Stack>
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

import {
	Box,
	Button,
	CircularProgress,
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
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ButtonClicked } from 'sdk/analytics/analyticsWrapper'
import { colors, PaginationWithHasMore, primary, useMobile } from '../../sdk'
import { DateStack } from '../../sdk/components/date/DateStack'
import { StyledTableHeadCell } from '../../sdk/styledComponents/Tables'
import { ApproveConfirmationDialog, ApproveConfirmationDialogProps } from './components'
import { useBill } from './hooks'
import { LastOutstandingPaymentCard } from './payments/components/LastOutstandingPaymentCard'
import { OutstandiongPaymentCard } from './payments/components/OutstandingPaymentCard'

export const Bills = () => {
	const { billResponse, isLoading, approveWorkReport, downloadWorkReport } = useBill()
	const router = useRouter()
	//Enable when we need status filters
	// const handelStatusFilter = useCallback(
	// 	(key: WorkReportStatus) => {
	// 		let queryArr = (router.query.status as string)?.split(',') ?? []
	// 		if (queryArr.includes(key)) {
	// 			queryArr = queryArr.filter((item) => item !== key)
	// 		} else {
	// 			queryArr.push(key)
	// 		}
	// 		router.query.status = queryArr.join(',')
	// 		if (router.query.status.length === 0) delete router.query.status
	// 		router.replace(router)
	// 	},
	// 	[router]
	// )
	const [approveConfirmationDialogProps, setApproveConfirmationDialogProps] =
		useState<ApproveConfirmationDialogProps>({
			open: false,
		})
	useEffect(() => {
		if (!router.isReady) return
		if (!router.query.startDate || !router.query.endDate) {
			if (!router.query.startDate) {
				router.query.startDate = format(new Date().setDate(1), 'dd/MM/yy')
			}
			if (!router.query.endDate) {
				router.query.endDate = format(new Date(), 'dd/MM/yy')
			}
			router.replace(router)
		}
	}, [router])
	const isMobile = useMobile()
	return (
		<>
			<ApproveConfirmationDialog {...approveConfirmationDialogProps} />

			{!isMobile ? (
				<Stack spacing={3}>
					<Stack direction={isMobile ? 'column' : 'row'} spacing={3}>
						<OutstandiongPaymentCard tooltipTitle='Net amount you owe based on bills raised and past payments made' />
						<LastOutstandingPaymentCard />
					</Stack>
					<Stack direction={isMobile ? 'column' : 'row'} justifyContent='space-between'>
						<Stack direction='row' py={1} spacing={1} alignItems='center' sx={{ overflowX: 'auto' }}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DesktopDatePicker
									disableFuture
									// label='From date'
									inputFormat='dd/MM/yy'
									mask='__/__/__'
									value={
										(router.query.startDate as string)
											? parse(router.query.startDate as string, 'dd/MM/yy', new Date())
											: new Date().setDate(1)
									}
									onChange={async (date: Date | null) => {
										date && (router.query.startDate = format(date, 'dd/MM/yy'))
										await router.replace(router)
									}}
									renderInput={({ inputProps, ...params }) => (
										<TextField
											sx={{
												minHeight: 0,
												minWidth: 150,
												maxWidth: 150,
											}}
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
									// label='To date'
									inputFormat='dd/MM/yy'
									mask='__/__/__'
									minDate={
										(router.query.startDate as string)
											? parse(router.query.startDate as string, 'dd/MM/yy', new Date())
											: new Date()
									}
									value={
										(router.query.endDate as string)
											? parse(router.query.endDate as string, 'dd/MM/yy', new Date())
											: new Date()
									}
									onChange={async (date: Date | null) => {
										date && (router.query.endDate = format(date, 'dd/MM/yy'))
										await router.replace(router)
									}}
									renderInput={({ inputProps, ...params }) => (
										<TextField
											sx={{
												minHeight: 0,
												minWidth: 150,
												maxWidth: 150,
											}}
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
								}}>
								clear
							</Button>
						</Stack>
						<Stack
							direction='row'
							alignItems='center'
							justifyContent={isMobile ? 'space-between' : undefined}>
							<Typography variant='subtitle2'>
								Rows per page: {billResponse?.aggregatedBills?.length ?? 0}
							</Typography>
							<PaginationWithHasMore hasMore={billResponse?.hasMore} loading={isLoading?.fetching} />
						</Stack>
					</Stack>
					<Stack>
						<TableContainer component={Paper} sx={{ height: 'calc(100vh - 425px)' }}>
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
												<Typography noWrap fontWeight={600} sx={{ color: '#000' }}>
													{item.label}
												</Typography>
											</StyledTableHeadCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody sx={{ overflowY: 'auto' }}>
									{isLoading?.fetching ? (
										<TableRow sx={{ height: '' }}>
											<TableCell sx={{ borderBottom: 'none' }} colSpan={100} align='center'>
												<CircularProgress />
											</TableCell>
										</TableRow>
									) : (
										billResponse?.aggregatedBills?.map((item) => (
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
														`/projects/${router.query.projectId}/bills/billId/${item?.aggregationDate}`
													)
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
													<DateStack date={item?.displayDate} />
												</TableCell>
												<TableCell sx={{ background: '#fff' }}>
													<Stack>
														<Typography color='success.main' fontWeight={600}>
															{item?.totalPayable ?? 'NA'}
														</Typography>
													</Stack>
												</TableCell>
												<TableCell sx={{ background: '#fff' }}>
													<Typography sx={{ color: '#000' }}>
														{item?.heroCount ?? 'NA'}
													</Typography>
												</TableCell>
												<TableCell sx={{ background: '#fff' }}>
													<Typography sx={{ color: '#000' }}>
														{item?.baseWage ?? 'NA'}
													</Typography>
												</TableCell>
												<TableCell sx={{ background: '#fff' }}>
													<Typography sx={{ color: '#000' }}>
														{item?.otWage ?? 'NA'}
													</Typography>
												</TableCell>
												<TableCell sx={{ background: '#fff' }}>
													<Typography sx={{ color: '#000' }}>
														{item?.grossWage ?? 'NA'}
													</Typography>
												</TableCell>
												<TableCell sx={{ background: '#fff' }}>
													<Typography sx={{ color: '#000' }}>{item?.pf ?? 'NA'}</Typography>
												</TableCell>
												<TableCell sx={{ background: '#fff' }}>
													<Typography sx={{ color: '#000' }}>{item?.esi ?? 'NA'}</Typography>
												</TableCell>
												<TableCell sx={{ background: '#fff' }}>
													{item?.dwrId ? (
														<Link
															href={`/projects/${router.query.projectId}/work-report/${item?.dwrId}`}
															passHref>
															<a
																onClick={(e) => {
																	ButtonClicked({
																		action: 'View Work report from bill',
																		page: document.title,
																		url: router.asPath,
																	})
																	e.stopPropagation()
																}}>
																<Image
																	src={'/assets/icons/reportIcon.svg'}
																	alt={'DWR report'}
																	height={32}
																	width={32}
																/>
															</a>
														</Link>
													) : (
														<Image
															style={{ cursor: item?.dwrId ? 'not-allowed' : '' }}
															src={'/assets/icons/reportIconsDisabled.svg'}
															alt={'DWR report'}
															height={32}
															width={32}
														/>
													)}
													{/* <LoadingButton
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
												</LoadingButton> */}
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Stack>
				</Stack>
			) : (
				<>
					<Stack
						direction={'row'}
						spacing={1}
						sx={{
							overflowX: 'scroll',
							background: ' #FDFCFA',
							'&::-webkit-scrollbar': {
								display: 'none',
							},
						}}>
						<Box
							sx={{
								width: '80%',
								padding: '10px 20px',
							}}>
							<OutstandiongPaymentCard tooltipTitle='Net amount you owe based on bills raised and past payments made' />
						</Box>
						<Box
							sx={{
								width: '80%',
								padding: '10px 20px',
							}}>
							<LastOutstandingPaymentCard />
						</Box>
					</Stack>
					<Stack
						direction='row'
						py={1}
						spacing={1}
						alignItems='center'
						sx={{
							overflowX: 'auto',
							'&::-webkit-scrollbar': {
								display: 'none',
							},
						}}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								disableFuture
								label='From date'
								inputFormat='dd/MM/yy'
								mask='__/__/__'
								value={
									(router.query.startDate as string)
										? parse(router.query.startDate as string, 'dd/MM/yy', new Date())
										: new Date().setDate(1)
								}
								onChange={async (date: Date | null) => {
									date && (router.query.startDate = format(date, 'dd/MM/yy'))
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
									(router.query.startDate as string)
										? parse(router.query.startDate as string, 'dd/MM/yy', new Date())
										: new Date()
								}
								value={
									(router.query.endDate as string)
										? parse(router.query.endDate as string, 'dd/MM/yy', new Date())
										: new Date()
								}
								onChange={async (date: Date | null) => {
									date && (router.query.endDate = format(date, 'dd/MM/yy'))
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
							}}>
							clear
						</Button>
					</Stack>
					{isLoading?.fetching ? (
						<TableCell sx={{ borderBottom: 'none' }} colSpan={100} align='center'>
							<CircularProgress />
						</TableCell>
					) : (
						billResponse?.aggregatedBills?.map((item) => {
							return (
								<>
									<Stack
										direction={'column'}
										key={item?.dwrId}
										px={'8px'}
										pb={'15px'}
										onClick={() => {
											router.push(
												`/projects/${router.query.projectId}/bills/billId/${item?.aggregationDate}`
											)
										}}>
										<Stack direction={'row'} p={'16px 8px'} justifyContent={'space-between'}>
											<Stack direction={'row'} spacing={1.5}>
												<DateStack date={item?.displayDate} />
												<Stack direction={'column'}>
													<Typography noWrap sx={{ fontSize: '14px', fontWeight: '700' }}>
														{item?.totalPayable ?? 'NA'}
													</Typography>
													<Typography noWrap variant='caption' sx={{ fontWeight: '400' }}>
														Total Payable
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
														color={primary.properDark}
														variant='caption'
														noWrap>
														{item?.baseWage ?? 'NA'}
													</Typography>
												</Stack>
												<Stack direction={'row'} alignItems={'center'} spacing={2}>
													<Typography
														color={primary.properDark}
														fontWeight={400}
														variant='caption'
														noWrap>
														ProjectHeroes
													</Typography>
													<Typography color='#000' fontWeight={400} variant='caption' noWrap>
														{item?.heroCount ?? 'NA'}
													</Typography>
												</Stack>
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
													color={primary.properDark}
													fontWeight={400}
													variant='caption'
													noWrap>
													{item?.otWage ?? 'NA'}
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
													color={primary.properDark}
													fontWeight={400}
													variant='caption'
													noWrap>
													{item?.grossWage ?? 'NA'}
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
													color={primary.properDark}
													fontWeight={400}
													variant='caption'
													noWrap>
													{item?.pf ?? 'NA'}
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
													color={primary.properDark}
													fontWeight={400}
													variant='caption'
													noWrap>
													{' '}
													{item?.esi ?? 'NA'}
												</Typography>
											</Stack>
										</Box>
										<Stack
											direction={'row'}
											justifyContent={'flex-end'}
											alignItems={'center'}
											mt={2}>
											{item?.dwrId ? (
												<Link
													href={`/projects/${router.query.projectId}/work-report/${item?.dwrId}`}
													passHref>
													<a
														onClick={(e) => {
															ButtonClicked({
																action: 'View Work report from bill',
																page: document.title,
																url: router.asPath,
															})
															e.stopPropagation()
														}}>
														<Image
															src={'/assets/icons/reportIcon.svg'}
															alt={'DWR report'}
															height={20}
															width={20}
														/>
													</a>
												</Link>
											) : (
												<Image
													style={{ cursor: item?.dwrId ? 'not-allowed' : '' }}
													src={'/assets/icons/reportIconsDisabled.svg'}
													alt={'DWR report'}
													height={20}
													width={20}
												/>
											)}
											{/* <LoadingButton
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
											</LoadingButton> */}
										</Stack>
									</Stack>
									<Divider />
								</>
							)
						})
					)}
				</>
			)}
		</>
	)
}

const TableHeaderList: { label: String; sx?: any }[] = [
	{
		label: 'Day',
		sx: { position: 'sticky', left: '0 !important', top: 0, background: '#f2f9fb', zIndex: 10 },
	},
	{ label: 'Total Payable' },
	{ label: 'ProjectHeroes' },
	{ label: 'Base Wage' },
	{ label: 'OT Wage' },
	{ label: 'Gross Wage' },
	{ label: 'PF' },
	{ label: 'ESI' },
	{ label: 'Work Report' },
]

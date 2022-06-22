import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material'
import { alpha, Button, Paper, Skeleton, Stack, Tooltip, TooltipProps, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetOuststandingPaymentQuery } from '../queries/hooks'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import { OutstandingPaymentPopover } from './OutstandingPaymentPopover'
import { indianCurrencyFormat } from '../../../../sdk'

const CustomPaper = styled(Paper)(({ theme }) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	overflow: 'hidden',
	padding: theme.spacing(2),
	'.cardHeader': {
		flex: 1,
		backgroundColor: theme.palette.common.white,
	},
	'.cardBody': {
		flex: 1,
		flexDirection: 'column',
		padding: theme.spacing(2),
		button: {
			borderRadius: 4,
			borderColor: theme.palette.grey[300],
			color: theme.palette.common.black,
			justifyContent: 'space-between',
			margin: `${theme.spacing(1)} 0`,
			'&.selected': {
				backgroundColor: alpha(theme.palette.primary.main, 0.05),
				borderColor: theme.palette.primary.main,
				color: theme.palette.primary.main,
			},
		},
		[theme.breakpoints.down('md')]: {
			flex: 1,
			flexDirection: 'row',
			button: {
				flex: 1,
				padding: theme.spacing(1),
				margin: `0 ${theme.spacing(1)}`,
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'space-between',
			},
		},
	},
}))
export const OutstandiongPaymentCard = ({ tooltipTitle }: { tooltipTitle: TooltipProps['title'] }) => {
	const router = useRouter()
	const theme = useTheme()
	const projectId = router.query.projectId as string
	const outStandingPaymentData = useGetOuststandingPaymentQuery(projectId)
	const [showPopover, setShowPopver] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const showPaymentPopover = () => {
		setShowPopver(true)
	}
	const hidePaymentPopover = () => {
		setShowPopver(false)
	}
	return (
		<>
			{outStandingPaymentData.isLoading ? (
				<Skeleton width={399} height={128}>
					<Stack>
						<Typography>
							<Skeleton />
						</Typography>
					</Stack>
				</Skeleton>
			) : (
				<CustomPaper elevation={1} sx={{ maxWidth: 400 }}>
					<Stack direction='row' justifyContent='space-between' flex={1}>
						<Stack flex={1}>
							<Stack flex={1}>
								<Stack className='cardHeader' direction='row' alignItems='center'>
									<Typography variant='subtitle2'>Total Outstanding</Typography>
									<Tooltip
										title={tooltipTitle}
										sx={{ background: theme.palette.base.variant70 }}
										placement='top'
										componentsProps={{
											tooltip: {
												sx: {
													backgroundColor: theme.palette.base.variant70,
												},
											},
										}}>
										<HelpOutlineIcon
											sx={{ fontSize: 16, cursor: 'pointer', marginLeft: theme.spacing(1) }}
										/>
									</Tooltip>
								</Stack>
								<Stack direction='row' alignItems='center'>
									<CurrencyRupeeIcon
										sx={{
											fontSize: '2.25rem',
											fontWeight: theme.typography.fontWeightBold,
											cursor: 'pointer',
											marginTop: theme.spacing(1),
											marginBottom: theme.spacing(1),
											fill: theme.palette.green.dark,
										}}
									/>
									<Typography
										variant='h4'
										sx={{ fontSize: '2.25rem', color: theme.palette.green.dark }}>
										{indianCurrencyFormat(outStandingPaymentData.data.payload.amount)}
									</Typography>
								</Stack>
							</Stack>
							<Typography variant='body2' sx={{ fontSize: '13px', color: theme.palette.base.variant60 }}>
								{outStandingPaymentData.data.payload.amount >= 0
									? 'Pay full or custom amount'
									: 'It will be adjusted in future bills'}
							</Typography>
						</Stack>
						<OutstandingPaymentPopover
							payAmount={outStandingPaymentData.data.payload.amount}
							open={showPopover}
							hideModal={hidePaymentPopover}
						/>
						<Stack alignSelf='flex-end'>
							<Button
								variant='contained'
								size='medium'
								//disabled={outStandingPaymentData.data.payload.amount===0}
								sx={{
									background: theme.palette.button.secondary,
									paddingTop: theme.spacing(2),
									paddingBottom: theme.spacing(2),
									paddingLeft: theme.spacing(3),
									paddingRight: theme.spacing(3),
									borderRadius: '72px',
									maxHeight: '3rem',
								}}
								onClick={showPaymentPopover}>
								<Typography variant='subtitle2' sx={{ color: theme.palette.textCTA.white }}>
									Pay
								</Typography>
							</Button>
						</Stack>
					</Stack>
				</CustomPaper>
			)}
		</>
	)
}

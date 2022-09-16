import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import { alpha, Paper, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import React from 'react'
import { indianCurrencyFormat, useMobile } from '../../../../sdk'

import { useGetPaymentsHistoryListQuery } from '../queries/hooks'

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
export const LastOutstandingPaymentCard = () => {
	const router = useRouter()
	const theme = useTheme()
	const isMobile = useMobile()
	const projectId = router.query.projectId as string
	const lastOutStandingPaymentData = useGetPaymentsHistoryListQuery(projectId)
	return (
		<>
			{lastOutStandingPaymentData.isLoading ? (
				<Skeleton width={399} height={128}>
					<Stack>
						<Typography>
							<Skeleton />
						</Typography>
					</Stack>
				</Skeleton>
			) : (
				<CustomPaper
					elevation={isMobile ? 5 : 1}
					sx={{ minWidth: 300, maxWidth: 400, maxHeight: '144px', background: '#fff' }}>
					<Stack>
						<Stack
							className='cardHeader'
							direction='row'
							alignItems='center'
							// style={{
							// 	background: theme.palette.background.paper,
							// }}
						>
							<Typography
								fontFamily={'Saira,sans-serif'}
								fontWeight={700}
								variant='subtitle1'
								sx={{ color: '#000' }}>
								Last Payment
							</Typography>
						</Stack>
						<Stack direction='row' alignItems='center'>
							{lastOutStandingPaymentData.data.response.length > 0 && (
								<CurrencyRupeeIcon
									sx={{
										fontSize: '2.25rem',
										fontWeight: theme.typography.fontWeightBold,
										cursor: 'pointer',
										marginTop: theme.spacing(1),
										marginBottom: theme.spacing(1),
										fill: theme.palette.base.variant50,
									}}
								/>
							)}
							<Typography
								fontFamily={'Saira,sans-serif'}
								fontWeight={700}
								variant='h2'
								sx={{ fontSize: '2.25rem', color: theme.palette.base.variant50 }}>
								{lastOutStandingPaymentData.data.response.length > 0
									? indianCurrencyFormat(
											lastOutStandingPaymentData.data.response[0].totalPaymentAmount
									  )
									: '-'}
							</Typography>
						</Stack>
						{lastOutStandingPaymentData.data.response.length > 0 && (
							<Typography
								fontFamily={'Karla,sans-serif'}
								fontWeight={500}
								variant='caption'
								sx={{
									color: theme.palette.base.variant50,
									fontWeight: theme.typography.fontWeightBold,
								}}>
								Transaction ID: {lastOutStandingPaymentData.data.response[0].paymentId}
							</Typography>
						)}
						{lastOutStandingPaymentData.data.response.length > 0 && (
							<Typography
								fontFamily={'Karla,sans-serif'}
								fontWeight={500}
								variant='caption'
								sx={{
									color: theme.palette.base.variant50,
									fontWeight: theme.typography.fontWeightBold,
								}}>
								{lastOutStandingPaymentData.data.response[0].transactionTime}
							</Typography>
						)}
					</Stack>
					{/* {lastOutStandingPaymentData.data.response.length > 0 && (
						<Stack alignSelf='flex-start' justifySelf='flex-start'>
							<Button
								variant='text'
								size='medium'
								//disabled={outStandingPaymentData.data.payload.amount===0}
								//onClick={showPaymentPopover}
							>
								<Typography
									variant='subtitle2'
									sx={{
										color: theme.palette.button.secondary,
										fontSize: '14px',
										fontWeight: theme.typography.fontWeightBold,
									}}>
									View More
								</Typography>
							</Button>
						</Stack>
					)} */}
				</CustomPaper>
			)}
		</>
	)
}

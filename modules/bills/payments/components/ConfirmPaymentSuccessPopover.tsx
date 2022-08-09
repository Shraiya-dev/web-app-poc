import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import {
	alpha,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Divider,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ButtonClicked } from 'sdk/analytics/analyticsWrapper'

//const Razorpay = require('razorpay')
//window.Razorpay = Razorpay
const CustomDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		minWidth: '400px',
		padding: theme.spacing(3),

		[theme.breakpoints.down('md')]: {
			minWidth: '400px',
		},
	},
	'& .MuiDialogContent-root': {
		padding: 0,
	},
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
	},
}))

export const ConfirmPaymentSuccessPopover = ({
	open,
	paymentId,
	totalPaymentAmount,
	transactionTime,
	onClose,
	callback,
}: {
	open: boolean
	paymentId: string
	totalPaymentAmount: number
	transactionTime: string
	callback: any
	onClose: () => void
}) => {
	const router = useRouter()
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

	return (
		<CustomDialog fullScreen={fullScreen} open={open} onClose={onClose}>
			<DialogContent>
				<Stack direction='column' alignItems='center' justifyContent='flex-start'>
					<CheckCircleIcon
						sx={{
							fontSize: '3.75rem',
							cursor: 'pointer',
							fill: theme.palette.green.iconBg,
							marginTop: '6px',
							marginBottom: '1.25rem',
						}}
					/>
					<Typography
						variant='h6'
						sx={{ color: theme.palette.green.dark, marginBottom: '1rem', fontWeight: 700 }}>
						Payment Successful!
					</Typography>
					<Typography
						variant='subtitle1'
						sx={{ color: theme.palette.base.variant70, fontWeight: theme.typography.fontWeightBold }}>
						Transaction Number
					</Typography>
					<Typography variant='subtitle2' sx={{ color: theme.palette.base.variant70, marginBottom: '1rem' }}>
						{paymentId}
					</Typography>
					<Divider flexItem></Divider>
					<Typography
						variant='subtitle1'
						sx={{
							color: theme.palette.base.variant70,
							fontWeight: theme.typography.fontWeightBold,
							marginTop: '1rem',
						}}>
						Amount
					</Typography>
					<Stack sx={{ width: '100%' }} direction='row' justifyContent='center' alignItems='center'>
						<CurrencyRupeeIcon
							sx={{
								fontSize: '1.5rem',
								cursor: 'pointer',
								fill: theme.palette.base.main,
							}}
						/>
						<Typography variant='h5' sx={{ color: theme.palette.base.main, fontWeight: 700 }}>
							{totalPaymentAmount}
						</Typography>
					</Stack>
					<Typography variant='subtitle2' sx={{ color: theme.palette.base.variant70 }}>
						{transactionTime}
					</Typography>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button
					variant='contained'
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
					onClick={() => {
						ButtonClicked({
							action: 'Continue on Payment success',
							page: document.title,
							url: router.asPath,
						})
						callback()
					}}>
					<Typography variant='subtitle2' sx={{ color: theme.palette.textCTA.white }}>
						Continue
					</Typography>
				</Button>
			</DialogActions>
		</CustomDialog>
	)
}

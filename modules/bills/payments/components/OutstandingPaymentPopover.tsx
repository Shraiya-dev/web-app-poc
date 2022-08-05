import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import {
	alpha,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { envs, indianCurrencyFormat, isEmptyObject, primary, useContractorAuth } from '../../../../sdk'
import logo from '../../../../public/assets/icons/BrandLogo.svg'
import {
	cancelPaymentApi,
	confirmPaymentApi,
	confirmPaymentResponseType,
	createOrderResponseType,
} from '../PaymentTypes'
import { useCancelPaymentMutation, useConfirmPaymentMutation, useCreatePaymentMutation } from '../queries/hooks'
import { ConfirmPaymentSuccessPopover } from './ConfirmPaymentSuccessPopover'
import { ButtonClicked } from 'sdk/analytics/analyticsWrapper'

const CustomDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		padding: theme.spacing(1),
	},
	'.cardHeader': {
		flex: 1,
		backgroundColor: theme.palette.common.white,
	},
	'.cardBody': {
		flex: 1,
		flexDirection: 'column',
		padding: theme.spacing(1),
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
type ResponseRazorPayType = {
	razorpay_payment_id: string
	razorpay_order_id: string
	razorpay_signature: string
}
export const OutstandingPaymentPopover = ({
	open,
	payAmount,
	hideModal,
}: {
	open: boolean
	payAmount: number
	hideModal: () => void
}) => {
	const router = useRouter()
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
	const [amount, setAmount] = useState<string>(payAmount.toString())
	const [customAmount, setCustomAmount] = useState('')
	const [confirmPaymentDetails, setConfirmPaymentDetails] = useState<confirmPaymentResponseType>(
		{} as confirmPaymentResponseType
	)
	const [order, setOrder] = useState<createOrderResponseType>({} as createOrderResponseType)
	const razorPayDetails = useRef<ResponseRazorPayType>({} as ResponseRazorPayType)
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [originalSelected, setOriginalSelected] = useState(true)
	const projectId = router.query.projectId as string
	const createPaymentOrderMutation = useCreatePaymentMutation({
		projectId,
	})
	const confirmPaymentOrderMutation = useConfirmPaymentMutation({
		projectId,
	})
	const cancelPaymentOrderMutation = useCancelPaymentMutation({
		projectId,
	})
	const { user } = useContractorAuth()
	const createPaymentOrder = () => {
		createPaymentOrderMutation.mutate(
			{
				projectId: projectId,
				totalPaymentAmount: customAmount ? parseInt(customAmount) : payAmount,
				isCustomAmount: customAmount ? true : false,
			},
			{
				onSuccess: (data) => {
					setOrder(data.data.payload)
				},
			}
		)
	}
	const confirmPaymentOrder = () => {
		const params: confirmPaymentApi = {
			paymentId: order.paymentId,
			transactionId: razorPayDetails.current.razorpay_payment_id,
			orderId: order.orderId,
			signature: razorPayDetails.current.razorpay_signature,
		}
		confirmPaymentOrderMutation.mutate(
			{ projectId: projectId, params },
			{
				onSuccess: (data) => {
					setConfirmPaymentDetails(data.data.payload)
				},
			}
		)
	}
	const cancelPaymentOrder = () => {
		const params: cancelPaymentApi = {
			paymentId: order.paymentId,
			orderId: order.orderId,
		}
		cancelPaymentOrderMutation.mutate(
			{ projectId: projectId, params },
			{
				onSuccess: (data) => {
					//setConfirmPaymentDetails(data.data.payload)
				},
			}
		)
	}
	useEffect(() => {
		if (!isEmptyObject(confirmPaymentDetails)) {
			setShowSuccessModal(true)
		}
	}, [confirmPaymentDetails])
	const makePayment = async () => {
		var options = {
			key: envs.RAZOR_PAY_KEY,
			name: 'Project Hero',
			currency: 'INR',
			amount: originalSelected ? payAmount * 100 : customAmount ? parseInt(customAmount) * 100 : payAmount * 100,
			order_id: order?.orderId,
			description: 'Contractor Payment',
			image: logo,
			handler: function (response: ResponseRazorPayType) {
				hideModal()
				razorPayDetails.current = response
				confirmPaymentOrder()
			},
			modal: {
				escape: false,
				ondismiss: function () {
					cancelPaymentOrder()
				},
			},
			prefill: {
				name: user?.name,
				email: user?.email,
				contact: user?.phoneNumber,
			},
		}
		const paymentObject = new (window as any).Razorpay(options)
		paymentObject.open()
	}
	const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = (event.target as HTMLInputElement).value
		setAmount(val)
		if (val === String(payAmount) || val === '') {
			setOriginalSelected(true)
		} else {
			setOriginalSelected(false)
		}
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value
		const re = /^[0-9\b]+$/
		if (value === '' || re.test(value)) {
			setCustomAmount(value)
			setAmount(value)
			setOriginalSelected(false)
		}
	}

	useEffect(() => {
		if (!isEmptyObject(order)) {
			makePayment()
		}
	}, [order])
	return (
		<>
			<ConfirmPaymentSuccessPopover
				{...confirmPaymentDetails}
				open={showSuccessModal}
				onClose={() => setShowSuccessModal(false)}
			/>
			<CustomDialog fullScreen={fullScreen} open={open} maxWidth='xs' fullWidth onClose={hideModal}>
				<DialogTitle>
					<Typography
						variant={'h6'}
						sx={{
							color: primary.properDark,
						}}
					>
						Confirm & Pay
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Stack direction='row' justifyContent='space-between'>
						<Stack flex={1}>
							<FormControl>
								<RadioGroup
									aria-labelledby='demo-radio-buttons-group-label'
									value={amount}
									onChange={handleRadio}
									name='radio-buttons-group'
								>
									<FormControlLabel
										sx={{
											flexDirection: 'row-reverse',
											justifyContent: 'space-between',
											alignItems: 'center',
											padding: 1,
											border: '2px solid #efefef',
											borderRadius: 2,
											borderColor: amount === String(payAmount) ? 'primary.main' : undefined,
											backgroundColor: amount === String(payAmount) ? 'primary.light' : undefined,
											mr: 0,
										}}
										value={payAmount}
										control={<Radio />}
										label={
											<Stack>
												<Typography variant='h6' sx={{ color: primary.properDark }}>
													{payAmount}
												</Typography>
												<Typography variant='caption' sx={{ color: primary.properDark }}>
													Total outstanding amount
												</Typography>
											</Stack>
										}
									/>
									<FormControlLabel
										sx={{
											mt: 2,
											flexDirection: 'row-reverse',
											justifyContent: 'space-between',
											alignItems: 'center',
											padding: 1,
											border: '2px solid #efefef',
											borderRadius: 2,
											mr: 0,

											borderColor: amount === String(customAmount) ? 'primary.main' : undefined,
											backgroundColor:
												amount === String(customAmount) ? 'primary.light' : undefined,
											'.MuiFormControlLabel-label': {
												flex: 1,
												'*': {
													flex: 1,
												},
											},
										}}
										value={customAmount}
										control={<Radio />}
										inputMode='numeric'
										label={
											<TextField
												fullWidth
												variant='standard'
												placeholder='Enter Amount'
												value={customAmount}
												onChange={handleChange}
												style={{ zIndex: '999', color: primary.properDark }}
											/>
										}
									/>
								</RadioGroup>
							</FormControl>
						</Stack>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button
						variant='outlined'
						//disabled={outStandingPaymentData.data.payload.amount===0}
						sx={{
							paddingTop: theme.spacing(2),
							paddingBottom: theme.spacing(2),
							paddingLeft: theme.spacing(3),
							paddingRight: theme.spacing(3),
							borderRadius: '72px',
							maxHeight: '3rem',
						}}
						onClick={() => {
							hideModal()
						}}
					>
						<Typography variant='subtitle2' sx={{ color: primary.properDark }}>
							Cancel
						</Typography>
					</Button>
					<Button
						variant='contained'
						disabled={payAmount <= 0 && (!amount || amount === '0' || parseInt(amount) <= 0)}
						sx={{
							// background: theme.palette.button.secondary,
							paddingTop: theme.spacing(2),
							paddingBottom: theme.spacing(2),
							paddingLeft: theme.spacing(3),
							paddingRight: theme.spacing(3),
							borderRadius: '72px',
							maxHeight: '3rem',
						}}
						onClick={() => {
							ButtonClicked({
								action: originalSelected ? 'Initiate outstanding Payment' : 'Initiate custom Payment',
								page: document.title,
								url: router.asPath,
							})
							createPaymentOrder()
						}}
					>
						<Typography variant='subtitle2' sx={{ color: primary.properDark }}>
							Pay
						</Typography>
						<CurrencyRupeeIcon
							sx={{
								fontSize: 'inherit',
								cursor: 'pointer',
								fill: primary.properDark,
							}}
						/>
						<Typography variant='subtitle2' sx={{ color: primary.properDark }}>
							{originalSelected
								? indianCurrencyFormat(payAmount.toString())
								: indianCurrencyFormat(customAmount.toString() || payAmount.toString())}
						</Typography>
					</Button>
				</DialogActions>
			</CustomDialog>
		</>
	)
}

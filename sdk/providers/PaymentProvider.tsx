import { useRouter } from 'next/router'
import { createContext, FC, useCallback, useContext, useMemo, useReducer, useState } from 'react'
import { envs, sendAnalytics, useContractorAuth } from 'sdk'
import logo from '../../public/assets/icons/BrandLogo.svg'
import { cancelPaymentApi, confirmPaymentApi } from '../../modules/bills/payments/PaymentTypes'
import { useCancelPaymentMutation, useConfirmPaymentMutation } from 'modules/bills/payments/queries/hooks'
import { ConfirmPaymentSuccessPopover } from 'modules/bills/payments/components/ConfirmPaymentSuccessPopover'

type ResponseRazorPayType = {
	razorpay_payment_id: string
	razorpay_order_id: string
	razorpay_signature: string
}
const constants = {
	name: 'ProjectHero',
	currency: 'INR',
	description: 'Contractor Payment',
}
const initialState = {
	razorPayDetails: null,
	order: null,
	showConfirmationModel: false,
	confirmPaymentDetails: null,
}

const PaymentContext = createContext<any>({
	...initialState,
	initiatePayment: () => null,
})
const { Provider, Consumer } = PaymentContext

const simpleReducer = (state: any, payload: Partial<any>) => ({
	...state,
	...payload,
})
const PaymentProvider: FC<any> = ({ children, authState }) => {
	const [state, dispatch] = useReducer(simpleReducer, initialState)
	const { user } = useContractorAuth()
	const router = useRouter()
	const [callbacks, setCallbacks] = useState<any>()
	const projectId = router.query.projectId as string

	const confirmPaymentOrderMutation = useConfirmPaymentMutation({
		projectId,
	})
	const cancelPaymentOrderMutation = useCancelPaymentMutation({
		projectId,
	})

	const [paymentSuccessDialogProps, setPaymentSuccessDialogProps] = useState({
		open: false,
		paymentId: '',
		totalPaymentAmount: 0,
		transactionTime: '',
		callback: () => {},
	})
	const confirmPaymentOrder = useCallback(
		async (order, razorPayDetails, successCallback) => {
			return new Promise((res, rej) => {
				const params: confirmPaymentApi = {
					paymentId: order?.paymentId,
					transactionId: razorPayDetails?.razorpay_payment_id,
					orderId: order?.orderId,
					signature: razorPayDetails?.razorpay_signature,
				}
				confirmPaymentOrderMutation.mutate(
					{ projectId: projectId, params },
					{
						onSuccess: (data: any) => {
							if (data.data.payload) {
								setPaymentSuccessDialogProps({
									open: true,
									paymentId: data?.data?.payload?.paymentId,
									totalPaymentAmount: data?.data?.payload?.totalPaymentAmount,
									transactionTime: data?.data?.payload?.transactionTime,
									callback: successCallback,
								})
								dispatch({
									showConfirmationModel: true,
									confirmPaymentDetails: data.data.payload,
								})
								res(undefined)
							}
						},
					}
				)
			})
		},
		[confirmPaymentOrderMutation, projectId]
	)

	const cancelPaymentOrder = useCallback(() => {
		const params: cancelPaymentApi = {
			paymentId: state.order?.paymentId,
			orderId: state.order?.orderId,
		}
		sendAnalytics({
			name: 'cancelPayment',
			action: 'ButtonClick',
			metaData: {
				...params,
			},
		})
		cancelPaymentOrderMutation.mutate({ projectId: projectId, params })
	}, [state, cancelPaymentOrderMutation, projectId])

	const initiatePayment = useCallback(
		async (order, amount, email: string, successCallback, failureCallback) => {
			return new Promise((resolve, reject) => {
				dispatch({
					order: order,
				})
				var options = {
					key: envs.RAZOR_PAY_KEY,
					name: constants.name,
					currency: constants.currency,
					amount,
					order_id: order?.orderId,
					description: constants.description,
					image: logo,
					handler: async function (response: ResponseRazorPayType) {
						dispatch({
							razorPayDetails: response,
						})
						await confirmPaymentOrder(order, response, successCallback)
						resolve(undefined)
					},
					modal: {
						escape: false,
						ondismiss: function () {
							failureCallback()
							cancelPaymentOrder()
						},
					},
					prefill: {
						name: user?.name,
						email: email,
						contact: user?.phoneNumber,
					},
				}
				const paymentObject = new (window as any).Razorpay(options)
				paymentObject.open()
			})
		},
		[cancelPaymentOrder, confirmPaymentOrder, user]
	)

	const paymentProviderValue: any = useMemo(
		() => ({
			...state,
			initiatePayment,
		}),
		[state, initiatePayment]
	)
	return (
		<Provider value={paymentProviderValue}>
			{children}
			{paymentSuccessDialogProps.open && (
				<ConfirmPaymentSuccessPopover
					{...paymentSuccessDialogProps}
					onClose={() => {
						setPaymentSuccessDialogProps((p) => ({ ...p, open: false }))
					}}
				/>
			)}
		</Provider>
	)
}

export const usePayment = () => useContext(PaymentContext)
export { PaymentProvider, Consumer as PaymentConsumer, PaymentContext }

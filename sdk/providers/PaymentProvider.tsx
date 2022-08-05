import { useRouter } from 'next/router'
import { createContext, FC, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { envs, useContractorAuth } from 'sdk'
import logo from '../../public/assets/icons/BrandLogo.svg'
import {
	cancelPaymentApi,
	confirmPaymentApi,
	confirmPaymentResponseType,
	createOrderResponseType,
} from '../../modules/bills/payments/PaymentTypes'
import { useCancelPaymentMutation, useConfirmPaymentMutation } from 'modules/bills/payments/queries/hooks'
type ResponseRazorPayType = {
	razorpay_payment_id: string
	razorpay_order_id: string
	razorpay_signature: string
}
const constants = {
	name: 'Project Hero',
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

	const projectId = router.query.projectId as string

	const confirmPaymentOrderMutation = useConfirmPaymentMutation({
		projectId,
	})
	const cancelPaymentOrderMutation = useCancelPaymentMutation({
		projectId,
	})

	const confirmPaymentOrder = useCallback(() => {
		const params: confirmPaymentApi = {
			paymentId: state.order?.paymentId,
			transactionId: state.razorPayDetails?.razorpay_payment_id,
			orderId: state.order?.orderId,
			signature: state.razorPayDetails?.razorpay_signature,
		}
		confirmPaymentOrderMutation.mutate(
			{ projectId: projectId, params },
			{
				onSuccess: (data: any) => {
					if (data.data.payload) {
						dispatch({
							showConfirmationModel: true,
							confirmPaymentDetails: data.data.payload,
						})
					}
				},
			}
		)
	}, [state, projectId, confirmPaymentOrderMutation])

	const cancelPaymentOrder = useCallback(() => {
		const params: cancelPaymentApi = {
			paymentId: state.order?.paymentId,
			orderId: state.order?.orderId,
		}
		cancelPaymentOrderMutation.mutate({ projectId: projectId, params })
	}, [state, cancelPaymentOrderMutation, projectId])

	const initiatePayment = useCallback(
		async (order, amount) => {
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
				handler: function (response: ResponseRazorPayType) {
					dispatch({
						razorPayDetails: response,
					})
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
	return <Provider value={paymentProviderValue}>{children}</Provider>
}

export const usePayment = () => useContext(PaymentContext)
export { PaymentProvider, Consumer as PaymentConsumer, PaymentContext }

export type confirmPaymentApi = {
	paymentId?: string
	orderId?: string
	transactionId: string
	signature: string
}
export type cancelPaymentApi = {
	paymentId: string
	orderId: string
	erroCode?: string
}
export type createOrderResponseType = {
	paymentGatewayType: string
	totalPaymentAmount: string
	orderId: string
	paymentId: string
}
export type confirmPaymentResponseType = {
	paymentId: string
	totalPaymentAmount: number
	transactionTime: string
}
export enum PaymentStatus {
	CREATED = 'CREATED',
	PAID = 'PAID',
	FAILED = 'FAILED',
}

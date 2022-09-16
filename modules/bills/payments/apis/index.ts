import axios from 'axios'
import { cancelPaymentApi, confirmPaymentApi } from '../PaymentTypes'

export const getoutStandingPayment = (projectId: string) => {
	return axios.get(`/gateway/customer-api/projects/${projectId}/outstanding-amount`)
}
export const getCreatePayment = (projectId: string, totalPaymentAmount: number, isCustomAmount = false) => {
	return axios.post(`/gateway/customer-api/projects/${projectId}/payments/create`, {
		totalPaymentAmount,
		isCustomAmount,
	})
}
export const getConfirmPayment = (projectId: string, params: confirmPaymentApi) => {
	const { paymentId, orderId, transactionId, signature } = params
	return axios.post(`/gateway/customer-api/projects/${projectId}/payments/confirm`, {
		paymentId,
		orderId,
		transactionId,
		signature,
	})
}

export const getPaymentsHistoryList = (projectId: string) => {
	return axios.get(`/gateway/customer-api/projects/${projectId}/payments`)
}

export const getCancePayment = (projectId: string, params: cancelPaymentApi) => {
	const { paymentId, orderId, erroCode } = params
	return axios.post(`/gateway/customer-api/projects/${projectId}/payments/cancel`, {
		paymentId,
		orderId,
		erroCode,
	})
}

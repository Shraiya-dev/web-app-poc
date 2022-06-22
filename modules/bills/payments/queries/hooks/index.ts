import { useMutation, useQuery } from 'react-query'
import {
	getCancePayment,
	getConfirmPayment,
	getCreatePayment,
	getoutStandingPayment,
	getPaymentsHistoryList,
} from '../../apis'
import { cancelPaymentApi, confirmPaymentApi } from '../../PaymentTypes'
import {
	getCancelPaymentQueryKey,
	getConfirmPaymentQueryKey,
	getCreatePaymentQueryKey,
	getOutstandingPaymentQueryKey,
	getPaymentHistoryListQueryKey,
} from '../QueryKeys'

export const useGetOuststandingPaymentQuery = (projectId: string) => {
	const queryKey = getOutstandingPaymentQueryKey(projectId)
	return useQuery(queryKey, async () => await getoutStandingPayment(projectId), {
		select: (data) => data.data,
	})
}
export const useGetPaymentsHistoryListQuery = (projectId: string) => {
	const queryKey = getPaymentHistoryListQueryKey(projectId)
	return useQuery(queryKey, async () => await getPaymentsHistoryList(projectId), {
		select: (data) => data.data.payload,
	})
}

export const useCreatePaymentMutation = ({ projectId }: { projectId: string }) => {
	const queryKey = getCreatePaymentQueryKey(projectId)
	return useMutation(
		({
			projectId,
			totalPaymentAmount,
			isCustomAmount,
		}: {
			projectId: string
			totalPaymentAmount: number
			isCustomAmount: boolean
		}) => getCreatePayment(projectId, totalPaymentAmount, isCustomAmount),
		{
			mutationKey: queryKey,
			onSuccess: (data) => {
				console.log('payment created', data)
			},
			onSettled: () => {},
		}
	)
}
export const useConfirmPaymentMutation = ({ projectId }: { projectId: string }) => {
	const queryKey = getConfirmPaymentQueryKey(projectId)
	return useMutation(
		({ projectId, params }: { projectId: string; params: confirmPaymentApi }) =>
			getConfirmPayment(projectId, { ...params }),
		{
			mutationKey: queryKey,
			onSuccess: (data) => {
				console.log('payment created', data)
			},
			onSettled: () => {},
		}
	)
}

export const useCancelPaymentMutation = ({ projectId }: { projectId: string }) => {
	const queryKey = getCancelPaymentQueryKey(projectId)
	return useMutation(
		({ projectId, params }: { projectId: string; params: cancelPaymentApi }) =>
			getCancePayment(projectId, { ...params }),
		{
			mutationKey: queryKey,
			onSuccess: (data) => {
				console.log('payment created', data)
			},
			onSettled: () => {},
		}
	)
}

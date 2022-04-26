export enum CUSTOMER_STATUS {
	REGISTERED = 'REGISTERED',
	UPDATE_PROFILE = 'UPDATE_PROFILE',
	PROFILE_COMPLETED = 'PROFILE_COMPLETED',
}
export interface CustomerDetails {
	customerId: string
	name: string
	companyName: string
	phoneNumber: string
	email: string
	customerStatus: CUSTOMER_STATUS
}

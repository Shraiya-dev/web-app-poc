import { DESIGNATION } from './designation'

export enum ONBOARDING_STATUS {
	PROFILE_CREATION_PENDING = 'PROFILE_CREATION_PENDING',
	EMAIL_VERIFICATION_PENDING = 'EMAIL_VERIFICATION_PENDING',
	ORGANISATION_CREATION_PENDING = 'ORGANISATION_CREATION_PENDING',
	ONBOARDED = 'ONBOARDED',
	ORGANISATION_LINKING_FAILED = 'ORGANISATION_LINKING_FAILED',
}

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
	organisationId: string
	customerStatus: CUSTOMER_STATUS
	onboardingStatus: ONBOARDING_STATUS
	GSTIN: string
	isEnterprise?: boolean
	hasProjects?: boolean
	designation: DESIGNATION
	organisationRole: string
}

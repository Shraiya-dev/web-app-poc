/**
 * Validate GSTIN response code.
 */
export enum ValidateGSTINStatusCode {
	CREATE_ORGANISATION = 'CREATE_ORGANISATION',
	CONTACT_ADMIN = 'CONTACT_ADMIN',
}

/**
 * Organisation contact details for display.
 */
export interface OwnerContactDetails {
	name: string
	phoneNumber: string
}

/**
 * Validate GSTIN response payload interface for contacting admin.
 */
export interface ValidateGSTINResponse {
	nextStepCode: ValidateGSTINStatusCode
	GSTIN: string
	companyName?: string
	contactDetails?: OwnerContactDetails
}

import { DESIGNATION } from '../types'

export const designationLabel: Partial<{
	[key in DESIGNATION]: string
}> = {
	COMPANY_DIRECTOR: 'Company Director',
	CEO_FOUNDER_PROMOTER: 'CEO/Founder/Promoter',
	SENIOR_PROJECT_MANAGER: 'Senior Project Manager',
	PROJECT_MANAGER: 'Project Manager',
	SITE_ENGINEER: 'Site Engineer',
	FINANCE_ACCOUNTS: 'Finance & Accounts',
}

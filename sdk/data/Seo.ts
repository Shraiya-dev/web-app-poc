import { ParsedUrlQuery } from 'querystring'
import { PageMetaData } from 'sdk/types'
const SEOData: { [key in string]: PageMetaData } = {
	'/about-us': { title: 'About Us', description: 'About Us' },
	'/account': { title: 'Account', description: 'Account' },
	'/create-organisation': { title: 'Create organisation', description: 'Create organisation' },
	'/create-profile': { title: 'Create Profile', description: 'Create Profile' },
	'/faq': { title: 'FAQ', description: 'FAQ' },
	'/': { title: 'Home', description: 'Home page ' },
	'/KhulaManch': { title: 'Khula Manch', description: 'Khula Manch' },
	'/privacy-policy': { title: 'Privacy Policy', description: 'Privacy policy' },
	'/profile': { title: 'Profile', description: 'Profile' },
	'/refund-policy': { title: 'Refund Policy', description: 'Refund Policy' },
	'/tnc': { title: 'Terms and Conditions', description: 'Terms and Conditions' },

	'/bookings/[projectId]/[bookingId]/[tab]': { title: 'Bookings - [tab]', description: 'Bookings - [tab]' },
	'/projects/[projectId]/[tab]': { title: 'Projects - [tab]', description: 'Projects - [tab]' },
	'/404': { title: 'Not Found', description: 'Not Found' },
	'/contact-us': { title: 'Contact Us', description: 'Contact Us' },
	'/dashboard': { title: 'Dashboard', description: 'Dashboard' },
	'/hero/plans': { title: 'Plans', description: 'Plans' },
	'/login': { title: 'Login', description: 'Login' },
	'/onboarding/failed': { title: 'Onboarding Error', description: 'Onboarding Error' },
	'/onboarding/success': { title: 'Onboarding Success', description: 'Onboarding Success' },
	'/profile/[tab]': { title: 'Profile - [tab]', description: 'Profile - [tab]' },
	'/projects/[projectId]/[tab]/[workReportId]': { title: 'Work Report Details', description: 'Work Report Details' },
	'/projects/[projectId]/[tab]/billId/[billId]': { title: 'Bills Details', description: 'Bills Details' },
	'/projects/[projectId]/bookings/create': { title: 'Create Bookings', description: 'Create Bookings' },
	'/projects/create': { title: 'Create Project', description: 'Create Project' },
	'/verify-email': { title: 'Email Verification', description: 'Email Verification' },
	'/worker/[workerId]': { title: 'Worker Details', description: 'Worker Details' },
}
export const getMetaData = (url: string, params?: ParsedUrlQuery): PageMetaData => {
	const simpleRouteData: PageMetaData | undefined = SEOData[url]
	let temp = JSON.stringify(simpleRouteData)
	if (params) {
		Object.keys(params).forEach((key) => {
			temp = temp.replaceAll('[' + key + ']', String(params[key]).replaceAll('-', ' '))
		})
	}
	return JSON.parse(temp)
}

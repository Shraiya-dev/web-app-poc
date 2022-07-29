import { ParsedUrlQuery } from 'querystring'
import { PageStaticData } from 'sdk/types'
const PageStaticData: { [key in string]: PageStaticData } = {
	'/about-us': { pageName: 'About Us', seo: { title: 'About Us', description: 'About Us' } },
	'/account': { pageName: 'Account', seo: { title: 'Account', description: 'Account' } },
	'/create-organisation': {
		pageName: 'Create organisation',
		seo: { title: 'Create organisation', description: 'Create organisation' },
	},
	'/create-profile': { pageName: 'Create Profile', seo: { title: 'Create Profile', description: 'Create Profile' } },
	'/faq': { pageName: 'FAQ', seo: { title: 'FAQ', description: 'FAQ' } },
	'/': { pageName: 'Home', seo: { title: 'Home', description: 'Home page ' } },
	'/KhulaManch': { pageName: 'Khula Manch', seo: { title: 'Khula Manch', description: 'Khula Manch' } },
	'/privacy-policy': { pageName: 'Privacy Policy', seo: { title: 'Privacy Policy', description: 'Privacy policy' } },
	'/profile': { pageName: 'Profile', seo: { title: 'Profile', description: 'Profile' } },
	'/refund-policy': { pageName: 'Refund Policy', seo: { title: 'Refund Policy', description: 'Refund Policy' } },
	'/tnc': {
		pageName: 'Terms and Conditions',
		seo: { title: 'Terms and Conditions', description: 'Terms and Conditions' },
	},
	'/verify-email': {
		pageName: 'Email Verification',
		seo: { title: 'Email Verification', description: 'Email Verification' },
	},
	'/dashboard': { pageName: 'Dashboard', seo: { title: 'Dashboard', description: 'Dashboard' } },
	'/hero/plans': { pageName: 'Plans', seo: { title: 'Plans', description: 'Plans' } },
	'/onboarding/failed': {
		pageName: 'Onboarding Error',
		seo: { title: 'Onboarding Error', description: 'Onboarding Error' },
	},
	'/onboarding/success': {
		pageName: 'Onboarding Success',
		seo: { title: 'Onboarding Success', description: 'Onboarding Success' },
	},
	'/profile/[tab]': { pageName: '[tab]', seo: { title: 'Profile - [tab]', description: 'Profile - [tab]' } },
	'/projects/create': { pageName: 'Create Project', seo: { title: 'Create Project', description: 'Create Project' } },
	'/login': { pageName: 'Login', seo: { title: 'Login', description: 'Login' } },
	'/projects/[projectId]/[tab]/[workReportId]': {
		pageName: 'Work Report Details',
		seo: { title: 'Work Report Details', description: 'Work Report Details' },
	},
	'/bookings/[projectId]/[bookingId]/[tab]': {
		pageName: '[tab]',
		seo: { title: 'Bookings - [tab]', description: 'Bookings - [tab]' },
	},
	'/projects/[projectId]/[tab]': {
		pageName: '[tab]',
		seo: { title: 'Projects - [tab]', description: 'Projects - [tab]' },
	},
	'/projects/[projectId]/[tab]/billId/[billId]': {
		pageName: 'Bills Details',
		seo: { title: 'Bills Details', description: 'Bills Details' },
	},
	'/projects/[projectId]/bookings/create': {
		pageName: 'Create Bookings',
		seo: { title: 'Create Bookings', description: 'Create Bookings' },
	},
	'/contact-us': { pageName: 'Contact Us', seo: { title: 'Contact Us', description: 'Contact Us' } },
	'/worker/[workerId]': {
		pageName: 'Worker Details',
		seo: { title: 'Worker Details', description: 'Worker Details' },
	},

	'/404': { pageName: 'Not Found', seo: { title: 'Not Found', description: 'Not Found' } },
}
export const getPageStaticData = (url: string, params?: ParsedUrlQuery): PageStaticData => {
	const simpleRouteData: PageStaticData | undefined = PageStaticData[url]
	let pageStaticData = JSON.stringify(simpleRouteData)
	if (params) {
		Object.keys(params).forEach((key) => {
			pageStaticData = pageStaticData.replaceAll('[' + key + ']', String(params[key]).replaceAll('-', ' '))
		})
	}
	return JSON.parse(pageStaticData)
}

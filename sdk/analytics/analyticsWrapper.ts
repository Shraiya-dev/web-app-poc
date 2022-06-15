import { Analytic } from './analytics'
import { PathName } from './helper'

interface ButtonClicked {
	action: string
	page: string
	url: string
	step?: Number
	projectId?: string | string[] | undefined
	bookingId?: string | string[] | undefined
}

interface CardClicked {
	action: string
	page: string
	url: string
	projectId?: string | string[] | undefined
	bookingId?: string | string[] | undefined
}

interface HorizontalTabClicked {
	name: string
	page: string
	url: string
	projectId?: string | string[] | undefined
	bookingId?: string | string[] | undefined
}

interface NavigationTabClicked {
	name: string
	page: string
	url: string
}

interface Identify {
	userType: string
	customerId?: any
	name: string
	email: string
	phone: string
	company?: string
	createdAt?: string
	organisationId?: string
	organisationRole?: string
	designation?: string
	customerStatus?: string
	isOrganisationMembershipDeleted?: string
	onboardingStatus?: string
}

const getUtmObject = () => {
	const utmParams = localStorage.getItem('utmParams')
	let queryObj
	if (utmParams) {
		queryObj = JSON.parse('{"' + decodeURI(utmParams.replace(/&/g, '","').replace(/=/g, '":"')) + '"}')

		return queryObj
	}

	return queryObj
}

export const ButtonClicked = ({ ...props }: ButtonClicked) => {
	const utmInfo = getUtmObject()
	if (utmInfo) {
		const utmProp = { ...props, utmParams: utmInfo }
		Analytic.track('Button Clicked', utmProp)
	} else {
		Analytic.track('Button Clicked', props)
	}
}

export const CardClicked = ({ ...props }: CardClicked) => {
	const utmInfo = getUtmObject()
	if (utmInfo) {
		const utmProp = { ...props, utmParams: utmInfo }
		Analytic.track('Card Clicked', utmProp)
	} else {
		Analytic.track('Card Clicked', props)
	}
}

export const HorizontalTabClicked = ({ ...props }: HorizontalTabClicked) => {
	const utmInfo = getUtmObject()
	if (utmInfo) {
		const utmProp = { ...props, utmParams: utmInfo }
		Analytic.track('HorizontalTab Clicked', utmProp)
	} else {
		Analytic.track('HorizontalTab Clicked', props)
	}
}

export const NavigationTabClicked = ({ ...props }: NavigationTabClicked) => {
	const utmInfo = getUtmObject()
	if (utmInfo) {
		const utmProp = { ...props, utmParams: utmInfo }
		Analytic.track('NavigationTab Clicked', utmProp)
	} else {
		Analytic.track('NavigationTab Clicked', props)
	}
}

export const Identify = async ({ ...props }: Identify) => {
	const indentityInfo = Object.fromEntries(Object.entries(props).filter(([_, v]) => v.length > 0))

	const { customerId, ...rest } = indentityInfo

	const utmInfo = getUtmObject()
	if (utmInfo) {
		Analytic.identify(customerId, { ...rest, utmParams: utmInfo })
	} else {
		Analytic.identify(customerId, { ...rest })
	}
}

export const AnalyticsPage = (router: any) => {
	const routeName =
		router.route === '/profile/[tab]'
			? `Profile - ${router.query.tab}`
			: router.route === '/projects/[projectId]/[tab]'
			? `Project - ${router.query.tab}`
			: router.route === '/bookings/[projectId]/[bookingId]/[tab]'
			? `Bookings - ${router.query.tab === 'track-workers' ? 'Track Workers' : router.query.tab}`
			: PathName[router.route ?? '/dashboard']

	const utmInfo = getUtmObject()
	if (utmInfo) {
		Analytic.page({ name: routeName, utmParams: utmInfo })
	} else {
		Analytic.page({ name: routeName })
	}
}

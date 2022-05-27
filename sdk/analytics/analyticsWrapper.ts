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
	customerId?: any 
	name: string
	email: string
	phone: string
	company?: string
	createdAt?: string
}

export const ButtonClicked = ({ ...props }: ButtonClicked) => {
	Analytic.track('Button Clicked', props)
}

export const CardClicked = ({ ...props }: CardClicked) => {
	Analytic.track('Card Clicked', props)
}

export const HorizontalTabClicked = ({ ...props }: HorizontalTabClicked) => {
	Analytic.track('HorizontalTab Clicked', props)
}

export const NavigationTabClicked = ({ ...props }: NavigationTabClicked) => {
	Analytic.track('NavigationTab Clicked', props)
}

export const Identify = async ({ ...props }: Identify) => {

	const { customerId, ...rest } = props
	Analytic.identify(customerId, { ...rest })
}

export const AnalyticsPage = (router: any) => {
	const routeName =
		router.route === '/projects/[projectId]/[tab]'
			? `Project - ${router.query.tab}`
			: router.route === '/bookings/[projectId]/[bookingId]/[tab]'
			? `Bookings - ${router.query.tab === 'track-workers' ? 'Track Workers' : router.query.tab}`
			: PathName[router.route ?? '/dashboard']

	Analytic.page({ name: routeName })
}

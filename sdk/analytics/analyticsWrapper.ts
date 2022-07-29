import { NextRouter } from 'next/router'
import { PageStaticData } from 'sdk/types'
import { Analytic } from './analytics'
import { getUtmObject } from './helper'
//old version
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
	userType?: string
	customerId?: any
	name?: string
	email?: string
	phone?: string
	company?: string
	createdAt?: string
	organisationId?: string
	organisationRole?: string
	designation?: string
	customerStatus?: string
	isOrganisationMembershipDeleted?: string
	onboardingStatus?: string
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

// new version

export const getPageData = (): { name: string } => {
	// @ts-ignore comment to disable type checking for a line in TypeScript.
	return document.pageData
}
export const setPageData = (data: PageStaticData) => {
	if (window) {
		// @ts-ignore comment to disable type checking for a line in TypeScript.
		window.document.pageData = {
			name: data.pageName,
		}
	}
}
export const NewAnalyticsPage = (router: NextRouter) => {
	// @ts-ignore comment to disable type checking for a line in TypeScript.
	const { name } = getPageData()
	const utmInfo = getUtmObject()
	if (utmInfo) {
		Analytic.page({ name: name, utmParams: utmInfo })
	} else {
		Analytic.page({ name: name })
	}
}

export enum EventType {
	ButtonClick = 'BUTTON_CLICK',
	CardClick = 'CARD_CLICK',
	HorizontalTabClick = 'HORIZONTAL_TAB_CLICK',
	NavigationTabClicked = 'NAVIGATION_TAB_CLICK',
}
interface BaseEvent {
	page: string
	url: string
	utmParams?: any
}
interface Event {
	action: string
	metaData?: any
}
export const sendAnalytics = async (eventName: EventType, payload: any) => {
	const utmInfo = getUtmObject()
	const baseEvent: BaseEvent = {
		page: getPageData().name,
		url: document.location.pathname,
		utmParams: utmInfo,
	}
	return await Analytic.track(eventName, { ...baseEvent, ...payload })
}

export const analyticsEvents = (eventName: EventType, metaData: Event) => sendAnalytics(eventName, metaData)

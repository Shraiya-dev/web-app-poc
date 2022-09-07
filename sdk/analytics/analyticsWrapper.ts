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

//json helper to flatten data
const flattenJSON = (obj: any = {}, res: any = {}, extraKey: any = '') => {
	for (let key in obj) {
		if (typeof obj[key] !== 'object') {
			res[extraKey + key] = obj[key]
		} else {
			flattenJSON(obj[key], res, `${extraKey}${key}.`)
		}
	}
	return res
}
export const ButtonClicked = ({ ...props }: ButtonClicked) => {
	const utmInfo = getUtmObject()
	if (utmInfo) {
		const utmProp = { ...props, utmParams: utmInfo }
		Analytic.track('Button Clicked', { utmProp, ...flattenJSON(utmProp) })
	} else {
		Analytic.track('Button Clicked', { ...props, ...flattenJSON(props) })
	}
}

export const CardClicked = ({ ...props }: CardClicked) => {
	const utmInfo = getUtmObject()
	if (utmInfo) {
		const utmProp = { ...props, utmParams: utmInfo }
		Analytic.track('Card Clicked', { utmProp, ...flattenJSON(utmProp) })
	} else {
		Analytic.track('Card Clicked', { ...props, ...flattenJSON(props) })
	}
}

export const HorizontalTabClicked = ({ ...props }: HorizontalTabClicked) => {
	const utmInfo = getUtmObject()
	if (utmInfo) {
		const utmProp = { ...props, utmParams: utmInfo }
		Analytic.track('HorizontalTab Clicked', { utmProp, ...flattenJSON(utmProp) })
	} else {
		Analytic.track('HorizontalTab Clicked', { ...props, ...flattenJSON(props) })
	}
}

export const NavigationTabClicked = ({ ...props }: NavigationTabClicked) => {
	const utmInfo = getUtmObject()
	if (utmInfo) {
		const utmProp = { ...props, utmParams: utmInfo }
		Analytic.track('NavigationTab Clicked', { utmProp, ...flattenJSON(utmProp) })
	} else {
		Analytic.track('NavigationTab Clicked', { props, ...flattenJSON(props) })
	}
}

export const Identify = async (props?: Identify) => {
	const utmInfo = getUtmObject()
	if (props) {
		const { customerId, ...rest } = props
		Analytic.identify(customerId, { ...rest, utmParams: utmInfo })
	} else {
		Analytic.identify({
			utmParams: utmInfo,
		})
	}
}

// new version

export const getPageData = (): { name: string } => {
	// @ts-ignore comment to disable type checking for a line in TypeScript.
	return document?.pageData
}
export const setPageData = (data: PageStaticData) => {
	if (window) {
		// @ts-ignore comment to disable type checking for a line in TypeScript.
		window.document.pageData = {
			name: data?.pageName,
		}
	}
}
export const getDeviceType = () => (navigator && navigator.maxTouchPoints > 0 ? 'mobile' : 'desktop')

export const NewAnalyticsPage = (router: NextRouter) => {
	const { name } = getPageData()
	const utmInfo = getUtmObject()
	Analytic.page(name, { utmParams: utmInfo, deviceType: getDeviceType() })
}
//Define a new event here
const EventTypes = {
	BookWorker: 'Book Worker',
	EasyBookWorker: 'Easy Book Worker',
	CreateEasyBookWorker: 'Create Easy Book Worker',
	heroAppPlayStore: 'Open HeroApp Play Store',
	howItWorks: 'How It Works',
	requestPhoneOtp: 'Request Phone OTP',
	verifiedPhoneOtp: 'verified Phone OTP',
	getMoreApplication: 'Get More Applications',
	initiatePayment: 'Initiate Payment',
	cancelPayment: 'Cancel Payment',
	contactWorker: 'Contact Worker',
	navbarLogin: 'Navbar Login',
	editWage: 'Edit wage',
	filters: 'Filter',
	heroApplicationsStatus: 'Hero Applications Status',
	whatsAppOptIn: 'WhatsApp opt-in',
	goToDashboard: 'Go to Dashboard',
	postedJob: 'Posted Job',
	postJobNotFormFill: 'Post Job Now Form Fill',
	sendOtp: 'Send OTP',
	otpVerification: 'OTP Verification ',
}

//Define a new action type here if needed
const ActionTypes = {
	ButtonClick: 'Button Click',
	CardClick: 'Card Click',
	DropDownClick: 'Drop Down Click',
	HorizontalTabClick: 'Horizontal Tab Click',
	NavigationTabClicked: 'Navigation Tab Clicked',
}

export const sendAnalytics = async (event: {
	name: keyof typeof EventTypes
	action: keyof typeof ActionTypes
	metaData?: any
}) => {
	const utmInfo = getUtmObject()
	const { name, action, metaData } = event
	const payload = {
		action: ActionTypes[action],
		metaData: metaData,
		...flattenJSON(metaData),
		page: getPageData().name,
		url: document.location.pathname,
		utmParams: utmInfo,
		deviceType: getDeviceType(),
	}
	return await Analytic.track(EventTypes[name], payload)
}

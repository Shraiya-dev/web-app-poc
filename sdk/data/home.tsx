import { BarChart, Settings, Share, StarBorder } from '@mui/icons-material'
import { Children } from 'react'
import { landingTheme } from 'sdk/constants/landingTheme'

export const homePage = {
	heroSection: {},
	jobSection: {
		tagLine: [
			'Manoj just hired 4 Painters ',
			'Sunil just hired 10 Barbenders',
			'Rakesh just hired 10 Plumbers',
			'Roshan just hired 10 Electrician',
			'Satya just hired 10 Barbenders',
		],
		jobs: [
			{
				image: '/assets/landing/mason.png',
				label: 'Masons',
			},
			{
				image: '/assets/landing/bar-bender.png',
				label: 'Bar benders',
			},
			{
				image: '/assets/landing/flooring.png',
				label: 'Flooring/Tiling',
			},
			{
				image: '/assets/landing/carpenter.png',
				label: 'Carpenters',
			},
			{
				image: '/assets/landing/welders.png',
				label: 'Welder Fitters',
			},
			{
				image: '/assets/landing/painter.png',
				label: 'Painters',
			},
			{
				image: '/assets/landing/general-helper.png',
				label: 'General Helpers',
			},
			{
				image: '/assets/landing/shuttering-work.png',
				label: 'Shuttering Work',
			},
			{
				image: '/assets/landing/electrician.png',
				label: 'Electricians',
			},

			{
				image: '/assets/landing/plumbing.png',
				label: 'Plumber',
			},
		],
		workers: Array(6).fill({
			workerId: String(Math.random() * 1000000),
			name: 'Rambalak Kewat',
			verified: true,
			phoneNumber: '+919650674431',
			profileImage: 'https://www.un.org/sites/un2.un.org/files/2020/09/smiling-factory-worker.jpg',
			jobType: 'Mason',
			skillType: 'Technician',
			rating: 3,
			experience: {
				years: 10,
				organization: 'Infinity Workforce, Brigade Group',
			},
		}),
	},
	bookingJourneySection: {
		sectionTitle: {
			color: landingTheme.palette.common.white,
			children: 'Booking Journey',
			variant: 'h3',
		},
		backgroundColor: landingTheme.palette.primary.main,
		journeySteps: [
			{
				backgroundColor: landingTheme.palette.common.white,
				color: landingTheme.palette.secondary.main,
				label: 'Booking Received',
			},
			{
				backgroundColor: landingTheme.palette.common.white,
				color: landingTheme.palette.secondary.main,
				label: 'Booking Confirmed',
			},
			{
				backgroundColor: landingTheme.palette.common.white,
				color: landingTheme.palette.secondary.main,
				label: 'Booking Go Live',
			},
			{
				backgroundColor: landingTheme.palette.common.white,
				color: landingTheme.palette.secondary.main,
				label: 'Application Received',
			},
			{
				backgroundColor: landingTheme.palette.common.white,
				color: landingTheme.palette.secondary.main,
				label: 'Workers Dispatched',
			},
			{
				backgroundColor: landingTheme.palette.common.white,
				color: landingTheme.palette.secondary.main,
				label: 'Workers Reach Site',
			},
		],
	},
	benefitFromHeroSection: {
		backgroundColor: '#EFF5FF',
		benefits: [
			{
				color: 'common.white',
				header: {
					left: { icon: <Share />, caption: 'Vast Network' },

					right: { image: '/assets/landing/idea.svg' },
				},
				backgroundColor: '#7080FA',
				description: '4 Lac+ registered workers across 10+ job categories available',
			},
			{
				color: 'common.white',
				header: {
					left: { icon: <Settings />, caption: 'Training Hub' },

					right: { image: '/assets/landing/truckIcon.svg' },
				},
				backgroundColor: '#4FDC95',
				description: 'Pan India  workforce hiring & training hubs ',
			},
			{
				color: 'common.white',
				header: {
					left: { icon: <BarChart />, caption: 'Reporting' },

					right: { image: '/assets/landing/truckIcon.svg' },
				},
				backgroundColor: '#3CBBDA',
				description: 'Track Workers Attendance & easy disbursement of salaries',
			},
			{
				color: 'common.white',
				header: {
					left: { icon: <Share />, caption: 'Customer Support' },

					right: { image: '/assets/landing/idea.svg' },
				},
				backgroundColor: '#FF9898',
				description: 'Dedicated Support team for Workers to resolve their Queries',
			},
			{
				color: 'common.white',
				header: {
					left: { icon: <Settings />, caption: 'Skilled Labour' },

					right: { image: '/assets/landing/truckIcon.svg' },
				},
				backgroundColor: '#4FDC95',
				description: 'Pan India Delivery of Skilled Workforce',
			},
			{
				color: 'common.white',
				header: {
					left: { icon: <BarChart />, caption: 'Project Management' },

					right: { image: '/assets/landing/truckIcon.svg' },
				},
				backgroundColor: '#3CBBDA',
				description: 'Workforce retention and Project Management support',
			},
		],
	},
	supportCarouselSection: {
		backgroundColor: '#EFF5FF',
		carouselContent: [
			{ link: '/', image: '/assets/landing/support/support1.png' },
			{ link: '/login', image: '/assets/landing/support/support5.png' },
			{ link: '/', image: '/assets/landing/support/support2.png' },
			// { link: '', image: '/assets/landing/support/support4.png' },
		],
	},
	customerSayingSection: {
		backgroundImage: '/assets/landing/support/polygonBackground.svg',
		title: (
			<>
				What are our
				<br /> Customers saying?
			</>
		),
		carouselContent: [
			{
				title: 'GECPL, Registered in Mumbai',
				description: `We have used Project Hero to meet our requirements 
				for a skilled Bar-bending and Shuttering team of about 
				30 workers at our BEL Project in Bangalore. We traditionally used labor contractors but have also tried hiring from some new age startups. The LC’s are unreliable at best and the blue collar hiring companies don’t have the labor needed in construction. With Project Hero, we had the team at our 
				site on the 4th day.`,
			},
			{
				title: `Eleganz Interiors `,
				description: `We are one of the largest interior Fit-out companies in India and require skilled and unskilled workers in bulk. Earlier, we used to hire via labor contractors but the labor quality and reliability was a major issue. Project Hero met our requirement with a full stack solution - from sourcing, training, interviews to final deployment and worker management. Would recommend`,
			},
			// {
			// 	title: 'Eleganz Interiors ',
			// 	description: `We are one of the largest interior Fit-out companies in India and require skilled and unskilled workers in bulk. Earlier, we used to hire via labor contractors but the labor quality and reliability was a major issue. Project Hero met our requirement with a full stack solution - from sourcing, training, interviews to final deployment and worker management. Would recommend`,
			// },
			// {
			// 	title: 'Eleganz Interiors ',
			// 	description: `We are one of the largest interior Fit-out companies in India and require skilled and unskilled workers in bulk. Earlier, we used to hire via labor contractors but the labor quality and reliability was a major issue. Project Hero met our requirement with a full stack solution - from sourcing, training, interviews to final deployment and worker management. Would recommend`,
			// },
		],
	},
	hireConstructionSection: {
		backgroundImage: '/assets/landing/backgroundPatterm.png',
		cards: [
			{
				svg: '/assets/landing/cone.svg',
				header: 'High Retention',
				description: 'Double retention rate than industry average',
				color: '#4373D3',
				marginTop: '-32px',
			},
			{
				svg: '/assets/landing/magnifine.svg',
				header: 'Attendance Tracking',
				description: 'Track & download worker’s attendance via contractor Web App',
				color: '#00BD62',
				marginTop: '0px',
			},
			{
				svg: '/assets/landing/starEmoji.svg',
				header: 'PF & ESI Tracking',
				description: 'Resolve compliance related issues with 100% PF & ESI tracking feature',
				color: '#011F50',
				marginTop: '-32px',
			},
			{
				svg: '/assets/landing/girl.svg',
				header: 'Daily Wage Report',
				description: 'Generate and track daily wages for all workers in project',
				color: '#E77241',
				marginTop: '0px',
			},
		],
	},
	phAdvantage: {
		heading: 'PH Advantage',
		description: `We solve all your problems ranging from discovery, fulfillment, retention and management of your
		construction workforce. You also get workers from the pre-screened and skilled pool of 4 Lakh+
		workers. Log-In to our contractor dashboard and give your first booking now!`,
		advantage: [
			{
				svg: '/assets/landing/box.svg',
				header: 'Best Prices',
				description: 'Guaranteed',
			},
			{
				svg: '/assets/landing/mobileman.svg',
				header: 'Unbiased Advice',
				description: 'Keeping Cutomers First',
			},
			{
				svg: '/assets/landing/cardman.svg',
				header: '24x7',
				description: 'Customer Support',
			},
			{
				svg: '/assets/landing/legman.svg',
				header: 'Easy Refund',
				description: 'Made Stress Free',
			},
			{
				svg: '/assets/landing/laptopman.svg',
				header: 'Happy to Help',
				description: 'Everyday of the Week',
			},
		],
	},
	phApp: {
		backgroundColor: '#F2F7FF',
		appImage: '/assets/landing/heroAppposter.png',
		heading: 'Project Hero App',
		description: 'Designed for our Heroes who apply to jobs posted by you',
		bulletPointIcon: <StarBorder color='primary' />,
		bulletPoints: [
			'Apply to unlimited jobs available from verified contractors',
			'Track your Provident Fund Balance',
			'Track your income and attendance directly on App',
			'Get Insurance upto Rs 3 lakh in just Rs 9 per day',
		],
	},

	clientCarouselSection: {
		backgroundColor: '#EFF5FF',
		heading: 'Our Customers',
		carouselContent: [
			'/assets/landing/clients/client1.png',
			'/assets/landing/clients/client2.png',
			'/assets/landing/clients/client3.png',
			'/assets/landing/clients/client4.png',
			'/assets/landing/clients/client5.png',
			'/assets/landing/clients/client6.png',
		],
	},
	qnaSection: {
		title: (
			<>
				Have a question?
				<br />
				Here to help.
			</>
		),

		support: {
			image: '/assets/landing/support.png',
			message: `Our friendly customer support team is your extended family. Speak your heart out. Give
		us a call, request a callback or drop us an email, we're here to help.`,
			mailAction: {
				label: 'General Queries',
				email: 'marketing@projecthero.in',
			},
			contactAction: { label: 'Inquiries', phone: '+91 9151003513' },
		},
	},
}

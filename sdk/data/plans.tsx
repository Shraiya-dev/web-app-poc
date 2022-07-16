export const PlansPageData = {
	bannerSection: {
		left: {
			backgroundColor: '#DDEAFF	',
			title: 'Labour Shortage',
			subtitle: (
				<>
					Issues <strong>FIXED!</strong>
				</>
			),
			image: '/assets/landing/bannerImage.png',
			benefits: [
				{
					icon: '/assets/landing/plans/setting.png',
					text: 'Skilled & Trained Heroes',
					marginLeft: '0px',
				},
				{
					icon: '/assets/landing/plans/thunder.png',
					text: 'No Labour Shortage Issues',
					marginLeft: '20%',
				},
				{
					icon: '/assets/landing/plans/mail.png',
					text: 'Doorstep Delivery*',
					marginLeft: '-20%',
				},
			],
		},
		right: {
			image: '/assets/landing/banner-worker.png',

			title: 'Construction Workforce delivered directly to your Project Site',
			chip: {
				text: 'Register and Submit Your Booking Requirement',
			},
			bookingButton: {
				text: 'Book Now!',
			},
			support: {
				text: 'Project Hero Expert will call once you give your booking requirement',
				icon: '/assets/landing/plans/certificate.svg',
				background: '#ffffff',
				backgroundColor:
					'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(171,255,167,1) 100%)',
			},
			disclaimer: 'By clicking on view plans, you agreed to our Privacy policy, Terms of Use & Disclaimer',
			whatsApp: {
				label: 'Get updates on WhatsApp',
			},
		},
	},
	planSection: {
		heading: 'Project Hero Plans',
		subtitle: 'Plans suitable for any type of Hero requirement',
		plans: [
			{
				id: 'plan1',
				header: {
					name: 'Discovery Plan',
					price: 75,
					per: 'Target Application',
					discount: 25,
					tagLine: '30 Profiles',
					description: 'Get Access to Contact Number of each candidate',
					subOffer: [
						{
							price: 65,
							per: 'Target Application',
							discount: 35,
							tagLine: '100 Profiles',
						},
						{
							price: 50,
							per: 'Target Application',
							discount: 55,
							tagLine: '500 Profiles',
						},
					],
				},
				body: {
					title: "You'll have access to",
					points: [
						'Get Target Applications in 5 days*',
						"Get Hero's Phone Number",
						'Get Complete Profile*',
						'Connect with Hero directly',
						'Ideal for 5-10 worker requirement',
						'Call directly & negotiate salaries',
						'Bring Heroes to your Project Site',
						'Lifetime Usage of Contractor Web-App',
						'Track Daily Wages & Attendance ',
						'Daily Wage Report ',
						'Pay salaries via Contractor Web-App',
					],
				},
				link: '/login',
			},
			{
				id: 'plan2',
				header: {
					name: 'Fulfillment Plan',
					price: 6000,
					per: 'Hero Delivery',

					discount: 40,
					tagLine: 'Doorstep Delivery',
					description:
						'We take care of selecting, shortlisting & dispatching Heroes directly to your Project Site',
				},
				body: {
					title: "You'll have access to",
					points: [
						'Delivery in 12* days',
						'Delivered directly to your Project Site',
						'Skilled & Trained Heroes',
						'No Question Asked Refund for 30 Day period',
						'Full Refund* if Hero leaves within 30 days',
						'Shortlisted by Project Hero',
						'Ideal for 10 worker requirement or more',
						'Lifetime Usage of Contractor Web-App',
						'Track Daily Wages & Attendance ',
						'Daily Wage Report ',
						'Pay salaries via Contractor Web-App',
					],
				},
				link: '/login',
			},
			{
				id: 'plan3',
				header: {
					name: 'Retention Top-Up',
					price: 1250,
					per: 'Hero',
					discount: 30,
					tagLine: 'Unlimited Heros',
					description: 'We ensure the replacement of the worker if any worker churns due to any reason',
				},
				body: {
					title: "You'll have access to",
					points: [
						'Labor Churn Insurance plan',
						'Protect your workforce against any churn',
						'Guaranteed Hero Delivery if any worker leaves',
						'Priority Delivery in 8* days',
						'Get replacement for every churned worker',
						'Ideal for 10 worker requirement or more',
						'Lifetime Usage of Contractor Web-App',
						'Track Daily Wages & Attendance ',
						'Daily Wage Report ',
						'Pay salaries via Contractor Web-App',
					],
				},
				link: '/login',
			},
			{
				id: 'plan4',
				header: {
					name: 'Enterprise Plan',
					price: 7500,
					per: 'Month',
					discount: 50,
					tagLine: 'Project Manager Support',
					description:
						'We give you a dedicated Project Manager who will be available on call & do site audits every month',
				},
				body: {
					title: "You'll have access to",
					points: [
						'24*7 Project Support on Call',
						'Monthly Site Audits',
						'Maintain Hero Productivity',
						'Onsite Support*',
						'Dedicated Helpline Number',
						'Track incentives & work targets',
						'Ideal for 30 workers or more',
						'Lifetime Usage of Contractor Web-App',
						'Track Daily Wages & Attendance ',
						'Daily Wage Report ',
						'Pay salaries via Contractor Web-App',
					],
				},
				link: '/login',
			},
		],
	},
}

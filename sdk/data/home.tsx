import { BarChart, Settings, Share, StarBorder } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { landingTheme } from 'sdk/constants/landingTheme'

export const homePage = {
	heroSection: {},
	howItWorksSection: {
		heading: 'How it works',
		subHeading: 'Post your job by following these steps',
		buttonText: { text: 'Post Job Now', link: '/#book-worker' },
		buttonSx: {
			height: '62px',
			fontSize: { md: '20px', sm: '14px' },
			fontWeight: '800',
		},
	},
	whyYouShouldHire: {
		left: {
			heading: (
				<Typography
					variant='h2'
					color={'#fff'}
					fontFamily={'Saira , sans-serif'}
					fontSize={{ md: '32px', xs: '18px' }}
					fontWeight={500}>
					Why you should hire <br /> your construction worker <br /> from{' '}
					<span style={{ color: 'yellow' }}>Project Hero</span>
				</Typography>
			),
			buttonText: { text: 'Post Job Now', link: '/#book-worker' },
			buttonSx: {
				color: '#000',
				fontWeight: '700',
				fontSize: { md: '20px', sx: '14px' },
				background: '#fff',
				border: '1px solid #EFC430',
				'&:hover': {
					background: '#fff',
				},
			},
		},
		right: {
			indexSx: {
				background: '#483B08',
				borderRadius: '50%',
				padding: '12px',
				width: '60px',
				height: '60px',
			},
			itemTextColor: '#EFC430',
			item: [
				{
					index: (
						<Typography variant='h2' color={'#EFC430'}>
							01
						</Typography>
					),
					heading: 'Verified Profiles',
					desc: '100% genuine workers with verified phone numbers',
				},
				{
					index: (
						<Typography variant='h2' color={'#EFC430'}>
							03
						</Typography>
					),
					heading: 'Skilled & Trained Heroes',
					desc: 'Heroes go through strict skill evaluation process & scored',
				},
				{
					index: (
						<Typography variant='h2' color={'#EFC430'}>
							02
						</Typography>
					),
					heading: 'Hassle Free Hiring Process',
					desc: 'Get phone numbers of heroes as soon as your booking goes live',
				},

				{
					index: (
						<Typography variant='h2' color={'#EFC430'}>
							04
						</Typography>
					),
					heading: 'Eager to Work Heroes',
					desc: 'Largest pool of ready to work heroes available',
				},
			],
		},
	},

	HeroAdvantage: {
		Heading: (
			<Typography
				variant='h2'
				color={'#EFC430'}
				fontSize={{ md: '32px', xs: '16px' }}
				fontFamily={'Saira, sans-serif'}
				fontWeight={600}>
				Project Hero <span style={{ color: '#000' }}>Advantages</span>
			</Typography>
		),
		subHeading: (
			<Typography
				variant='h5'
				fontSize={{ xs: '16px', md: '20px' }}
				fontFamily={'Karla, sans-serif'}
				fontWeight={400}>
				We solve all your construction workforce requirement needs starting from hiring, management and
				retention of workers. Our unique contractor web-app gives you the capability to book, call and hire
				workers. You can also <strong>track your worker&apos;s attendance, generate daily wage reports</strong>{' '}
				and <strong>pay salaries to your workers in just 2 clicks.</strong>
			</Typography>
		),
		buttonText: { text: 'Post Job Now', link: '/#book-worker' },
	},
	heroApp: {
		heading: (
			<Typography
				variant='h1'
				sx={{
					color: '#EFC430',
					fontFamily: ' Saira,sans-serif',
					fontWeight: 600,
					fontSize: { md: '32px', xs: '24px' },
				}}>
				Project Hero <span style={{ color: '#fff' }}>App</span>{' '}
			</Typography>
		),
		desc: (
			<Typography
				variant='h3'
				sx={{
					color: '#fff',
					fontWeight: 400,
					fontFamily: ' Karla,sans-serif',
					fontSize: { md: '24px', xs: '16px' },
				}}>
				Designed for our Heros who apply to jobs <br /> posted by you
			</Typography>
		),
		list: [
			{
				item: 'Heroes apply to unlimited jobs posted by YOU!',
			},
			{
				item: 'Heroes can track their Provident Fund(PF) balance on App	',
			},
			{
				item: 'Heroes can track their attendance & income directly on app',
			},
			{
				item: 'Heores get insurance for upto 3 lakhs in just Rs 9 per day',
			},
		],
	},

	customerReview: {
		heading: (
			<Typography
				variant='h2'
				fontSize={{ md: '32px', xs: '16px' }}
				fontWeight={600}
				fontFamily={'Saira ,sans-serif'}>
				What are our
				<br />{' '}
				<Typography
					display='inline'
					fontSize={{ md: '32px', xs: '16px' }}
					fontWeight={600}
					fontFamily={'Saira ,sans-serif'}
					variant='h2'
					color='primary.main'>
					Customers saying
				</Typography>{' '}
				about us?
			</Typography>
		),
		cards: [
			{
				cardImageSrc: '/assets/landingv2/heroSection/customer.png',
				testimonial: (
					<>
						I am a small contractor who was looking to hire 5 masons. I was struggling to get the masons on
						time. But, when I booked workers on Project Hero, I was impressed by the vast inventory they
						have! I can get as many worker applications as I want and I only need to pay for what I am
						consuming. Project Hero has changed the construction workforce hiring ecosystem!
					</>
				),
				by: 'Yogesh Yadav, Contractor, Jabalpur',
			},
			{
				cardImageSrc: '/assets/landingv2/heroSection/customer.png',
				testimonial: (
					<>
						I was building a commercial project and was unable to get shuttering carpenters! I saw the
						Project Hero ad and booked 30 target applications. Within 1 hour, workers started applying to my
						booking. I gave a call to all the workers and hired 5 of them! The workers are professional and
						skilled. I am very happy with Project Hero.
					</>
				),
				by: 'Anil Dubey, Contractor, Delhi',
			},
			{
				cardImageSrc: '/assets/landingv2/heroSection/customer.png',
				testimonial: (
					<>
						Project Hero has given a new way of hiring. Now whenever I want a construction workforce, I just
						go to Projecthero.in and book workers based on the number of target applications. I call,
						negotiate, and hire them asap! The workers are skilled, and they are eager to work. This system
						of hiring is the BEST!
					</>
				),
				by: 'Aakash Gupta, Contractor, Bangalore',
			},
		],
		ImageList: [
			{ src: '/assets/landingv2/heroSection/capicite.svg' },
			{ src: '/assets/landingv2/heroSection/l&t.svg' },
			{ src: '/assets/landingv2/heroSection/oberoi.svg' },
			{ src: '/assets/landingv2/heroSection/kec.png' },
			{ src: '/assets/landingv2/heroSection/dnova.png' },
		],
	},

	jobSection: {
		tagLine: [
			'Indubhushan Ekachakra just hired 83 General Helpers',
			'Sanchay Gilab just hired 43 Gypsums',
			'Martanda Shradhdha just hired 95 Painters',
			'Siddhartha Daruka just hired 87 General Helpers',
			'Amit Battacharjee just hired 19 Carpenters',
			'Kailash Shally just hired 5 Shuttering Carpenters',
			'Sujit Hemang Kudesia just hired 37 Painters',
			'Abhinandana Sarat just hired 95 Bar Benders',
			'Ekanga Yelsangikar just hired 23 Aluminium Fabricators',
			'Pankaj Renuka just hired 94 Masons',
			'Amalendu Rakhi just hired 70 Carpenters',
			'Yajnadhar Sourabh just hired 21 Welder Fitters',
			'Kalidas Virmani just hired 2 Masons',
			'Kaliranjan Swani just hired 70 Masons',
			'Satish Sarasvan just hired 27 Masons',
			'Yajat Sukanya just hired 66 Bar Benders',
			'Ratul Kamalesh Shokrollahi just hired 76 Aluminium Fabricators',
			'Nairit Pramsu just hired 71 Aluminium Fabricators',
			'Daman Pujar just hired 64 Masons',
			'Aroon Aadarsh Diwan just hired 52 Plumbers',
			'Yajnarup Ranhotra just hired 7 Masons',
			'Badrinath Amanda Vaikuntam just hired 45 Masons',
			'Kapil Randeep just hired 7 Shuttering Carpenters',
			'Adit Mayur just hired 84 Painters',
			'Badal Priyadarshi just hired 94 Gypsums',
			'Govinda Gulfam Thukral just hired 12 Welder Fitters',
			'Omswaroop Ramanujam just hired 23 Plumbers',
			'Yazeed Ramasubramanian just hired 81 Carpenters',
			'Punyasloka Thirunavu just hired 25 General Helpers',
			'Misal Harmendra Kolala just hired 98 Welder Fitters',
			'Bandhul Ramiah just hired 45 Electricianss',
			'Agha Thulasidas just hired 45 Aluminium Fabricators',
			'Bratindra Chandrasekar just hired 64 Plumbers',
			'Parvesh Patel just hired 91 Painters',
			'Madhavdas Sadhwani just hired 40 Welder Fitters',
			'Sachetan Mahajan just hired 9 Painters',
			'Nirad Muthuswami just hired 16 Plumbers',
			'Sagun Multani just hired 20 Bar Benders',
			'Utkarsh Richa just hired 21 Electricianss',
			'Ardhendu Hindocha just hired 42 General Helpers',
			'Abhra Palia just hired 7 Masons',
			'Chandraraj Chinnappan just hired 70 Carpenters',
			'Vaijnath Kondapaneni just hired 24 General Helpers',
			'Arun Shantinath just hired 49 Bar Benders',
			'Shalin Shivendra Vishnavi just hired 86 General Helpers',
			'Gurbachan Ranga just hired 36 Plumbers',
			'Suryakanta Pradyot Vemuganti just hired 65 Carpenters',
			'Azhar Vidvan just hired 37 Welder Fitters',
			'Omanand Lalita just hired 63 Plumbers',
			'Fanish Ganapati Parthak just hired 59 Gypsums',
			'Syamantak Lecamwasam just hired 81 Aluminium Fabricators',
			'Udeep Keerthi just hired 34 Gypsums',
			'Trailokva Katka just hired 46 Aluminium Fabricators',
			'Sunirmal Multani just hired 82 General Helpers',
			'Virochan Yaksha just hired 72 Painters',
			'Daruka Thamry just hired 53 Painters',
			'Kanak Chandrakanta Pashupathy just hired 13 General Helpers',
			'Adesh Palashranjan Ganguly just hired 89 Bar Benders',
			'Tejeshwar Shubhankar Tikoo just hired 16 Bar Benders',
			'Sudhamay Kedia just hired 6 Electricianss',
			'Harish Unmesh just hired 24 Bar Benders',
			'Madhu Raje just hired 78 Bar Benders',
			'Parvatinandan Mayuri just hired 36 Painters',
			'Bharat Vaithu just hired 99 General Helpers',
			'Gurdayal Dhatri just hired 66 Aluminium Fabricators',
			'Tanveer Pujar just hired 24 Plumbers',
			'Wali Subrahmanyam just hired 67 Carpenters',
			'Soham Nisha just hired 22 Carpenters',
			'Sandananda Malti just hired 71 Electricianss',
			'Kailashnath Uttara just hired 81 Aluminium Fabricators',
			'Habib Rammohan just hired 18 Bar Benders',
			'Kaushik Gala just hired 93 Carpenters',
			'Dabeet Gavaskar just hired 58 Welder Fitters',
			'Rupesh Lanka just hired 49 Electricianss',
			'Ranjit Konkar just hired 48 Shuttering Carpenters',
			'Moti Nerurkar just hired 73 Carpenters',
			'Anmol Dwijendra Priyanka just hired 93 Welder Fitters',
			'Shubhendu Jaffrey just hired 44 Gypsums',
			'Rutujit Kanitkar just hired 68 Aluminium Fabricators',
			'Kirtikumar Ranhotra just hired 62 General Helpers',
			'Saurabh Mitra Kedar just hired 14 Shuttering Carpenters',
			'Vedavrata Subhaga just hired 28 Carpenters',
			'Gopal Dheeman Thangaraj just hired 80 Carpenters',
			'Sudesh Vipul just hired 87 Carpenters',
			'Pranit Saraf just hired 92 Welder Fitters',
			'Gangadhar Polamreddy just hired 77 Aluminium Fabricators',
			'Suresh Sadalge just hired 18 Gypsums',
			'Vijendra Prashanth just hired 87 General Helpers',
			'Sunasi Sunthari just hired 53 Welder Fitters',
			'Milun Harbir just hired 86 Bar Benders',
			'Debashish Battacharjee just hired 5 Bar Benders',
			'Ronak Kodumudi just hired 2 Masons',
			'Aghat Fanish Dinkar just hired 74 Masons',
			'Lagan Umakanta just hired 3 Painters',
			'Amitrasudan Vraman just hired 90 Gypsums',
			'Ajitabh Daruka just hired 32 Bar Benders',
			'Murarilal Dhiri just hired 82 Plumbers',
			'Udit Tasneem just hired 35 Plumbers',
			'Vikramaditya Chennapragada just hired 48 Carpenters',
		],
		jobs: [
			{
				image: '/assets/landing/mason.png',
				label: 'Masons',
				value: 'MASON',
			},
			{
				image: '/assets/landing/bar-bender.png',
				label: 'Bar Benders',
				value: 'BAR_BENDER',
			},
			{
				image: '/assets/landing/flooring.png',
				label: 'Flooring/Tiling',
				value: 'STONE_TILE_MARBLE_LAYER',
			},
			{
				image: '/assets/landing/carpenter.png',
				label: 'Carpenters',
				value: 'CARPENTER',
			},
			{
				image: '/assets/landing/welders.png',
				label: 'Welder Fitters',
				value: 'WELDER_FITTER',
			},
			{
				image: '/assets/landing/painter.png',
				label: 'Painters',
				value: 'PAINTER',
			},
			{
				image: '/assets/landing/general-helper.png',
				label: 'General Helpers',
				value: 'GENERAL_HELPER',
			},
			{
				image: '/assets/landing/shuttering-work.png',
				label: 'Shuttering Carpenter',
				value: 'SHUTTERING_CARPENTER',
			},
			{
				image: '/assets/landing/electrician.png',
				label: 'Electricians',
				value: 'ELECTRICAL',
			},

			{
				image: '/assets/landing/plumbing.png',
				label: 'Plumber',
				value: 'PLUMBING',
			},
			{
				image: '/assets/landing/gypsum.png',
				label: 'Gypsum',
				value: 'GYPSUM',
			},
			{
				image: '/assets/landing/hvac.png',
				label: 'HVAC',
				value: 'HVAC',
			},
			{
				image: '/assets/landing/aliminium.png',
				label: 'Aluminium Fabricator',
				value: 'ALUMINIUM_FABRICATOR',
			},
		],
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

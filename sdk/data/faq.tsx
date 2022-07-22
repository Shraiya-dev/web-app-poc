import { Typography } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'
import { HyperLink } from 'sdk/components'
import { string } from 'yup'

export enum FAQTypes {
	Pricing = 'PRICING',
	WorkerSalaries = 'WORKER_SALARIES',
	WorkerAccommodation = 'WORKER_ACCOMMODATION',
	PfEsi = 'PF_ESI',
	Onboarding = 'ONBOARDING',
	Bookings = 'BOOKINGS',
	DeliveryTimelines = 'DELIVERY_TIMELINES',
	RefundReplacements = 'REFUND_REPLACEMENTS',
}

const PlanLink = () => {
	return (
		<Link href='/hero/plan' passHref>
			<Typography component='a' display='inline' fontWeight={700} color='primary.main'>
				Plan
			</Typography>
		</Link>
	)
}

const BookWorkerLink = () => {
	return (
		<Link href='/login' passHref>
			<Typography component='a' display='inline' fontWeight={700} color='primary.main'>
				Book Worker
			</Typography>
		</Link>
	)
}
export const FAQPage = {
	bannerSection: {
		backgroundColor: '#F1F6FE',
		heading: 'Book Worker now!',
		subHeading: 'Had your doubts solved?',
		bookWorker: { link: '/login', label: 'Book Now!' },
	},
	faqSection: {
		tabs: [
			{ value: FAQTypes.Pricing, label: 'Pricing' },
			{ value: FAQTypes.WorkerSalaries, label: 'Worker Salaries' },
			{ value: FAQTypes.WorkerAccommodation, label: 'Worker Accommodation' },
			{ value: FAQTypes.PfEsi, label: 'PF & ESI' },
			{ value: FAQTypes.Onboarding, label: 'Onboarding' },
			{ value: FAQTypes.Bookings, label: 'Bookings' },
			{ value: FAQTypes.DeliveryTimelines, label: 'Delivery Timelines' },
			{ value: FAQTypes.RefundReplacements, label: 'Refund & Replacement' },
		],
		faq: {
			[FAQTypes.Pricing]: [
				{
					question: 'How much does Project Hero charge?',
					answer: (
						<>
							<ol>
								<li>
									<strong>Discovery Plan</strong>
									<br />
									Project Hero would charge basis the number of worker applicants on your job posting.
									We have 3 packages under the discovery Plan. For more details, please check out our{' '}
									<PlanLink /> page on the website. As soon as you complete your bookings, you will
									get real-time details of all the workers who have applied for your job. You can
									directly contact these workers, negotiate prices and call them to your project site.
									Project Hero won’t be responsible for any commitments made by workers in this plan.
									<br /> <br />
								</li>
								<li>
									<strong>Fulfilment Plan</strong>
									<br />
									This is our bestseller plan, where Project Hero does all the work for you and takes
									complete ownership of selecting, shortlisting, and delivering workers directly to
									your project site. This plan gives you a hassle-free experience of getting your
									construction workforce right at your doorstep. You don’t have to worry about their
									travel management expenses and other issues.
									<br />
									We’ve got you fully covered! For more details, please check out our <PlanLink />{' '}
									page on the website.
									<br /> <br />
								</li>
								<li>
									<strong>Retention Top-Up</strong>
									<br />
									This plan is provided as an extra feature to our fulfillment plan. At a monthly
									price per worker, Project Hero provides a replacement guarantee for your entire
									workforce. If any worker leaves your project site due to any reason, Project Hero
									gives you the benefit of replacing that worker asap! For more details, please check
									out our <PlanLink /> page on the website.
									<br /> <br />
								</li>
								<li>
									<strong>Support Top-Up</strong>
									<br />
									Project Hero provides an online Project Manager for all the Heroes deployed at your
									project site. The Project manager ensures timely delivery of the weekly targets
									provided by you. He also does random site audits* every month to ensure that work is
									being done in time. For more details, please check out our <PlanLink /> page on the
									website.
									<br /> <br />
								</li>
							</ol>
						</>
					),
				},
			],
			[FAQTypes.WorkerSalaries]: [
				{
					question: 'Do I need to pay worker salaries apart from Project Hero charges?',
					answer: (
						<>
							Yes! Don’t bother yourself in processing payments of each worker on an individual basis. You
							can pay the weekly/monthly salaries of workers directly through our contractor web app. The
							contractor web app disburses the salaries to each worker immediately to their verified bank
							accounts.
						</>
					),
				},
				{
					question: 'What salary do I need to pay the workers?',
					answer: (
						<>
							Project Hero is a construction workforce marketplace. We are just a medium between
							contractors and workers. Contractors are free to mention any daily salary at which you want
							the workers during the time of booking.
							<br />
							However, we do suggest to please keep the price at the market rates otherwise workers may
							choose not to accept your job because of less salary.
						</>
					),
				},
				{
					question: 'What are the average market rates currently for construction workforce?',
					answer: (
						<>
							As per our latest data, the average market rates for all three skill levels across all job
							categories are:
							<br />
							<br />
							Helper: Rs 500-550
							<br />
							Technician: Rs 700-750
							<br />
							Supervisor: Rs 850-900
							<br />
							<br />
							At these rates, the job fill rate (No. of workers applied/No of workers required) of your
							booking can go as high as 200%
						</>
					),
				},
				{
					question: 'Do you also charge commission on worker salary?',
					answer: (
						<>
							No. Project Hero doesn’t charge any commission on the daily salary given by you to the
							workers via our contractor web app.
						</>
					),
				},
				{
					question: 'How do you process salaries of each worker?',
					answer: (
						<>
							We have both cycles for different types of contractors. Weekly or Monthly cycles are decided
							after we verify the contractor’s basis of our internal verification process. Our Project
							Hero expert can guide you better once you book workers with us.
						</>
					),
				},
			],
			[FAQTypes.WorkerAccommodation]: [
				{
					question: 'Do I have to provide the accommodation for the booked workers?',
					answer: (
						<>
							Yes, you would have to provide basic and hygienic accommodation to all our workers. Project
							Hero reserves the right to cancel the booking if the quality of accommodation is not up to
							the required standards.
						</>
					),
				},
				{
					question: 'I don’t have a ready accommodation for your workers, what should I do?',
					answer: (
						<>
							Apologies, we reserve the right to cancel your booking if there is no arrangement of
							accommodation for our workers
						</>
					),
				},
			],
			[FAQTypes.PfEsi]: [
				{
					question: `I do have PF and ESI components also in the salaries of my workforce. Does your contractor Web App have the provision of mentioning the same?`,
					answer: (
						<>
							Yes, during the time of the booking, you can input PF and ESI details. Please note that only
							put in hand salaries (remaining salary of a worker after removing PF & ESI component) in the
							daily wage section.
						</>
					),
				},
			],
			[FAQTypes.Onboarding]: [
				{
					question: `What documents are required in order to register at our contractor Web App and book worker?`,
					answer: (
						<>
							The registration process is quite simple. Apart from the regular details, we only ask for
							the GST number of your company for internal verification purposes. Go to <BookWorkerLink />{' '}
							now and give us your first booking!
						</>
					),
				},
				{
					question: `What if I don’t have GST number?`,
					answer: (
						<>
							Unfortunately, we are only serving customers who have valid GST numbers. However, don’t get
							disheartened, we are coming up with solutions for users who don’t have a valid GST number
							with them.
						</>
					),
				},
			],
			[FAQTypes.Bookings]: [
				{
					question: `I want to book workers, what should I do?`,
					answer: (
						<>
							Please click on <BookWorkerLink /> and log in to our contractor web app. After successful
							registration of your organization profile, please create a booking on our web app. Our
							Project Hero expert will reach out to you within 2 hours of booking received and will verify
							booking details. Once verification & payment is done, we make your booking live and soon you
							start noticing worker applications on your contractor web app.
							<br />
							<br />
							You need to provide the following things at the time of booking:
							<ul>
								<li>Job Category of Workers required</li>
								<li>No. of workers required (Helpers/Technicians/Supervisors)</li>
								<li>Daily salary of each skill type</li>
								<li>4-5 clear Project Site Pics</li>
								<li>4-5 clear Accommodation Pics</li>
								<li>PF & ESI component (Yes or No)</li>
								<li>Food Provided (Yes or No)</li>
								<li>Project Duration</li>
								<li>Shift Timing</li>
							</ul>
						</>
					),
				},
				{
					question: `I want to opt for discovery plan and book workers for my project site. What should I do?`,
					answer: (
						<>
							Please click on <BookWorkerLink /> and log in to our contractor web app. After successful
							registration with Project Hero, please create a booking on our web app. Our Project Hero
							expert will reach out to you within 2 hours of booking received and will verify booking
							details and will ask for your selected plan.
							<br />
							Once verification & payment is done, we make your booking live and you start noticing worker
							applications on your contractor web app right away!
						</>
					),
				},
				{
					question: `I want to opt for Fulfilment plan and book workers for my project site. What should I do?`,
					answer: (
						<>
							Please click on <BookWorkerLink /> and log in to our contractor web app. After successful
							registration with Project Hero, please create a booking on our web app. Our Project Hero
							expert will reach out to you within 2 hours of booking received and will verify booking
							details and will ask for your selected plan.
							<br />
							Once verification & payment is done, we make your booking live and you start noticing worker
							applications on your contractor Web App right away!
						</>
					),
				},
			],
			[FAQTypes.DeliveryTimelines]: [
				{
					question: `In how many days does Project Hero delivers the guaranteed job applicants, If I opt for the Discovery plan?`,
					answer: (
						<>
							You can check the profile of the job applicants as soon as your booking goes live and
							workers start applying to your booking. You can also check their phone numbers and connect
							with them. However, as per our past data, we have seen contractors getting up to 100 job
							applications within 5 days of their booking going live.
						</>
					),
				},
				{
					question: `In how many days does Project Hero delivers workers, If I opt for the Fulfilment plan?`,
					answer: (
						<>
							Project Hero promises to deliver the workers in 12 days of your booking going live. Please
							note that our Project Hero Expert will be in touch with you daily to give you regular
							updates about your booking progress.
							<br />
							You can also track workers in real time on your contractor web app and check how workers are
							moving from <strong>Applicant stage</strong> to Ready for <strong>Dispatch stage.</strong>
						</>
					),
				},
			],
			[FAQTypes.RefundReplacements]: [
				{
					question: `What if workers leave the site with in 2-3 days of joining my project?`,
					answer: (
						<>
							If you choose to go with our Fulfilment plan, we give you 7 Days no questions asked refund
							policy if any workers leave and deny working at your project site.
						</>
					),
				},
				{
					question: `In how many days does Project Hero delivers workers, If I opt for the Fulfilment plan?`,
					answer: (
						<>
							We provide 7 days no questions asked refund policy in our Fulfilment plan. However, if you
							want to have a monthly guarantee of replacement of churned workforce, please feel free to
							opt for our Retention Top-Up plan. For more details, please check out our <PlanLink /> page
							on the website.
						</>
					),
				},
			],
		},
	},
}

import { PHSupport } from './externalLinks'

export const contactUsSection = {
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
    us a call or drop us an email, we're here to help.`,
		mailAction: {
			label: 'General Queries',
			email: 'marketing@projecthero.in',
		},
		contactAction: { label: 'Inquiries', phone: `+91 ${PHSupport.phoneNumber}` },
	},
}

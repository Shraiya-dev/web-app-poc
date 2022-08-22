import { CalendarMonth, HelpCenterRounded, HomeRounded, InfoOutlined, PhoneInTalkRounded } from '@mui/icons-material'
import { ReactNode } from 'react'

interface Navbar {
	brandImage: string
	navLinks: {
		type: 'button_link' | 'primary_button' | 'support_menu' | 'scroll_link'
		label: string
		icon?: ReactNode
		link?: string
		menuOptions?: {}[]
	}[]
}
export const navbar: Navbar = {
	brandImage: '/assets/landing/ph-logo-light.svg',

	navLinks: [
		{
			type: 'button_link',
			label: '+91-9151003513',
			icon: <img src={'/assets/landingv2/phone.svg'} />,
			link: 'tel:+91-9151003513',
		},
		{
			type: 'scroll_link',
			label: 'How it works?',
			link: '/#how-it-works',
		},
		{
			type: 'button_link',
			label: 'Login',
			icon: <img src={'/assets/landingv2/user.svg'} />,
			link: '/',
		},
		{
			type: 'button_link',
			label: 'marketing@projecthero.in',
			icon: <img height={'30px'} width={'30px'} src='/assets/icons/mail.svg' />,
			link: 'mailto:marketing@projecthero.in',
		},
	],
}

import { CalendarMonth, HelpCenterRounded, HomeRounded, InfoOutlined, PhoneInTalkRounded } from '@mui/icons-material'
import { ReactNode } from 'react'

interface Navbar {
	brandImage: string
	navLinks: {
		type: 'button_link' | 'primary_button' | 'support_menu'
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
			type: 'button_link',
			label: 'How it works?',
			link: '/',
		},
		{
			type: 'button_link',
			label: 'Login',
			icon: <img src={'/assets/landingv2/user.svg'} />,
			link: '/login',
		},
	],
}

import { CalendarMonth, HelpCenterRounded, HomeRounded, InfoOutlined, PhoneInTalkRounded } from '@mui/icons-material'
import { ReactNode } from 'react'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'

interface Navbar {
	brandImage: string
	navLinks: {
		type: 'button_link' | 'primary_button' | 'support_menu' | 'scroll_link' | 'text_link'
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
			type: 'text_link',
			label: 'Home',
			link: '/',
		},
		{
			type: 'text_link',
			label: 'How it works?',
			link: '/how-it-works',
		},
		// {
		// 	type: 'text_link',
		// 	label: 'About us',
		// 	link: '/about-us',
		// },
		{
			type: 'text_link',
			label: 'Blog',
			link: '/blog',
		},
		{
			type: 'button_link',
			label: '+91-9151003513',
			icon: <img src={'/assets/landingv2/phone.svg'} />,
			link: 'tel:+91-9151003513',
		},

		{
			type: 'button_link',
			label: 'Login',
			icon: <img src={'/assets/landingv2/user.svg'} />,
			link: '/',
		},

		{
			type: 'button_link',
			label: 'Dashboard',
			icon: <DashboardRoundedIcon />,
			link: '/dashboard',
		},
	],
}

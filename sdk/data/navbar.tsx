import { CalendarMonth, HelpCenterRounded, HomeRounded, InfoOutlined } from '@mui/icons-material'
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
	brandImage: '/assets/landing/ph-logo-dark.svg',
	navLinks: [
		{
			type: 'button_link',
			label: 'Home',
			icon: <HomeRounded sx={{ fontSize: 36, color: 'primary.main' }} />,
			link: '/',
		},
		// {
		// 	type: 'button_link',
		// 	label: 'Plans',
		// 	icon: <CalendarMonth sx={{ fontSize: 36, color: 'primary.main' }} />,
		// 	link: '/hero/plans',
		// },
		{
			type: 'button_link',
			label: 'About Us',
			icon: <InfoOutlined sx={{ fontSize: 36, color: 'primary.main' }} />,
			link: '/about-us',
		},
		// {
		// 	type: 'support_menu',
		// 	label: 'Support',
		// },
		// {
		// 	type: 'button_link',
		// 	label: 'FAQs',
		// 	icon: <HelpCenterRounded sx={{ fontSize: 36, color: 'primary.main' }} />,
		// 	link: '/faq',
		// },
		{
			type: 'primary_button',
			label: 'Book Worker',
			link: '/login',
		},
	],
}

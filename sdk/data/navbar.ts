interface Navbar {
	brandImage: string
	navLinks: {
		type: 'button_link' | 'primary_button' | 'support_menu'
		label: string
		link?: string
		menuOptions?: {}[]
	}[]
}
export const navbar: Navbar = {
	brandImage: '/assets/landing/ph-logo-dark.svg',
	navLinks: [
		// {
		// 	type: 'button_link',
		// 	label: 'Plans',
		// 	link: '/landing/plans',
		// },
		// {
		// 	type: 'button_link',
		// 	label: 'About Us',
		// 	link: '/landing/about-us',
		// },
		// {
		// 	type: 'support_menu',
		// 	label: 'Support',
		// },
		// {
		// 	type: 'button_link',
		// 	label: 'FAQs',
		// 	link: '/landing/faq',
		// },
		{
			type: 'primary_button',
			label: 'Book Worker',
			link: '/login',
		},
	],
}

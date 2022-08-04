import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import React from 'react'
import { SvgBrandLogo } from '../components'
import Banner from '../../public/assets/icons/Banner.svg'
import { useMobile } from '../hooks'
import logo from '../../public/assets/icons/BrandLogo.svg'
import onboardingSvg from '../../public/assets/icons/onboardingBack.svg'
import { primary } from '../constants'

const intro = [
	{
		label: 'Book trained workers online',
	},
	{
		label: 'Supervise from your device',
	},
	{
		label: 'Achieve High Productivity',
	},
	{
		label: 'Increase Profit',
	},
	{
		label: '40,000+ Verified Workers',
	},
]

const CustomizeDashboard = styled(Box)(({ theme }) => ({
	minHeight: '100vh',
	minWidth: '100vw',
	display: 'flex',

	'.center': {
		flex: 1,
		paddingTop: 24,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundImage: ' url(assets/icons/onboardingBack.svg) ',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',

		//backgroundImage:onboardingSvg,
		// backgroundImage: `url(${onboardingSvg})`,
	},

	
	'.logoContainer': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	'.brandLogo': {
		height: 85,
		width: 218,
	},
	'.introBox': {
		minWidth: '80%',
	},
	//mobile view styles
	[theme.breakpoints.down('md')]: {
		flexDirection: 'column',
		'.instruction': {
			display: 'none',
		},
		'.logoContainer': {
			display: 'flex',
			justifyContent: 'start',
			width: '33.06%',
			marginLeft: 16,
		},
		'.brandLogo': {
			height: 44,
			width: 112,
		},
		'.left': {
			padding: '10px',
			display: 'flex',
			maxHeight: 124,
			alignItems: 'start',
		},
	},
}))

export const OnboardingLayout = ({ children, ...props }: any) => {
	const isMobile = useMobile()
	return (
		<CustomizeDashboard>
			<Stack direction={'row'} alignItems={'center'} mb={8} style={{ position: 'absolute', margin: 24 }}>
				<Image alt='logo' src={logo} />
			</Stack>
			<Stack className='center'>
				<Paper elevation={4} style={{ padding: 24, borderRadius: 8, width: isMobile ? 372 : 392, zIndex: 2 }}>
					{children}
				</Paper>
			</Stack>
		</CustomizeDashboard>
	)
}

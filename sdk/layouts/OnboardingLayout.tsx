import { Box, Grid, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import React from 'react'
import { SvgBrandLogo } from '../components'
import Banner from '../../public/assets/icons/Banner.svg'

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
export const OnboardingLayout = ({ children, ...props }: any) => {
	return (
		<CustomizeDashboard>
			<Stack className='left'>
				<Stack alignItems='flex-start'>
					<Box className='logoContainer'>
						{/* <SvgBrandLogo height={50} width={150} /> */}
						<Image src={Banner} alt='' className='brandLogo' width={300} height={200} />
					</Box>
					<Stack mt={8} width='fit-content' className='instruction'>
						{intro.map((x, index) => {
							return (
								<Stack
									mt={2}
									direction='row'
									spacing={5}
									width={'100%'}
									key={index}
									mb={2}
									alignItems='center'>
									{/* <Image src={Circle} alt='' height={15} width={25} /> */}
									<svg height='20' width='20'>
										<circle cx='10' cy='10' r='10' fill='#ffffff' />
									</svg>
									<Typography variant='h4' color={'white'} fontSize={24} fontWeight={600}>
										{x.label}
									</Typography>
								</Stack>
							)
						})}
					</Stack>
				</Stack>
			</Stack>
			<Stack className='right'>{children}</Stack>
		</CustomizeDashboard>
	)
}

const CustomizeDashboard = styled(Box)(({ theme }) => ({
	minHeight: '100vh',
	display: 'flex',

	'.left': {
		backgroundColor: theme.palette.primary.main,
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	'.right': {
		flex: 1,
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
		},
		'.brandLogo': {
			height: 44,
			width: 112,
		},
		'.left': {
			padding: '10px',
			display: 'flex',
			// maxHeight: 124,
			alignItems: 'start',
		},
	},
}))

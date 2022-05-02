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
				<Box className='logoContainer'>
					{/* <SvgBrandLogo height={50} width={150} /> */}
					<Image src={Banner} alt='' className='brandLogo' />
				</Box>
				<Stack width='fit-content' className='instruction'>
					{intro.map((x, index) => {
						return (
							<Stack direction='row' width={'100%'} key={index} mb={4}>
								{/* <Image src={Circle} alt='' height={15} width={25} /> */}
								<Typography variant='h5' color={'white'} fontSize={24} fontWeight={600}>
									{x.label}
								</Typography>
							</Stack>
						)
					})}
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
			maxHeight: 124,
			alignItems: 'start',
		},
	},
}))

// <Grid container>
// 	<Grid item xs={5.5} className='left'>
// 		<Stack spacing={4} justifyContent='center' alignItems='center'>
// 			<Image src={Logo} alt='' className='logo' />
// 			<Box className='introBox'>
// 				{intro.map((x, index) => {
// 					return (
// 						<Stack direction='row' spacing={4} width={'100%'} key={index} mb={1.5}>
// 							<Image src={Circle} alt='' height={15} width={25} />
// 							<Typography variant='h5' color={'white'}>
// 								{x.label}
// 							</Typography>
// 						</Stack>
// 					)
// 				})}
// 			</Box>
// 		</Stack>
// 	</Grid>
// 	<Grid item xs={6.5}>
// 		{children}
// 	</Grid>
// </Grid>

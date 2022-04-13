import { Box, Grid, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import React from 'react'
import { SvgBrandLogo } from '../components'
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
		// margin: '50px',
	},
	'.introBox': {
		minWidth: '80%',
	},
}))

export const OnboardingLayout = ({ children, ...props }: any) => {
	return (
		<CustomizeDashboard>
			<Stack className='left'>
				<Box className='logoContainer'>
					<SvgBrandLogo />
				</Box>
				<Stack width='fit-content'>
					{intro.map((x, index) => {
						return (
							<Stack direction='row' spacing={4} width={'100%'} key={index} mb={1.5}>
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

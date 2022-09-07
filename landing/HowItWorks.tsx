import { Button, Grid, Paper, Stack, styled, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import React from 'react'
import { FC } from 'react'
import { Section, theme } from 'sdk'

interface Props {}

const CustomHowItWorksStyle = styled(Box)(({ theme }) => ({
	'.font-Saira': {
		fontFamily: 'Saira ,sans-serif',
	},
	'.font-Karla': {
		fontFamily: 'Karla ,sans-serif',
	},
}))

const AnalyticsData = [
	{
		name: 'Bookings Received',
		data: '50k+',
	},
	{
		name: 'Workers Hired',
		data: '40k+',
	},
	{
		name: 'Contractor Served',
		data: '20k+',
	},
	{
		name: 'Skilled Heros Available',
		data: '4 Lakh',
	},
]

const profileDescription = [
	{
		heading: 'Verified Profiles',
		subHeading: '100% genuine workers with verified phone numbers',
		imgSrc: '/assets/landingv2/heroSection/checked.svg',
	},
	{
		heading: 'Hassle Free Hiring',
		subHeading: 'Get phone number of all the Heroes who have applied to your booking',
		imgSrc: '/assets/landingv2/heroSection/magnifineGlass.svg',
	},
	{
		heading: 'Skilled & Trained Heroes',
		subHeading: 'Heroes go through strict skill evaluation process & scored',
		imgSrc: '/assets/landingv2/heroSection/helmet.svg',
	},
]

export const HowItWorks: FC<Props> = () => {
	return (
		<CustomHowItWorksStyle>
			<Section
				sx={{
					maxHeight: '100vh',
				}}>
				<Stack direction={'column'} textAlign={'center'} spacing={3}>
					<Typography className='font-Saira' variant='h1'>
						How you can{' '}
						<span
							style={{
								color: theme.palette.success.dark,
							}}>
							book workers
						</span>{' '}
						<br />
						with us within{' '}
						<span
							style={{
								color: theme.palette.success.dark,
							}}>
							1 min
						</span>
					</Typography>
					<Typography className='font-Karla' variant='h3'>
						See how the Project Hero platform works
					</Typography>
				</Stack>
				<Stack
					direction={{ md: 'column', xs: 'column-reverse' }}
					width={'100%'}
					justifyContent={'center'}
					alignItems={'center'}
					spacing={4}
					mt={{ xs: '24px', md: '54px' }}>
					<Stack
						direction={'row'}
						justifyContent={{ xs: 'flex-start', sm: 'center', md: 'center', width: '100%' }}>
						<Button size='large'>Book Worker Now</Button>
					</Stack>
					<Paper
						elevation={10}
						sx={{
							maxWidth: '800px',
							width: { xs: '90%', sm: '80%', md: '55%' },
							aspectRatio: '2 / 1',
							p: 2,
						}}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quia totam vitae eveniet
						asperiores, rem deserunt ipsum. Hic eos animi, recusandae nisi, ullam neque magni aliquam maxime
						numquam, dolor odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, doloremque!
						Natus quibusdam mollitia impedit quia ipsum reiciendis, rem nisi voluptatibus, cum officia, vero
						voluptas velit pariatur a corrupti facilis neque!
					</Paper>
				</Stack>
			</Section>
			<Section
				backgroundColor='#fff'
				sx={{
					minHeight: '204px',
				}}>
				<Grid container spacing={{ xs: 4, md: 2 }}>
					{AnalyticsData.map((value, index) => {
						return (
							<Grid key={index} item xs={6} sm={3} md={3}>
								<Stack
									direction={'column'}
									spacing={{ xs: 0.5, md: 3 }}
									alignItems={{ xs: 'flex-start', md: 'center' }}>
									<Typography
										className='font-Saira'
										fontWeight={600}
										variant='h1'
										sx={{ color: '#E58A51;', fontSize: { xs: '36px', md: '42px !important' } }}>
										{value.data}
									</Typography>
									<Typography
										className='font-Karla'
										fontWeight={400}
										sx={{
											fontSize: { xs: '12px', md: '24px' },
										}}>
										{value.name}
									</Typography>
								</Stack>
							</Grid>
						)
					})}
				</Grid>
			</Section>
			<Section backgroundColor='#000'>
				<Grid container spacing={{ xs: 0, md: 2 }} py={{ xs: 2, md: 4 }}>
					{profileDescription.map((value, index) => {
						return (
							<Grid key={index} xs={12} sm={12} md={4}>
								<Stack
									direction={{ xs: 'row', md: 'column' }}
									alignItems={'center'}
									justifyContent={{ xs: 'center' }}
									spacing={{ xs: 1, md: 4 }}
									sx={{
										maxWidth: { xs: '350px', md: '276px' },
										minWidth: { xs: '350px', md: '276px' },
										maxHeight: { xs: '345px', md: '271px' },
									}}>
									<Box width={{ xs: '80px', md: '100px' }} height={{ xs: '80px', md: '100px' }}>
										<Image width={'100%'} height={'100%'} src={`${value.imgSrc}`} alt='' />
									</Box>
									<Stack
										direction={'column'}
										spacing={2}
										width={{ xs: '100%', md: '90%' }}
										sx={{
											paddingY: { xs: '20px' },
											paddingLeft: { xs: '10px' },
											textAlign: { xs: 'flex-start', md: 'center' },
										}}>
										<Typography
											variant='h3'
											className='font-Saira'
											fontWeight={500}
											sx={{ color: theme.palette.primary.main }}>
											{value.heading}
										</Typography>
										<Typography
											className='font-Karla'
											variant='h6'
											fontWeight={400}
											sx={{ color: '#fff' }}>
											{value.subHeading}
										</Typography>
									</Stack>
								</Stack>
							</Grid>
						)
					})}
				</Grid>
			</Section>
			<Section></Section>
		</CustomHowItWorksStyle>
	)
}

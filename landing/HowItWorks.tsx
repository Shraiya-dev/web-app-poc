import { Button, Grid, LinearProgress, Paper, Slider, Stack, styled, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import React, { createRef, useState } from 'react'
import { FC } from 'react'
import { Section, theme, useMobile } from 'sdk'
import { CarouselHowItWork } from 'sdkv2/components'
import AcUnitIcon from '@mui/icons-material/AcUnit'
//@ts-nocheck
import { Player, BigPlayButton } from 'video-react'
import 'video-react/dist/video-react.css'

interface Props {}

const CustomHowItWorksStyle = styled(Box)(({ theme }) => ({
	'.font-Saira': {
		fontFamily: 'Saira ,sans-serif',
	},
	'.font-Karla': {
		fontFamily: 'Karla ,sans-serif',
	},
	'.styledPaper': {
		background: '#fcfcfc',
		borderRadius: '10px',

		'& .video-react .video-react-big-play-button': {
			background: '#CD201F',
			borderRadius: '10px',
			height: '50px',
			aspectRatio: '2 / 3',
			borderColor: '#CD201F',
			'&:hover': {
				borderColor: '#CD201F',
				background: '#CD201F',
			},
			'&:focus': {
				borderColor: '#CD201F',
				background: '#CD201F',
			},
			':before': {
				color: '#fff',
			},
		},

		'& .video-react-control-bar': {
			borderRadius: '0px 0px 10px 10px',
		},
		'& .video-react-poster': {
			borderRadius: '10px',
			backgroundSize: 'cover',
		},
		'& .video-react': {
			borderRadius: '10px',
		},
		'& .video-react-video': {
			borderRadius: '10px',
		},
	},
}))

const CarouselData = [
	{
		index: '01',
		title: 'Job Posted',
		details: 'Quickly fill-in job details like project location and daily salary offered.',
		imgSrc: '/assets/landingv2/icons/booking.svg',
		bgColor: '#383838',
	},
	{
		index: '02',
		title: 'Login to Contractor Dashboard',
		details: 'After giving details, please login to our contractor dashboard by verifying your phone number',
		imgSrc: '/assets/landingv2/icons/like.svg',
		bgColor: '#383838',
	},
	{
		index: '03',
		title: 'Job Posting Goes Live',
		details: 'Congratulations! your job posting has gone live on our app for Heroes.',
		imgSrc: '/assets/landingv2/icons/layer.svg',
		bgColor: '#383838',
	},
	{
		index: '04',
		title: 'Heroes start applying to your job',
		details: 'Heroes start noticing your job on their app and start applying to your job with in 15 minutes.',
		imgSrc: '/assets/landingv2/icons/Helmet.svg',
		bgColor: '#383838',
	},
	{
		index: '05',
		title: 'Call & Hire Workers',
		details:
			'You start receiving hero applications with details like Phone Number, name, work-experience etc. Call them directly and offer them the job!',
		imgSrc: '/assets/landingv2/icons/Helmet.svg',
		bgColor: '#383838',
	},
	{
		index: '06',
		title: 'Constructions Workforce Found',
		details:
			'You have successfully found the best workforce across 10+ job categories. Post as many jobs as possible. It is absolutely FREE!',
		imgSrc: '/assets/landingv2/icons/hook.svg',
		bgColor: '#383838',
	},
]

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
	const rootRef = createRef()
	const [height, setHeight] = useState<string>('01')
	const isMobile = useMobile()

	return (
		<CustomHowItWorksStyle>
			<Section>
				<Stack
					alignItems={{ xs: 'flex-start', sm: 'center', md: 'center' }}
					marginTop={{ xs: '0', md: '80px' }}>
					<Typography
						variant='h1'
						fontSize={{ md: '36px', xs: '28px' }}
						fontFamily={'Saira ,sans-serif'}
						fontWeight={500}>
						How can you
						<Typography component={'span'} variant='inherit' color='success.dark' fontWeight={700}>
							{' '}
							Post
						</Typography>{' '}
						Your
						<Typography component={'span'} variant='inherit' color='success.dark' fontWeight={700}>
							{' '}
							Job
						</Typography>{' '}
					</Typography>
					<Typography
						variant='h1'
						fontSize={{ md: '36px', xs: '28px' }}
						fontFamily={'Saira ,sans-serif'}
						fontWeight={500}>
						for
						<Typography component={'span'} variant='inherit' color='success.dark' fontWeight={700}>
							{' '}
							Free
						</Typography>{' '}
						with in
						<Typography component={'span'} variant='inherit' color='success.dark' fontWeight={700}>
							{' '}
							1 minute
						</Typography>{' '}
					</Typography>
					<br />
					<Typography
						fontSize={{ md: '24px', xs: '16px' }}
						fontFamily='Karla ,sans-serif'
						fontWeight={400}
						marginTop={{ md: '15px', xs: '0px' }}>
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
						<Button
							size='large'
							sx={{
								fontFamily: 'Karla,sans-serif',
								fontWeight: 500,
								fontSize: { md: '20px', xs: '14px' },
							}}>
							Post Your Job Now
						</Button>
					</Stack>
					<Paper
						className='styledPaper'
						elevation={0}
						sx={{
							maxWidth: '800px',
							width: { xs: '100%', sm: '80%', md: '54%' },
							aspectRatio: '3 / 2',
							overflow: 'hidden',
							borderRadius: '10px',
						}}>
						<Player poster='/assets/icons/videoPoster.png'>
							<source src='https://storage.googleapis.com/ph-assets/project/ProjectHero_V2_How_it_works.mp4' />
							<BigPlayButton position={'center'} />
						</Player>
					</Paper>
				</Stack>
			</Section>
			{/* <Section
				sx={{
					maxHeight: '100vh',
				}}>
				<Stack direction={'column'} textAlign={'center'} spacing={3}>
					<Typography
						className='font-Saira'
						variant='h1'
						sx={{
							textAlign: { xs: 'left', md: 'center' },
						}}>
						How can you{' '}
						<Box
							component='span'
							sx={{
								color: theme.palette.success.dark,
							}}>
							POST{' '}
						</Box>
						your{' '}
						<Box
							component='span'
							sx={{
								color: theme.palette.success.dark,
							}}>
							JOB{' '}
						</Box>
						for{' '}
						<Box
							component='br'
							sx={{
								display: { md: 'inline', xs: 'none' },
							}}></Box>
						<Box
							component='span'
							sx={{
								color: theme.palette.success.dark,
							}}>
							FREE
						</Box>{' '}
						with in{' '}
						<Box
							component='span'
							sx={{
								color: theme.palette.success.dark,
							}}>
							1 minute?
						</Box>
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
						<Button
							size='large'
							sx={{
								fontFamily: 'Karla,sans-serif',
								fontWeight: 500,
								fontSize: { md: '20px', xs: '14px' },
							}}>
							Post Your Job Now
						</Button>
					</Stack>
					<Paper
						className='styledPaper'
						elevation={0}
						sx={{
							maxWidth: '800px',
							width: { xs: '100%', sm: '80%', md: '54%' },
							aspectRatio: '3 / 2',
							overflow: 'hidden',
							borderRadius: '10px',
						}}>
						<Player poster='/assets/icons/videoPoster.png'>
							<source src='https://storage.googleapis.com/ph-assets/project/ProjectHero_V2_How_it_works.mp4' />
							<BigPlayButton position={'center'} />
						</Player>
					</Paper>
				</Stack>
			</Section> */}
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

			<Box
				sx={{
					backgroundColor: '#000',
					backgroundImage: {
						md: 'url(/assets/icons/backgrounds/greybubbledown.svg)',
						xs: '',
					},
					backgroundPosition: { md: '0px 250px', xs: '0px 350px' },
					backgroundRepeat: 'no-repeat',
				}}>
				<Section>
					<Grid container spacing={{ xs: 0, md: 2 }} py={{ xs: 2, md: 4 }}>
						{profileDescription.map((value, index) => {
							return (
								<Grid item key={index} xs={12} sm={12} md={4}>
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
			</Box>
			<Section sx={{ minHeight: '659px' }}>
				<Stack direction={'column'} spacing={3}>
					<Box>
						<Typography
							fontSize={{ md: '36px', xs: '24px' }}
							fontFamily={' Saira,sans-serif'}
							fontWeight={600}>
							Booking Process
						</Typography>
						<Typography
							fontSize={{ xs: '12px', md: '20px' }}
							fontFamily={'Karla , sans-serif'}
							fontWeight={400}>
							Book workers in by following these steps
						</Typography>
					</Box>
					<Box
						width={'50%'}
						sx={{
							display: { xs: 'inline-block', md: 'none' },
						}}>
						<Button fullWidth size={'large'} sx={{ height: '60px' }}>
							Book Workers Now
						</Button>
					</Box>

					<Stack direction={'row'} spacing={{ md: 6, xs: 2 }} position='relative'>
						<Box height={{ md: 520, xs: 570 }}>
							<Slider
								orientation='vertical'
								track='inverted'
								defaultValue={20}
								value={90 - (Number(height) - 1) * 16}
								// onChange={({ target }) => {
								// 	const value = Math.floor((90 - target.value) / 16) + 1
								// 	setHeight(value < 10 ? '0' + value : '' + value)
								// }}
								sx={{
									color: '#77cfb5',
									// transform: 'rotate(180deg)',

									'& .MuiSlider-thumb': {
										backgroundImage: `url(/assets/landingv2/hat.svg)`,
										backgroundSize: 'cover',
										width: { md: 60, xs: 40 },
										height: { md: 60, xs: 40 },
									},
								}}
							/>
						</Box>
						{/* <Stack direction={'column'} spacing={{ md: 4, xs: 2 }}>
							{CarouselData.map((val, index) => (
								<Paper
									elevation={0}
									key={index}
									sx={{
										p: { md: 4, xs: 2 },
										background: val.bgColor !== '' ? val.bgColor : 'transparent',
									}}>
									<Stack direction={'row'} spacing={3}>
										<Stack
											direction={'row'}
											justifyContent={'center'}
											alignItems={'center'}
											sx={{
												minHeight: { md: '100px', xs: '56px' },
												minWidth: { md: '100px', xs: '56px' },
												maxHeight: { md: '100px', xs: '56px' },
												maxWidth: { md: '100px', xs: '56px' },
												borderRadius: '50%',
												background: '#fdf6dd',
											}}>
											<Box
												sx={{
													minHeight: { md: '56px', xs: '34px' },
													minWidth: { md: '56px', xs: '34px' },
													maxHeight: { md: '56px', xs: '34px' },
													maxWidth: { md: '56px', xs: '34px' },
												}}>
												<Image src={val.imgSrc} height={'100%'} width={'100%'} />
											</Box>
										</Stack>
										<Stack direction={'column'}>
											<Typography
												fontSize={{ xs: '14px', md: '24px' }}
												fontFamily={'Saira,sans-serif'}
												fontWeight={700}
												sx={{
													color: val.bgColor !== '' ? theme.palette.primary.main : '#000',
												}}>
												0{index + 1}
											</Typography>
											<Box>
												<Typography
													fontSize={{ xs: '14px', md: '24px' }}
													fontFamily={'Saira,sans-serif'}
													fontWeight={500}
													sx={{
														color: val.bgColor !== '' ? '#fff' : '#000',
													}}>
													{val.title}
												</Typography>
												<Typography
													fontSize={{ xs: '12px', md: '20px' }}
													fontFamily={'Karla,sans-serif'}
													fontWeight={400}
													sx={{
														color: val.bgColor !== '' ? '#fff' : '#000',
													}}>
													{val.details}
												</Typography>
											</Box>
										</Stack>
									</Stack>
								</Paper>
							))}
						</Stack> */}
						<Stack
							ref={rootRef}
							height={560}
							overflow={'auto'}
							sx={{
								':: -webkit-scrollbar': {
									display: 'none',
								},
							}}>
							{CarouselData?.map(({ index, title, details, imgSrc, bgColor }) => (
								<CarouselHowItWork
									key={index}
									handleSlide={(a) => {
										setHeight(a)
									}}
									root={rootRef}
									val={index}
									slide={height}>
									<Stack height={240}>
										<Paper
											elevation={0}
											key={index}
											sx={{
												p: { md: 4, xs: 2 },
												background: index === height ? bgColor : 'transparent',
												borderRadius: '16px',
											}}>
											<Stack direction={'row'} spacing={3}>
												<Stack
													direction={'row'}
													justifyContent={'center'}
													alignItems={'center'}
													sx={{
														minHeight: { md: '100px', xs: '56px' },
														minWidth: { md: '100px', xs: '56px' },
														maxHeight: { md: '100px', xs: '56px' },
														maxWidth: { md: '100px', xs: '56px' },
														borderRadius: '50%',
														background: index === height ? '#fff' : '#fdf6dd',
													}}>
													<Box
														sx={{
															minHeight: { md: '62px', xs: '34px' },
															minWidth: { md: '62px', xs: '34px' },
															maxHeight: { md: '62px', xs: '34px' },
															maxWidth: { md: '62px', xs: '34px' },
														}}>
														<Image src={imgSrc} height={'100%'} width={'100%'} />
													</Box>
												</Stack>
												<Stack direction={'column'}>
													<Typography
														fontSize={{ xs: '14px', md: '24px' }}
														fontFamily={'Saira,sans-serif'}
														fontWeight={700}
														sx={{
															color:
																index === height
																	? theme.palette.primary.main
																	: theme.palette.success.dark,
														}}>
														{index}
													</Typography>
													<Box>
														<Typography
															fontSize={{ xs: '14px', md: '24px' }}
															fontFamily={'Saira,sans-serif'}
															fontWeight={500}
															sx={{
																color: index === height ? '#fff' : '#000',
															}}>
															{title}
														</Typography>
														<Typography
															fontSize={{ xs: '12px', md: '20px' }}
															fontFamily={'Karla,sans-serif'}
															fontWeight={400}
															sx={{
																color: index === height ? '#fff' : '#000',
															}}>
															{details}
														</Typography>
													</Box>
												</Stack>
											</Stack>
										</Paper>
									</Stack>
								</CarouselHowItWork>
							))}
						</Stack>
					</Stack>
				</Stack>
			</Section>
		</CustomHowItWorksStyle>
	)
}

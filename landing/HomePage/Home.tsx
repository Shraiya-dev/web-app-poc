import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, Circle } from '@mui/icons-material'

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { Box, Button, Card, Grid, List, ListItem, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { CarouselV2, DataLayerPush, externalLinks, LinkButton, primary, Section, sendAnalytics, useMobile } from 'sdk'
import { HeroDiscoveryMetaData } from 'sdk/data/discoverHero'
import { homePage } from 'sdk/data/home'
import { sliceIntoChunks } from 'sdk/utils/arrayHelpers'
import { CreateBookingCard, JobCategoryCard } from 'sdkv2/components'
import { WorkerCard } from 'sdkv2/components/cards/WorkerCard'

const animation = { duration: 25000, easing: (t: number) => t }

export const Home = () => {
	const { jobSection } = homePage
	const isMobile = useMobile()
	const router = useRouter()
	const [sliderRef] = useKeenSlider<HTMLDivElement>({
		loop: true,
		renderMode: 'performance',
		drag: false,
		slides: { perView: 'auto' },
		created(s) {
			s.moveToIdx(5, true, animation)
		},
		updated(s) {
			s.moveToIdx(s.track.details.abs + 5, true, animation)
		},
		animationEnded(s) {
			s.moveToIdx(s.track.details.abs + 5, true, animation)
		},
	})

	const [jobTypeForCarousal, setJobTypeForCarousal] = useState('MASON')
	const isTab = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
	return (
		<>
			<Section>
				<Grid container spacing={2}>
					<Grid item xs={12} md={7.5}>
						{/* <Stack justifyContent='space-between' spacing={2}>
							<Stack alignItems={'center'} direction={{ md: 'row' }} justifyContent='space-between'>
								<Box
									sx={{
										marginTop: { xs: 2, md: 6 },
										width: '48%',
									}}>
									<img width='100%' src='/assets/landingv2/heroSection/heroImg1.png' />
								</Box>
								<Box
									sx={{
										marginBottom: { xs: 2, md: 6 },
										width: '48%',
									}}>
									<img width='100%' src='/assets/landingv2/heroSection/heroImg2.png' />
								</Box>
							</Stack>
							<Typography variant='h1' lineHeight='1.5' fontFamily={'Saira ,sans-serif'} fontWeight={600}>
								India&apos;s Largest & Most Trusted Platform to{' '}
								<Typography
									display='inline'
									variant='h1'
									color='primary.main'
									fontFamily={'Saira ,sans-serif'}
									fontWeight={600}>
									Hire Construction Workers
								</Typography>
								{!isMobile && (
									<img
										style={{ marginLeft: 30, marginBottom: -30 }}
										src='/assets/landingv2/heroSection/curlyArrow.svg'
									/>
								)}
							</Typography>
							<Stack direction='row' alignItems={'center'} spacing={3} mt='auto'>
								<img width={50} src='/assets/landingv2/heroSection/workerGreen.svg' />
								<Typography variant='h5'>
									<strong>4 Lac+</strong> construction workforce available
								</Typography>
							</Stack>
						</Stack> */}
						<Stack justifyContent='space-between' spacing={2} direction={{ xs: 'row', md: 'column' }}>
							<Stack>
								<Typography fontSize={{ xs: 12, sm: 20 }} variant='subtitle1' fontWeight={700}>
									India’s Largest & Most Trusted Platform to{' '}
									<Typography
										fontSize={'inherit'}
										display='inline'
										color='success.dark'
										variant='subtitle1'>
										Hire Construction Workers
									</Typography>
								</Typography>
								<Typography fontSize={{ xs: 12, sm: 20 }}>
									<strong>Free</strong> me job post karen aur construction workers ka number payen!
								</Typography>
							</Stack>
							<Box
								component='img'
								width={{ xs: 100, sm: '100%' }}
								height={{ xs: 100, sm: '80%' }}
								sx={{
									cursor: 'pointer',
								}}
								src={'/assets/landingv2/how-it-works-poster.svg'}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12} md={4.5} justifyContent='center' id='book-worker'>
						<CreateBookingCard />
					</Grid>
				</Grid>
			</Section>
			<Section backgroundColor='#000000'>
				<Box ref={sliderRef} className='keen-slider'>
					{jobSection.tagLine.map((item, index, arr) => (
						<Typography
							sx={{ minWidth: 'fit-content' }}
							display='flex'
							alignItems='center'
							key={index}
							className='keen-slider__slide'>
							<Typography noWrap variant='h6' color='common.white'>
								{item}
							</Typography>
							<Circle sx={{ fontSize: 8, color: 'common.white', mx: 2 }} />
						</Typography>
					))}
				</Box>
				<Stack p={3}>
					<Typography
						variant='h2'
						color='common.white'
						fontFamily={'Saira ,sans-serif'}
						fontWeight={600}
						fontSize={{ md: '32px', xs: '24px' }}>
						Explore{' '}
						<Typography
							variant='h2'
							color='primary'
							display='inline'
							fontFamily={'Saira ,sans-serif'}
							fontWeight={600}
							fontSize={{ md: '32px', xs: '24px' }}>
							Job Categories
						</Typography>{' '}
						and Book Workers{' '}
						<Typography
							variant='h2'
							color='primary'
							display='inline'
							fontFamily={'Saira ,sans-serif'}
							fontWeight={600}
							fontSize={{ md: '32px', xs: '24px' }}>
							in a minute
						</Typography>
					</Typography>
				</Stack>
				{/* <Tabs
					onChange={(e, v) => setJobTypeForCarousal(v)}
					value={jobTypeForCarousal}
					variant='fullWidth'
					scrollButtons={false}
					ScrollButtonComponent={(props) => {
						if (props.direction === 'left' && !props.disabled) {
							return (
								<Button variant='text' {...props}>
									<ArrowCircleLeftOutlined fontSize={'large'} sx={{ color: 'common.white' }} />
								</Button>
							)
						} else if (props.direction === 'right' && !props.disabled) {
							return (
								<Button variant='text' {...props}>
									<ArrowCircleRightOutlined fontSize={'large'} sx={{ color: 'common.white' }} />
								</Button>
							)
						} else {
							return null
						}
					}}>
					<CarouselV2
						componentPerView={5}
						items={jobSection.jobs.map((item) => (
							<Tab
								value={item.value}
								key={item.label}
								sx={{ color: 'common.white', textTransform: 'none' }}
								label={<JobCategoryCard src={item.image} label={item.label} />}
							/>
						))}
					/>
				</Tabs> */}

				<CarouselV2
					componentPerView={isMobile ? (isTab ? 6 : 3) : 7}
					mobileStepperPosition='center'
					icons={{
						left: (
							<ArrowCircleLeftOutlined
								sx={{
									color: 'common.white',
									fontSize: 40,
									position: !isMobile ? '' : 'absolute',
									top: !isMobile ? '' : '70px',
									left: !isMobile ? '' : '8px',
								}}
							/>
						),
						right: (
							<ArrowCircleRightOutlined
								sx={{
									color: 'common.white',
									fontSize: 40,
									position: !isMobile ? '' : 'absolute',
									top: !isMobile ? '' : '70px',
									right: !isMobile ? '' : '8px',
								}}
							/>
						),
					}}
					items={jobSection.jobs.map((item) => (
						<Button
							onClick={(e) => setJobTypeForCarousal(item.value)}
							variant='text'
							value={item.value}
							key={item.label}
							sx={(theme) => ({
								color: 'common.white',
								borderRadius: 0.5,
								textTransform: 'none',
								borderBottom:
									jobTypeForCarousal === item.value
										? `5px solid ${theme.palette.primary.main}`
										: undefined,
							})}>
							<JobCategoryCard src={item.image} label={item.label} />
						</Button>
					))}
					slideDelay={5000000}
				/>
				<CarouselV2
					mobileStepperPosition={isMobile ? 'bottom' : 'center'}
					componentPerView={1}
					items={sliceIntoChunks(
						HeroDiscoveryMetaData[jobTypeForCarousal],
						isMobile ? (isTab ? 4 : 2) : 6
					).map((slide, index) => {
						return (
							<Grid key={index} container py={3} spacing={2}>
								{slide.map((item: any) => (
									<Grid xs={11} mx={'auto'} sm={6} md={6} lg={4} item key={item.workerId}>
										<WorkerCard worker={item} />
									</Grid>
								))}
							</Grid>
						)
					})}
					slideDelay={5000}
				/>
			</Section>
			{/* <Section className='hide-on-mobile' backgroundColor={bookingJourneySection.backgroundColor}>
				<Stack spacing={2}>
					<Typography variant='h4' textAlign='center' color={bookingJourneySection.sectionTitle.color}>
						{bookingJourneySection?.sectionTitle.children}
					</Typography>
					<Grid container justifyContent={'center'} spacing={1}>
						{bookingJourneySection.journeySteps.map((item) => (
							<Grid item key={item.label}>
								<Stack
									px={2}
									py={1}
									sx={{
										color: item.color,
										backgroundColor: item.backgroundColor,
										borderRadius: '8px',
									}}>
									<Typography>{item.label}</Typography>
								</Stack>
							</Grid>
						))}
					</Grid>
				</Stack>
			</Section> */}

			<Section backgroundColor='#F7F7F7' id='how-it-works'>
				<Box pt={'24px'} pb={'66px'}>
					<Stack direction={'column'} mb={'32px'}>
						<Typography
							variant='h1'
							fontFamily={'Saira ,sans-serif'}
							fontWeight={600}
							fontSize={{ md: '32px', xs: '24px' }}>
							{homePage.howItWorksSection.heading}
						</Typography>
						<Typography
							variant='h4'
							fontFamily={'Saira ,sans-serif'}
							fontWeight={400}
							fontSize={{ md: '20px', xs: '12px' }}>
							{homePage.howItWorksSection.subHeading}
						</Typography>
					</Stack>
					<Box mb={'66px'}>
						<LinkButton
							variant='contained'
							sx={homePage.howItWorksSection.buttonSx}
							href={homePage.howItWorksSection.buttonText.link}
							onClick={() => {
								DataLayerPush({ event: 'discovery_book_worker', origin: 'how_it_works_section' })
								sendAnalytics({
									name: 'EasyBookWorker',
									action: 'ButtonClick',
									metaData: {
										origin: 'How it Works section',
									},
								})
							}}
							style={{
								padding: !isMobile ? '14px 64px' : '13px 45px',
							}}>
							{homePage.howItWorksSection.buttonText.text}
						</LinkButton>
					</Box>
					<Box
						sx={{
							width: '100%',
						}}>
						<Box
							component={'img'}
							sx={{
								content: {
									xs: `url(${'/assets/landingv2/heroSection/howitworksMobile.svg'})`,
									md: `url(${'/assets/landingv2/heroSection/howitworks.svg'})`,
								},
								width: '100%',
							}}
						/>
					</Box>
				</Box>
			</Section>

			{/* <Section backgroundColor={benefitFromHeroSection.backgroundColor}>
				<Carousel
					componentPerView={isMobile ? 1 : 3}
					items={[
						...benefitFromHeroSection.benefits.map((item, index) => (
							<Stack
								key={index}
								sx={{
									borderRadius: '12px',
									backgroundColor: item.backgroundColor,
									p: 2,
									pb: 4,
									maxWidth: 380,
									height: 170,
								}}>
								<Stack flex={1} direction='row' justifyContent='space-between'>
									<Stack>
										<Typography color={item.color}>{item.header.left.icon}</Typography>
										<Typography color={item.color}>{item.header.left.caption}</Typography>
									</Stack>
									<Image src={item.header.right.image} width={70} height={70} />
								</Stack>
								<Typography color={item.color}>{item.description}</Typography>
							</Stack>
						)),
					]}
				/>
			</Section> */}

			{/* why you should hire section */}

			<Section backgroundColor='#000'>
				<Box
					sx={{
						padding: '46px 0 70px 0',
					}}>
					<Grid
						container
						sx={{
							flexDirection: { xs: 'column', md: 'row' },
						}}>
						<Grid
							item
							md={6}
							xs={12}
							sx={{
								mb: { xs: 6 },
							}}>
							<Stack direction={'column'} spacing={4}>
								<Box>{homePage.whyYouShouldHire.left.heading}</Box>
								<Box>
									<LinkButton
										sx={homePage.whyYouShouldHire.left.buttonSx}
										href={homePage.howItWorksSection.buttonText.link}
										onClick={() => {
											DataLayerPush({
												event: 'discovery_book_worker',
												origin: 'why_you_should_hire_section',
											})
											sendAnalytics({
												name: 'EasyBookWorker',
												action: 'ButtonClick',
												metaData: {
													origin: 'why You Should Hire section',
												},
											})
										}}
										style={{
											padding: !isMobile ? '14px 64px' : '15px 45px',
										}}>
										{homePage.whyYouShouldHire.left.buttonText.text}
									</LinkButton>
								</Box>
							</Stack>
						</Grid>

						<Grid item xs={6}>
							<Grid
								container
								spacing={4}
								sx={{
									width: { xs: 'fit-content' },
								}}>
								{homePage.whyYouShouldHire.right.item.map((data, index) => {
									return (
										<Grid key={index} item xs={12} md={6}>
											<Stack direction={'row'} spacing={2} width={'310px'}>
												<Box sx={homePage.whyYouShouldHire.right.indexSx}>
													<Typography
														variant='h2'
														color={'#EFC430'}
														fontFamily={'Saira , sans-serif'}
														fontSize={{ md: '28px', xs: '21px' }}
														fontWeight={600}>
														0{index + 1}
													</Typography>
												</Box>
												<Box>
													<Stack direction={'column'} sx={{ color: '#fff' }} spacing={2}>
														<Typography
															variant='h4'
															sx={{
																color: homePage.whyYouShouldHire.right.itemTextColor,
															}}
															fontFamily={'Saira , sans-serif'}
															fontSize={{ md: '24px', xs: '16px' }}
															fontWeight={500}>
															{data.heading}
														</Typography>
														<Typography
															variant='h5'
															fontFamily={'Saira , sans-serif'}
															fontSize={{ md: '16px', xs: '12px' }}
															fontWeight={400}>
															{data.desc}
														</Typography>
													</Stack>
												</Box>
											</Stack>
										</Grid>
									)
								})}
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Section>

			{/* end why you should hire section */}

			{/* hire your construction section  */}
			{/* <Section backgroundImage={hireConstructionSection.backgroundImage}>
				<Stack
					direction='row'
					sx={{
						overflowX: 'auto',
						alignItems: 'center',
						p: 2,
					}}>
					<Typography sx={{ flex: 1, minWidth: '50%' }} fontSize={{ xs: 20, md: 36 }}>
						Why you should
						<br /> <strong>hire your</strong> construction
						<br /> workforce from <br />
						<strong>Project Hero?</strong>
						<br />
					</Typography>
					<Grid
						container
						spacing={{ xs: 2, md: 4 }}
						flexWrap={{ xs: 'nowrap', md: 'wrap' }}
						sx={{ margin: 0, padding: 0, flex: 1 }}>
						{hireConstructionSection.cards.map((data, index) => {
							return (
								<Grid
									key={index}
									item
									xs={12}
									md={6}
									alignItems='center'
									sx={(theme) => ({
										top: data.marginTop,
										[theme.breakpoints.down('md')]: {
											top: 0,
										},
									})}>
									<Card
										elevation={5}
										sx={{
											borderLeft: '8px solid',
											borderColor: data.color,
											width: '200px',
											height: '240px',
										}}>
										<CardMedia
											component='img'
											image={data.svg}
											sx={{ width: '54px', height: '54px' }}
										/>
										<CardContent sx={{ marginBottom: '14px' }}>
											<Typography fontSize='20px' fontWeight='700' color='data.color'>
												{data.header}
											</Typography>
											<Typography fontSize='14px' fontWeight='400'>
												{data.description}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							)
						})}
					</Grid>
				</Stack>
			</Section> */}

			{/* hero advantage section */}

			<Section
				backgroundColor='#F7F7F7'
				boxSx={{
					background: !isMobile
						? 'linear-gradient(100deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 51%, rgba(246,242,225,1) 51%, rgba(246,242,225,1) 100%)'
						: undefined,
				}}
				sx={{
					backgroundSize: { xs: '95%', md: '50%' },
					backgroundRepeat: 'no-repeat',
					backgroundImage: {
						md: `url(${'/assets/landingv2/heroSection/heroAdvantage.svg'})`,
						xs: `url(${'/assets/landingv2/heroSection/heroAdvantageMobile.svg'})`,
					},
					backgroundPosition: { md: 'right', xs: 'right bottom' },
					minHeight: { md: '600px', xs: '880px' },
				}}>
				<Box
					sx={{
						p: '46px 0px',
						overflowX: 'hidden',
					}}>
					<Grid container spacing={8}>
						<Grid item xs={12} md={6}>
							<Stack direction={'column'} spacing={4}>
								<Stack direction={'column'} spacing={2}>
									<Box>{homePage.HeroAdvantage.Heading}</Box>
									<Box>{homePage.HeroAdvantage.subHeading}</Box>
								</Stack>
								<Box>
									<LinkButton
										href={homePage.HeroAdvantage.buttonText.link}
										sx={{
											p: { md: '14px 64px', xs: '13px 45px' },
											fontWeight: '500',
											fontSize: { md: '20px', xs: '14px' },
											fontFamily: 'Karla , sans-serif',
										}}
										// href='/login'
										onClick={() => {
											DataLayerPush({
												event: 'discovery_book_worker',
												origin: 'hero_advantage_section',
											})
											sendAnalytics({
												name: 'EasyBookWorker',
												action: 'ButtonClick',
												metaData: {
													origin: 'Hero Advantage section',
												},
											})
										}}>
										{homePage.HeroAdvantage.buttonText.text}
									</LinkButton>
								</Box>
							</Stack>
						</Grid>
						<Grid item xs={12} md={6}>
							{/* <Box>
								<img src='/assets/landingv2/heroSection/heroAdvantage.svg' alt='' />
							</Box> */}
						</Grid>
					</Grid>
				</Box>
			</Section>

			<Section backgroundColor='#000'>
				<Box
					sx={{
						p: '46px 0 60px 0',
					}}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Stack direction={'column'}>
								<Box mb={'14px'}>{homePage.heroApp.heading}</Box>
								<Box mb={'40px'}>{homePage.heroApp.desc}</Box>
								<List sx={{ color: '#fff' }}>
									{homePage.heroApp.list.map((data, index) => {
										return (
											<ListItem key={index} sx={{ mb: '24px' }}>
												<Stack direction={'row'} spacing={1.5} alignItems={'center'}>
													<FiberManualRecordIcon
														sx={{
															fontSize: '8px',
														}}
													/>
													<Typography
														variant='h4'
														sx={{
															fontWeight: 400,
															fontSize: { md: '20px', xs: '16px' },
															fontFamily: 'Karla , sans-serif',
														}}>
														{data.item}
													</Typography>
												</Stack>
											</ListItem>
										)
									})}
								</List>
								<Typography
									variant='h4'
									color={'#fff'}
									sx={{
										fontWeight: 400,
										fontSize: { md: '24px', xs: '16px' },
										fontFamily: 'Karla , sans-serif',
									}}>
									Download Now!
								</Typography>
								<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
									<a
										href={externalLinks.heroApp}
										onClick={() => {
											sendAnalytics({
												name: 'heroAppPlayStore',
												action: 'ButtonClick',
												metaData: {
													origin: 'Hero App section',
												},
											})
										}}
										target='_blank'
										rel='noopener noreferrer'>
										<img src='/assets/landingv2/heroSection/googlebutton.svg' alt='' />
									</a>
								</Box>
							</Stack>
						</Grid>
						<Grid item xs={12} md={6}>
							<Stack direction={'row'} justifyContent={'center'} alignItems='flex-end'>
								<Box sx={{ maxWidth: '75%', maxHeight: '100%', mr: '-25%', zIndex: '4' }}>
									<img
										width={'100%'}
										height={'100%'}
										src='/assets/landingv2/heroSection/mobile2.svg'
										alt=''
									/>
								</Box>
								<Box
									sx={{
										maxWidth: '65%',
										maxHeight: '90%',
										zIndex: '2',
										mb: { md: 1.8, xs: 1.2 },
									}}>
									<img
										width={'100%'}
										height={'100%'}
										src='/assets/landingv2/heroSection/mobile1.svg'
										alt=''
									/>
								</Box>
							</Stack>
						</Grid>
					</Grid>
				</Box>
			</Section>

			{/* what are you section  */}

			<Section backgroundColor='#F7F7F7'>
				<Box
					sx={{
						padding: '46px 0px',
						userSelect: 'none',
					}}>
					<Stack
						direction={'column'}
						spacing={4}
						sx={(theme) => ({
							width: '100%',
							'.leftQuote': { position: 'absolute', zIndex: -1, top: -40, left: -60 },
							'.rightQuote': { position: 'absolute', bottom: -30, right: 0 },
							'.helmet': {
								marginRight: '20%',
							},
							[theme.breakpoints.down('md')]: {
								'.leftQuote': { display: 'none' },
								'.rightQuote': { display: 'none' },
								'.helmet': { display: 'none' },
							},
						})}>
						<Stack direction='row' justifyContent={'space-between'}>
							{homePage.customerReview.heading}
							<img className='helmet' src='/assets/icons/backgrounds/Helmet.svg' />
						</Stack>
						<CarouselV2
							componentPerView={1}
							items={homePage.customerReview.cards.map((item, index) => {
								return (
									<Stack
										key={item.by}
										py={5}
										mx={2}
										position='relative'
										direction={'row'}
										justifyContent={'center'}>
										<Card
											sx={(theme) => ({
												display: 'flex',
												flexDirection: { sx: 'column', md: 'row' },
												maxWidth: 800,
												zIndex: 12,
												position: 'relative',
												overflow: 'visible',
												backgroundColor: theme.palette.primary.main,
											})}>
											<img className='leftQuote' src='/assets/landingv2/icons/quoteup.svg' />
											<img className='rightQuote' src='/assets/landingv2/icons/quotedown.svg' />

											<Stack
												height={{ xs: 450, md: 350 }}
												spacing={3}
												p={4}
												alignItems='center'
												justifyContent='center'>
												<Typography
													textAlign='center'
													variant='h5'
													fontSize={{ xs: '12px', md: '16px' }}
													fontWeight='500'
													fontFamily={'Saira,sans-serif'}
													color={primary.properDark}>
													{item.testimonial}
												</Typography>
												<Typography
													textAlign='center'
													variant='h5'
													fontSize={{ xs: '14px', md: '16px' }}
													fontWeight='600'
													fontFamily={'Saira,sans-serif'}
													color={primary.properDark}>
													- {item.by}
												</Typography>
											</Stack>
										</Card>
									</Stack>
								)
							})}
						/>

						<Stack
							direction={'row'}
							spacing={2}
							justifyContent={'space-between'}
							sx={{
								overflowX: 'scroll',
								width: '100%',
								mt: '50px',
								'&::-webkit-scrollbar': {
									display: 'none',
								},
							}}>
							{homePage.customerReview.ImageList.map((val, index) => {
								return (
									<ListItem key={index}>
										<img src={val.src} alt='' />
									</ListItem>
								)
							})}
						</Stack>
					</Stack>
				</Box>
			</Section>
		</>
	)
}

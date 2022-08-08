import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, Circle, FormatQuote } from '@mui/icons-material'

import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	styled,
	Tab,
	Tabs,
	Typography,
} from '@mui/material'
import { ContactUsSection } from 'landing/components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
	AppStoreImage,
	ButtonClicked,
	Carousel,
	DataLayerPush,
	externalLinks,
	FloatingUnderLineHeading,
	HyperLink,
	LinkButton,
	primary,
	Section,
	theme,
	useMobile,
} from 'sdk'
import { homePage } from 'sdk/data/home'
import { CreateBookingCard, JobCategoryCard } from 'sdkv2/components'
import { WorkerCard } from 'sdkv2/components/cards/WorkerCard'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useKeenSlider } from 'keen-slider/react'

const animation = { duration: 25000, easing: (t: number) => t }

export const Home = () => {
	const {
		jobSection,
		bookingJourneySection,
		benefitFromHeroSection,
		supportCarouselSection,
		customerSayingSection,
		hireConstructionSection,
		phAdvantage,
		phApp,
		clientCarouselSection,
	} = homePage
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
	return (
		<>
			<Section>
				<Grid container spacing={2}>
					<Grid item xs={12} md={7.5}>
						<Stack justifyContent='space-between' spacing={2}>
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
							<Typography variant='h1' lineHeight='1.5'>
								India&apos;s Largest & Most Trusted Platform to{' '}
								<Typography display='inline' variant='h1' color='primary.main'>
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
					<Typography variant='h2' color='common.white'>
						Explore{' '}
						<Typography variant='h2' color='primary' display='inline'>
							Job Categories
						</Typography>{' '}
						and Book Workers{' '}
						<Typography variant='h2' color='primary' display='inline'>
							in a minute
						</Typography>
					</Typography>
				</Stack>
				<Tabs
					sx={{ mx: !isMobile ? -2 : 1, overflowX: 'hidden' }}
					value='Masons'
					variant='scrollable'
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
					{jobSection.jobs.map((item) => (
						<Tab
							value={item.label}
							key={item.label}
							sx={{ color: 'common.white' }}
							label={<JobCategoryCard src={item.image} label={item.label} />}
						/>
					))}
				</Tabs>
				<Grid container py={3} spacing={2}>
					{jobSection.workers.map((item) => (
						<Grid md={4} item key={item.workerId}>
							<WorkerCard worker={item as any} />
						</Grid>
					))}
				</Grid>
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
						<Typography variant='h1'>{homePage.howItWorksSection.heading}</Typography>
						<Typography variant='h4'>{homePage.howItWorksSection.subHeading}</Typography>
					</Stack>
					<Box mb={'66px'}>
						<Button
							variant='contained'
							sx={homePage.howItWorksSection.buttonSx}
							href='/login'
							onClick={() => {
								DataLayerPush({ event: 'book_hero_home_footer' })
							}}>
							{homePage.howItWorksSection.buttonText.text}
						</Button>
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
									<Button
										sx={homePage.whyYouShouldHire.left.buttonSx}
										href='/login'
										onClick={() => {
											DataLayerPush({ event: 'book_hero_home_footer' })
										}}>
										{homePage.whyYouShouldHire.left.buttonText.text}
									</Button>
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
													<Typography variant='h2' color={'#EFC430'}>
														0{index + 1}
													</Typography>
												</Box>
												<Box>
													<Stack direction={'column'} sx={{ color: '#fff' }} spacing={2}>
														<Typography
															variant='h4'
															sx={{
																color: homePage.whyYouShouldHire.right.itemTextColor,
															}}>
															{data.heading}
														</Typography>
														<Typography variant='h5'>{data.desc}</Typography>
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
				sx={{
					backgroundImage: !isMobile
						? `url(${'/assets/landingv2/heroSection/heroAdvantage.svg'})`
						: `url(${'/assets/landingv2/heroSection/heroAdvantageMobile.svg'})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: !isMobile ? 'right' : 'bottom',
					minHeight: !isMobile ? '600px' : '880px',
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
											p: '20px 66px',
											fontWeight: '900',
										}}
										// href='/login'
										onClick={() => {
											DataLayerPush({ event: 'book_hero_home_footer' })
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
													<Typography variant='h4' sx={{ fontWeight: 400, fontSize: '20px' }}>
														{data.item}
													</Typography>
												</Stack>
											</ListItem>
										)
									})}
								</List>
								<Typography variant='h4' color={'#fff'}>
									Download Now!
								</Typography>
								<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
									<a
										href={externalLinks.heroApp}
										onClick={() => {
											ButtonClicked({
												page: document.title,
												action: 'App store link',
												url: router.asPath,
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
					}}>
					<Stack direction={'column'} spacing={4} sx={{ width: '100%' }}>
						<Box>{homePage.customerReview.heading}</Box>
						<Stack direction={'row'} justifyContent={'center'}>
							<Card
								sx={{
									display: 'flex',
									flexDirection: isMobile ? 'column' : 'row',
									maxWidth: 800,
									height: isMobile ? 500 : 300,
								}}>
								<CardMedia
									component='img'
									sx={{
										background: 'cover',
									}}
									height={isMobile ? '300' : '300'}
									image={homePage.customerReview.card.cardImageSrc}
								/>
								<CardContent
									sx={{
										background: theme.palette.primary.main,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: isMobile ? 500 : 300,
									}}>
									<Typography variant='body2' color={primary.properDark}>
										{homePage.customerReview.card.cardText}
									</Typography>
								</CardContent>
							</Card>
						</Stack>
						<Stack
							direction={'row'}
							spacing={2}
							justifyContent={'space-between'}
							sx={{
								overflowX: 'scroll',
								width: !isMobile ? '100%' : '100%',
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

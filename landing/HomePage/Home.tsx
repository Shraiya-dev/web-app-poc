import { ArrowBack, ArrowCircleLeftOutlined, ArrowCircleRightOutlined, Circle, FormatQuote } from '@mui/icons-material'

import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	Tab,
	Tabs,
	Typography,
} from '@mui/material'
import { ContactUsSection } from 'landing/components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
	AppStoreImage,
	Carousel,
	DataLayerPush,
	externalLinks,
	FloatingUnderLineHeading,
	HyperLink,
	LinkButton,
	Section,
	useMobile,
} from 'sdk'
import { homePage } from 'sdk/data/home'
import { CreateBookingCard, JobCategoryCard } from 'sdkv2/components'
import { WorkerCard } from 'sdkv2/components/cards/WorkerCard'

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
					<Grid item xs={12} md={4.5} justifyContent='center'>
						<CreateBookingCard />
					</Grid>
				</Grid>
			</Section>
			<Section backgroundColor='#000000'>
				<Stack direction='row' alignItems='center' spacing={2}>
					{jobSection.tagLine.map((item, index, arr) => (
						<>
							<Typography variant='h6' key={item}>
								{item}
							</Typography>
							{index < arr.length - 1 && <Circle sx={{ fontSize: 8, color: 'common.white' }} />}
						</>
					))}
				</Stack>
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
					sx={{ mx: -5 }}
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
			<Section className='hide-on-mobile' backgroundColor={bookingJourneySection.backgroundColor}>
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
			</Section>
			<Section backgroundColor={benefitFromHeroSection.backgroundColor}>
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
			</Section>
			{/* hire your construction section  */}
			<Section backgroundImage={hireConstructionSection.backgroundImage}>
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
			</Section>
			<Section backgroundColor={supportCarouselSection.backgroundColor}>
				<Carousel
					componentPerView={isMobile ? 1 : 3}
					items={[
						...supportCarouselSection.carouselContent.map((item, index) => (
							<Stack
								width={350}
								height={80}
								key={index}
								sx={{
									position: 'relative',
									borderRadius: '12px',
								}}>
								<HyperLink href={item.link}>
									<Image
										onClick={() => {
											DataLayerPush({
												event: 'book_worker_home_card',
											})
										}}
										src={item.image}
										layout='fill'
									/>
								</HyperLink>
							</Stack>
						)),
					]}
				/>
			</Section>
			{/* ph advantage section  */}

			<Section>
				<Stack direction='column'>
					<FloatingUnderLineHeading variant='h3' underlinePosition='flex-start'>
						{phAdvantage.heading}
					</FloatingUnderLineHeading>
					<Typography variant='subtitle1' sx={{ maxWidth: 600 }}>
						{phAdvantage.description}
					</Typography>
					<Grid container mt={10}>
						{phAdvantage.advantage.map((data, index) => {
							return (
								<Grid key={index} item xs={12} md={2.4}>
									<Stack
										direction={{ xs: 'row', md: 'column' }}
										spacing={2}
										p={2}
										alignItems='center'
										justifyContent='center'
										sx={(theme) => ({
											height: '231px',
											width: '214px',
											border: '1px solid #BABABA',
											borderRadius: '12px',
											marginBottom: '0px',
											transition: '0.3s all ease',
											':hover': {
												boxShadow: '10px 10px 30px -10px #aaaaaa',
											},
											[theme.breakpoints.down('md')]: {
												height: '120px',
												width: '100%',
												marginBottom: '20px',
											},
										})}>
										<img src={data.svg} alt='' height={'107px'} width='97px' />
										<Stack flex={1} direction={'column'} sx={{ padding: '0 10px' }}>
											<Typography variant='h6'>{data.header}</Typography>
											<Typography variant='subtitle2'>{data.description}</Typography>
										</Stack>
									</Stack>
								</Grid>
							)
						})}
					</Grid>
				</Stack>
			</Section>
			<Section backgroundColor={phApp.backgroundColor}>
				<Grid container>
					<Grid item xs={12} md={5} minHeight={270}>
						<Stack spacing={4}>
							<Stack>
								<FloatingUnderLineHeading variant='h3' underlinePosition='flex-start'>
									{phApp.heading}
								</FloatingUnderLineHeading>
								<Typography sx={{ my: 2 }} color={'grey.A700'}>
									{phApp.description}
								</Typography>
							</Stack>
							<List>
								{phApp.bulletPoints.map((item, index) => {
									return (
										<ListItem key={index} sx={{ px: 0 }}>
											<ListItemIcon>{phApp.bulletPointIcon}</ListItemIcon>
											<ListItemText>{item}</ListItemText>
										</ListItem>
									)
								})}
							</List>
							<Stack display={{ xs: 'none', md: 'flex' }}>
								<Typography sx={{ mb: 2 }} color={'grey.A700'}>
									Download our app from
								</Typography>
								<a href={externalLinks.heroApp} target='_blank' rel='noopener noreferrer'>
									<img src={AppStoreImage} width={190} />
								</a>
							</Stack>
						</Stack>
					</Grid>
					<Grid item xs={12} md={7} minHeight={270}>
						<Image src={phApp.appImage} layout='fill' />
					</Grid>
					<Grid item xs={12} md={7} flexDirection='column' mt={2} display={{ xs: 'flex', md: 'none' }}>
						<LinkButton variant='contained' fullWidth href={externalLinks.heroApp}>
							GET THE APP NOW
						</LinkButton>
					</Grid>
				</Grid>
			</Section>
			<Section backgroundImage={customerSayingSection.backgroundImage} sx={{ py: 8 }}>
				<FloatingUnderLineHeading variant='h3' underlinePosition='flex-start'>
					{customerSayingSection.title}
				</FloatingUnderLineHeading>
				<Carousel
					componentPerView={isMobile ? 1 : 2}
					items={[
						...customerSayingSection.carouselContent.map((item, index) => (
							<Paper
								elevation={3}
								key={index}
								sx={(theme) => ({
									position: 'relative',
									borderRadius: '12px',
									width: '45%',
									margin: '5%',
									[theme.breakpoints.down('md')]: {
										width: '90%',
									},
								})}>
								<Stack p={3} alignItems='center' minHeight={270}>
									<Typography
										fontSize={(theme) => ({
											xs: theme.typography.h6.fontSize,
											md: theme.typography.h4.fontSize,
										})}
										fontWeight={700}>
										{item.title}
									</Typography>
									<FormatQuote color='primary' sx={{ my: 1 }} />
									<Typography
										textAlign='center'
										fontSize={(theme) => ({
											xs: theme.typography.caption.fontSize,
											md: theme.typography.body1.fontSize,
										})}>
										{item.description}
									</Typography>
								</Stack>
							</Paper>
						)),
					]}
				/>
			</Section>
			<Section backgroundColor={clientCarouselSection.backgroundColor}>
				<Stack alignItems='center'>
					<FloatingUnderLineHeading variant='h4' textAlign='center' sx={{ margin: 'auto' }}>
						{clientCarouselSection.heading}
					</FloatingUnderLineHeading>
				</Stack>
				<Carousel
					componentPerView={isMobile ? 1 : 3}
					items={[
						...clientCarouselSection.carouselContent.map((item, index) => (
							<Stack
								width={350}
								height={80}
								key={index}
								sx={{
									position: 'relative',
									borderRadius: '12px',
								}}>
								<Image src={item} layout='fill' />
							</Stack>
						)),
					]}
				/>
			</Section>
			{/* have a question section */}
			<ContactUsSection />
		</>
	)
}

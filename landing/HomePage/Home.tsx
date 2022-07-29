import { FormatQuote } from '@mui/icons-material'
import {
	Card,
	CardContent,
	CardMedia,
	Chip,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
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
import { analyticsEvents } from 'sdk/analytics/analyticsWrapper'
import { homePage } from 'sdk/data/home'

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
				<Grid container>
					<Grid item flex={1} xs={5} display={{ xs: 'none', md: 'flex' }}>
						<Stack alignItems='flex-start' spacing={5}>
							<Typography variant='h4'>
								India&apos;s largest <strong>skilled construction workforce marketplace</strong>
							</Typography>
							{/*<LinkButton href='/hero/plans' sx={{ px: 6 }} variant='outlined'>
									View Plans
								</LinkButton>*/}
							<Stack direction='row' spacing={5}>
								<Stack direction='row' spacing={2}>
									<Image
										src='/assets/landing/statIcon.svg'
										width={55}
										height={55}
										alt='hero Banner'
									/>
									<Stack>
										<Typography color='base.variant70' fontWeight={700}>
											4 Lac+
										</Typography>
										<Typography color='base.variant70'>workforce</Typography>
									</Stack>
								</Stack>
								<Stack direction='row' spacing={2}>
									<Image
										src='/assets/landing/thunderIcon.svg'
										width={55}
										height={55}
										alt='hero Banner'
									/>
									<Stack>
										<Typography color='warning.main' fontWeight={700}>
											10+ Job
										</Typography>
										<Typography color='warning.main'>categories</Typography>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
					</Grid>
					<Grid
						item
						xs={5}
						md={3}
						sx={(theme) => ({
							img: {
								width: '125%',
								[theme.breakpoints.down('md')]: {
									width: '120%',
								},
							},
						})}>
						<picture>
							<source media='(min-width:900px)' srcSet='/assets/landing/bannerImage.png' />
							<source media='(max-width:900px)' srcSet='/assets/landing/mobileBaner.png' />
							<img src='/assets/landing/mobileBaner.png' alt='Flowers' />
						</picture>
					</Grid>
					<Grid item xs={7} md={4}>
						<Stack alignItems='center' flex={1} pt={5} spacing={3}>
							<Chip
								sx={(theme) => ({
									borderRadius: '12px',
									color: 'success.dark',
									backgroundColor: 'success.light',
									fontSize: 14,
									whiteSpace: 'break-spaces',
									[theme.breakpoints.down('md')]: {
										fontSize: 10,
									},
								})}
								variant='filled'
								label='Submit your Booking requirement now!'
							/>
							<Stack>
								<Typography
									fontSize={{ xs: 12, md: 14 }}
									variant='h6'
									textAlign='center'
									fontWeight={600}>
									Get Construction Workforce ASAP!
								</Typography>
								<Typography fontSize={{ xs: 12, md: 14 }} textAlign='center'>
									30 Days* No Questions Asked Refund Policy{' '}
								</Typography>
							</Stack>
							<LinkButton
								size='large'
								variant='contained'
								color='primary'
								href='/login'
								onClick={() => {
									DataLayerPush({
										event: 'book_worker_home_hero',
									})

									analyticsEvents('ButtonClick', {
										action: 'Book Worker',
										metaData: {
											origin: 'hero section',
										},
									})
								}}
								sx={{ px: 4 }}>
								Book Workers
							</LinkButton>
						</Stack>
					</Grid>
				</Grid>
			</Section>
			<Section>
				<Grid container spacing={{ xs: 2, md: 4 }}>
					{jobSection.jobs.map((item) => (
						<Grid item key={item.image} xs={6} md={2.4}>
							<Stack
								flex={1}
								alignItems='center'
								spacing={1}
								sx={(theme) => ({
									'>img': {
										width: 200,
										height: 100,
									},
									[theme.breakpoints.down('md')]: {
										'>img': {
											width: 150,
											height: 70,
										},
									},
								})}>
								<img style={{ borderRadius: '12px' }} src={item.image} alt='' />
								<Typography>{item.label}</Typography>
							</Stack>
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

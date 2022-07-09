import { FormatQuote } from '@mui/icons-material'
import {
	Button,
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
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
	AppStoreImage,
	Carousel,
	externalLinks,
	FloatingUnderLineHeading,
	HyperLink,
	LinkButton,
	Section,
	useMobile,
} from 'sdk'
import { ButtonClicked } from 'sdk/analytics/analyticsWrapper'
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
		qnaSection,
	} = homePage
	const isMobile = useMobile()
	const router = useRouter()
	return (
		<>
			<Section>
				<Grid container>
					{!isMobile && (
						<Grid item flex={1} xs={5}>
							<Stack alignItems='flex-start' spacing={5}>
								<Typography variant='h4'>
									India&apos;s largest <strong>skilled construction workforce marketplace</strong>
								</Typography>
								{/* <Button sx={{ px: 6 }} variant='outlined'>
									View Plans
								</Button> */}
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
					)}
					<Grid item xs={isMobile ? 5 : 3}>
						<img
							src={isMobile ? '/assets/landing/mobileBaner.png' : '/assets/landing/bannerImage.png'}
							width={isMobile ? '120%' : '125%'}
							alt='hero Banner'
						/>
					</Grid>
					<Grid item xs={isMobile ? 7 : 4}>
						<Stack alignItems='center' flex={1} pt={5} spacing={3}>
							<Chip
								sx={(theme) => ({
									borderRadius: '12px',
									color: 'success.dark',
									backgroundColor: 'success.light',
									fontSize: isMobile ? '10px' : '12px',
									whiteSpace: 'break-spaces',
								})}
								variant='filled'
								label='Submit your Booking requirement now!'
							/>
							<Stack>
								<Typography
									variant='h6'
									fontSize={isMobile ? '14px' : '12px'}
									textAlign='center'
									fontWeight={600}>
									Get Construction Workforce ASAP!
								</Typography>
								<Typography fontSize={isMobile ? '12px' : '14px'} textAlign='center'>
									30 Days* No Questions Asked Refund Policy{' '}
								</Typography>
							</Stack>
							<LinkButton
								size='large'
								variant='contained'
								color='primary'
								href='/login'
								onClick={() => {
									ButtonClicked({
										page: document.title,
										action: 'Book Workers',
										url: router.asPath,
									})
								}}
								sx={{ px: 4 }}>
								Book Workers
							</LinkButton>
						</Stack>
					</Grid>
				</Grid>
			</Section>
			{/* {isMobile && (
				<Stack alignItems='center'>
					<Button sx={{ px: 6 }} variant='outlined'>
						View Plans
					</Button>
				</Stack>
			)} */}
			<Section>
				<Grid container spacing={isMobile ? 2 : 4}>
					{jobSection.jobs.map((item) => (
						<Grid item key={item.image} xs={isMobile ? 6 : 2.4}>
							<Stack flex={1} alignItems='center' spacing={1}>
								<img
									style={{ borderRadius: '12px' }}
									width={isMobile ? 150 : 200}
									height={isMobile ? 70 : 100}
									src={item.image}
									alt=''
								/>
								<Typography>{item.label}</Typography>
							</Stack>
						</Grid>
					))}
				</Grid>
			</Section>
			{!isMobile && (
				<Section backgroundColor={bookingJourneySection.backgroundColor}>
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
			)}
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
					<Typography sx={{ flex: 1, minWidth: '50%' }} variant={isMobile ? 'h4' : 'h3'}>
						Why you should
						<br /> <strong>hire your</strong> construction
						<br /> workforce from <br />
						<strong>Project Hero?</strong>
						<br />
					</Typography>
					<Grid
						container
						spacing={isMobile ? 2 : 4}
						flexWrap={isMobile ? 'nowrap' : 'wrap'}
						sx={{ margin: 0, padding: 0, flex: 1 }}>
						{hireConstructionSection.cards.map((data, index) => {
							return (
								<Grid
									key='index'
									item
									xs={12}
									md={6}
									alignItems='center'
									sx={{ top: isMobile ? '0' : data.marginTop }}>
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
											<Typography sx={{ fontSize: '20px', fontWeight: '700', color: data.color }}>
												{data.header}
											</Typography>
											<Typography sx={{ fontSize: '14px', fontWeight: '400' }}>
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
									<Image src={item.image} layout='fill' />
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
								<Grid key={index} item xs={12} md={2.4} spacing={4}>
									<Stack
										direction={!isMobile ? 'column' : 'row'}
										spacing={2}
										p={2}
										alignItems='center'
										justifyContent='center'
										sx={{
											height: isMobile ? '120px' : '231px',
											width: isMobile ? '100%' : '214px',
											border: '1px solid #BABABA',
											borderRadius: '12px',
											marginBottom: isMobile ? '20px' : '0px',
											transition: '0.3s all ease',
											':hover': {
												boxShadow: '10px 10px 30px -10px #aaaaaa',
											},
										}}>
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
							{!isMobile && (
								<Stack>
									<Typography sx={{ mb: 2 }} color={'grey.A700'}>
										Download our app from
									</Typography>
									<a href={externalLinks.heroApp} target='_blank' rel='noopener noreferrer'>
										<img src={AppStoreImage} width={190} />
									</a>
								</Stack>
							)}
						</Stack>
					</Grid>
					<Grid item xs={12} md={7} minHeight={270}>
						<Image src={phApp.appImage} layout='fill' />
					</Grid>
					{isMobile && (
						<Grid item xs={12} md={7} flexDirection='column' mt={2}>
							<LinkButton variant='contained' fullWidth href={externalLinks.heroApp}>
								GET THE APP NOW
							</LinkButton>
						</Grid>
					)}
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
								sx={{
									position: 'relative',
									borderRadius: '12px',
									width: isMobile ? '90%' : '45%',
									margin: '5%',
								}}>
								<Stack p={3} alignItems='center' minHeight={270}>
									<Typography variant={isMobile ? 'h6' : 'h5'} fontWeight={700}>
										{item.title}
									</Typography>
									<FormatQuote color='primary' sx={{ my: 1 }} />
									<Typography textAlign='center' variant={isMobile ? 'caption' : 'body2'}>
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

			<Section sx={{ minHeight: '600px' }}>
				{isMobile && (
					<FloatingUnderLineHeading variant='h3' underlinePosition='flex-start'>
						{qnaSection.title}
					</FloatingUnderLineHeading>
				)}
				<Grid container sx={{ flexDirection: isMobile ? 'column-reverse' : 'row' }}>
					<Grid item xs={12} md={5}>
						<Stack direction={'column'} spacing={4}>
							{!isMobile && (
								<FloatingUnderLineHeading variant='h3' underlinePosition='flex-start'>
									{qnaSection.title}
								</FloatingUnderLineHeading>
							)}
							<Typography variant='subtitle1'>{qnaSection.support.message}</Typography>
							<a href={'mailto:' + qnaSection.support.mailAction.email}>
								<Stack>
									<Button
										sx={{ borderRadius: 3 }}
										startIcon={<img src='/assets/landing/plane.svg' alt='plane' />}
										variant='outlined'>
										<Stack direction='column' alignItems='flex-start' m={2} width={200}>
											<Typography variant='subtitle1'>
												{qnaSection.support.mailAction.label}
											</Typography>
											<Typography variant='h6' sx={{ color: '#0663F6' }}>
												{qnaSection.support.mailAction.email}
											</Typography>
										</Stack>
									</Button>
								</Stack>
							</a>
							<a href={'tel:' + qnaSection.support.contactAction.phone}>
								<Stack>
									<Button
										sx={{ borderRadius: 3 }}
										startIcon={<img src='/assets/landing/call.svg' alt='plane' />}
										variant='outlined'>
										<Stack direction='column' alignItems='flex-start' m={2} width={200}>
											<Typography variant='subtitle1'>
												{qnaSection.support.contactAction.label}
											</Typography>
											<Typography variant='h6' sx={{ color: '#0663F6' }}>
												{qnaSection.support.contactAction.phone}
											</Typography>
										</Stack>
									</Button>
								</Stack>
							</a>
						</Stack>
					</Grid>
					<Grid item xs={12} md={7} position='relative' minHeight={250}>
						<Image src={qnaSection.support.image} layout='fill' />
					</Grid>
				</Grid>
			</Section>
		</>
	)
}

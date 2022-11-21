import { Card, CardContent, CardMedia, Grid, Paper, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { AboutUsPage, Section, theme } from 'sdk'

interface Props {}

const Mission = [
	{
		title: 'Mission',
		desc: 'Double retention rate than insuctry average',
	},
	{
		title: 'Vision',
		desc: 'Track & download workers attendance via contractor Web App',
	},
]

const teamMember = [
	{
		name: 'Satya Vyas',
		designation: 'CTO',
		imgSrc: '/assets/landingv2/ctoImage.png',
	},
	{
		name: 'Satya Vyas',
		designation: 'CTO',
		imgSrc: '/assets/landingv2/ctoImage.png',
	},
	{
		name: 'Satya Vyas',
		designation: 'CTO',
		imgSrc: '/assets/landingv2/ctoImage.png',
	},
	{
		name: 'Satya Vyas',
		designation: 'CTO',
		imgSrc: '/assets/landingv2/ctoImage.png',
	},
]

export const AboutUs: FC<Props> = () => {
	const { bannerSection, whoWhatWhySection, teamSection } = AboutUsPage
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	return (
		<>
			<Section
				backgroundColor='#000'
				sx={{
					minHeight: 'calc(100vh - 100px )',
				}}>
				<Stack direction={'column'} alignItems={'center'} spacing={{ md: 4, xs: 5 }}>
					<Box width={{ md: '40%', xs: '100%' }}>
						<Typography
							fontSize={{ md: '36px', xs: '28px' }}
							fontFamily={'Saira,sans-serif'}
							fontWeight={600}
							color={'#fff'}
							sx={{
								textAlign: { xs: 'start', md: 'center' },
							}}>
							We are <span style={{ color: theme.palette.primary.main }}>enthusiastic </span> and{' '}
							<span style={{ color: theme.palette.primary.main }}>ambitious </span>
							team
						</Typography>
					</Box>
					<Stack
						sx={{
							width: '100%',
							display: { xs: 'inline-flex', md: 'none' },
						}}>
						<Typography
							variant='body2'
							fontFamily={'Karla,sans-serif'}
							fontWeight={400}
							sx={{
								color: '#fff',
							}}>
							Our Story
						</Typography>
					</Stack>
					<Box width={{ md: '62%', xs: '100%' }}>
						<Typography
							fontSize={{ md: '24px', xs: '16px' }}
							fontFamily={'Karla,sans-serif'}
							fontWeight={400}
							color={'#fff'}
							sx={{
								textAlign: { md: 'center', xs: 'start' },
							}}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae suspendisse at integer
							faucibus massa libero pulvinar. Sed sagittis pretium viverra urna, eget nec magna vulputate
							ac.
						</Typography>
					</Box>
					<Stack
						direction={'row'}
						justifyContent={'center'}
						sx={{
							width: '100%',
							maxWidth: '1200px',
						}}>
						<Grid
							container
							sx={{
								width: { md: '80%', xs: '342px' },
								height: { md: '629px', xs: '500px' },
							}}
							spacing={2}>
							<Grid item md={8} xs={12}>
								<Paper
									sx={{
										width: '100%',
										height: '100%',
										background: '#5d5d5d',
									}}></Paper>
							</Grid>
							<Grid item md={4} xs={12} sx={{ height: { md: '100%', sx: '232px' } }}>
								<Grid container spacing={2}>
									<Grid item xs={6} md={12} sx={{ height: { md: '349px', xs: '100%' } }}>
										<Paper
											sx={{
												width: '100%',
												background: '#5d5d5d',
												height: '100%',
											}}></Paper>
									</Grid>
									<Grid item xs={6} md={12} sx={{ height: { md: '280px', xs: '100%' } }}>
										<Paper
											sx={{
												width: '100%',
												background: '#5d5d5d',
												height: '100%',
											}}></Paper>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Stack>
				</Stack>
			</Section>
			<Section
				backgroundColor='#000'
				sx={{
					minHeight: { md: '414px', xs: '914px' },
					maxHeight: { md: '414px', xs: '914px' },
					overflow: 'hidden',
				}}>
				<Stack
					direction={{ md: 'row', xs: 'column' }}
					justifyContent={'space-between'}
					spacing={{ md: 0, xs: 7 }}>
					<Stack direction={'column'} spacing={4}>
						<Typography
							fontSize={{ md: '32px', xs: '24px' }}
							fontFamily={'Saira,sans-serif'}
							fontWeight={500}
							color={'#fff'}>
							Our Mission and Vision at
							<br />
							<span
								style={{
									color: theme.palette.primary.main,
								}}>
								ProjectHero?
							</span>
						</Typography>
						<Paper
							sx={{
								height: '280px',
								width: '298px',
								background: '#D9D9D9',
								display: { xs: 'none', md: 'inline-block' },
							}}
						/>
					</Stack>
					<Stack direction={'column'} spacing={8} alignItems={{ md: 'flex-end', xs: 'flex-start' }}>
						{Mission?.map((val, index) => (
							<Stack key={index} direction={'row'} spacing={2} width={{ md: '80%', xs: '100%' }}>
								<Box
									height={'60px'}
									width={'60px'}
									borderRadius={'50%'}
									sx={{ background: theme.palette.primary.dark }}></Box>
								<Box
									sx={{
										width: '50%',
									}}>
									<Typography
										fontSize={'24px'}
										fontFamily={'Saira,sans-serif'}
										fontWeight={500}
										color={theme.palette.primary.main}>
										{val.title}
									</Typography>
									<Typography
										fontSize={'16px'}
										fontFamily={'Saira,sans-serif'}
										fontWeight={400}
										color={'#fff'}>
										{val.desc}
									</Typography>
								</Box>
							</Stack>
						))}
					</Stack>

					<Stack sx={{ height: '408px', width: '344px', display: { xs: 'inline-block', md: 'none' } }}>
						<Paper
							sx={{
								height: '100%',
								width: '100%',
								background: '#d9d9d9',
							}}></Paper>
					</Stack>
				</Stack>
			</Section>
			<Section backgroundColor='#fff'>
				<Grid container spacing={3}>
					{teamMember.map((val, index) => (
						<Grid item key={index} xs={12} md={3} justifyContent={'center'}>
							<Stack>
								<Card
									sx={{
										background: '#000',
										pt: 4,
										px: 3,
									}}>
									<CardMedia component='img' height='225' width='262' image={val.imgSrc} alt='' />
									<CardContent>
										<Stack direction={'column'} alignItems={'center'}>
											<Typography
												fontSize={'24px'}
												fontFamily={'Saira, sans-serif'}
												fontWeight={500}
												textAlign={'center'}
												color={'#fff'}>
												{val.name}
											</Typography>
											<Typography
												fontSize={'16px'}
												fontFamily={'Karla, sans-serif'}
												fontWeight={500}
												textAlign={'center'}
												color={'#fff'}>
												{val.designation}
											</Typography>
										</Stack>
									</CardContent>
								</Card>
							</Stack>
						</Grid>
					))}
				</Grid>
			</Section>
		</>
	)
}

// ;<>
// 	<Section
// 		boxSx={{
// 			minHeight: { xs: 270, md: 500 },
// 			backgroundSize: 'contain',
// 			display: 'flex',
// 		}}
// 		sx={{
// 			display: 'flex',
// 			alignItems: 'center',
// 			justifyContent: 'center',
// 			flexDirection: 'column',
// 			gap: 3,
// 			zIndex: 10,
// 		}}
// 		backgroundImage={bannerSection.backgroundImage}>
// 		<Typography color='common.white' variant='h3' fontWeight={700}>
// 			{bannerSection.heading}
// 		</Typography>
// 		<Divider sx={{ backgroundColor: 'common.white', width: '10vh', height: '5px', borderRadius: 5 }} />
// 		<Typography color='common.white' variant='h4' fontWeight={700}>
// 			{bannerSection.subHeading}
// 		</Typography>
// 	</Section>
// 	<Section>
// 		<Stack px={{ xs: 1, md: 10 }} py={{ xs: 1, md: 7 }}>
// 			<Typography
// 				fontSize={(theme) => ({
// 					xs: theme.typography.caption.fontSize,
// 					md: theme.typography.h6.fontSize,
// 				})}>
// 				{bannerSection.description}
// 			</Typography>
// 		</Stack>
// 	</Section>
// 	<Section sx={{ py: 8 }} backgroundColor={whoWhatWhySection.backgroundColor}>
// 		<Grid container justifyContent='space-between' spacing={2}>
// 			{whoWhatWhySection.data.map((item) => {
// 				return (
// 					<Grid key={item.title} item md={3} flexDirection='column'>
// 						<Typography
// 							variant='h4'
// 							textAlign={{ xs: 'center', md: 'left' }}
// 							fontWeight={700}
// 							color='primary.main'>
// 							{item.title}
// 						</Typography>
// 						<Typography mt={{ xs: 1, md: 5 }}>{item.description}</Typography>
// 						<Divider
// 							sx={(theme) => ({
// 								display: 'none',
// 								backgroundColor: 'primary.main',
// 								width: '10vh',
// 								height: '5px',
// 								m: '20px auto',
// 								borderRadius: 5,
// 								[theme.breakpoints.down('md')]: {
// 									display: 'block',
// 								},
// 							})}
// 						/>
// 					</Grid>
// 				)
// 			})}
// 		</Grid>
// 	</Section>
// 	<Section>
// 		<Stack alignItems='center' py={4} maxWidth={'80%'} m='0 auto' spacing={3}>
// 			<FloatingUnderLineHeading underlineWidth={isMobile ? '90%' : undefined} variant='h4'>
// 				{teamSection.heading}
// 			</FloatingUnderLineHeading>
// 			<Typography variant='h6' textAlign='center'>
// 				{teamSection.description}
// 			</Typography>
// 		</Stack>
// 	</Section>
// 	<Section
// 		backgroundImage={teamSection.backgroundImage}
// 		boxSx={{
// 			// backgroundSize: isMobile ? '180% ' : 'contain',
// 			// backgroundRepeat: 'repeat',
// 			// backgroundPositionY: 'top',
// 			backgroundSize: isMobile ? 'cover ' : 'contain',
// 		}}>
// 		<Grid container>
// 			{teamSection.team.map((item, index) => {
// 				return (
// 					<Grid
// 						key={item.title}
// 						xs={12}
// 						item
// 						alignItems='center'
// 						flexDirection={{ xs: 'column', md: index % 2 ? 'row-reverse' : 'row' }}
// 						sx={(theme) => ({
// 							img: {
// 								height: 300,
// 								width: 300,
// 								[theme.breakpoints.down('md')]: {
// 									height: 170,
// 									width: 170,
// 								},
// 							},
// 						})}>
// 						<img src={item.image} alt='' />
// 						<Stack flex={1} p={3} alignItems={{ xs: 'center', md: index % 2 ? 'flex-end' : 'flex-start' }}>
// 							<Typography
// 								color='primary.main'
// 								fontSize={(theme) => ({
// 									xs: theme.typography.body1.fontSize,
// 									md: theme.typography.h5.fontSize,
// 								})}
// 								fontWeight={700}>
// 								{item.title}
// 							</Typography>
// 							<List>
// 								{item.testimonials.map((text, idx) => {
// 									if (isMobile) {
// 										return (
// 											<ListItem dense key={idx}>
// 												<Circle sx={{ fontSize: 10, mr: 1 }} />
// 												<ListItemText>{text}</ListItemText>
// 											</ListItem>
// 										)
// 									} else {
// 										return (
// 											<ListItem dense key={idx}>
// 												{!(index % 2) && <Circle sx={{ fontSize: 10, mx: 1, mt: 0.3 }} />}
// 												<ListItemText
// 													sx={{
// 														fontSize: 18,
// 														textAlign: index % 2 ? 'right' : 'left',
// 													}}>
// 													{text}
// 												</ListItemText>
// 												{!!(index % 2) && <Circle sx={{ fontSize: 10, mx: 1, mt: 0.3 }} />}
// 											</ListItem>
// 										)
// 									}
// 								})}
// 							</List>
// 						</Stack>
// 					</Grid>
// 				)
// 			})}
// 		</Grid>
// 	</Section>
// </>

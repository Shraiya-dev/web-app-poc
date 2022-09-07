import { Circle } from '@mui/icons-material'
import { Divider, Grid, List, ListItem, ListItemText, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { FC } from 'react'
import { AboutUsPage, FloatingUnderLineHeading, Section } from 'sdk'
interface Props {}

export const AboutUs: FC<Props> = () => {
	const { bannerSection, whoWhatWhySection, teamSection } = AboutUsPage
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	return (
		<>
			<Section
				boxSx={{
					minHeight: { xs: 270, md: 500 },
					backgroundSize: 'contain',
					display: 'flex',
				}}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					gap: 3,
					zIndex: 10,
				}}
				backgroundImage={bannerSection.backgroundImage}>
				<Typography color='common.white' variant='h3' fontWeight={700}>
					{bannerSection.heading}
				</Typography>
				<Divider sx={{ backgroundColor: 'common.white', width: '10vh', height: '5px', borderRadius: 5 }} />
				<Typography color='common.white' variant='h4' fontWeight={700}>
					{bannerSection.subHeading}
				</Typography>
			</Section>
			<Section>
				<Stack px={{ xs: 1, md: 10 }} py={{ xs: 1, md: 7 }}>
					<Typography
						fontSize={(theme) => ({
							xs: theme.typography.caption.fontSize,
							md: theme.typography.h6.fontSize,
						})}>
						{bannerSection.description}
					</Typography>
				</Stack>
			</Section>
			<Section sx={{ py: 8 }} backgroundColor={whoWhatWhySection.backgroundColor}>
				<Grid container justifyContent='space-between' spacing={2}>
					{whoWhatWhySection.data.map((item) => {
						return (
							<Grid key={item.title} item md={3} flexDirection='column'>
								<Typography
									variant='h4'
									textAlign={{ xs: 'center', md: 'left' }}
									fontWeight={700}
									color='primary.main'>
									{item.title}
								</Typography>
								<Typography mt={{ xs: 1, md: 5 }}>{item.description}</Typography>
								<Divider
									sx={(theme) => ({
										display: 'none',
										backgroundColor: 'primary.main',
										width: '10vh',
										height: '5px',
										m: '20px auto',
										borderRadius: 5,
										[theme.breakpoints.down('md')]: {
											display: 'block',
										},
									})}
								/>
							</Grid>
						)
					})}
				</Grid>
			</Section>
			<Section>
				<Stack alignItems='center' py={4} maxWidth={'80%'} m='0 auto' spacing={3}>
					<FloatingUnderLineHeading underlineWidth={isMobile ? '90%' : undefined} variant='h4'>
						{teamSection.heading}
					</FloatingUnderLineHeading>
					<Typography variant='h6' textAlign='center'>
						{teamSection.description}
					</Typography>
				</Stack>
			</Section>
			<Section
				backgroundImage={teamSection.backgroundImage}
				boxSx={{
					// backgroundSize: isMobile ? '180% ' : 'contain',
					// backgroundRepeat: 'repeat',
					// backgroundPositionY: 'top',
					backgroundSize: isMobile ? 'cover ' : 'contain',
				}}>
				<Grid container>
					{teamSection.team.map((item, index) => {
						return (
							<Grid
								key={item.title}
								xs={12}
								item
								alignItems='center'
								flexDirection={{ xs: 'column', md: index % 2 ? 'row-reverse' : 'row' }}
								sx={(theme) => ({
									img: {
										height: 300,
										width: 300,
										[theme.breakpoints.down('md')]: {
											height: 170,
											width: 170,
										},
									},
								})}>
								<img src={item.image} alt='' />
								<Stack
									flex={1}
									p={3}
									alignItems={{ xs: 'center', md: index % 2 ? 'flex-end' : 'flex-start' }}>
									<Typography
										color='primary.main'
										fontSize={(theme) => ({
											xs: theme.typography.body1.fontSize,
											md: theme.typography.h5.fontSize,
										})}
										fontWeight={700}>
										{item.title}
									</Typography>
									<List>
										{item.testimonials.map((text, idx) => {
											if (isMobile) {
												return (
													<ListItem dense key={idx}>
														<Circle sx={{ fontSize: 10, mr: 1 }} />
														<ListItemText>{text}</ListItemText>
													</ListItem>
												)
											} else {
												return (
													<ListItem dense key={idx}>
														{!(index % 2) && (
															<Circle sx={{ fontSize: 10, mx: 1, mt: 0.3 }} />
														)}
														<ListItemText
															sx={{
																fontSize: 18,
																textAlign: index % 2 ? 'right' : 'left',
															}}>
															{text}
														</ListItemText>
														{!!(index % 2) && (
															<Circle sx={{ fontSize: 10, mx: 1, mt: 0.3 }} />
														)}
													</ListItem>
												)
											}
										})}
									</List>
								</Stack>
							</Grid>
						)
					})}
				</Grid>
			</Section>
		</>
	)
}

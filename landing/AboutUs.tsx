import { Circle } from '@mui/icons-material'
import {
	Box,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	styled,
	Theme,
	Typography,
	useMediaQuery,
} from '@mui/material'
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
					minHeight: isMobile ? 270 : 700,
					backgroundSize: 'cover',
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
				<Stack p={isMobile ? 1 : 10}>
					<Typography variant={isMobile ? 'caption' : 'h6'}>{bannerSection.description}</Typography>
				</Stack>
			</Section>
			<Section sx={{ py: 8 }} backgroundColor={whoWhatWhySection.backgroundColor}>
				<Grid container justifyContent='space-between' spacing={2}>
					{whoWhatWhySection.data.map((item) => {
						return (
							<Grid key={item.title} item md={3} flexDirection='column'>
								<Typography
									variant='h4'
									textAlign={isMobile ? 'center' : 'left'}
									fontWeight={700}
									color='primary.main'>
									{item.title}
								</Typography>
								<Typography mt={isMobile ? 1 : 5}>{item.description}</Typography>
								{isMobile && (
									<Divider
										sx={{
											backgroundColor: 'primary.main',
											width: '10vh',
											height: '5px',
											m: '20px auto',
											borderRadius: 5,
										}}
									/>
								)}
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
								flexDirection={isMobile ? 'column' : index % 2 ? 'row' : 'row-reverse'}>
								<img
									height={isMobile ? 170 : 320}
									width={isMobile ? 170 : 320}
									src={item.image}
									alt=''
								/>
								<Stack
									flex={1}
									p={3}
									alignItems={isMobile ? 'center' : index % 2 ? 'flex-start' : 'flex-end'}>
									<Typography
										color='primary.main'
										variant={isMobile ? 'body1' : 'h5'}
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
														{!!(index % 2) && <Circle sx={{ fontSize: 10, mx: 1 }} />}
														<ListItemText
															sx={{
																fontSize: 18,
																textAlign: index % 2 ? 'left' : 'right',
															}}>
															{text}
														</ListItemText>
														{!(index % 2) && <Circle sx={{ fontSize: 10, mx: 1 }} />}
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

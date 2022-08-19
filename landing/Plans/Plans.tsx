import { ArrowDropDown, CheckCircle, WhatsApp } from '@mui/icons-material'
import {
	Button,
	Chip,
	Divider,
	FormControlLabel,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	Paper,
	Stack,
	Switch,
	Typography,
} from '@mui/material'
import { FC, useRef, useState } from 'react'
import { Carousel, DataLayerPush, FloatingUnderLineHeading, LinkButton, Section, SectionProps, useMobile } from 'sdk'
import { PlansPageData } from 'sdk/data/plans'

export const Plans: FC = () => {
	const { bannerSection, planSection } = PlansPageData
	const [anchorEl, setAnchorEl] = useState<any>({})
	const handelMenuOpen = (e: any, id: string) => {
		console.log(e.currentTarget)
		setAnchorEl({ [id]: e.currentTarget })
	}
	const isMobile = useMobile()
	return (
		<>
			<Stack display={{ xs: 'auto', md: 'none' }}>
				<Stack p={2} sx={{ backgroundColor: '#F5F6FC' }}>
					<Typography textAlign='center' variant='h5' color='primary.main' fontWeight={700}>
						{bannerSection.left.title}{' '}
						<Typography variant='h5' component='span'>
							{bannerSection.left.subtitle}
						</Typography>
					</Typography>
				</Stack>
				<Stack p={4} direction='row' alignItems='center' spacing={2}>
					<Stack>
						<Typography variant='h6' fontWeight={700}>
							{bannerSection.right.title}
						</Typography>
						<Typography
							textAlign='center'
							variant='caption'
							sx={{
								backgroundColor: '#EBFEEA',
								borderColor: '#EBFEEA',
								color: '#1E4687',
								borderRadius: 4,
								p: 1.5,
								fontWeight: 700,
							}}>
							{bannerSection.right.support.text}
						</Typography>
					</Stack>
					<img src={bannerSection.right.image} width='30%' />
				</Stack>
				<Button sx={{ fontSize: 36, px: 4, width: 'fit-content', margin: '0 auto' }} variant='contained'>
					{bannerSection.right.bookingButton.text}
				</Button>
				<Stack spacing={2} alignItems='center' mt={2}>
					<Stack direction='row' spacing={2}>
						<img src={bannerSection.right.support.icon} alt='' />
						<Typography
							variant='caption'
							fontSize={8}
							p={1}
							sx={{ background: bannerSection.right.support.backgroundColor, borderRadius: 12 }}>
							{bannerSection.right.support.text}
						</Typography>
					</Stack>
					<Typography fontSize={8} variant='caption' color='grey.A400'>
						{bannerSection.right.disclaimer}
					</Typography>
					<Stack direction='row' alignItems='center' spacing={1} color='grey.A700'>
						<WhatsApp />
						<Typography fontSize={8} color='grey.A700'>
							{bannerSection.right.whatsApp.label}
						</Typography>
						<FormControlLabel label='' control={<Switch checked={true} name='antoine' />} />
					</Stack>
				</Stack>
			</Stack>
			<Stack direction='row' display={{ xs: 'none', md: 'flex' }}>
				<Stack
					direction='row'
					flex={1}
					sx={(theme) => ({
						backgroundColor: bannerSection.left.backgroundColor,
						'>img': {
							width: '55%',
							[theme.breakpoints.up('xl')]: {
								width: '45%',
							},
						},
					})}
					pl={{ xl: '7%' }}>
					<img src={bannerSection.left.image} style={{ marginRight: '-15%' }} />
					<Stack flex={1} py={3}>
						<Typography variant='h3' color='primary.main' fontWeight={700}>
							{bannerSection.left.title}
						</Typography>
						<Typography variant='h3'>{bannerSection.left.subtitle}</Typography>
						<Stack flex={1} alignItems='center' justifyContent='space-evenly' p={2}>
							{bannerSection.left.benefits.map((item) => (
								<Stack
									key={item.text}
									direction='row'
									alignItems={'center'}
									marginLeft={item.marginLeft}
									sx={{
										backgroundColor: '#ffffff',
										p: 1,
										borderRadius: 4,
										width: 220,
										boxShadow:
											'0px 4px 50px 1px rgba(255, 255, 255, 0.5), 0px 4px 20px 8px rgba(77, 135, 228, 0.25)',
									}}>
									<img src={item.icon} alt='icon' width={40} />
									<Typography flex={1} textAlign={'center'} fontWeight={700}>
										{item.text}
									</Typography>
								</Stack>
							))}
						</Stack>
					</Stack>
				</Stack>
				<Stack flex={1} justifyContent='space-between' alignItems='center' p={3} pr={{ xl: '7%' }}>
					<Typography variant='h4' px={3} fontWeight={700} textAlign='center'>
						{bannerSection.right.title}
					</Typography>
					<Chip
						color='success'
						variant='outlined'
						label={bannerSection.right.chip.text}
						sx={{
							backgroundColor: '#EBFEEA',
							borderColor: '#EBFEEA',
							color: '#1E4687',
							borderRadius: 4,
							p: 2,
							fontWeight: 700,
							height: '53px',
						}}
					/>
					<Button sx={{ width: '50%', fontSize: 30, fontWeight: 700 }} variant='contained'>
						{bannerSection.right.bookingButton.text}
					</Button>
					<Stack spacing={2} alignItems='center' width='100%'>
						<Stack direction='row'>
							<Chip
								sx={{
									backgroundColor: '#EBFEEA',
									borderColor: '#EBFEEA',
									color: '#1E4687',
									borderRadius: 4,
									fontWeight: 700,
								}}
								label={
									<Stack direction='row' alignItems='center' spacing={2}>
										<img src={bannerSection.right.support.icon} alt='' />
										<Typography variant='caption'>{bannerSection.right.support.text}</Typography>
									</Stack>
								}
							/>
						</Stack>
						<Typography variant='caption' color='grey.A400'>
							{bannerSection.right.disclaimer}
						</Typography>
						{/* <Stack direction='row' alignItems='center' spacing={1} color='grey.A700'>
								<WhatsApp />
								<Typography fontSize={14} color='grey.A700'>
									{bannerSection.right.whatsApp.label}
								</Typography>
								<FormControlLabel label='' control={<Switch checked={true} name='antoine' />} />
							</Stack> */}
					</Stack>
				</Stack>
			</Stack>

			<Section>
				<Stack alignItems='center'>
					<FloatingUnderLineHeading variant='h3'>{planSection.heading}</FloatingUnderLineHeading>
					<Typography fontWeight={700} color='grey.A700'>
						{planSection.subtitle}
					</Typography>
				</Stack>
				<Stack>
					<Carousel
						componentPerView={isMobile ? 1 : 4}
						mobileStepperPosition='top'
						slideDelay={400000}
						items={planSection.plans.map((item, index) => {
							return (
								<Stack
									key={index}
									overflow='hidden'
									maxHeight={isMobile ? 'calc(100vh - 100px)' : undefined}
									sx={{
										borderRadius: 4,
										overflowY: 'auto',
										position: 'relative',
										width: { xs: '100%', md: '24%' },
										m: 1,
										boxShadow: '0px 0px 10px rgba(6, 99, 246, 0.15);',
									}}>
									<Stack
										minHeight={350}
										sx={{
											backgroundColor: 'primary.main',
											p: 1,
											position: 'sticky',
											top: 0,
											zIndex: 10,
										}}
										spacing={2}
										alignItems='center'>
										<Typography
											textAlign='center'
											color='common.white'
											fontWeight={700}
											variant='h5'>
											{item.header.name}
										</Typography>
										<Paper
											sx={{ width: '90%', display: 'flex', p: 2, borderRadius: 4 }}
											onClick={(e) => handelMenuOpen(e, item.id)}>
											<Stack flex={1} direction='row' alignItems='center'>
												<Stack flex={1}>
													<Typography component='span' variant='caption' color='grey.A700'>
														<Typography
															variant='h5'
															component='span'
															fontWeight={700}
															color='success.main'>
															&#8377;{item.header.price}
														</Typography>
														/{item.header.per}
													</Typography>

													<Stack flex={1} direction='row' alignItems='center'>
														<Typography
															component='span'
															variant='caption'
															color='grey.A700'
															textAlign='right'
															sx={{ borderRight: '1px solid #aaaaaa', pr: 1, mr: 1 }}
															fontWeight={700}>
															{item.header.tagLine}
														</Typography>
														<Typography
															component='span'
															fontWeight={700}
															color='primary.main'>
															{item.header.discount}% off
														</Typography>
													</Stack>
												</Stack>
												{item.header.subOffer && (
													<IconButton sx={{ p: 1 }}>
														<ArrowDropDown fontSize='small' color='primary' />
													</IconButton>
												)}
											</Stack>
										</Paper>
										<Menu
											open={!!anchorEl[item.id]}
											anchorEl={anchorEl[item.id]}
											PaperProps={{
												sx: { mt: 1, width: anchorEl[item.id]?.offsetWidth, borderRadius: 4 },
											}}
											MenuListProps={{
												sx: {
													p: 0,
												},
											}}
											onClose={() => {
												setAnchorEl({})
											}}>
											{item.header.subOffer?.map((subPlan, index) => {
												return (
													<Stack key={index}>
														<Paper sx={{ display: 'flex', p: 2 }}>
															<Stack flex={1} direction='row' alignItems='center'>
																<Stack flex={1}>
																	<Typography
																		component='span'
																		variant='caption'
																		color='grey.A700'>
																		<Typography
																			variant='h4'
																			component='span'
																			fontWeight={700}
																			color='success.main'>
																			&#8377;{subPlan.price}
																		</Typography>
																		/{subPlan.per}
																	</Typography>

																	<Stack flex={1} direction='row' alignItems='center'>
																		<Typography
																			component='span'
																			variant='caption'
																			color='grey.A700'
																			textAlign='right'
																			sx={{
																				borderRight: '1px solid #aaaaaa',
																				pr: 1,
																				mr: 1,
																			}}
																			fontWeight={700}>
																			{subPlan.tagLine}
																		</Typography>
																		<Typography
																			component='span'
																			minWidth='33%'
																			fontWeight={700}
																			color='primary.main'>
																			{subPlan.discount}% off
																		</Typography>
																	</Stack>
																</Stack>
															</Stack>
														</Paper>
														<Divider />
													</Stack>
												)
											})}
										</Menu>
										<Typography
											flex={1}
											p={1.5}
											fontWeight={700}
											color='common.white'
											textAlign='center'>
											{item.header.description}
										</Typography>
										<LinkButton
											onClick={() =>
												DataLayerPush({
													event: 'book_worker_faq_hero',
												})
											}
											href={item.link}
											sx={{
												px: 4,
												color: 'common.white',
												border: '2px solid #ffffff',
												fontWeight: 700,
												':hover': {
													color: 'primary.main',
													backgroundColor: 'common.white',
													fontWeight: 700,
												},
											}}>
											Book Workers
										</LinkButton>
									</Stack>
									<Stack flex={1} p={2} alignItems='center'>
										<Typography fontWeight={700} textAlign='center'>
											{item.body.title}
										</Typography>
										<List sx={{ flex: 1 }}>
											{item.body.points.map((item) => {
												return (
													<ListItem key={item} sx={{ textAlign: 'left', my: 2, px: 1 }}>
														<ListItemIcon sx={{ minWidth: '36px' }}>
															<CheckCircle color='primary' />
														</ListItemIcon>
														<ListItemText>{item}</ListItemText>
													</ListItem>
												)
											})}
										</List>
										<LinkButton
											onClick={() =>
												DataLayerPush({
													event: 'book_worker_faq_hero',
												})
											}
											href={item.link}
											sx={(theme) => ({
												px: 4,
												border: '2px solid' + theme.palette.primary.main,
												color: 'primary.main',
												fontWeight: 700,
												':hover': {
													color: 'common.white',
													backgroundColor: 'primary.main',
													fontWeight: 700,
												},
											})}>
											Book Workers
										</LinkButton>
									</Stack>
								</Stack>
							)
						})}
					/>
				</Stack>
			</Section>
		</>
	)
}

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import {
	AppBar,
	Box,
	Button,
	Container,
	Divider,
	Drawer,
	IconButton,
	List,
	Menu,
	MenuItem,
	Stack,
	styled,
	Theme,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { DataLayerPush, LinkButton, primary, useContractorAuth } from 'sdk'
import { sendAnalytics } from 'sdk/analytics/analyticsWrapper'
import { navbar, PHSupport } from 'sdk/data'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import Link from 'next/link'

export const Navbar = () => {
	const [menuRefs, dispatchMenuRefs] = useReducer((p: any, n: any) => ({ ...p, ...n }), {})
	const router = useRouter()
	const [navbarOpen, setNavbarOpen] = useState(false)
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
	useEffect(() => {
		!isMobile && setNavbarOpen(false)
	}, [isMobile])

	const { user, openLoginDialog } = useContractorAuth()

	return (
		<>
			<AppBar
				position='fixed'
				elevation={0}
				sx={(theme) => ({
					backgroundColor: theme.palette.appBar.primary,
				})}>
				<Container disableGutters>
					<Toolbar sx={{ justifyContent: 'space-between', zIndex: 12 }} disableGutters>
						<Stack
							direction='row'
							spacing={2}
							alignItems='center'
							justifyContent={'space-between'}
							width={'100%'}
							px={2}>
							<Stack
								flex={1}
								spacing={2}
								direction='row'
								alignItems='center'
								justifyContent={{ xs: 'space-between', md: 'flex-start' }}>
								<Link href='/' passHref>
									<Box
										component='img'
										src={navbar.brandImage}
										width={150}
										alt='ProjectHero'
										// style={{ marginTop: 5 }}
									/>
								</Link>
							</Stack>
							<Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'} spacing={2.5}>
								<IconButton
									sx={(theme) => ({
										display: 'none',

										[theme.breakpoints.down('md')]: {
											display: 'flex',
										},
										boxShadow: theme.shadows[3],
										borderRadius: 2,
									})}
									onClick={() => setNavbarOpen((p) => !p)}>
									<Box width={28} height={28}>
										<img
											width={'100%'}
											height={'100%'}
											src='/assets/landingv2/icons/menuIcon.svg'
											alt=''
										/>
									</Box>
									<Drawer
										anchor='right'
										open={navbarOpen}
										PaperProps={{
											sx: {
												width: 280,
												background: primary.properDark,
											},
										}}
										style={{
											zIndex: 10,
										}}>
										<List>
											<Stack
												direction={'row'}
												justifyContent={'flex-end'}
												px={3}
												pt={2}
												spacing={4}
												alignItems={'center'}>
												<Stack direction={'row'} spacing={1}>
													<Box height={23.5} width={23.5}>
														<img
															height={'100%'}
															width={'100%'}
															src='/assets/icons/phone.svg'
															alt=''
														/>
													</Box>
													<Typography
														variant='subtitle2'
														sx={{
															fontSize: 18,
														}}
														onClick={() => {
															sendAnalytics({
																action: 'ButtonClick',
																name: 'callProjectHeroSupport',
															})
														}}
														color={'#fff'}
														fontWeight={700}>
														{PHSupport.phoneNumber}
													</Typography>
												</Stack>
												<Box width={28} height={28}>
													<img
														width={'100%'}
														height={'100%'}
														src='/assets/landingv2/icons/menuIcon.svg'
														alt=''
													/>
												</Box>
											</Stack>
											{user ? (
												<Button
													variant='contained'
													startIcon={<DashboardRoundedIcon />}
													sx={(theme) => ({
														fontWeight: 700,
														color: primary.properDark,
														whiteSpace: 'nowrap',
														borderRadius: '20px !important',
														mx: 2,
														mt: 5,
														fontSize: 18,
														width: '100%',
													})}
													href={'/dashboard'}>
													Dashboard
												</Button>
											) : (
												<>
													{/* <LinkButton
														variant='text'
														color='info'
														sx={(theme) => ({
															mx: 2,
															mt: 2,
															fontWeight: 700,
															color: 'common.white',
															whiteSpace: 'nowrap',
															width: '100%',
															fontSize: 18,
															justifyContent: 'flex-start',
														})}
														onClick={() => {
															sendAnalytics({
																name: 'navbarLogin',
																action: 'ButtonClick',
															})
															openLoginDialog()
														}}>
														Login
													</LinkButton> */}
													{/* <Divider
														sx={{
															my: 2,
															background: 'transparent',
															borderTop: '2px dashed #ffffff',
															zIndex: '0',
															mx: 2,
														}}
													/> */}
												</>
											)}

											<Stack direction={'column'} spacing={4} px={2.4} mt={'40px'}>
												<Stack
													direction={'column'}
													alignItems={'flex-start'}
													spacing={1}
													sx={{
														px: 1,
														'& > a > button.MuiButton-root.MuiButton-text.MuiButton-sizeSmall':
															{
																minWidth: '140px',
																alignItem: 'left !important',
																justifyContent: 'unset',
															},
													}}>
													{navbar.navLinks.map((val, i) => {
														if (val.type === 'text_link') {
															return (
																<LinkButton
																	href={val.link}
																	key={i}
																	variant='text'
																	sx={(theme) => ({
																		fontWeight: 700,
																		color: '#fff',
																		textAlign: 'left',
																		fontSize: 18,
																	})}
																	size='small'>
																	{val.label}
																</LinkButton>
															)
														}
													})}
												</Stack>
											</Stack>
										</List>
									</Drawer>
								</IconButton>
							</Stack>
						</Stack>
						<NavWrapper
							direction='row'
							sx={{
								display: { md: 'inline-flex', xs: 'none' },
								justifyContent: 'flex-end',
							}}
							spacing={{ xs: 0, md: 2 }}
							alignItems='center'>
							<Link href='/' passHref>
								<Stack direction='row' alignItems={'center'} spacing={1} mr={1}>
									<Box component='img' src='/assets/icons/phone.svg' width={23} alt='ProjectHero' />
									<Typography
										variant='subtitle2'
										onClick={() => {
											sendAnalytics({
												action: 'ButtonClick',
												name: 'callProjectHeroSupport',
											})
										}}
										sx={{
											fontSize: 18,
										}}
										color={'#fff'}
										fontWeight={700}>
										{PHSupport.phoneNumber}
									</Typography>
								</Stack>
							</Link>
							{navbar.navLinks.map((navItem, i) => {
								if (navItem.type === 'button_link') {
									if (navItem.label === 'Dashboard') {
										return (
											!!user && (
												<Button
													variant='contained'
													key={i}
													startIcon={navItem?.icon}
													sx={(theme) => ({
														fontWeight: 700,
														fontSize: 18,
														color: primary.properDark,
														[theme.breakpoints.down('md')]: { display: 'none' },
														whiteSpace: 'nowrap',
														borderRadius: '20px !important',
													})}
													href={navItem.link}
													className={router.pathname === navItem.link ? 'active' : ''}>
													{navItem.label}
												</Button>
											)
										)
									} else {
										return null
									}
								} else if (navItem.type === 'scroll_link') {
									if (router.pathname === '/')
										return (
											<LinkButton
												variant='text'
												key={i}
												startIcon={navItem?.icon}
												sx={(theme) => ({
													fontWeight: 700,
													fontSize: 18,

													color: 'common.white',
													[theme.breakpoints.down('md')]: { display: 'none' },
													whiteSpace: 'nowrap',
												})}
												onClick={() => {
													sendAnalytics({
														name: 'howItWorks',
														action: 'ButtonClick',
														metaData: {
															origin: 'Navbar',
														},
													})
												}}
												href={navItem.link}
												className={router.pathname === navItem.link ? 'active' : ''}>
												{navItem.label}
											</LinkButton>
										)
									else return null
								} else if (navItem.type === 'support_menu') {
									return (
										<Button
											key={i}
											color='secondary'
											sx={(theme) => ({
												fontWeight: 700,
												fontSize: 18,

												[theme.breakpoints.down('md')]: {
													display: 'none',
												},
											})}
											className={menuRefs?.supportMenu ? 'active' : ''}
											endIcon={
												!menuRefs?.supportMenu ? (
													<ArrowDropDown color='primary' />
												) : (
													<ArrowDropUp color='primary' />
												)
											}
											onClick={(e) => {
												if (menuRefs?.supportMenu) {
													dispatchMenuRefs({
														supportMenu: undefined,
													})
													return
												}
												dispatchMenuRefs({
													supportMenu: e.target,
												})
											}}>
											{navItem.label}
											<Menu
												key={i + 'menu'}
												open={!!menuRefs?.supportMenu}
												anchorEl={menuRefs?.supportMenu}
												onClose={() => {
													dispatchMenuRefs({
														supportMenu: undefined,
													})
												}}
												PaperProps={{
													sx: {
														p: 3,
													},
												}}>
												<MenuItem>
													<Stack direction='row' spacing={2}>
														<Image
															src='/assets/landing/AgreementIcon.svg'
															width={35}
															height={45}
															alt='agreement icon'
														/>
														<Stack>
															<Typography fontWeight={600}>
																Contractor Agreement
															</Typography>
															<Typography variant='subtitle1'>
																Sign in to view all your plans
															</Typography>
														</Stack>
													</Stack>
												</MenuItem>
												<MenuItem>
													<Stack direction='row' spacing={2}>
														<Image
															src='/assets/landing/settingIcon.svg'
															width={35}
															height={45}
															alt='agreement icon'
														/>
														<Stack>
															<Typography fontWeight={600}>Sales & Services </Typography>
															<Typography variant='subtitle1' color='primary.main'>
																+91 85769 54374
															</Typography>
														</Stack>
													</Stack>
												</MenuItem>
												<Stack direction='row' alignItems='center' spacing={4}>
													<Typography fontWeight={600}>Contact Us</Typography>{' '}
													<Divider sx={{ flex: 1 }} color='#5193FF' />
												</Stack>
												<Stack direction='row' spacing={2} pt={3} justifyContent='center'>
													<Stack maxWidth={60}>
														<Image
															src='/assets/landing/whatsApp.svg'
															width={60}
															height={60}
															alt='agreement icon'
														/>
														<Typography
															variant='caption'
															textAlign='center'
															fontWeight={600}>
															Coming Soon
														</Typography>
													</Stack>
													<Stack maxWidth={90}>
														<Image
															src='/assets/landing/tranningIcon.svg'
															width={60}
															height={60}
															alt='agreement icon'
														/>
														<Typography
															variant='caption'
															textAlign='center'
															fontWeight={600}>
															Training and Hiring Hubs (Coming soon)
														</Typography>
													</Stack>
												</Stack>
											</Menu>
										</Button>
									)
								} else if (navItem.type === 'text_link') {
									return (
										<LinkButton
											href={navItem.link}
											key={i}
											variant='text'
											fullWidth
											sx={(theme) => ({
												fontWeight: 700,
												fontSize: 18,
												color: 'common.white',
												[theme.breakpoints.down('md')]: { display: 'none' },
											})}
											className={router.pathname === navItem.link ? 'active' : ''}
											size='small'>
											{navItem.label}
										</LinkButton>
									)
								} else {
									;<></>
								}
							})}
						</NavWrapper>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	)
}

export const NavWrapper = styled(Stack)(({ theme }) => ({
	width: '100%',
	'.active': {
		borderBottom: `2px solid ${theme.palette.primary.main}`,
	},
	'.MuiButton-root': {
		borderRadius: 0,
	},
}))

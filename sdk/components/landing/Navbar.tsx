import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	Box,
	Button,
	Container,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
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
import { DataLayerPush, HyperLink, LinkButton } from 'sdk'
import { sendAnalytics } from 'sdk/analytics/analyticsWrapper'
import { primary } from 'sdk'
import { contactUsSection, navbar } from 'sdk/data'
import { useContractorAuth } from 'sdk'
import Link from 'next/link'
export const Navbar = () => {
	const [menuRefs, dispatchMenuRefs] = useReducer((p: any, n: any) => ({ ...p, ...n }), {})
	const router = useRouter()
	const [navbarOpen, setNavbarOpen] = useState(false)
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
	useEffect(() => {
		!isMobile && setNavbarOpen(false)
	}, [isMobile])

	const { user } = useContractorAuth()

	console.log(user)

	return (
		<>
			<AppBar position='fixed' elevation={0}>
				<Container disableGutters>
					<Toolbar sx={{ justifyContent: 'space-between', zIndex: 12 }} disableGutters>
						<Stack
							direction='row'
							spacing={2}
							alignItems='center'
							justifyContent={'space-between'}
							width={'100%'}
							px={2}>
							<HyperLink href='/'>
								<Image src={navbar.brandImage} width={120} height={27} alt='Project hero' />
							</HyperLink>
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
								<Stack
									direction={'row'}
									justifyContent={'flex-end'}
									alignItems={'center'}
									spacing={2.5}>
									<Stack direction={'row'} spacing={1}>
										<Box height={23.5} width={23.5}>
											<img height={'100%'} width={'100%'} src='/assets/icons/phone.svg' alt='' />
										</Box>
										<Typography variant='subtitle2' color={'#fff'} fontWeight={700}>
											+91-9151003513
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
												<Typography variant='subtitle2' color={'#fff'} fontWeight={700}>
													+91-9151003513
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
											''
										) : (
											<>
												<LinkButton
													variant='text'
													color='info'
													startIcon={<img src={'/assets/landingv2/user.svg'} />}
													sx={(theme) => ({
														mx: 2,
														mt: 2,
														fontWeight: 700,
														color: 'common.white',
														whiteSpace: 'nowrap',
													})}
													onClick={() => {
														sendAnalytics({
															name: 'navbarLogin',
															action: 'ButtonClick',
														})
													}}
													href={'/login'}>
													Login
												</LinkButton>
												<Divider
													sx={{
														my: 2,
														background: '#f7f7f7',
														border: '1px solid #4c4c4c',
														zIndex: '0',
													}}
												/>
											</>
										)}

										{/* <Typography variant='h4' color={'#fff'} textAlign={'center'}>
											Contact us{' '}
										</Typography>
										<ListItem
											color='secondary'
											sx={(theme) => ({
												fontWeight: 700,
											})}>
											<ListItemAvatar>
												<img src='/assets/landing/call.svg' alt='plane' />
											</ListItemAvatar>
											<ListItemText>
												<Stack>
													<Typography variant='caption'>
														{contactUsSection.support.contactAction.label}
													</Typography>
													<Typography sx={{ color: '#0663F6' }}>
														{contactUsSection.support.contactAction.phone}
													</Typography>
												</Stack>
											</ListItemText>
										</ListItem>
										<ListItem
											color='secondary'
											sx={(theme) => ({
												fontWeight: 700,
											})}>
											<ListItemAvatar>
												<img src='/assets/landing/plane.svg' alt='plane' />
											</ListItemAvatar>
											<ListItemText>
												<Stack>
													<Typography variant='caption'>
														{contactUsSection.support.mailAction.label}
													</Typography>
													<Typography sx={{ color: '#0663F6' }}>
														{contactUsSection.support.mailAction.email}
													</Typography>
												</Stack>
											</ListItemText>
										</ListItem> */}
										<Stack direction={'column'} spacing={3} px={2.4} mt={'30px'}>
											<Stack direction={'row'} spacing={1}>
												<Box height={23.5} width={23.5}>
													<img
														height={'100%'}
														width={'100%'}
														src='/assets/icons/mail.svg'
														alt=''
													/>
												</Box>
												<Typography variant='subtitle2' color={'#fff'} fontWeight={700}>
													marketing@projecthero.in
												</Typography>
											</Stack>
											<Stack direction={'row'} spacing={1}>
												<Box height={23.5} width={23.5}>
													<img
														height={'100%'}
														width={'100%'}
														src='/assets/icons/phone.svg'
														alt=''
													/>
												</Box>
												<Typography variant='subtitle2' color={'#fff'} fontWeight={700}>
													+91-9151003513
												</Typography>
											</Stack>
										</Stack>
									</List>
								</Drawer>
							</IconButton>
						</Stack>
						<NavWrapper direction='row' spacing={{ xs: 0, md: 3 }} alignItems='center'>
							{navbar.navLinks.map((navItem, i) => {
								console.log(!user)
								if (navItem.type === 'button_link') {
									if (navItem.label === 'Login') {
										return (
											!user && (
												<LinkButton
													variant='text'
													key={i}
													startIcon={navItem?.icon}
													sx={(theme) => ({
														fontWeight: 700,
														color: 'common.white',
														[theme.breakpoints.down('md')]: { display: 'none' },
														whiteSpace: 'nowrap',
													})}
													onClick={() => {
														if (navItem.label === 'Login') {
															sendAnalytics({
																name: 'navbarLogin',
																action: 'ButtonClick',
															})
														}
													}}
													href={navItem.link}
													className={router.pathname === navItem.link ? 'active' : ''}>
													{navItem.label}
												</LinkButton>
											)
										)
									} else if (navItem.label === 'marketing@projecthero.in') {
										return (
											!!user && (
												<LinkButton
													variant='text'
													key={i}
													startIcon={navItem?.icon}
													sx={(theme) => ({
														fontWeight: 700,
														color: 'common.white',
														[theme.breakpoints.down('md')]: { display: 'none' },
														whiteSpace: 'nowrap',
													})}
													href={navItem.link}
													className={router.pathname === navItem.link ? 'active' : ''}>
													{navItem.label}
												</LinkButton>
											)
										)
									} else {
										return (
											<LinkButton
												variant='text'
												key={i}
												startIcon={navItem?.icon}
												sx={(theme) => ({
													fontWeight: 700,
													color: 'common.white',
													[theme.breakpoints.down('md')]: { display: 'none' },
													whiteSpace: 'nowrap',
												})}
												onClick={() => {
													if (navItem.label === 'Login') {
														sendAnalytics({
															name: 'navbarLogin',
															action: 'ButtonClick',
														})
													}
												}}
												href={navItem.link}
												className={router.pathname === navItem.link ? 'active' : ''}>
												{navItem.label}
											</LinkButton>
										)
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
								} else if (navItem.type === 'primary_button') {
									return (
										<LinkButton
											href='/login'
											key={i}
											variant='outlined'
											color='primary'
											onClick={() => {
												DataLayerPush({ event: 'book_worker_home_header' })
												sendAnalytics({
													name: 'BookWorker',
													action: 'ButtonClick',
													metaData: { origin: 'navbar' },
												})
											}}
											sx={{ fontWeight: 700, borderRadius: '8px !important' }}
											size='small'>
											{navItem.label}
										</LinkButton>
									)
								} else {
									return <></>
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
	'.active': {
		borderBottom: `2px solid ${theme.palette.primary.main}`,
	},
	'.MuiButton-root': {
		borderRadius: 0,
	},
}))

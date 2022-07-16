import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { AppBar, Button, Container, Divider, Menu, MenuItem, Stack, styled, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useReducer } from 'react'
import { DataLayerPush, LinkButton, useMobile } from 'sdk'
import { ButtonClicked } from 'sdk/analytics/analyticsWrapper'
import { navbar } from 'sdk/data'

export const Navbar = () => {
	const [menuRefs, dispatchMenuRefs] = useReducer((p: any, n: any) => ({ ...p, ...n }), {})
	const router = useRouter()
	const isMobile = useMobile()

	return (
		<>
			<AppBar position='fixed' elevation={0}>
				<Container>
					<Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
						<Image src={navbar.brandImage} width={150} height={27} alt='Project hero' />
						<NavWrapper direction='row' spacing={4} alignItems='center'>
							{navbar.navLinks.map((navItem, i) => {
								if (!isMobile && navItem.type === 'button_link') {
									return (
										<LinkButton
											key={i}
											color='secondary'
											sx={{ fontWeight: 700 }}
											href={navItem.link}
											className={router.pathname === navItem.link ? 'active' : ''}>
											{navItem.label}
										</LinkButton>
									)
								} else if (!isMobile && navItem.type === 'support_menu') {
									return (
										<Button
											key={i}
											color='secondary'
											sx={{ fontWeight: 700 }}
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
												ButtonClicked({
													page: document.title,
													action: 'Book Workers',
													url: router.asPath,
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

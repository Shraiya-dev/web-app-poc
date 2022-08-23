import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {
	Box,
	Button,
	CircularProgress,
	Drawer,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Pagination,
	Paper,
	Stack,
	styled,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import EmptyProject from '../../../public/assets/icons/emptyProject.png'
import { BottomLayout, primary, theme, useContractorAuth, useMobile } from '../../../sdk'
import { Analytic, clearCookie } from '../../../sdk/analytics'
import { ButtonClicked, CardClicked, NavigationTabClicked } from '../../../sdk/analytics/analyticsWrapper'
import { ProjectCard } from '../../../sdk/components/cards/ProjectCard'
import { CustomTopBar } from '../../../sdk/components/topBar/customTopBar'
import { useProjectDashboard } from '../hooks/useProjectDashboard'
import MenuIcon from '../../../public/assets/icons/MenuIcon.svg'
import logo from '../../../public/assets/icons/BrandLogo.svg'
import LogoutIcon from '@mui/icons-material/Logout'
import { ArrowBackIos } from '@mui/icons-material'
import { useEffect } from 'react'

const CustomProjectDashBoard = styled(Box)(({ theme }) => ({
	padding: 4,
	paddingTop: 0,
	'.info': {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		overflow: 'hidden',
		borderRadius: 8,
		paddingTop: 56,
	},
}))

export const ProjectDashboard = () => {
	const router = useRouter()
	const isMobile = useMobile()
	const APP_MARGIN = 264
	const APP_DRAWER_WIDTH = 260
	const APP_HEADER_MARGIN = 280

	const PROJECT_DETAILS = '/dashboard/projects/[projectId]'
	const BOOKING_LIST = '/projects/[projectId]/[tab]'
	const BOOKING_DETAILS = '/bookings/[projectId]/[bookingId]/[tab]'
	const DASHBOARD = '/dashboard'
	const PROFILE = '/profile/[tab]'

	const pageName =
		router?.pathname === BOOKING_LIST
			? 'Project'
			: router?.pathname === BOOKING_DETAILS
			? 'Booking'
			: router?.pathname === PROFILE
			? 'Profile'
			: 'Dashboard'

	const { loading, projects, user } = useProjectDashboard()
	useEffect(() => {
		if (user && !user?.hasProjects) {
			router.push(`/bookings/create`)
		} else if (projects.projects.length === 1) {
			localStorage.setItem('noBack', String(true))
			router.push(`/projects/${projects.projects[0].projectId}/bookings`)
		} else {
			localStorage.removeItem('noBack')
		}
	}, [projects, router, user])

	const { logOut, isSideBarToggle, updateIsSideBarToggle } = useContractorAuth()

	const toggleDrawer = () => {
		updateIsSideBarToggle(!isSideBarToggle)
	}

	const handleLogout = () => {
		NavigationTabClicked({
			name: 'Logout',
			page: pageName,

			url: router.asPath,
		})

		Analytic.reset()
		clearCookie()
		logOut()
	}

	return (
		<>
			<CustomTopBar>
				<Stack direction={'row'} spacing={2}>
					<Box sx={{ display: { xs: 'block', md: 'none' } }}>
						<IconButton onClick={toggleDrawer}>
							<Image src={MenuIcon} alt='menu' color='black' />
						</IconButton>
					</Box>
					<Stack direction={'column'}>
						<Typography
							sx={{
								fontSize: 26,
								fontWeight: 600,
								fontFamily: 'Saira, sans-serif',
								color: theme.palette.secondary.main,
							}}>
							Dashboard
						</Typography>
						<Typography sx={{ fontSize: 14, color: theme.palette.secondary.main }}>
							{user?.companyName}
						</Typography>
					</Stack>
				</Stack>
			</CustomTopBar>
			<CustomProjectDashBoard>
				<Stack
					direction={'row'}
					pt={3}
					pb={3}
					sx={{
						px: { xs: 2, md: '' },
					}}>
					<Typography
						sx={{
							fontFamily: 'Saira, sans-serif',
							fontWeight: '700',
							fontSize: 22,
							color: theme.palette.secondary.main,
						}}>
						Projects{' '}
						<Button
							startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle' }} />}
							variant='text'
							sx={{ verticalAlign: 'middle' }}
							onClick={() => {
								ButtonClicked({
									action: 'Add Project',
									page: 'Dashboard',
									url: router.asPath,
								})
								router.push('/projects/create')
							}}>
							Add Project
						</Button>
					</Typography>
				</Stack>
				<Stack
					sx={{
						maxHeight: { xs: 'calc(100vh - 235px)', md: '' },
						minHeight: { xs: 'calc(100vh - 235px)', md: '' },
						overflowY: { xs: 'scroll', md: 'hidden' },
						padding: { xs: 2, md: '' },
					}}>
					{loading ? (
						<Stack p={5} alignItems='center' textAlign={'center'}>
							<CircularProgress size={50} />
						</Stack>
					) : (
						<Grid container spacing={3}>
							{projects.projects.length === 0 ? (
								<Grid item xs={12} sm={6} md={4} lg={3}>
									<Paper className='info'>
										<Stack
											justifyContent={'center'}
											onClick={() => {
												CardClicked({
													action: 'Add Project',
													page: 'Dashboard',
													url: router.asPath,
												})
												router.push('/projects/create')
											}}
											sx={{ cursor: 'pointer' }}>
											<Stack direction={'row'} justifyContent={'center'} pb={1}>
												<AddCircleOutlineIcon
													sx={{
														verticalAlign: 'middle',
														color: primary.properDark,
														fontSize: 56,
													}}
												/>
											</Stack>
											<Typography textAlign={'center'} color={primary.properDark} fontSize={14}>
												Add a new project to book workers
											</Typography>
										</Stack>

										<Stack direction={'row'} justifyContent={'flex-end'} sx={{ marginLeft: 60 }}>
											<Image src={EmptyProject} />
										</Stack>
									</Paper>
								</Grid>
							) : (
								projects.projects.map((project, index) => {
									return (
										<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
											<ProjectCard project={project} />
										</Grid>
									)
								})
							)}
						</Grid>
					)}
				</Stack>

				{/* TODO : Add paginations */}

				{/* {projects?.projects?.length > 0 && (
						<Stack p={4} alignItems='center'>
							<Pagination
								color='primary'
								page={Number(router.query.pageNumber ?? 0) + 1}
								onChange={(_e, page) => {
									router.query.pageNumber = page - 1 + ''
									router.push(router)
								}}
								count={Math.ceil(projects?.projects?.length / 10)}
							/>
						</Stack>
					)} */}
			</CustomProjectDashBoard>
			<Box sx={{ display: { xs: 'block', md: 'none' } }}>
				<BottomLayout />
			</Box>

			<Box sx={{ display: { xs: 'block', md: 'none' } }}>
				<Drawer
					anchor={'left'}
					open={isSideBarToggle}
					onClose={toggleDrawer}
					variant={isMobile ? 'temporary' : 'permanent'}
					PaperProps={{
						sx: {
							boxShadow: 'none',
							background: primary.darkGrey,
						},
					}}>
					<Box width={APP_DRAWER_WIDTH} m={2}>
						<Stack direction={'row'} alignItems={'center'} mb={8} spacing={12}>
							<Image alt='logo' src={logo} height={52} width={isMobile ? 100 : 162} />
							{isMobile && (
								<Button
									color='primary'
									onClick={toggleDrawer}
									variant='text'
									startIcon={<ArrowBackIos fontSize='large' sx={{ color: '#fff' }} />}
								/>
							)}
						</Stack>
						<Stack direction={'column'} spacing={6}>
							<Stack direction={'row'} onClick={handleLogout} spacing={2.5}>
								<LogoutIcon
									sx={{
										color: '#b2b2b2',
									}}
								/>
								<Typography>Logout</Typography>
							</Stack>
							<Stack direction={'column'} spacing={3}>
								<Stack direction={'row'} spacing={1.3} alignItems={'center'}>
									<img height={25} src='/assets/icons/mail.svg' />
									<Typography
										component={'a'}
										href='mailto:marketing@projecthero.in'
										fontFamily={'Karla,sans-serif'}
										fontWeight={700}>
										marketing@projecthero.in
									</Typography>
								</Stack>
								<Stack direction={'row'} spacing={1.3} alignItems={'center'}>
									<img height={25} src='/assets/icons/phone.svg' />
									<Typography
										component={'a'}
										href='tel:+91-9151003513'
										fontFamily={'Karla,sans-serif'}
										fontWeight={700}>
										+91 9151003513
									</Typography>
								</Stack>
							</Stack>
						</Stack>
						{/* <List
							sx={{
								background: primary.darkGrey,
							}}
						>
							<ListItem
								sx={{
									// position: 'fixed',
									width: APP_DRAWER_WIDTH,
									// marginBottom: 16,
									bottom: 0,
									borderRadius: 40,
									background: primary.darkGrey,
								}}
							>
								<ListItemIcon>
									<LogoutIcon
										sx={{
											color: '#b2b2b2',
										}}
									/>
								</ListItemIcon>
								<ListItemText sx={{ color: '#b2b2b2' }}>Logout</ListItemText>
							</ListItem>
						</List> */}
					</Box>
				</Drawer>
			</Box>
		</>
	)
}

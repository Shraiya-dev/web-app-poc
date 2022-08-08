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
					{isMobile && (
						<IconButton onClick={toggleDrawer}>
							<Image src={MenuIcon} alt='menu' color='black' />
						</IconButton>
					)}
					<Stack direction={'column'}>
						<Typography
							style={{
								fontSize: 26,
								fontWeight: 600,
								fontFamily: 'Saira, sans-serif',
								color: theme.palette.secondary.main,
							}}
						>
							Dashboard
						</Typography>
						<Typography style={{ fontSize: 14, color: theme.palette.secondary.main }}>
							{user?.companyName}
						</Typography>
					</Stack>
				</Stack>
			</CustomTopBar>
			<CustomProjectDashBoard>
				<Stack direction={'row'} pt={3} pb={3}>
					<Typography
						style={{
							fontFamily: 'Saira, sans-serif',
							fontWeight: '700',
							fontSize: 22,
							color: theme.palette.secondary.main,
						}}
					>
						Projects{' '}
						<Button
							startIcon={<AddCircleOutlineIcon style={{ verticalAlign: 'middle' }} />}
							variant='text'
							style={{ verticalAlign: 'middle' }}
							onClick={() => {
								ButtonClicked({
									action: 'Add Project',
									page: 'Dashboard',
									url: router.asPath,
								})
								router.push('/projects/create')
							}}
						>
							Add Project
						</Button>
					</Typography>
				</Stack>
				<Stack
					sx={{
						maxHeight: isMobile ? 'calc(100vh - 280px)' : '',
						minHeight: isMobile ? 'calc(100vh - 280px)' : '',
						overflowY: isMobile ? 'scroll' : '',
					}}
				>
					{loading ? (
						<Stack p={5} alignItems='center' textAlign={'center'}>
							<CircularProgress size={50} />
						</Stack>
					) : (
						<Grid container spacing={3}>
							{projects.projects.length === 0 ? (
								<Grid item xs={12} md={3}>
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
											style={{ cursor: 'pointer' }}
										>
											<Stack direction={'row'} justifyContent={'center'} pb={1}>
												<AddCircleOutlineIcon
													style={{
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

										<Stack direction={'row'} justifyContent={'flex-end'} style={{ marginLeft: 60 }}>
											<Image src={EmptyProject} />
										</Stack>
									</Paper>
								</Grid>
							) : (
								projects.projects.map((project, index) => {
									return (
										<Grid item xs={12} md={3} key={index}>
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
			{isMobile && <BottomLayout />}

			{isMobile && (
				<Drawer
					anchor={'left'}
					open={isSideBarToggle}
					onClose={toggleDrawer}
					variant={isMobile ? 'temporary' : 'permanent'}
					PaperProps={{
						style: {
							boxShadow: 'none',
							background: primary.darkGrey,
						},
					}}
				>
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
									<Typography fontFamily={'Karla,sans-serif'} fontWeight={700}>
										marketing@projecthero.in
									</Typography>
								</Stack>
								<Stack direction={'row'} spacing={1.3} alignItems={'center'}>
									<img height={25} src='/assets/icons/phone.svg' />
									<Typography fontFamily={'Karla,sans-serif'} fontWeight={700}>
										+91-9151003513
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
								style={{
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
			)}
		</>
	)
}

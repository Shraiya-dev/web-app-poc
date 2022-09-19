import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import logo from '../../public/assets/icons/BrandLogo.svg'
import { DrawerItem } from '../components/drawerItem'
import { theme } from '../constants'
import { useMobile } from '../hooks/useMobile'
import { useContractorAuth } from '../providers'
import { Analytic } from '../analytics'
import { NavigationTabClicked } from '../analytics/analyticsWrapper'
import BusinessIcon from '@mui/icons-material/Business'
import { clearCookie } from '../analytics/helper'
import { ArrowBackIos } from '@mui/icons-material'

//always update when you change the app bar height into the onlyCssWeNeed file

const APP_MARGIN = 264
const APP_DRAWER_WIDTH = 240
const APP_HEADER_MARGIN = 280

const ContractorDashboardLayout = ({ children }: any) => {
	const { logOut, user, isSideBarToggle, updateIsSideBarToggle } = useContractorAuth()
	const isMobile = useMobile()
	const router = useRouter()

	const PROJECT_DETAILS = '/dashboard/projects/[projectId]'
	const BOOKING_LIST = '/projects/[projectId]/[tab]'
	const BOOKING_DETAILS = '/bookings/[projectId]/[bookingId]/[tab]'
	const DASHBOARD = '/dashboard'
	const PROFILE = '/profile/[tab]'

	const toggleDrawer = () => {
		updateIsSideBarToggle(!isSideBarToggle)
	}

	const pageName =
		router?.pathname === BOOKING_LIST
			? 'Project'
			: router?.pathname === BOOKING_DETAILS
			? 'Booking'
			: router?.pathname === PROFILE
			? 'Profile'
			: 'Dashboard'

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
		<Box
			sx={{
				background: theme.palette.background.default,
			}}>
			<Box
				style={{
					marginLeft: isMobile ? 0 : theme.spacing(35),
					//width: '100vw',
					minHeight: '100vh',
				}}>
				{isMobile ? (
					<Stack direction='row' p={1}>
						{/* {isMobile && (
							<IconButton onClick={toggleDrawer}>
								<Image src={MenuIcon} alt='menu' color='black' />
							</IconButton>
						)} */}
						{/* <Link href='/dashboard' passHref>
							<a>
								<Image
									priority
									src={logo}
									alt=''
									height={isMobile ? 34 : 52}
									width={isMobile ? 100 : 162}
								/>
							</a>
						</Link> */}
					</Stack>
				) : (
					''
				)}
				{children}
			</Box>
			{!isMobile && (
				<Drawer
					anchor={'left'}
					open={isSideBarToggle}
					onClose={toggleDrawer}
					variant={isMobile ? 'temporary' : 'permanent'}
					PaperProps={{
						style: {
							boxShadow: 'none',
						},
					}}>
					<Box width={APP_DRAWER_WIDTH} m={2}>
						<Stack direction={'row'} alignItems={'center'} mb={8} spacing={12}>
							<Box
								sx={{ cursor: 'pointer' }}
								onClick={() => {
									router.push('/')
								}}>
								<Image alt='logo' src={logo} height={52} width={isMobile ? 100 : 162} />
							</Box>
							{isMobile && (
								<Button
									color='primary'
									onClick={toggleDrawer}
									variant='text'
									startIcon={<ArrowBackIos fontSize='large' sx={{ color: '#fff' }} />}
								/>
							)}
						</Stack>
						<List>
							<DrawerItem
								icon={<DashboardRoundedIcon />}
								path={
									DASHBOARD
									// // router?.pathname === PROJECT_DETAILS
									// // 	? `/dashboard/projects/${router?.query?.projectId}`
									// // 	: router.pathname === BOOKING_LIST
									// // 	? `/dashboard/projects/bookings/list/${router?.query?.projectId}`
									// // 	: router.pathname === BOOKING_DETAILS
									// // 	? `/dashboard/projects/bookings/${router?.query?.projectId}/${router.query.bookingId}/bookingDetails`
									// 	: DASHBOARD
								}
								title='Dashboard'
								route={
									router?.pathname === PROJECT_DETAILS
										? PROJECT_DETAILS
										: router?.pathname === BOOKING_LIST
										? BOOKING_LIST
										: router?.pathname === BOOKING_DETAILS
										? BOOKING_DETAILS
										: DASHBOARD
								}
								toggleDrawer={toggleDrawer}
							/>

							<DrawerItem
								icon={<PersonIcon />}
								path={`/profile/details`}
								title='Company Profile'
								route={PROFILE}
								toggleDrawer={toggleDrawer}
							/>

							<DrawerItem
								icon={<BusinessIcon />}
								path='/account'
								title='Account'
								route={'/account'}
								toggleDrawer={toggleDrawer}
							/>
							{/* <DrawerItem icon={<AccountTreeOutlined />} path='/dashboard' title='Projects' /> */}

							<ListItem
								button
								onClick={handleLogout}
								style={{
									position: 'fixed',
									width: APP_DRAWER_WIDTH,
									marginBottom: 16,
									bottom: 0,
									borderRadius: 40,
								}}>
								<ListItemIcon>
									<LogoutIcon
										sx={{
											color: '#b2b2b2',
										}}
									/>
								</ListItemIcon>
								<ListItemText sx={{ color: '#b2b2b2' }}>Logout</ListItemText>
							</ListItem>
						</List>
					</Box>
				</Drawer>
			)}
		</Box>
	)
}

export default ContractorDashboardLayout

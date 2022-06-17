import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import logo from '../../public/assets/icons/BrandLogo.svg'
import MenuIcon from '../../public/assets/icons/MenuIcon.svg'
import { DrawerItem } from '../components/drawerItem'
import { theme } from '../constants'
import { useMobile } from '../hooks/useMobile'
import { useContractorAuth } from '../providers'
import { Analytic } from '../analytics'
import { NavigationTabClicked } from '../analytics/analyticsWrapper'
import BusinessIcon from '@mui/icons-material/Business'
import Link from 'next/link'
import { clearCookie } from '../analytics/helper'

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
		<>
			<Box
				style={{
					padding: isMobile ? 8 : 16,
					marginLeft: isMobile ? 0 : theme.spacing(33),
					background: theme.palette.background.default,
					//width: '100vw',
					height: '100vh',
				}}>
				{isMobile ? (
					<Stack direction='row' p={1}>
						{isMobile && (
							<IconButton onClick={toggleDrawer}>
								<Image src={MenuIcon} alt='menu' color='black' />
							</IconButton>
						)}
						<Link href='/dashboard' passHref>
							<a>
								<Image
									priority
									src={logo}
									alt=''
									height={isMobile ? 34 : 52}
									width={isMobile ? 100 : 162}
								/>
							</a>
						</Link>
					</Stack>
				) : (
					''
				)}
				{children}
			</Box>
			<Drawer
				anchor={'left'}
				open={isSideBarToggle}
				onClose={toggleDrawer}
				variant={isMobile ? 'temporary' : 'permanent'}
				PaperProps={{ style: { boxShadow: 'none' } }}>
				<Box width={APP_DRAWER_WIDTH} m={2}>
					<Stack direction={'row'} alignItems={'center'} mb={8} spacing={12}>
						<Image alt='logo' src={logo} height={52} width={isMobile ? 100 : 162} />
						{isMobile && (
							<IconButton onClick={toggleDrawer}>
								<Image src={MenuIcon} alt='menu' color='black' />
							</IconButton>
						)}
					</Stack>
					<List>
						<DrawerItem
							icon={<DashboardIcon />}
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
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText>Logout</ListItemText>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</>
	)
}

export default ContractorDashboardLayout

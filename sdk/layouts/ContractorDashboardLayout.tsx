import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import logo from '../../public/assets/icons/BrandLogo.svg'
import { DrawerItem } from '../components/drawerItem'
import { primary, theme } from '../constants'
import { useMobile } from '../hooks/useMobile'
import { useContractorAuth } from '../providers'
import { Analytic } from '../analytics'
import { NavigationTabClicked, sendAnalytics } from '../analytics/analyticsWrapper'
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
									onClick={() => {
										sendAnalytics({
											action: 'ButtonClick',
											name: 'callProjectHeroSupport',
										})
									}}
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
	)
}

export default ContractorDashboardLayout

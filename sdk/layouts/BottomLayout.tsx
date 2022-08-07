import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Stack } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import { BottomBarItem } from 'sdk/components/MobileBottomBar'
import { useContractorAuth } from 'sdk/providers'
import { useRouter } from 'next/router'

export const BottomLayout = ({ ...props }) => {
	const { logOut, user, isSideBarToggle, updateIsSideBarToggle } = useContractorAuth()

	const PROJECT_DETAILS = '/dashboard/projects/[projectId]'
	const BOOKING_LIST = '/projects/[projectId]/[tab]'
	const BOOKING_DETAILS = '/bookings/[projectId]/[bookingId]/[tab]'
	const DASHBOARD = '/dashboard'
	const PROFILE = '/profile/[tab]'

	const router = useRouter()

	const toggleDrawer = () => {
		updateIsSideBarToggle(!isSideBarToggle)
	}
	return (
		<Box
			sx={{
				background: '#000',
				position: 'fixed',
				bottom: 8,
			}}
		>
			<Stack direction={'row'} spacing={7} justifyContent={'space-evenly'} position={'sticky'}>
				<BottomBarItem
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

				<BottomBarItem
					icon={<PersonIcon />}
					path={`/profile/details`}
					title='Company Profile'
					route={PROFILE}
					toggleDrawer={toggleDrawer}
				/>

				<BottomBarItem
					icon={<BusinessIcon />}
					path='/account'
					title='Account'
					route={'/account'}
					toggleDrawer={toggleDrawer}
				/>
			</Stack>
		</Box>
	)
}

import React from 'react'
import { Box, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import { useRouter } from 'next/router'
import { useMobile } from 'sdk/hooks'
import Link from 'next/link'
import { NavigationTabClicked } from 'sdk/analytics'
import { primary } from 'sdk/constants'

export const BottomBarItem = ({ ...props }) => {
	const router = useRouter()
	const isMobile = useMobile()

	const BOOKING_LIST = '/projects/[projectId]/[tab]'
	const BOOKING_DETAILS = '/bookings/[projectId]/[bookingId]/[tab]'
	const PROFILE = '/profile/[tab]'

	const pageName =
		router?.pathname === BOOKING_LIST
			? 'Project'
			: router?.pathname === BOOKING_DETAILS
			? 'Booking'
			: router?.pathname === PROFILE
			? 'Company Profile'
			: 'Dashboard'

	const { icon, path, title, route, toggleDrawer } = props

	const handleClick = () => {
		NavigationTabClicked({
			name: title,
			page: pageName,

			url: router.asPath,
		})
	}
	return (
		<Link href={path} passHref>
			<a>
				<ListItem
					button
					style={{
						background: router.route === route ? primary.secButtonColor : '',
						// borderRadius: 40,
						// marginBottom: 16,
					}}
					onClick={handleClick}
				>
					<Stack direction={'column'} alignItems={'center'} justifyContent={'space-evenly'}>
						<ListItemIcon style={{ color: router.route === route ? '#000' : '#b2b2b2' }}>
							{icon}
						</ListItemIcon>
						<Typography style={{ fontSize: '10px', color: router.route === route ? '#000' : '#b2b2b2' }}>
							{title}
						</Typography>
					</Stack>
				</ListItem>
			</a>
		</Link>
	)
}

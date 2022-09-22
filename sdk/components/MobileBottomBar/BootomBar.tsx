import React from 'react'
import { ListItem, ListItemIcon, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMobile } from 'sdk/hooks'
import Link from 'next/link'
import { NavigationTabClicked } from 'sdk/analytics'
import { useTutorial } from 'sdk/providers'

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

	const { icon, path, title, route, toggleDrawer, ref } = props
	const { anchor } = useTutorial()
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
					ref={(e) => {
						if (title === 'Dashboard') anchor.current.DASHBOARD = e
					}}
					style={
						{
							// background: router.route === route ? primary.secButtonColor : '',
							// borderRadius: 40,
							// marginBottom: 16,
						}
					}
					onClick={handleClick}>
					<Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
						<Stack
							direction={'row'}
							justifyContent={'center'}
							sx={{
								width: '100%',
							}}>
							<ListItemIcon
								style={{ color: router.route === route ? '#fff' : '#7d7d7d', minWidth: 'fit-content' }}>
								{icon}
							</ListItemIcon>
						</Stack>
						<Typography
							textAlign={'center'}
							noWrap
							style={{ fontSize: '10px', color: router.route === route ? '#fff' : '#7d7d7d' }}>
							{title}
						</Typography>
					</Stack>
				</ListItem>
			</a>
		</Link>
	)
}

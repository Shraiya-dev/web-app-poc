import { ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Analytic } from '../../analytics'
import { NavigationTabClicked } from '../../analytics/analyticsWrapper'
import { primary } from '../../constants'
import { useMobile } from '../../hooks'

export const DrawerItem = ({ ...props }) => {
	const router = useRouter()
	const isMobile = useMobile()

	const BOOKING_LIST = '/projects/[projectId]/[tab]'
	const BOOKING_DETAILS = '/bookings/[projectId]/[bookingId]/[tab]'
	const PROFILE = '/profile'

	const pageName =
		router?.pathname === BOOKING_LIST
			? 'Project'
			: router?.pathname === BOOKING_DETAILS
			? 'Booking'
			: router?.pathname === PROFILE
			? 'Profile'
			: 'Dashboard'

	const { icon, path, title, route, toggleDrawer } = props

	const handleClick = () => {
		if (isMobile) {
			toggleDrawer()
			NavigationTabClicked({
				name: title,
				page: pageName,

				url: router.asPath,
			})
		} else {
			NavigationTabClicked({
				name: title,
				page: pageName,

				url: router.asPath,
			})
		}
	}

	return (
		<Link href={path} passHref>
			<a>
				<ListItem
					button
					style={{
						background: router.route === route ? primary.secButtonColor : '',
						borderRadius: 40,
						marginBottom: 16,
					}}
					onClick={handleClick}>
					<ListItemIcon style={{ color: router.route === route ? 'white' : '' }}>{icon}</ListItemIcon>
					<ListItemText>
						{' '}
						<Typography style={{ color: router.route === route ? 'white' : '' }}>{title}</Typography>
					</ListItemText>
				</ListItem>
			</a>
		</Link>
	)
}

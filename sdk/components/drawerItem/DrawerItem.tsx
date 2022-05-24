import { ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { primary } from '../../constants'
import { useMobile } from '../../hooks'

export const DrawerItem = ({ ...props }) => {
	const router = useRouter()
	const isMobile = useMobile()

	const { icon, path, title, route, toggleDrawer } = props

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
					onClick={isMobile ? toggleDrawer : () => {}}>
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

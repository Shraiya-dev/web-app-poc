import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import {
	AppBar,
	Box,
	Button,
	Container,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	styled,
	Toolbar,
	Dialog,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../../public/assets/icons/BrandLogo.svg'
import MenuIcon from '../../public/assets/icons/MenuIcon.svg'
import { useMobile } from '../hooks/useMobile'
import { useContractorAuth } from '../providers'
import CloseIcon from '@mui/icons-material/Close'

import { CreateBooking } from '../../modules/bookworker/components/createBooking'

//always update when you change the app bar height into the onlyCssWeNeed file
const APP_BAR_HEIGHT = 84
const APP_BAR_BG_COLOR = '#FFFFFF'

const CustomAppBar = styled(AppBar)(({ theme }) => ({
	backgroundColor: APP_BAR_BG_COLOR,
	minHeight: 84,
	'.container': {
		flex: 1,
		display: 'flex',
	},
	'.toolbar': {
		padding: 0,
		flex: 1,
		justifyContent: 'space-between',
	},
}))

const CustomContainer = styled(Container)(({ theme }) => ({
	marginTop: APP_BAR_HEIGHT,
	padding: theme.spacing(2),
}))

const DashboardLayout = ({ children, ...props }: any) => {
	const { logOut } = useContractorAuth()
	const isMobile = useMobile()
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

	const [bookingFormOpen, setBookingFormOpen] = useState<boolean>(false)
	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	const toggleBookingForm = () => {
		setBookingFormOpen((state) => !state)
	}

	return (
		<>
			<CustomAppBar elevation={0}>
				<Container className='container'>
					<Toolbar className='toolbar'>
						{isMobile ? (
							<IconButton onClick={toggleDrawer}>
								<Image src={MenuIcon} alt='menu' color='black' />
							</IconButton>
						) : (
							<Link href='/dashboard' passHref>
								<a>
									<Image priority src={logo} alt='' height={52} width={162} />
								</a>
							</Link>
						)}

						<Stack direction='row' spacing={2}>
							{!isMobile && (
								<>
									<Button variant='text'>Dashboard</Button>
									<Link href='/profile' passHref>
										<a>
											<Button variant='text'>My Profile</Button>
										</a>
									</Link>
								</>
							)}
							<Button variant='contained' onClick={toggleBookingForm}>
								Book Worker
							</Button>{' '}
						</Stack>
					</Toolbar>
				</Container>
			</CustomAppBar>
			<CustomContainer>{children}</CustomContainer>
			<Drawer anchor={'left'} open={drawerOpen} onClose={toggleDrawer}>
				<Box width={250} py={4}>
					<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
						<Image alt='logo' src={logo} />
					</Stack>
					<List>
						<ListItem button>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText>Dashboard</ListItemText>
						</ListItem>

						<ListItem button>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText>Profile</ListItemText>
						</ListItem>
						<ListItem button onClick={logOut}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText>LogOut</ListItemText>
						</ListItem>
					</List>
				</Box>
			</Drawer>

			<Dialog onClose={toggleBookingForm} open={bookingFormOpen} fullScreen>
				<IconButton edge='end' color='inherit' onClick={toggleBookingForm} aria-label='Close'>
					<CloseIcon />
				</IconButton>

				<CreateBooking toggleBookingForm={toggleBookingForm} />
			</Dialog>
		</>
	)
}

export default DashboardLayout

import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, Menu, Stack, styled, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../public/assets/icons/BrandLogo.svg'
import { useMobile } from '../hooks/useMobile'
import MenuIcon from '../../public/assets/icons/MenuIcon.svg'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';

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
	const isMobile = useMobile()
	const [state, setState] = useState<boolean>(false)
	const toggle = () => {
		setState(!state)
	}

	return (
		<>
			<CustomAppBar elevation={0}>
				<Container className='container'>
					<Toolbar className='toolbar'>
						{isMobile ? (
							<IconButton
								key={'left'}
								onClick={() => {
									toggle()
								}}>
								<Image src={MenuIcon} alt="menu" color='black' />
							</IconButton>

						) : null}
						<Drawer anchor={'left'} open={state} onClose={toggle}>
							<Box width={250} mt={4}>
								<Container>
									<Image alt="logo" src={logo} />
									<Button variant='text'> <DashboardIcon /> &nbsp; Dashboard</Button>
									<Divider/>
									<Button variant='text'> <PersonIcon /> &nbsp; My Profile</Button>
								</Container>
								
								
							</Box>
						</Drawer>
						<Image src={logo} alt='' height={52} width={162} />
						<Stack direction='row' spacing={2}>
							{isMobile ? null : (
								<>
									<Button variant='text'>Dashboard</Button>
									<Button variant='text'>My Profile</Button>
								</>
							)}

							<Button variant='contained'>Book Worker</Button>
						</Stack>
					</Toolbar>
				</Container>
			</CustomAppBar>
			<CustomContainer>{children}</CustomContainer>
		</>
	)
}

export default DashboardLayout

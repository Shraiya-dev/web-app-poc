import { AppBar, Button, Container, Stack, styled, Toolbar } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import logo from '../../public/assets/icons/BrandLogo.svg'

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
	return (
		<>
			<CustomAppBar elevation={0}>
				<Container className='container'>
					<Toolbar className='toolbar'>
						<Image src={logo} alt='' height={52} width={162} />
						<Stack direction='row' spacing={2}>
							<Button variant='text'>Dashboard</Button>
							<Button variant='text'>My Profile</Button>
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

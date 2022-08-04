import { Box, Container, IconButton, Stack, styled, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import { Children } from 'react'
import { primary, theme } from '../../constants'
import { useMobile } from '../../hooks'
import { useContractorAuth } from '../../providers'
import MenuIcon from '../../../public/assets/icons/MenuIcon.svg'

const APP_BAR_BG_COLOR = primary.darkGrey

const CustomAppBar = styled(Box)(() => ({
	backgroundColor: APP_BAR_BG_COLOR,
	minHeight: 84,
	display: 'flex',
	alignItems: 'center',

	'.toolbar': {
		// padding: 0,
		paddingLeft: 16,
		flex: 1,
		justifyContent: 'space-between',
		border: 'none',
	},
}))

export const CustomTopBar = ({ children }: any) => {
	const { isSideBarToggle, updateIsSideBarToggle } = useContractorAuth()

	const toggleDrawer = () => {
		updateIsSideBarToggle(!isSideBarToggle)
	}
	const isMobile = useMobile()

	return (
		<CustomAppBar>
			<Box style={{ marginLeft: 0, padding: 0 }}>
				<Toolbar className='toolbar'>
					<Stack width={1} direction={'row'}>
						{/* {isMobile && (
							<IconButton onClick={toggleDrawer}>
								<Image src={MenuIcon} alt='menu' color='black' />
							</IconButton>
						)} */}

						{children}
					</Stack>
				</Toolbar>
			</Box>
		</CustomAppBar>
	)
}

import { Box, Container, IconButton, Stack, styled, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import { Children } from 'react'
import { primary, theme } from '../../constants'
import { useMobile } from '../../hooks'
import { useContractorAuth } from '../../providers'
import MenuIcon from '../../../public/assets/icons/MenuIcon.svg'

const APP_BAR_BG_COLOR = primary.light

const CustomAppBar = styled(Box)(() => ({
	//backgroundColor: APP_BAR_BG_COLOR,
	//minHeight: 84,
	'.toolbar': {
		padding: 0,

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

import { Box, Stack, styled, Toolbar, Typography } from '@mui/material'
import { primary } from '../../constants'
import { useContractorAuth } from '../../providers'

const APP_BAR_BG_COLOR = primary.darkGrey

const CustomAppBar = styled(Box)(() => ({
	minHeight: 84,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',

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
	return (
		<CustomAppBar
			sx={{
				backgroundColor: { md: APP_BAR_BG_COLOR, xs: primary.properDark },
				left: { xs: 0, md: undefined },
				right: { xs: 0, md: undefined },
				mt: { xs: -3, md: 0 },
			}}>
			<Box style={{ marginLeft: 0, padding: 0, flex: 1 }}>
				<Toolbar className='toolbar' sx={{ flex: 1 }}>
					<Stack width={1} flex={1} direction={'row'}>
						{/* {isMobile && (
							<IconButton onClick={toggleDrawer}>
								<Image src={MenuIcon} alt='menu' color='black' />
							</IconButton>
						)} */}

						{children}
					</Stack>
				</Toolbar>
			</Box>

			<Stack display={{ xs: 'none', md: 'flex' }} direction={{ md: 'column', lg: 'row' }} spacing={2} mr={2}>
				<Stack direction={'row'} spacing={1} alignItems={'center'}>
					<img height={25} src='/assets/icons/mail.svg' />
					<Typography
						component='a'
						href='mailto:marketing@projecthero.in'
						fontFamily={'Karla,sans-serif'}
						fontWeight={700}>
						marketing@projecthero.in
					</Typography>
				</Stack>
				<Stack direction={'row'} spacing={1} alignItems={'center'}>
					<img height={25} src='/assets/icons/phone.svg' />
					<Typography
						component='a'
						href='tel:+91 9151003513'
						fontFamily={'Karla,sans-serif'}
						fontWeight={700}>
						+91-9151003513
					</Typography>
				</Stack>
			</Stack>
		</CustomAppBar>
	)
}

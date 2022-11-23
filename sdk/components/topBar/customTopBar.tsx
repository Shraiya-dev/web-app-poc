import { Box, IconButton, Stack, styled, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import { FC, useCallback } from 'react'
import { primary } from '../../constants'
import { useContractorAuth } from '../../providers'

const APP_BAR_BG_COLOR = primary.darkGrey
import MenuIcon from 'public/assets/icons/MenuIcon.svg'
import { sendAnalytics } from 'sdk/analytics'
import { PHSupport } from 'sdk/data'

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
interface Props {
	sideMenu?: boolean
}
export const CustomTopBar: FC<Props> = ({ children, sideMenu = false }) => {
	const { isSideBarToggle, updateIsSideBarToggle } = useContractorAuth()
	const toggleDrawer = useCallback(() => {
		updateIsSideBarToggle(!isSideBarToggle)
	}, [isSideBarToggle, updateIsSideBarToggle])

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
						{sideMenu && (
							<IconButton onClick={toggleDrawer}>
								<Image src={MenuIcon} alt='menu' color='black' />
							</IconButton>
						)}

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
						onClick={() => {
							sendAnalytics({
								action: 'ButtonClick',
								name: 'mailProjectHeroSupport',
							})
						}}
						fontFamily={'Karla,sans-serif'}
						fontWeight={700}>
						marketing@projecthero.in
					</Typography>
				</Stack>
				<Stack direction={'row'} spacing={1} alignItems={'center'}>
					<img height={25} src='/assets/icons/phone.svg' />
					<Typography
						component='a'
						href={`tel:+91 ${PHSupport.phoneNumber}`}
						fontFamily={'Karla,sans-serif'}
						onClick={() => {
							sendAnalytics({
								action: 'ButtonClick',
								name: 'callProjectHeroSupport',
							})
						}}
						fontWeight={700}>
						+91-{PHSupport.phoneNumber}
					</Typography>
				</Stack>
			</Stack>
		</CustomAppBar>
	)
}

import { Logout } from '@mui/icons-material'
import { Box, Button, Stack, styled, Typography } from '@mui/material'
import { BottomLayout } from 'sdk/layouts/BottomLayout'
import { primary, theme, useContractorAuth, useMobile } from '../../../sdk'
import { CustomTopBar } from '../../../sdk/components/topBar/customTopBar'
import usePersonalAccount from '../hooks/usePersonalAccount'
import DisplayInfo from './displayInfo'
import EditInfo from './editInfo'

const PersonalAccountStyle = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	flex: 1,
}))

const PersonalAccount = () => {
	const isMobile = useMobile()
	const { logOut } = useContractorAuth()

	const { handleEdit, isAccountEditable, setIsAccountEditable } = usePersonalAccount()

	return (
		<Stack height={'80vh'}>
			<PersonalAccountStyle>
				<CustomTopBar>
					<Stack m={2}>
						<Typography
							sx={{
								fontSize: 26,
								fontWeight: 700,
								color: theme.palette.secondary.main,
								fontFamily: 'Saira ,sans-serif',
							}}>
							Account
						</Typography>
					</Stack>
				</CustomTopBar>

				<Stack m={3} mt={0}>
					<Box justifyContent={'flex-end'} display='flex' margin={1}>
						{!isAccountEditable && (
							<Button
								size='small'
								variant='outlined'
								sx={{
									padding: 1,
									'&:hover': {
										background: theme.palette.primary.light,
										color: primary.properDark,
									},
								}}
								onClick={handleEdit}>
								Edit Profile
							</Button>
						)}
					</Box>

					<Stack flex={1}>
						{isAccountEditable ? (
							<Box
								sx={{
									maxHeight: { sx: 'calc(100vh - 180px)', md: '' },
									overflowY: { sx: 'scroll', md: '' },
								}}>
								<EditInfo
									setIsAccountEditable={setIsAccountEditable}
									isAccountEditable={isAccountEditable}
								/>
							</Box>
						) : (
							<Box
								sx={{
									maxHeight: { sx: 'calc(100vh - 180px)', md: '' },
									overflowY: { sx: 'scroll', md: '' },
								}}>
								<DisplayInfo />
							</Box>
						)}
					</Stack>
				</Stack>
			</PersonalAccountStyle>

			<Button
				sx={{
					position: 'fixed',
					bottom: 60,
					width: 'fit-content',

					left: 0,
					right: 0,
				}}
				variant='text'
				onClick={logOut}
				color='inherit'
				startIcon={<Logout />}>
				Logout
			</Button>
			<BottomLayout />
		</Stack>
	)
}

export default PersonalAccount

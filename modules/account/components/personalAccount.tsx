import { Box, Button, Stack, styled, Typography } from '@mui/material'
import { BottomLayout } from 'sdk/layouts/BottomLayout'
import { primary, theme, useMobile } from '../../../sdk'
import { CustomTopBar } from '../../../sdk/components/topBar/customTopBar'
import usePersonalAccount from '../hooks/usePersonalAccount'
import DisplayInfo from './displayInfo'
import EditInfo from './editInfo'

const PersonalAccountStyle = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
}))

const PersonalAccount = () => {
	const isMobile = useMobile()

	const { handleEdit, isAccountEditable, setIsAccountEditable } = usePersonalAccount()

	return (
		<>
			<PersonalAccountStyle>
				<CustomTopBar>
					<Stack m={2}>
						<Typography
							style={{
								fontSize: 26,
								fontWeight: 700,
								color: theme.palette.secondary.main,
							}}
						>
							Account
						</Typography>
					</Stack>
				</CustomTopBar>

				<Stack m={3} mt={0}>
					<Box justifyContent={'flex-end'} display='flex' margin={1}>
						{!isAccountEditable && (
							<Button
								variant='outlined'
								sx={{
									padding: 1,
									'&:hover': {
										background: theme.palette.primary.light,
										color: primary.properDark,
									},
								}}
								onClick={handleEdit}
							>
								Edit Profile
							</Button>
						)}
					</Box>

					<Stack>
						{isAccountEditable ? (
							<EditInfo
								setIsAccountEditable={setIsAccountEditable}
								isAccountEditable={isAccountEditable}
							/>
						) : (
							<DisplayInfo />
						)}
					</Stack>
				</Stack>
			</PersonalAccountStyle>
			{isMobile && <BottomLayout />}
		</>
	)
}

export default PersonalAccount

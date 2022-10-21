import { Box, Button, Card, Container, Paper, Stack } from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { primary } from 'sdk/constants'
import { LogoutAndRedirect } from 'sdk/utils/logoutHelper'
import { ConfirmationDialog, Navbar } from '../components'
import { useMobile } from '../hooks'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const intro = [
	{
		label: 'Book trained ProjectHeroes online',
	},
	{
		label: 'Supervise from your device',
	},
	{
		label: 'Achieve High Productivity',
	},
	{
		label: 'Increase Profit',
	},
	{
		label: '40,000+ Verified ProjectHeroes',
	},
]

const CustomizeDashboard = styled(Box)(({ theme }) => ({
	minHeight: 'calc(100vh - 65px)',
	minWidth: '100%',
	display: 'flex',
	marginTop: '65px',
	position: 'relative',
	background: '#fff',

	'.helmet': {
		position: 'absolute',
		top: '15%',
		left: '50%',
		transform: 'translate(-50%,0)',
	},

	'.center': {
		flex: 1,
		paddingTop: 24,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundImage: ' url(/assets/icons/backgrounds/onboarding-background.svg) ',
		// backgroundPosition: 'center center',
		// backgroundRepeat: 'no-repeat',
		// backgroundSize: 'cover',
		// objectFit: 'contain',

		//backgroundImage:onboardingSvg,
		// backgroundImage: `url(${onboardingSvg})`,
	},

	'.logoContainer': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	'.brandLogo': {
		height: 85,
		width: 218,
	},
	'.introBox': {
		minWidth: '80%',
	},
	backgroundImage: 'url(/assets/icons/backgrounds/orange-bubble.svg), url(/assets/icons/backgrounds/grey-bubble.svg)',
	backgroundPosition: 'left bottom, right top',
	backgroundRepeat: ' no-repeat, no-repeat',
	//mobile view styles
	[theme.breakpoints.down('md')]: {
		backgroundSize: '170px,150px',

		flexDirection: 'column',
		'.instruction': {
			display: 'none',
		},
		'.logoContainer': {
			display: 'flex',
			justifyContent: 'start',
			width: '33.06%',
			marginLeft: 16,
		},
		'.brandLogo': {
			height: 44,
			width: 112,
		},
		'.left': {
			padding: '10px',
			display: 'flex',
			maxHeight: 124,
			alignItems: 'start',
		},
		'.helmet': {
			position: 'absolute',
			top: '10%',
			left: '50%',
			// transform:'translate(-50%,0)'
		},
	},
}))

export const OnboardingLayout = ({ children, helmet = true, ...props }: any) => {
	const isMobile = useMobile()
	const [dialogProps, setDialogProps] = useState(false)
	const router = useRouter()
	return (
		<>
			<Navbar />
			<ConfirmationDialog
				title={'Leave without creating account?'}
				caption={'You’ll not be able to book ProjectHeroes'}
				open={dialogProps}
				cancel={() => {
					setDialogProps((p) => !p)
				}}
				confirm={() => {
					LogoutAndRedirect()
				}}
			/>
			<CustomizeDashboard>
				{/* <Stack position={'absolute'} top={0} right={0}>
					<img src='/assets/icons/backgrounds/grey-bubble.svg' />
				</Stack>
				<Stack position={'absolute'} bottom={0} left={0}>
					<img src='/assets/icons/backgrounds/orange-bubble.svg' />
				</Stack> */}
				<Container sx={{ display: 'flex', flex: 1, flexDirection: 'column', p: 2 }}>
					<Button
						onClick={!helmet ? () => router.back() : () => setDialogProps(true)}
						sx={{ alignSelf: 'flex-start', color: primary.properDark }}
						variant='text'
						color='info'
						startIcon={<KeyboardBackspaceIcon />}>
						Go Back
					</Button>

					<Stack className='center' spacing={5} mt={helmet ? -20 : 0}>
						{helmet && (
							<Stack>
								<img src='/assets/icons/backgrounds/Helmet.svg' />
							</Stack>
						)}
						{helmet && (
							<Paper
								component={Card}
								elevation={4}
								style={{
									background: '#000',
									padding: 24,
									borderRadius: 8,
									width: 'fit-content',
									minWidth: isMobile ? 372 : 392,
									zIndex: 2,
								}}>
								{children}
							</Paper>
						)}
						{!helmet && <>{children}</>}
					</Stack>
				</Container>
			</CustomizeDashboard>
		</>
	)
}

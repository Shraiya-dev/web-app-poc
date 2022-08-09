import { Box, Card, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import { Navbar } from '../components'
import { useMobile } from '../hooks'

const intro = [
	{
		label: 'Book trained workers online',
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
		label: '40,000+ Verified Workers',
	},
]

const CustomizeDashboard = styled(Box)(({ theme }) => ({
	minHeight: 'calc(100vh - 65px)',
	minWidth: '100vw',
	display: 'flex',
	marginTop: '65px',
	position: 'relative',

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
	//mobile view styles
	[theme.breakpoints.down('md')]: {
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
	const router = useRouter()
	return (
		<>
			<Navbar />
			<CustomizeDashboard>
				{helmet && (
					<Stack className='helmet'>
						<img src='/assets/icons/backgrounds/Helmet.svg' />
					</Stack>
				)}
				<Stack position={'absolute'} top={0} right={0}>
					<img src='/assets/icons/backgrounds/grey-bubble.svg' />
				</Stack>
				<Stack position={'absolute'} bottom={0} left={0}>
					<img src='/assets/icons/backgrounds/orange-bubble.svg' />
				</Stack>
				<Stack
					onClick={() => {
						router.back()
					}}
					direction='row'
					sx={{
						position: 'absolute',
						top: '38px',
						left: !isMobile ? '102px' : '20px',
						cursor: 'pointer',
						minWidth: '100%',
					}}>
					<img src={'/assets/icons/arrow_back.svg'} alt='back' />
					<Typography ml={2}>Go Back</Typography>
				</Stack>
				{helmet && (
					<Stack className='center'>
						<Paper
							component={Card}
							elevation={4}
							style={{
								background: '#000',
								padding: 24,
								borderRadius: 8,
								width: isMobile ? 372 : 392,
								zIndex: 2,
							}}>
							{children}
						</Paper>
					</Stack>
				)}
				{!helmet && (
					<Stack mt='90px' mb='20px' className='center'>
						{children}
					</Stack>
				)}
			</CustomizeDashboard>
		</>
	)
}

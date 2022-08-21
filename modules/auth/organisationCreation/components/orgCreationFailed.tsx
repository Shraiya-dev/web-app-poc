import { Box, Button, Icon, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import Error from '../../../../public/assets/icons/error.svg'
import { useContractorAuth } from '../../../../sdk'
import { ButtonClicked } from '../../../../sdk/analytics/analyticsWrapper'
import { OnboardingCard } from '../../../../sdk/layouts/OrganisationCard'

const CustomOrgFailedStyles = styled(Box)(({ theme }) => ({
	margin: 8,

	'.headerInfo': {
		marginTop: 24,
		marginBottom: 24,
		fontSize: 30,
		fontWeight: 700,
		textAlign: 'center',
	},

	'.cta': {
		marginTop: 32,
		width: '100%',
		color: 'white',
		cursor: 'pointer',
	},
}))

const OrgCreationFailed = () => {
	const router = useRouter()
	const { user } = useContractorAuth()
	return (
		<OnboardingCard>
			<Stack sx={{ marginTop: 4, fontSize: 60, display: 'flex' }}>
				<Image src={Error} />
			</Stack>

			<Typography sx={{ marginTop: 4, textAlign: 'center' }}>
				We couldn’t link your profile to the company {user?.companyName}
			</Typography>
			<Button
				sx={{ marginTop: 6 }}
				fullWidth
				onClick={() => {
					router.replace('/contact-us')
					ButtonClicked({
						action: 'Contact Projecthero',
						page: 'Organisation Linking Failed',
						url: router.asPath,
					})
				}}>
				Contact Support
			</Button>
		</OnboardingCard>
	)
}

export default OrgCreationFailed

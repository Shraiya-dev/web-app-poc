import { Box, Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Checked from '../../../../public/assets/icons/checked.svg'
import { useContractorAuth } from '../../../../sdk'
import { ButtonClicked } from '../../../../sdk/analytics/analyticsWrapper'

const CustomOrgSuccessStyles = styled(Box)(({ theme }) => ({
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

const OrgCreationSuccess = () => {
	const router = useRouter()

	const { user } = useContractorAuth()
	return (
		<CustomOrgSuccessStyles>
			<Stack sx={{ marginTop: 4, fontSize: 60, display: 'flex' }}>
				<Image src={Checked} />
			</Stack>

			<Typography sx={{ marginTop: 4, textAlign: 'center' }}>
				Your profile is successfully linked to the company {user?.companyName}
			</Typography>
			<Button
				sx={{ marginTop: 6 }}
				fullWidth
				onClick={() => {
					router.replace('/dashboard')

					ButtonClicked({
						action: 'New Organisation Created',
						page: 'Organisation Success',
						url: router.asPath,
					})
				}}>
				Let’s Go!
			</Button>
		</CustomOrgSuccessStyles>
	)
}

export default OrgCreationSuccess

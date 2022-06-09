import { Box, Stack, styled, Typography } from '@mui/material'
import { TextWrapper } from '../../../sdk/components/Input/TextWrapper'

import { useContractorAuth } from '../../../sdk'
import { designationLabel } from '../../../sdk/constants/designation'

const DisplayInfoStyle = styled(Box)(({ theme }) => ({
	'.info': {
		fontSize: 14,
		color: theme.palette.secondary.main,
	},
}))

const DisplayInfo = () => {
	const { user } = useContractorAuth()
	return (
		<DisplayInfoStyle>
			<Stack spacing={3}>
				<TextWrapper id='name' label='Name'>
					<Typography className='info'>{user?.name ? user?.name : '_'}</Typography>
				</TextWrapper>

				<TextWrapper id='phoneNumber' label='Mobile'>
					<Typography className='info'>{user?.phoneNumber}</Typography>
				</TextWrapper>

				<TextWrapper id='email' label='Email'>
					<Typography className='info'>{user?.email ? user?.email : '_'}</Typography>
				</TextWrapper>

				<TextWrapper id='designation' label='Designation'>
					<Typography className='info'>
						{user?.designation ? designationLabel[user?.designation] : '_'}{' '}
					</Typography>
				</TextWrapper>
			</Stack>
		</DisplayInfoStyle>
	)
}

export default DisplayInfo

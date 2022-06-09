import { Box, Icon, Stack, styled, Typography } from '@mui/material'
import { TextWrapper } from '../../../sdk/components/Input/TextWrapper'

import { primary, useContractorAuth } from '../../../sdk'
import ViewImage from '../../../sdk/components/viewImage/viewImage'
import { useEffect, useState } from 'react'
import forWardIcon from '../../../public/assets/icons/forward.svg'
import Image from 'next/image'
import useCompanyDetails from '../hooks/useCompanyDetails'

const DisplayCompanyInfoStyle = styled(Box)(({ theme }) => ({
	'.info': {
		fontSize: 14,
		color: theme.palette.secondary.main,
	},
	'.GstinCertificate': {
		color: theme.palette.primary.main,
		cursor: 'pointer',
	},
}))

const DisplayCompanyInfo = () => {
	const { getContactorUserInfo } = useContractorAuth()
	const { orgDetails, getOrgDetails } = useCompanyDetails()
	const [viewDoc, setViewDoc] = useState(false)

	const handleView = () => {
		setViewDoc((state) => !state)
	}

	useEffect(() => {
		getOrgDetails()
		getContactorUserInfo()
	}, [getContactorUserInfo, getOrgDetails])
	return (
		<DisplayCompanyInfoStyle>
			<ViewImage open={viewDoc} onClick={handleView} imageSrc={orgDetails?.GSTINDocuments[0] ?? ''} />

			<Stack spacing={3}>
				<TextWrapper id='companyName' label='Company Name'>
					<Typography className='info'>{orgDetails?.companyName ? orgDetails?.companyName : '-'}</Typography>
				</TextWrapper>

				<TextWrapper id='GSTIN' label='GSTIN'>
					<Typography className='info'>{orgDetails?.GSTIN ? orgDetails?.GSTIN : '_'}</Typography>
				</TextWrapper>
			</Stack>
			{orgDetails?.GSTINDocuments ? (
				<Typography className='GstinCertificate' display={'flex'} onClick={handleView}>
					View GSTIN Certificate{' '}
					<Icon style={{ display: 'flex', verticalAlign: 'middle', marginLeft: 8, fontSize: 26 }}>
						<Image src={forWardIcon} />
					</Icon>
				</Typography>
			) : (
				<Typography>_</Typography>
			)}
		</DisplayCompanyInfoStyle>
	)
}

export default DisplayCompanyInfo

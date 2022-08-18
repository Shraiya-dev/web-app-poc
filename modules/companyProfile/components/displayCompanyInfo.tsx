import { Box, Icon, Stack, styled, Typography } from '@mui/material'
import { TextWrapper } from '../../../sdk/components/Input/TextWrapper'

import { getCustomerDetails, primary, useContractorAuth } from '../../../sdk'
import ViewImage from '../../../sdk/components/viewImage/viewImage'
import { useEffect, useState } from 'react'
import forWardIcon from '../../../public/assets/icons/forward.svg'
import Image from 'next/image'
import useCompanyDetails from '../hooks/useCompanyDetails'
import { useRouter } from 'next/router'

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

const DisplayCompanyInfo = ({ ...props }) => {
	const { user } = useContractorAuth()
	const { orgDetails, getOrgDetails } = useCompanyDetails()
	const [viewDoc, setViewDoc] = useState(false)

	const { isCmpDetailsEditable, setIsCmpDetailsEditable } = props

	const handleView = () => {
		setViewDoc((state) => !state)
	}

	// useEffect(() => {
	// 	if (user?.organisationId) {
	// 		getOrgDetails(user?.organisationId)
	// 	} else {
	// 		getCustomerDetails()
	// 			.then((res) => getOrgDetails(res?.data?.payload?.linkedOrganisation?.organisationId))
	// 			.catch((error) => {
	// 				console.log('error', error)
	// 			})
	// 	}
	// deepakphero code
	// }, [])

	useEffect(() => {
		getOrgDetails()
	}, [])

	return (
		<DisplayCompanyInfoStyle>
			{/* <ViewImage open={viewDoc} onClick={handleView} imageSrc={orgDetails?.GSTINDocuments ?? ''} /> */}

			<Stack spacing={3}>
				<TextWrapper id='companyName' label='Company Name'>
					<Typography className='info'>{orgDetails?.companyName ? orgDetails?.companyName : '-'}</Typography>
				</TextWrapper>

				<TextWrapper id='GSTIN' label='GSTIN'>
					<Typography className='info'>{orgDetails?.GSTIN ? orgDetails?.GSTIN : '_'}</Typography>
				</TextWrapper>
			</Stack>
			{/* {orgDetails?.GSTINDocuments ? (
				<Typography className='GstinCertificate' display={'flex'} onClick={handleView}>
					View GSTIN Certificate{' '}
					<Icon style={{ display: 'flex', verticalAlign: 'middle', marginLeft: 8, fontSize: 26 }}>
						<Image src={forWardIcon} />
					</Icon>
				</Typography>
			) : (
				<Typography>_</Typography>
			)} */}
		</DisplayCompanyInfoStyle>
	)
}

export default DisplayCompanyInfo

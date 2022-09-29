import { Box, Button, styled } from '@mui/material'
import { primary, theme } from '../../../sdk'
import useCompanyDetails from '../hooks/useCompanyDetails'
import DisplayCompanyInfo from './displayCompanyInfo'
import EditCompanyInfo from './editCompanyInfo'

const CompanyInfoStyle = styled(Box)(({ theme }) => ({
	'.info': {
		fontSize: 14,
	},
}))

const CompanyInfo = () => {
	const { isCmpDetailsEditable, setIsCmpDetailsEditable, handleEdit } = useCompanyDetails()

	return (
		<CompanyInfoStyle>
			<Box justifyContent={'flex-end'} display='flex' mb={isCmpDetailsEditable ? 0 : -3} mt={3}>
				{!isCmpDetailsEditable && (
					<Button size='small' variant='contained' sx={{ fontSize: 10 }} onClick={handleEdit}>
						Edit
					</Button>
				)}
			</Box>
			{isCmpDetailsEditable ? (
				<EditCompanyInfo
					setIsCmpDetailsEditable={setIsCmpDetailsEditable}
					isCmpDetailsEditable={isCmpDetailsEditable}
				/>
			) : (
				<DisplayCompanyInfo
					setIsCmpDetailsEditable={setIsCmpDetailsEditable}
					isCmpDetailsEditable={isCmpDetailsEditable}
				/>
			)}
		</CompanyInfoStyle>
	)
}

export default CompanyInfo

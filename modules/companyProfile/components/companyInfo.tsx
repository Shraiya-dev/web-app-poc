import { Box, Button, styled } from '@mui/material'
import { theme, useContractorAuth } from '../../../sdk'
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
			<Box justifyContent={'flex-end'} display='flex' margin={1}>
				{!isCmpDetailsEditable && (
					<Button
						variant='outlined'
						sx={{ background: theme.palette.primary.light, padding: 1 }}
						onClick={handleEdit}>
						Edit Company
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

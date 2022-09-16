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
					<Button
						size='small'
						variant='outlined'
						sx={{
							fontSize: 9,
							'&:hover': {
								background: theme.palette.primary.light,
								color: primary.properDark,
							},
						}}
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

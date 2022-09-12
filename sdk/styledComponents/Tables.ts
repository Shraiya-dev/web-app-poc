import { alpha, Paper, styled, TableCell } from '@mui/material'
import { colors } from '..'

export const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
	background: '#f2f9fb',
	fontWeight: 600,
	// ':hover': {
	// 	background: colors.AliceBlue,
	// },
}))

export const StyledDataGridWrapper = styled(Paper)(({ theme }) => ({
	'& .MuiDataGrid-columnHeaders': {
		height: 56,
		background: alpha(colors.RoyalBlue, 0.05),
		fontWeight: 'bolder',
	},
	'& .MuiDataGrid-footerContainer': {
		height: 56,
		background: colors.FloralWhite,
		fontWeight: 'bolder',
	},
}))

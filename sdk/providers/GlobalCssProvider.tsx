import { Box, styled } from '@mui/material'
export const GlobalCssProvider = styled(Box)(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		'.hide-on-desktop': {
			display: 'none !important',
		},
	},
	[theme.breakpoints.down('md')]: {
		'.hide-on-Mobile': {
			display: 'none !important',
		},
	},
}))

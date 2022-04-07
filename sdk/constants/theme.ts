import { createTheme } from '@mui/material/styles'

export const primary = {
	main: '#244CB3',
	light: '#224ab5',
}

export const theme = createTheme({
	palette: {
		primary: primary,
	},
	components: {
		MuiButton: {
			defaultProps: {
				variant: 'contained',
			},
			styleOverrides: {
				root: {
					borderRadius: 30,
				},
				sizeMedium: {
					padding: '12px 22px',
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'outlined',
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
	},
})

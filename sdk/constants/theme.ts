import { KeyboardArrowDownRounded } from '@mui/icons-material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { createBreakpoints } from '@mui/system'
export const primary = {
	main: '#244CB3',
	light: '#224ab50d',
}

const breakpoints = createBreakpoints({})

let themeDef = createTheme({
	typography: {
		fontFamily: `'Mulish' , sans-serif`,
		allVariants: {
			color: '#061F48',
		},
	},
	palette: {
		primary: primary,
		secondary: {
			main: '#061e45b3',
			dark: '#061F48',
			light: '#061F4866',
		},
		success: {
			main: '#0FAF7F',
		},
		info: {
			main: '#4676F5',
		},
		warning: {
			main: '#D85B00',
		},
		error: {
			main: '#F13625',
		},
		tonalOffset: 0.3,
	},

	components: {
		MuiPaper: {
			defaultProps: {
				variant: 'outlined',
			},
		},
		MuiInput: {
			defaultProps: {
				disableUnderline: true,
			},
		},
		MuiGrid: {
			defaultProps: {
				display: 'flex',
				alignItems: 'stretch',
			},
		},
		MuiButton: {
			defaultProps: {
				variant: 'contained',
			},
			styleOverrides: {
				root: {
					borderRadius: 30,
					textTransform: 'inherit',
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

		MuiSelect: {
			defaultProps: {
				MenuProps: {
					style: {
						maxHeight: 400,
					},
				},
				IconComponent: KeyboardArrowDownRounded,
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

export const theme = responsiveFontSizes(themeDef)
// export const theme = themeDef

import { KeyboardArrowDownRounded } from '@mui/icons-material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { createBreakpoints } from '@mui/system'
export const primary = {
	main: '#1E9FD6', //'#244CB3',
	light: '#EEFAFF', //'#224ab50d',
	dark: '#23A0D6',

	// TODO: Need to add Proper Colouring
	bgColor: '#F0F7FA',
	secButtonColor: '#36B5EC',

	lightGrey: 'rgba(6, 31, 72, 0.05)',
	lightOrange: 'rgba(247, 158, 84, 0.2)',
	lightGreen: 'rgba(15, 175, 127, 0.2)',
	mediumGreen: 'rgba(15, 175, 127, 0.5)',
	successGreen: '#0FAF7F',
}
export const colors = {
	AliceBlue: '#EBF1F4',
	RoyalBlue: '#36B5EC',
	FloralWhite: '#FFFCF1',
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
			dark: '#23A0D6',
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
			main: '#EA5A4D',
		},
		background: {
			default: '#FCFCFC',
		},

		tonalOffset: 0.3,
	},

	components: {
		MuiPaper: {
			defaultProps: {
				//variant: 'outlined',
				style: {
					boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.08)',
				},
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
			styleOverrides: {
				root: {
					minHeight: 48,
				},
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

		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: primary.light,
					borderRadius: '0px 40px 40px 0px',
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					background: 'black',
					color: 'white',
					margin: 16,
				},
			},
		},
	},
})

export const theme = responsiveFontSizes(themeDef)
// export const theme = themeDef

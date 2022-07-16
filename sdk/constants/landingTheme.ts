import { KeyboardArrowDownRounded } from '@mui/icons-material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { createBreakpoints } from '@mui/system'

declare module '@mui/material/styles' {
	interface Palette {
		base: {
			variant70: string
			variant50: string
			variant60: string
			main: string
		}
		green: {
			light: string
			medium: string
			dark: string
			iconBg: string
		}
		button: {
			primary: string
			secondary: string
		}
		textCTA: {
			white: string
			blue: string
		}
	}
	interface PaletteOptions {
		base: {
			variant70: string
			main: string
			variant50: string
			variant60: string
		}
		green: {
			light: string
			medium: string
			dark: string
			iconBg: string
		}
		button: {
			primary: string
			secondary: string
		}
		textCTA: {
			white: string
			blue: string
		}
	}
}
const colorPalette = {
	base: {
		variant70: '#776BFD',
		variant50: 'rgba(6, 31, 72, 0.5)',
		variant60: 'rgba(6, 31, 72, 0.6)',
		main: '#061F48',
	},
	green: {
		light: 'rgba(15, 175, 127, 0.2)',
		medium: 'rgba(15, 175, 127, 0.5)',
		dark: '#0FAF7F',
		iconBg: '#48D2A9',
	},
	button: {
		primary: 'white',
		secondary: '#36B5EC',
	},
	textCTA: {
		white: 'white',
		blue: '#36B5EC',
	},
}
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
			color: '#011F50',
		},
		h3: {
			fontSize: '37px',
		},
		h4: {
			fontSize: '30px',
		},
	},

	palette: {
		primary: {
			main: '#0663F6',
			dark: '#0445AC',
			light: '#5193FF',
		},
		secondary: {
			main: '#011F50',
			dark: '#001538',
			light: '#334B73',
		},
		success: {
			main: '#4FDC95',
			dark: '#649062',
			light: '#EBFEEA',
		},
		info: {
			main: '#4676F5',
		},
		warning: {
			main: '#E77241',
		},
		error: {
			main: '#EA5A4D',
		},
		background: {
			default: '#FCFCFC',
		},
		base: colorPalette.base,
		green: colorPalette.green,
		button: colorPalette.button,
		textCTA: colorPalette.textCTA,
		tonalOffset: 0.3,
	},
	breakpoints: {
		values: {
			xl: 1536,
			lg: 1200,
			md: 900,
			sm: 600,
			xs: 0,
		},
	},

	components: {
		MuiAppBar: {
			defaultProps: {
				variant: 'outlined',
				color: 'transparent',
			},
			styleOverrides: {
				root: {
					backgroundColor: '#ffffff',
					border: 0,
					height: '70px',
				},
			},
		},
		MuiContainer: {
			styleOverrides: {
				root: {
					flex: 1,
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					flex: 1,
					height: '100%',
				},
			},
		},
		MuiGrid: {
			styleOverrides: {
				item: {
					display: 'flex',
					position: 'relative',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				contained: {
					borderRadius: 12,
				},
				root: {
					textTransform: 'inherit',
				},
			},
		},
	},
})

export const landingTheme = responsiveFontSizes(themeDef)
// export const theme = themeDef

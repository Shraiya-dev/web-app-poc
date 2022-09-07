import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { createBreakpoints } from '@mui/system'
declare module '@mui/material/TextField' {
	interface TextFieldPropsVariantOverrides {
		rounded: true
	}
}
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
let themeDef = createTheme({
	typography: {
		fontFamily: `'Saira', sans-serif`,
		h1: {
			fontSize: '36px',
			fontWeight: 700,
		},
		h2: {
			fontSize: '30px',
			fontWeight: 700,
		},
		h3: {
			fontSize: '24px',
			fontWeight: 700,
		},
		h4: {
			fontSize: '20px',
			fontWeight: 700,
		},
		h5: {
			fontSize: '18px',
			fontWeight: 700,
		},
		h6: {
			fontSize: '16px',
			fontWeight: 700,
		},
		body1: {
			fontSize: '16px',
		},
		body2: {
			fontSize: '14px',
		},
		subtitle1: {
			fontSize: '14px',
			fontWeight: 700,
		},
		subtitle2: {
			fontSize: '12px',
		},
		caption: {
			fontSize: '12px',
		},
	},

	palette: {
		primary: {
			main: '#EFC41A',
			light: '#F2CF47',
			dark: '#A78912',
			contrastText: '#000000',
		},
		secondary: {
			main: '#CC2C49',
			light: '#D6566D',
			dark: '#8E1E33',
		},
		success: {
			main: '#0faf7f80',
			light: '#0faf7f33',
			dark: '#0FAF7F',
		},
		info: {
			main: '#2196f3',
			light: '#64b5f6',
			dark: '#1976d2',
		},
		warning: {
			main: '#E58A51',
			light: '#EAA173',
			dark: '#A06038',
		},
		error: {
			main: '#EA5A4D',
			light: '#EE7B70',
			dark: '#A33E35',
		},
		background: {
			default: '#FCFCFC',
			paper: '#ffffff',
		},
		text: {
			primary: '#000000de',
			secondary: '#0000008a',
			disabled: '#00000061',
		},
		grey: {
			'50': alpha('#061F48', 0.5),
			'100': alpha('#061F48', 0.1),
			'200': alpha('#061F48', 0.2),
			'300': alpha('#061F48', 0.3),
			'400': alpha('#061F48', 0.4),
			'500': alpha('#061F48', 0.5),
			'600': alpha('#061F48', 0.6),
			'700': alpha('#061F48', 0.7),
			'800': alpha('#061F48', 0.8),
			'900': alpha('#061F48', 0.9),
			A100: alpha('#061F48', 0.1),
			A200: alpha('#061F48', 0.2),
			A400: alpha('#061F48', 0.4),
			A700: '#383838',
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
			lg: 1350,
			md: 900,
			sm: 600,
			xs: 0,
		},
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiAppBar: {
			defaultProps: {
				variant: 'outlined',
				color: 'transparent',
			},
			styleOverrides: {
				root: {
					backgroundColor: '#000000',
					border: 0,
					height: '70px',
				},
			},
		},
		MuiSelect: {
			defaultProps: {
				MenuProps: {
					sx: {
						maxHeight: 400,
						mt: 1,
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 16,
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
			defaultProps: {
				variant: 'contained',
			},
			styleOverrides: {
				root: {
					borderRadius: 30,
					textTransform: 'inherit',
				},
			},
		},
	},
})

export const landingTheme = responsiveFontSizes(themeDef)
// export const theme = themeDef

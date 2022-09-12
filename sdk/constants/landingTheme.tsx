import { KeyboardArrowDown } from '@mui/icons-material'
import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles'

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
		fontFamily: `'Karla', sans-serif`,

		h1: {
			fontSize: '36px',
			fontWeight: 700,
			fontFamily: `'Saira', sans-serif`,
		},
		h2: {
			fontSize: '30px',
			fontWeight: 700,
			fontFamily: `'Saira', sans-serif`,
		},
		h3: {
			fontSize: '24px',
			fontWeight: 700,
			fontFamily: `'Saira', sans-serif`,
		},
		h4: {
			fontSize: '20px',
			fontWeight: 700,
			fontFamily: `'Saira', sans-serif`,
		},
		h5: {
			fontSize: '18px',
			fontWeight: 600,
			fontFamily: `'Saira', sans-serif`,
		},
		h6: {
			fontSize: '16px',
			fontWeight: 600,
			fontFamily: `'Saira', sans-serif`,
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
				IconComponent: KeyboardArrowDown,
				MenuProps: {
					sx: {
						maxHeight: 400,
						mt: 1,
					},
				},
			},
		},
		MuiAutocomplete: {
			defaultProps: {
				popupIcon: <KeyboardArrowDown />,
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
		MuiCheckbox: {
			defaultProps: {
				checkedIcon: (
					<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<rect x='2' y='2' width='20' height='20' rx='3.5' fill='#EFC41A' />
						<path
							d='M18 6.24641C17.4594 5.82766 16.7031 5.95579 16.3094 6.53079L10.6875 14.7558L7.59063 11.4027C7.13438 10.8839 6.36875 10.8589 5.88125 11.3464C5.39375 11.8308 5.36875 12.6464 5.82813 13.162C5.82813 13.162 9.59063 17.337 10.1313 17.7558C10.6719 18.1745 11.4281 18.0464 11.8219 17.4714L18.2688 8.04329C18.6625 7.46516 18.5406 6.66204 18 6.24641Z'
							fill='black'
						/>
					</svg>
				),
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

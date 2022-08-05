import { KeyboardArrowDownRounded } from '@mui/icons-material'
import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles'
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
		variant70: 'rgba(6, 31, 72, 0.7)',
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
	secButtonColor: '#E5E5E5',
	properDark: '#000',
	lightGrey: 'rgba(6, 31, 72, 0.05)',
	lightOrange: 'rgba(247, 158, 84, 0.2)',
	lightGreen: 'rgba(15, 175, 127, 0.2)',
	mediumGreen: 'rgba(15, 175, 127, 0.5)',
	successGreen: '#0FAF7F',
	darkGrey: '#333333',
	yellow: '#efc530',
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
			color: '#fff',
		},
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
		},
		secondary: {
			main: '#ebebeb',
			light: '#D6566D',
			dark: '#8E1E33',
		},
		success: {
			main: '#0faf7f80',
			light: '#0faf7f33',
			dark: '#0FAF7F',
		},
		info: {
			main: '#fff',
			light: '#fff',
			dark: '#fff',
			contrastText: '#fff',
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
			default: '#2e2e2e', // background color
			paper: '#fff', // cards background
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
	components: {
		MuiTab: {
			defaultProps: {
				style: {
					color: '#fff',
				},
			},
		},
		MuiInputBase: {
			defaultProps: {
				style: {
					color: '#fff',
				},
			},
		},
		// MuiChip: {
		// 	defaultProps: {
		// 		style: {
		// 			outline: '1px solid #000',
		// 		},
		// 	},
		// },
		MuiIconButton: {
			defaultProps: {
				style: {
					color: '#fff',
				},
			},
		},
		MuiTable: {
			defaultProps: {
				style: {
					background: '#fff',
				},
			},
		},

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
		MuiCard: {
			defaultProps: {
				style: {
					background: '#000',
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'outlined',
				color: 'info',
				focused: true,
				inputProps: {
					style: {
						color: '#fff',
						borderColor: '#fff',
					},
				},
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
		MuiList: {
			defaultProps: {
				style: {
					background: '#000',
				},
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
					backgroundColor: primary.properDark,
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
		// MuiSvgIcon: {
		// 	styleOverrides: {
		// 		root: {
		// 			fill: colorPalette.base.main,
		// 		},
		// 	},
		// },
	},
})

export const theme = responsiveFontSizes(themeDef)
// export const theme = themeDef

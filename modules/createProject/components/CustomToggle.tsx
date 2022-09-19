import { Button, Stack } from '@mui/material'
import { primary, theme } from '../../../sdk'

export const CustomToggle = ({ ...props }) => {
	const { form, name, infoValues } = props
	return (
		<Stack direction={'row'} spacing={2}>
			<Button
				sx={{
					borderRadius: 2,
					padding: 2,
					textTransform: 'none',
					boxShadow: 'none',

					color: infoValues ? primary.properDark : primary.properDark,
					// border: infoValues
					// 	? `2px solid ${theme.palette.primary.main}`
					// 	: `1px solid ${theme.palette.secondary.light}`,
					background: infoValues ? theme.palette.primary.light : 'white',
					'&:hover': {
						color: primary.properDark,
						background: theme.palette.primary.light,
						boxShadow: 'none',
					},
				}}
				onClick={() => {
					form.setFieldValue(name, true)
				}}>
				Yes
			</Button>
			<Button
				sx={{
					borderRadius: 2,
					padding: 2,
					textTransform: 'none',
					boxShadow: 'none',

					color: !infoValues && infoValues !== undefined ? primary.properDark : primary.properDark,
					// border:
					// 	!infoValues && infoValues !== undefined
					// 		? `2px solid ${theme.palette.primary.main}`
					// 		: `1px solid ${theme.palette.secondary.light}`,
					background: !infoValues && infoValues !== undefined ? theme.palette.primary.light : 'white',
					'&:hover': {
						color: primary.properDark,
						background: theme.palette.primary.light,
						boxShadow: 'none',
					},
				}}
				onClick={() => {
					form.setFieldValue(name, false)
				}}>
				No
			</Button>
		</Stack>
	)
}

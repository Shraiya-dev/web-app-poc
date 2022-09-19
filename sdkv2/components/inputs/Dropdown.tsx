import { FormHelperText, MenuItem, Select, SelectProps } from '@mui/material'
import { FC } from 'react'

interface Props extends SelectProps {
	options?: { label: string; value: any }[]
	emptyState?: { label: string; value: any }
	helperText?: string | null
}
export const Dropdown: FC<Props> = ({ options, value, emptyState, helperText, error, ...rest }) => {
	return (
		<>
			<Select
				error={error}
				value={value}
				sx={{
					color: value === 'none' ? 'grey.A400' : undefined,
				}}
				{...rest}>
				<MenuItem key={emptyState?.value ?? 'none'} value={emptyState?.value ?? 'none'}>
					{emptyState?.label ?? 'Select Value'}
				</MenuItem>
				{options?.map((item) => (
					<MenuItem key={item.value} value={item.value}>
						{item.label}
					</MenuItem>
				))}
			</Select>
			<FormHelperText error={error}>{helperText}</FormHelperText>
		</>
	)
}

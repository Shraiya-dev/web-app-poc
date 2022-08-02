import { MenuItem, Select, SelectProps } from '@mui/material'
import { FC } from 'react'
interface Props extends SelectProps {
	round?: boolean
	options?: { label: string; value: any }[]
	emptyState?: { label: string; value: any }
}
export const Dropdown: FC<Props> = ({ options, round = false, emptyState, ...rest }) => {
	return (
		<Select sx={{ borderRadius: round ? 30 : undefined }} {...rest}>
			<MenuItem key={emptyState?.value ?? 'none'} value={emptyState?.value ?? 'none'}>
				{emptyState?.label ?? 'Select Value'}
			</MenuItem>
			{options?.map((item) => (
				<MenuItem key={item.value} value={item.value}>
					{item.label}
				</MenuItem>
			))}
		</Select>
	)
}

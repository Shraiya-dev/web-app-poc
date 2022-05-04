import { Select, MenuItem } from '@mui/material'
import { getSelectOptionsFromArray } from '../../utils'

export const CustomTimePicker = ({ ...props }) => {
	const { style, error, labelId, id, name, value, timeOptions, onChange } = props

	return (
		<Select
			error={error}
			labelId={labelId}
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			style={style}
			fullWidth>
			<MenuItem value={'none'}>Select Time</MenuItem>
			{getSelectOptionsFromArray(timeOptions)}
		</Select>
	)
}

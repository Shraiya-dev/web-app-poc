import { Select, MenuItem } from '@mui/material'
import { getSelectOptions } from '../../utils'
import { getTimeOptions } from '../../utils/timeHelpers'

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
			{getSelectOptions([{ label: 'Select End Date', value: 'none' }, ...getTimeOptions(timeOptions)])}
		</Select>
	)
}

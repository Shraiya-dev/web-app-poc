import { MenuItem } from '@mui/material'

export const getSelectOptionsFromObject = (obj: any) => {
	return Object.keys(obj).map((item) => (
		<MenuItem key={item} value={item}>
			{obj[item]}
		</MenuItem>
	))
}

export const getSelectOptionsFromArray = (arr: { label: string; value: any }[]) => {
	return arr.map(({ label, value }) => (
		<MenuItem key={value} value={value}>
			{label}
		</MenuItem>
	))
}

export const getSelectOptions = (opt: any) => {
	return opt.map((item: any) => (
		<MenuItem key={item.label} value={item.value}>
			{item.label}
		</MenuItem>
	))
}

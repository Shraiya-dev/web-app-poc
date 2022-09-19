import { Add, Remove } from '@mui/icons-material'
import { Button, InputLabel, Stack, TextField } from '@mui/material'
import { FC } from 'react'

type CountStepperProps = {
	label: string
	fullWidth?: boolean
	name: string
	value: number
	onChange: (name: string, count: number) => void
}
export const CountStepper: FC<CountStepperProps> = ({ label, fullWidth, value, onChange, name, ...rest }) => {
	return (
		<Stack
			width={fullWidth ? '100%' : undefined}
			direction='row'
			alignItems={'center'}
			justifyContent='space-between'>
			<InputLabel sx={{ fontWeight: 'bold' }}>{label}</InputLabel>
			<Stack direction='row' spacing={1}>
				<Button variant='outlined' sx={{ borderRadius: 1 }} onClick={(e) => onChange(name, value - 1)}>
					<Remove />
				</Button>
				<TextField
					fullWidth={fullWidth}
					type='number'
					value={value}
					onChange={(e) => onChange(name, Number(e.target.value))}
					sx={(theme) => ({ maxWidth: 80 })}
					{...rest}
				/>
				<Button variant='outlined' sx={{ borderRadius: 1 }} onClick={(e) => onChange(name, value + 1)}>
					<Add />
				</Button>
			</Stack>
		</Stack>
	)
}

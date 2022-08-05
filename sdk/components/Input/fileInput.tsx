import { Button, styled, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { useRef } from 'react'

const CustomPaper = styled(Box)(({ theme }) => ({
	'.fileInputContainer': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	'.hide': {
		visibility: 'hidden',
		width: 0,
		height: 0,
	},
	'.labelStyle': {
		cursor: 'pointer',
	},
}))

export const FileInput = ({ ...props }) => {
	const labelRef = useRef<any>()

	const { id, icon, label, disabled, variant, color, className, sx, ...inputProps } = props
	return (
		<CustomPaper>
			<Button
				sx={sx}
				disabled={disabled}
				onClick={() => {
					labelRef.current.click()
				}}
				// startIcon={icon}
				variant={variant}
				color={color}
				style={{
					border: '1px dashed #ababab',
					borderRadius: 8,
					padding: 20,
					width: 84,
					height: 84,
				}}>
				{icon}
				<label className={'hide'} ref={labelRef} htmlFor={id}></label>
				<input className={'hide'} id={id} type='file' {...inputProps} />
			</Button>
		</CustomPaper>
	)
}

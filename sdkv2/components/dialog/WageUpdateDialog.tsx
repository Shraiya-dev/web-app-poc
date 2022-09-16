import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Button, Dialog, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { primary } from 'sdk/constants'

export const AddEditWage = ({
	open,
	close,
	initialValue,
	fieldName,
	confirm,
	edit,
	initialQuantity,
}: {
	open: boolean
	close: any
	confirm: any
	fieldName: string
	initialValue: number
	edit?: boolean
	initialQuantity: number
}) => {
	const [fieldData, setFieldData] = useState<number>(initialValue)
	const [quantity, setQuantity] = useState<number>(initialQuantity)

	return (
		<>
			<Dialog open={open} PaperProps={{ sx: { borderRadius: '20px' } }}>
				<Stack p={2} spacing={3} alignItems='center'>
					<Stack width='100%' alignItems='center'>
						<IconButton onClick={() => close()} sx={{ p: '0px', alignSelf: 'flex-end' }}>
							<CloseOutlinedIcon sx={{ color: primary.properDark, fontSize: '36px' }} />
						</IconButton>
						<Typography textAlign='center' color={primary.properDark} variant='h2'>
							{!edit ? 'Add' : 'Update'} {fieldName.replace('wage', '')}
						</Typography>
					</Stack>
					<TextField
						color='primary'
						fullWidth
						value={quantity}
						type='number'
						label='Enter Worker quantity'
						placeholder='Enter quantity'
						onChange={(e: any) => {
							const newValue =
								e.target.value !== ''
									? parseInt(e.target.value) > 999
										? 999
										: parseInt(e.target.value)
									: e.target.value
							setQuantity(newValue)
						}}
					/>
					<TextField
						color='primary'
						fullWidth
						type='number'
						label='Enter Wage'
						placeholder='Enter wages'
						error={!(fieldData > 0 && fieldData <= 2000)}
						value={fieldData}
						helperText={'Wage should be between 1 and 2000'}
						InputProps={{
							startAdornment: <InputAdornment position='start'>&#8377;</InputAdornment>,
							endAdornment: <InputAdornment position='start'>/ day</InputAdornment>,
						}}
						onChange={(e: any) =>
							setFieldData(() => {
								if (e.target.value === '') {
									return e.target.value
								} else if (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 2000) {
									return parseInt(e.target.value)
								}
							})
						}
					/>
					{/* <TextField fullWidth placeholder='Enter Wages' /> */}
					<Button
						onClick={() => confirm(fieldName, fieldData, quantity)}
						fullWidth
						disabled={!(fieldData > 0 && fieldData <= 2000)}
						sx={{ fontSize: '16px', fontWeight: 700 }}>
						update
					</Button>
				</Stack>
			</Dialog>
		</>
	)
}

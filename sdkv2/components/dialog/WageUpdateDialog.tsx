import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { primary } from 'sdk/constants'

export const AddEditWage = ({
	open,
	close,
	initialValue,
	fieldName,
	confirm,
	edit,
}: {
	open: boolean
	close: any
	confirm: any
	fieldName: string
	initialValue: number
	edit?: boolean
}) => {
	const [fieldData, setFieldData] = useState<number>(initialValue)

	return (
		<>
			<Dialog open={open} fullWidth maxWidth='xs'>
				<DialogTitle component={Stack} sx={{ textAlign: 'center' }}>
					<Stack alignItems='flex-start'>
						<IconButton onClick={() => close()} sx={{ p: '0px' }}>
							<CloseOutlinedIcon sx={{ color: primary.properDark, fontSize: '36px' }} />
						</IconButton>
						<Typography color={primary.properDark} sx={{ width: '100%' }} variant='h2'>
							{!edit ? 'Add' : 'Update'} {fieldName.replace('wage', '')}
						</Typography>
					</Stack>
				</DialogTitle>
				<DialogContent>
					<Stack direction='row' justifyContent='space-between' alignItems='flex-start' spacing={2}>
						<Typography color='common.black' mt={2}>
							Wage
						</Typography>
						<TextField
							color='primary'
							fullWidth
							focused={false}
							type='number'
							placeholder='Enter wages'
							error={!(fieldData > 0 && fieldData <= 2000)}
							value={fieldData}
							helperText={'Wage should be between 1 and 2000'}
							onChange={(e: any) =>
								setFieldData(() => {
									if (e.target.value === '') {
										return e.target.value
									} else if (Number(e.target.value) > 0 && Number(e.target.value) <= 2000) {
										return Number(e.target.value)
									}
								})
							}
						/>
					</Stack>
					{/* <TextField fullWidth placeholder='Enter Wages' /> */}
				</DialogContent>
				<DialogActions sx={{ p: '24px' }}>
					<Button
						onClick={() => confirm(fieldName, fieldData)}
						fullWidth
						disabled={!(fieldData > 0 && fieldData <= 2000)}
						sx={{ fontSize: '16px', fontWeight: 700 }}>
						update
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

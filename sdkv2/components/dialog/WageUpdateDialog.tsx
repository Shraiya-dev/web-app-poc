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
}: {
	open: boolean
	close: any
	confirm: any
	fieldName: string
	initialValue: number
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
							Update
						</Typography>
					</Stack>
				</DialogTitle>
				<DialogContent>
					<Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
						<Typography color='common.black'>Wage</Typography>
						<TextField
							color='primary'
							fullWidth
							focused={false}
							type='number'
							placeholder='Enter wages'
							name={fieldName}
							value={fieldData}
							onChange={(e: any) => setFieldData(Number(e.target.value))}
						/>
					</Stack>
					{/* <TextField fullWidth placeholder='Enter Wages' /> */}
				</DialogContent>
				<DialogActions sx={{ p: '24px' }}>
					<Button
						onClick={() => confirm(fieldName, fieldData)}
						fullWidth
						sx={{ fontSize: '16px', fontWeight: 700 }}>
						update
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

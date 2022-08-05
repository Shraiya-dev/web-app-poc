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
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { primary } from 'sdk/constants'
import { useState } from 'react'

export const WageUpdateDialog = ({
	open,
	close,
	fieldName,
}: {
	open: boolean
	close: any
	fieldName: string
	
}) => {
	const [fieldData, setFieldData] = useState<number>(0)
	return (
		<>
			<Dialog open={open} fullWidth sx={{ borderRadius: '16px' }}>
				<DialogTitle component={Stack} sx={{ textAlign: 'center' }}>
					<Stack alignItems='flex-start'>
						<IconButton onClick={() => close(false)} sx={{ p: '0px' }}>
							<CloseOutlinedIcon sx={{ color: primary.properDark, fontSize: '36px' }} />
						</IconButton>
						<Typography color={primary.properDark} sx={{ width: '100%' }} variant='h2'>
							Update
						</Typography>
					</Stack>
				</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						type='number'
						placeholder='Enter wages'
						name={fieldName}
						value={fieldData}
						onChange={(e: any) => setFieldData(e.target.value)}
					/>
					{/* <TextField fullWidth placeholder='Enter Wages' /> */}
				</DialogContent>
				<DialogActions sx={{ p: '24px' }}>
					<Button fullWidth sx={{ fontSize: '16px', fontWeight: 700 }} >
						update
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

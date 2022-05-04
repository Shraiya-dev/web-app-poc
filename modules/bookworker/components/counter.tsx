import { Box, Button, IconButton, Paper, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
const Counter = ({ ...props }) => {
	const { info, setInfo } = props

	const handleIncrement = () => {
		setInfo((state: any) => state + 1)
	}

	const handleDecrement = () => {
		if (info > 0) {
			setInfo((state: any) => state - 1)
		}
	}
	return (
		<Paper square style={{ width: 162, height: 60, borderRadius: 8, textAlign: 'center' }}>
			<Box style={{ display: 'flex', padding: 12 }}>
				<IconButton
					size='small'
					onClick={handleIncrement}
					style={{ borderRadius: 8, padding: 8, background: '#244CB3', color: 'white' }}>
					<AddIcon fontSize='small' />
				</IconButton>
				<Stack width={60} style={{ verticalAlign: 'middle', padding: 8 }}>
					{info}
				</Stack>
				<IconButton
					size='small'
					onClick={handleDecrement}
					style={{ borderRadius: 8, padding: 8, background: '#244CB3', color: 'white' }}>
					<RemoveIcon fontSize='small' />
				</IconButton>
			</Box>
		</Paper>
	)
}

export default Counter

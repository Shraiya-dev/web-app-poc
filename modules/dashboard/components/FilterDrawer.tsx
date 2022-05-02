import { ArrowBackIos } from '@mui/icons-material'
import { Button, Divider, Drawer, Select, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { BookingStateLabel, getSelectOptionsFromObject, InputWrapper } from '../../../sdk'
import { useFilterDrawer } from '../hooks'

interface FilterDrawerProps {
	open: boolean
	onClose: () => void
}
const drawerWidth = 375
export const FilterDrawer = ({ open, onClose }: FilterDrawerProps) => {
	const { form } = useFilterDrawer()
	return (
		<Drawer anchor='right' open={open} onClose={onClose}>
			<Stack flex={1} minWidth={drawerWidth} p={2} alignItems='flex-start'>
				<Button color='primary' onClick={onClose} variant='text' startIcon={<ArrowBackIos fontSize='large' />}>
					Back
				</Button>
				<Stack flex={1} px={2} width={'100%'}>
					<Typography variant='h4'>Filters</Typography>
					<Stack flex={1} width='100%' mt={3} spacing={2}>
						<InputWrapper label='Booking Stage'>
							<Select fullWidth name='status' value={form.values.status} onChange={form.handleChange}>
								{getSelectOptionsFromObject({
									none: 'Choose',
									RECEIVED: 'Created',
									CONFIRMED: 'Confirmed',
									ALLOCATION_PENDING: 'Allocation Ongoing',
									READY_TO_DEPLOY: 'Ready to Deploy',
								})}
							</Select>
						</InputWrapper>
					</Stack>
				</Stack>
				<Divider />
				<Stack width='100%' direction='row' spacing={2} mb={2}>
					<Button
						fullWidth
						variant='outlined'
						onClick={(e) => {
							form.handleReset(e)
							onClose()
						}}>
						Reset
					</Button>
					<Button
						fullWidth
						onClick={(e: any) => {
							form.handleSubmit()
							onClose()
						}}>
						Apply
					</Button>
				</Stack>
			</Stack>
		</Drawer>
	)
}

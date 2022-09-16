import { ArrowBackIos } from '@mui/icons-material'
import { Button, Divider, Drawer, Select, Stack, Typography } from '@mui/material'
import { getSelectOptionsFromObject, InputWrapper } from '../../../sdk'
import { useFilterDrawer } from '../hooks'

interface FilterDrawerProps {
	open: boolean
	onClose: () => void
}
const drawerWidth = 375
export const FilterDrawer = ({ open, onClose }: FilterDrawerProps) => {
	const { form } = useFilterDrawer()
	return (
		<Drawer
			anchor='right'
			open={open}
			onClose={onClose}
			PaperProps={{ style: { borderRadius: '0px 0px 0px 0px' } }}>
			<Stack flex={1} minWidth={drawerWidth} p={2} alignItems='flex-start'>
				<Button
					color='primary'
					onClick={onClose}
					variant='text'
					startIcon={<ArrowBackIos fontSize='large' sx={{ color: '#fff' }} />}
				/>

				<Stack flex={1} px={2} width={'100%'}>
					<Typography variant='h4'>Filters</Typography>
					<Stack flex={1} width='100%' mt={3} spacing={2}>
						<InputWrapper label='Booking Stage'>
							<Select fullWidth name='status' value={form.values.status} onChange={form.handleChange}>
								{getSelectOptionsFromObject({
									none: 'Choose',
									RECEIVED: 'Created',
									CONFIRMED: 'Confirmed',
									'ALLOCATION_PENDING,ALLOCATION_CLOSED,ALLOCATION_IN_PROGRESS': 'Allocation Ongoing',
									READY_TO_DEPLOY: 'Ready to Deploy',
									CANCELLED: 'Cancelled',
								})}
							</Select>
						</InputWrapper>
						<InputWrapper label='Job Type'>
							<Select fullWidth name='jobType' value={form.values.jobType} onChange={form.handleChange}>
								{getSelectOptionsFromObject({
									none: 'Choose',

									PAINTER: 'Painter',
									ELECTRICAL: 'Electrician',
									MASON: 'Mason',
									BAR_BENDER: 'Barbender',
									CARPENTER: 'Carpenter',
									SHUTTERING_CARPENTER: 'Shuttering Carpenter',
									STONE_TILE_MARBLE_LAYER: 'Stone / Tile / Marble',
									GYPSUM: 'Gypsum',
									WELDER_FITTER: 'Welder fitter',
									GENERAL_HELPER: 'GeneralWorker',
									HVAC: 'Hvac',
									PLUMBING: 'Plumber',
									ALUMINIUM_FABRICATOR: 'Aluminium Fabricator',
								})}
							</Select>
						</InputWrapper>

						<InputWrapper label='Sort By'>
							<Select
								fullWidth
								name='sortBy'
								defaultValue='Created At'
								value={'CREATED_AT'}
								onChange={form.handleChange}>
								{getSelectOptionsFromObject({
									none: 'Choose',

									CREATED_AT: 'Created At',
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

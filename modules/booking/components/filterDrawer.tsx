import { Typography, Select, MenuItem, Drawer, Box, Stack } from '@mui/material'

import { useFormik } from 'formik'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import styled from '@emotion/styled'
import { theme } from '../../../sdk';

export default function filterDrawer({ openFilter, setOpenFilter }: any) {
	const form = useFormik({
		initialValues: {
			phone: '',
		},
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2))
			setOpenFilter((state: any) => !state)
		},
	})

	const CustomFilterDrawer = styled(Box)(({ theme }) => ({}))

	return (
		<Drawer anchor={'right'} open={openFilter} onClose={() => setOpenFilter((state: any) => !state)}>
			<Box style={{ padding: 30 }}>
				<Box>
					<Stack
						display='inline'
						style={{ cursor: 'pointer', background: 'none', fontFamily: 'Mulish' }}
						onClick={() => setOpenFilter((state: any) => !state)}>
						<KeyboardBackspaceIcon style={{ fontSize: '24px' , color:theme.palette.primary.main }} />
						<Typography display='inline' style={{ verticalAlign: 'middle' }}>
							Back
						</Typography>
					</Stack>
				</Box>
				<Box>
					<form onSubmit={form.handleSubmit}>
						<Typography variant='h4' style={{ paddingTop: '1.5em', paddingBottom: '0.5em' }}>
							Filters
						</Typography>

						<Typography>Booking Stage</Typography>
						<Select
							style={{ width: '21.5em', marginBottom: '1em' }}
							// value={age}
							//label='Age'
							// onChange={handleChange}
						>
							<MenuItem disabled value=''>
								<em>Choose</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>

						<Typography>Sort By</Typography>
						<Select
							style={{ width: '21.5em', marginBottom: '1em' }}
							// value={age}
							//label='Age'
							// onChange={handleChange}
						>
							<MenuItem disabled value=''>
								<em>Choose</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>

						<Typography>Location</Typography>
						<Select
							style={{ width: '21.5em', marginBottom: '1em' }}
							// value={age}
							//label='Age'
							// onChange={handleChange}
						>
							<MenuItem disabled value=''>
								<em>Choose</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>

						{/* <Button type='submit'>Submit</Button> */}
					</form>
				</Box>
			</Box>
		</Drawer>
	)
}

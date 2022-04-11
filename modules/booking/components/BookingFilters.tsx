import {
	Typography,
	Select,
	MenuItem,
	Grid,
	Button,
	Drawer,
	TextField,
	Box,
	InputLabel,
	FormControl,
} from '@mui/material'
import { useState } from 'react'
import { useFormik } from 'formik'

export default function BookingFilters() {
	const [openFilter, setOpenFilter] = useState(false)

	const formik = useFormik({
		initialValues: {
			phone: '',
		},
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2))
			setOpenFilter((state) => !state)
		},
	})

	const handleFilter = () => {
		setOpenFilter((state) => !state)
	}

	const filterDrawer = () => {
		return (
			<Drawer anchor={'right'} open={openFilter} onClose={handleFilter}>
				<Box style={{ padding: 30 }}>
					<div>
						<span
							style={{ cursor: 'pointer', background: 'none', fontFamily: 'Mulish' }}
							onClick={handleFilter}>
							{`<Back`}
						</span>
					</div>
					<div>
						<form onSubmit={formik.handleSubmit}>
							<Typography variant='h5' style={{ paddingTop: '1em', paddingBottom: '0.5em' }}>
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
					</div>
				</Box>
			</Drawer>
		)
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div>
				{filterDrawer()}

				<div>
					<Typography display={'inline'} style={{ padding: 20 }}>
						{' '}
						Booking (20)
					</Typography>

					<TextField placeholder='Search' />

					{/* <Select
						value={'Mumbau'}
						label='Age'
						// onChange={handleChange}
					>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select> */}

					<FormControl variant='standard' sx={{ minWidth: 120 }}>
						<InputLabel>Select Site</InputLabel>
						<Select
							//   value={age}
							//   onChange={handleChange}
							label='location'>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>

					<FormControl variant='standard' sx={{ minWidth: 120 }}>
						<InputLabel>Sort By</InputLabel>
						<Select
							//   value={age}
							//   onChange={handleChange}
							label='SortBy'>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
					<Button onClick={handleFilter}>Filter</Button>
				</div>
			</div>
		</div>
	)
}

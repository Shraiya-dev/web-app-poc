import {
	Typography,
	Select,
	MenuItem,
	Button,
	TextField,
	Box,
	InputLabel,
	FormControl,
	Stack,
	InputAdornment,
} from '@mui/material'
import { useState } from 'react'
import { useFormik } from 'formik'

import FilterDrawer from './filterDrawer'
import styled from '@emotion/styled'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'

export default function BookingFilters() {
	const [openFilter, setOpenFilter] = useState(false)

	const form = useFormik({
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

	const CustomizedFilter = styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'center',
		verticalAlign: 'middle',

		'.cta': {
			backgroundColor: 'transparent',
			boxShadow: 'none',
			color: 'black',
			verticalAlign: 'middle',
			marginLeft: 20,
		},
	}))

	return (
		<CustomizedFilter>
			<Box>
				<FilterDrawer openFilter={openFilter} setOpenFilter={setOpenFilter} />

				<Box>
					<Typography display={'inline'} variant='h4' style={{ marginRight: 100 }}>
						Booking (20)
					</Typography>

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

					<TextField
						placeholder='Search'
						style={{ width: 300, marginLeft: 30, marginRight: 30, maxHeight: 5 }}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<SearchIcon style={{ cursor: 'pointer' }} />
								</InputAdornment>
							),
						}}
					/>

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
					<Button className='cta' onClick={handleFilter}>
						Filter <FilterAltIcon />
					</Button>
				</Box>
			</Box>
		</CustomizedFilter>
	)
}

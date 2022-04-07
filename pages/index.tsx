import { Button, MenuItem, Select, Stack, TextField } from '@mui/material'
import { NextPage } from 'next'

//*this is a test page to test out components for theming
const Index: NextPage = () => {
	return (
		<Stack spacing={3} alignItems='center'>
			index
			<Button>Contained</Button>
			<TextField placeholder='hello' />
		</Stack>
	)
}

export default Index

//*testing the pages
{
	/* <Select
				labelId='demo-simple-select-helper-label'
				id='demo-simple-select-helper'
				value={10}
				label='Age'
				sx={{
					width: 500,
				}}
				MenuProps={{
					sx: {
						mt: 4,
					},
					PaperProps: {
						elevation: 2,
						sx: {
							backgroundColor: '#efef3d',
							maxHeight: 400,
							mt: 1,
							clipPath: 'polygon(0 8px, 20% 8px, 80% 8px, 90% 0, 100% 8px, 100% 100%, 0 100%)',
							borderRadius: '4px ',
						},
					},
					MenuListProps: {
						sx: {
							pt: 2,
						},
					},
				}}> 
				<MenuItem value=''>
					<em>None</em>
				</MenuItem>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>
			*/
}

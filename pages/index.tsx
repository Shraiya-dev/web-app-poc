import { Button, Container, InputAdornment, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { NextPage } from 'next'
import { useContractorAuth } from '../sdk'

//*this is a test page to test out components for theming
const Index: NextPage = () => {
	const { requestOtp, verifyOtp, logOut } = useContractorAuth()

	const form = useFormik({
		initialValues: {
			phoneNumber: '',
			otp: '',
		},
		validate: () => {},
		onSubmit: (values) => {
			requestOtp(values.phoneNumber)
		},
	})

	return (
		<Container
			sx={{
				p: 5,
			}}>
			<form onSubmit={form.handleSubmit}>
				<Stack spacing={4}>
					<TextField
						InputProps={{ startAdornment: <InputAdornment position='start'>+91</InputAdornment> }}
						placeholder=''
						name='phoneNumber'
						value={form.values.phoneNumber}
						onChange={form.handleChange}
						label='Phone Number'
					/>
					<TextField
						placeholder=''
						label='otp'
						name='otp'
						value={form.values.otp}
						onChange={form.handleChange}
					/>
					<Button type='submit'>Login</Button>
					<Button
						onClick={() => {
							verifyOtp(`+91${form.values.phoneNumber}`, form.values.otp)
						}}>
						submit otp
					</Button>
					<Button
						onClick={() => {
							logOut()
						}}>
						logout
					</Button>
				</Stack>
			</form>
		</Container>
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

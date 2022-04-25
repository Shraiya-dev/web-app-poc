import { TextField, Typography, Box, Button, InputLabel, Stack, Input } from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'
import useBasicForm from '../hooks/useBasicForm'
import { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'
import { checkError } from '../../../sdk'
import { getCustomerDetails } from '../../../sdk/apis'

export const BasicDetailsForm = () => {
	const { form, loading } = useBasicForm()

	const router = useRouter()
	const [editInfo, setEditInfo] = useState(false)

	const handleEdit = () => {
		setEditInfo((state) => !state)
	}

	const data = {
		name:"Deepak",
		company:"projecthero",
		companyName:"deepak.kushwaha@projecthero.in",
		phoneNumber:"9901549150"
	}
	useEffect(() => {
		getCustomerDetails()
			.then((data) => {})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return (
		<Box>
			<Box style={{ display: 'flex', justifyContent: 'center', paddingTop: '12%' }}>
				<form onSubmit={form.handleSubmit} style={{ width: '36.25ch' }}>
					<Stack>
						<Typography variant='h5' display='inline' style={{ paddingBottom: '0.5em' }}>
							Basic Details
							{router.asPath === '/profile' && (
								<Button
									variant='text'
									style={{ float: 'right' }}
									endIcon={<EditIcon />}
									onClick={handleEdit}>
									Edit
								</Button>
							)}
						</Typography>

						<InputLabel id='name' style={{ paddingTop: 10, paddingBottom: 6 }}>
							Name
						</InputLabel>
						<TextField
							id='name'
							name='name'
							value={form.values.name || data.name}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							InputProps={{
								disableUnderline: !(router.asPath === '/profile' && editInfo),
							}}
							placeholder='Enter Your Full Name'
							variant={router.asPath === '/profile'  ? editInfo? 'outlined' : 'standard':'outlined'}
							disabled={(router.asPath === '/profile' ? !editInfo:false)}
							error={!!checkError('name', form)}
							helperText={checkError('name', form)}
							style={{fontSize:"18px"}}
						/>

						<InputLabel id='company' style={{ paddingTop: 10, paddingBottom: 6 }}>
							Company
						</InputLabel>
						<TextField
							id='company'
							name='company'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.company  || data.company}
							placeholder='Enter Company Name'
							variant={router.asPath === '/profile'  ? editInfo? 'outlined' : 'standard':'outlined'}
							disabled={(router.asPath === '/profile' ? !editInfo:false)}
							InputProps={{
								disableUnderline: !(router.asPath === '/profile' && editInfo),
							}}
							error={!!checkError('company', form)}
							helperText={checkError('company', form)}
						/>

						<InputLabel id='companyEmail' style={{ paddingTop: 10, paddingBottom: 6 }}>
							Company Email
						</InputLabel>
						<TextField
							id='companyEmail'
							name='companyEmail'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.companyEmail ||data.companyName}
							placeholder='Enter Email'
							variant={router.asPath === '/profile'  ? editInfo? 'outlined' : 'standard':'outlined'}
							disabled={(router.asPath === '/profile' ? !editInfo:false)}
							InputProps={{
								disableUnderline: !(router.asPath === '/profile' && editInfo),
							}}
							error={!!checkError('companyEmail', form)}
							helperText={checkError('companyEmail', form)}
						/>

						<InputLabel id='phoneNumber' style={{ paddingTop: 10, paddingBottom: 6 }}>
							Phone Number
						</InputLabel>

						<TextField
							id='phoneNumber'
							name='phoneNumber'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.phoneNumber || data.phoneNumber}
							placeholder='9999988888'
							variant={router.asPath === '/profile'  ? editInfo? 'outlined' : 'standard':'outlined'}
							disabled={(router.asPath === '/profile' ? !editInfo:false)}
							InputProps={{
								disableUnderline: !(router.asPath === '/profile' && editInfo),
							}}
							error={!!checkError('phoneNumber', form)}
							helperText={checkError('phoneNumber', form)}
						/>
						{editInfo && (
							<LoadingButton
								type='submit'
								loading={loading}
								variant='contained'
								style={{
									marginTop: '1em',
									width: '100%',
									background: '#244CB3',
									color: 'white',
									cursor: 'pointer',
								}}>
								{router.asPath === '/profile' ? 'Save' : 'Next'}
							</LoadingButton>
						)}
					</Stack>
				</form>
			</Box>
		</Box>
	)
}

import { useState } from 'react'
import { useFormik } from 'formik'
import { TextField, Typography } from '@mui/material'

import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'

export const BasicDetailsForm = ({ setIsBasicDetails }) => {
	const router = useRouter()

	const [loading, setLoading] = useState(false)

	console.log('router', router)
	const formik = useFormik({
		initialValues: {
			phone: '',
		},
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2))
			router.push('/booking')
		},
	})

	const handlePrev = () => {
		console.log('Hello')
		setIsBasicDetails((state) => !state)
	}

	return (
		<div>
			<div style={{ paddingTop: '3em', paddingLeft: '7em' }}>
				<span
					style={{ cursor: 'pointer', background: 'none', fontFamily: 'Mulish' }}
					onClick={() => handlePrev()}>
					{`<Back`}
				</span>
			</div>

			<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
				<form onSubmit={formik.handleSubmit} style={{ width: '36.25ch' }}>
					<Typography variant='h5' style={{ paddingBottom: '0.5em' }}>
						Basic Details
					</Typography>

					<Typography>Name</Typography>
					<TextField
						id=''
						name=''
						type=''
						placeholder=''
						required={true}
						style={{ width: '36.25ch', marginBottom: '1em', height: '6ch' }}
					/>

					<Typography>Company</Typography>
					<TextField
						id=''
						name=''
						type=''
						placeholder=''
						required={true}
						style={{ width: '36.25ch', marginBottom: '1em', height: '6ch' }}
					/>

					<Typography>Company Email</Typography>
					<TextField
						id=''
						name=''
						type=''
						placeholder=''
						required={true}
						style={{ width: '36.25ch', marginBottom: '1em', height: '6ch' }}
					/>

					<Typography>Phone Number</Typography>
					<TextField
						id=''
						name=''
						type=''
						placeholder=''
						required={true}
						style={{ width: '36.25ch', marginBottom: '1em', height: '6ch' }}
					/>
					<LoadingButton
						type='submit'
						//   onClick={handleClick}
						//   endIcon={<SendIcon />}
						loading={loading}
						loadingPosition='start'
						variant='contained'
						style={{
							marginTop: '1em',
							width: '100%',
							background: '#244CB3',
							color: 'white',
							cursor: 'pointer',
						}}>
						Next
					</LoadingButton>
				</form>
			</div>
		</div>
	)
}

import { Box, Button, MenuItem, Select, Stack, styled, TextField } from '@mui/material'
import { getSelectOptions, InputWrapper, NameField, primary, useMobile } from '../../../sdk'
import usePersonalAccount from '../hooks/usePersonalAccount'
import { companyRoles } from '../../../sdk'
import { ButtonClicked } from '../../../sdk/analytics/analyticsWrapper'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'

const EditInfoStyle = styled(Box)(({ theme }) => ({}))

const EditInfo = ({ ...props }) => {
	const { form, loading, handleSubmit } = usePersonalAccount()
	const { isAccountEditable, setIsAccountEditable } = props
	const router = useRouter()

	const isMobile = useMobile()
	return (
		<EditInfoStyle>
			<Stack spacing={3} width={isMobile ? '100%' : '25%'}>
				<form onSubmit={form.handleSubmit}>
					<Stack spacing={3}>
						<InputWrapper id='name' label='Name'>
							<NameField
								name='name'
								placeholder='Enter Full Name'
								fullWidth
								value={form.values.name}
								onChange={(e) => {
									form.handleChange(e)
								}}
							/>
						</InputWrapper>
						<InputWrapper id='phoneNumber' label='Phone Number'>
							<TextField
								name='phoneNumber'
								placeholder='Enter Phone Number'
								fullWidth
								value={form.values.phoneNumber}
								disabled={true}
							/>
						</InputWrapper>
						<InputWrapper id='email' label='Email'>
							<TextField
								name='email'
								placeholder='Enter Email'
								fullWidth
								value={form.values.email}
								disabled={true}
							/>
						</InputWrapper>
						<InputWrapper id='designation' label='Designation'>
							<Select
								labelId='designation'
								id='designation'
								name='designation'
								value={form.values.designation}
								onChange={form.handleChange}>
								<MenuItem value={'none'}>Select Designation</MenuItem>
								{getSelectOptions(companyRoles)}
							</Select>
						</InputWrapper>
					</Stack>

					<Stack direction='row' style={{ fontSize: '18px', paddingTop: 32 }} spacing={2}>
						<Button
							fullWidth
							onClick={() => {
								setIsAccountEditable((state: any) => !state)

								ButtonClicked({
									action: 'Cancel Edit Account',
									page: 'Account',
									url: router.asPath,
								})
							}}
							style={{
								border: `1px solid ${primary.main}`,
								background: primary.light,
								color: primary.main,
								boxShadow: 'none',
							}}>
							Cancel
						</Button>

						<LoadingButton
							//type='submit'
							loading={loading}
							variant='contained'
							disabled={loading || !form.isValid}
							fullWidth
							onClick={() => {
								handleSubmit()
								setIsAccountEditable((state: any) => !state)
							}}>
							Save
						</LoadingButton>
					</Stack>
				</form>
			</Stack>
		</EditInfoStyle>
	)
}

export default EditInfo

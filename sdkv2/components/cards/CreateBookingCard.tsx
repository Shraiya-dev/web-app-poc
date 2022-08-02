import { Button, Card, Select, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { InputWrapper, Dropdown } from 'sdkv2/components'
import { StatesOptions } from 'sdkv2/constants'
interface Props {}
export const CreateBookingCard: FC<Props> = () => {
	return (
		<>
			<Card elevation={16}>
				<Stack p={4}>
					<Stack spacing={2}>
						<Typography variant='h3'>
							First{' '}
							<Typography variant='h3' color='primary.main' display='inline'>
								15 worker
							</Typography>{' '}
							profiles for FREE!
						</Typography>
						<Typography>Get started with your booking in easy steps</Typography>
					</Stack>
					<form>
						<Stack spacing={2.5} my={2} alignItems='flex-start' pr={6}>
							<InputWrapper fullWidth label='Select Location'>
								<Dropdown
									fullWidth
									round
									value='none'
									emptyState={{ label: 'Site Location', value: 'none' }}
									options={StatesOptions}
								/>
							</InputWrapper>
							<InputWrapper fullWidth label='Job Category'>
								<Dropdown
									fullWidth
									round
									value='none'
									emptyState={{ label: 'Select Job Category', value: 'none' }}
									options={StatesOptions}
								/>
							</InputWrapper>
							<InputWrapper fullWidth label='Work Duration'>
								<Dropdown
									fullWidth
									round
									value='none'
									emptyState={{ label: 'Enter Duration', value: 'none' }}
									options={StatesOptions}
								/>
							</InputWrapper>
							<Button sx={{ width: '50%' }} size='large' variant='contained'>
								Next
							</Button>
						</Stack>
					</form>
				</Stack>
			</Card>
		</>
	)
}

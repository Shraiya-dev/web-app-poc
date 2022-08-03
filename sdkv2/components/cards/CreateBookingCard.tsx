import { Button, Card, Select, Stack, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { InputWrapper, Dropdown, CountStepper } from 'sdkv2/components'
import { StatesOptions } from 'sdkv2/constants'
interface Props {}
export const CreateBookingCard: FC<Props> = () => {
	const [step, setStep] = useState<number>(1)
	const [temp, setTemp] = useState(0)
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
						<Stack spacing={2.5} my={2} alignItems='flex-start' pr={step === 0 ? 6 : 3}>
							{step === 0 && (
								<>
									<InputWrapper fullWidth label='Select Location'>
										<Dropdown
											fullWidth
											value='none'
											emptyState={{ label: 'Site Location', value: 'none' }}
											options={StatesOptions}
										/>
									</InputWrapper>
									<InputWrapper fullWidth label='Job Category'>
										<Dropdown
											fullWidth
											value='none'
											emptyState={{ label: 'Select Job Category', value: 'none' }}
											options={StatesOptions}
										/>
									</InputWrapper>
									<InputWrapper fullWidth label='Work Duration'>
										<Dropdown
											fullWidth
											value='none'
											emptyState={{ label: 'Enter Duration', value: 'none' }}
											options={StatesOptions}
										/>
									</InputWrapper>
									<Button
										onClick={(e) => {
											setStep(1)
										}}
										sx={{ width: '50%' }}
										size='large'
										variant='contained'>
										Next
									</Button>
								</>
							)}
							{step === 1 && (
								<>
									<InputWrapper fullWidth label='Specify booking details'>
										<Stack spacing={3} mt={2}>
											<CountStepper
												label='Helper'
												name='temp'
												value={temp}
												onChange={(name, count) => {
													setTemp(count)
												}}
											/>
											<CountStepper
												label='Technician'
												name='temp'
												value={temp}
												onChange={(name, count) => {
													setTemp(count)
												}}
											/>
											<CountStepper
												label='Supervisor'
												name='temp'
												value={temp}
												onChange={(name, count) => {
													setTemp(count)
												}}
											/>
										</Stack>
									</InputWrapper>
									<Button size='large' variant='contained'>
										Book Workers Now
									</Button>
								</>
							)}
						</Stack>
					</form>
				</Stack>
			</Card>
		</>
	)
}

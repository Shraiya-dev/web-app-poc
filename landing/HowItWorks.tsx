import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { FC } from 'react'
import { Section, theme } from 'sdk'
interface Props {}

export const HowItWorks: FC<Props> = () => {
	return (
		<>
			<Section
				sx={{
					minHeight: '100vh',
					maxHeight: '100vh',
				}}>
				<Stack direction={'column'} textAlign={'center'} spacing={3}>
					<Typography variant='h1'>
						How you can{' '}
						<span
							style={{
								color: theme.palette.success.dark,
							}}>
							book workers
						</span>{' '}
						<br />
						with us within{' '}
						<span
							style={{
								color: theme.palette.success.dark,
							}}>
							1 min
						</span>
					</Typography>
					<Typography variant='h3'>See how the Project Hero platform works</Typography>
				</Stack>
				<Stack direction={{ md: 'column' }} width={'100%'} justifyContent={'center'} alignItems={'center'}>
					<Button size='large'>Book Worker Now</Button>
				</Stack>
			</Section>
		</>
	)
}

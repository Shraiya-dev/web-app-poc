import { Box, Button, Collapse, Divider, IconButton, ListItem, Paper, Stack, Tab, Typography } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useRouter } from 'next/router'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { theme } from 'sdk/constants'

interface Props {
	ListOfQuestion: any
}

const questions = [
	{
		question: 'How to book Heroes?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
	{
		question: 'What are the types of plans for bookings?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
	{
		question: 'How Heroes are hired?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
	{
		question: 'What will be the wages?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
	{
		question: 'Will i get full support?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
]

export const FAQuestion: FC<Props> = ({ ListOfQuestion }: Props) => {
	const router = useRouter()
	const [collapseOpen, setCollapseOpen] = useState<string>(`${router.query.id}` ?? '0')

	const handleStep = useCallback(() => {
		router.replace({
			pathname: '/faq',
			query: { step: 0 },
		})
	}, [router])

	return (
		<>
			<Stack direction={'row'} justifyContent={'flex-start'} mb={'50px'}>
				<Button
					variant='text'
					startIcon={<KeyboardBackspaceIcon />}
					sx={{
						px: 0,
						color: '#000',
					}}
					onClick={handleStep}>
					Go Back
				</Button>
			</Stack>
			<Stack direction={'row'} spacing={{ xs: 0, md: 6 }}>
				<Paper
					elevation={5}
					sx={{
						minWidth: '300px',
						maxWidth: '300px',
						maxHeight: '400px',
						py: 4,
						px: 1,
						display: { xs: 'none', md: 'inline-flex' },
					}}>
					<Stack>
						<ListItem>
							<Typography
								variant='h4'
								fontFamily={'Saira,sans-serif'}
								fontWeight={600}
								textAlign={'start'}
								mb={3}>
								Table of contents
							</Typography>
						</ListItem>
						<Stack direction={'column'} sx={{ width: '100%' }}>
							{ListOfQuestion.map((question: any, index: number) => {
								return (
									<Box
										sx={{
											backgroundColor:
												collapseOpen === '' + index
													? theme.palette.primary.main
													: 'transparent',
											borderRadius: '16px',
											width: '100%',
											color: '#000 !important ',
										}}
										key={index}
										onClick={() => {
											setCollapseOpen('' + index)
											router.replace({
												pathname: '/faq',
												query: { step: 1, id: '' + index },
											})
										}}>
										<Tab
											label={question}
											sx={{
												fontSize: '16px',
												fontWeight: '700',
												fontFamily: 'Karla , sans-serif',
											}}
										/>
									</Box>
								)
							})}
						</Stack>
					</Stack>
				</Paper>
				<Box>
					{questions?.map((value, index) => {
						return (
							<Box key={index}>
								<Stack direction={'column'} justifyContent={'center'} py={'30px'}>
									<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
										<Typography variant='h3' fontFamily={'Saira,sans-serif'} fontWeight={400}>
											{value.question}
										</Typography>
										<IconButton onClick={() => setCollapseOpen('' + index)}>
											{!(collapseOpen === '' + index) ? (
												<AddIcon
													sx={{
														color: '#e58a51',
													}}
												/>
											) : (
												<RemoveIcon
													sx={{
														color: '#e58a51',
													}}
												/>
											)}
										</IconButton>
									</Stack>
									<Collapse in={collapseOpen === '' + index}>
										<Typography variant='h4' fontFamily={'Karla,sans-serif'} fontWeight={400}>
											{value.answer}
										</Typography>
									</Collapse>
								</Stack>
								<Divider />
							</Box>
						)
					})}
				</Box>
			</Stack>
		</>
	)
}

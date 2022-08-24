import {
	Box,
	Button,
	Collapse,
	Divider,
	IconButton,
	List,
	ListItem,
	Paper,
	Stack,
	Table,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import { FC, useCallback, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useRouter } from 'next/router'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface Props {
	ListOfQuestion: any
}

const questions = [
	{
		question: 'How to book workers?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
	{
		question: 'How to book workers?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
	{
		question: 'How to book workers?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
	{
		question: 'How to book workers?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
	{
		question: 'How to book workers?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
	{
		question: 'How to book workers?',
		answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
	},
]

export const FAQuestion: FC<Props> = ({ ListOfQuestion }: Props) => {
	const router = useRouter()
	const [open, setOpen] = useState<boolean>(false)

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
			<Stack direction={'row'} spacing={6}>
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
					<List>
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
						{ListOfQuestion.map((question: any, index: any) => {
							return (
								<ListItem key={index}>
									<Typography
										variant='h5'
										fontFamily={'Karla,sans-serif'}
										fontWeight={500}
										textAlign={'start'}>
										{question}
									</Typography>
								</ListItem>
							)
						})}
					</List>
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
										<IconButton onClick={() => setOpen(!open)}>
											{!open ? (
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
									<Collapse in={open}>
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

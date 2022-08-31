import { Button, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { FC, useCallback } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useRouter } from 'next/router'

interface Props {
	title: string
	detail: string
	id: string
}

export const FAQCard: FC<Props> = ({ title, detail, id }: Props) => {
	const router = useRouter()

	const handleStep = useCallback(() => {
		router.replace({
			pathname: '/faq',
			query: { step: 1, id: id },
		})
	}, [router])

	return (
		<Paper
			elevation={5}
			sx={{
				p: '12px',
			}}>
			<Stack direction={{ xs: 'row', md: 'column' }} spacing={2}>
				<Paper
					elevation={2}
					sx={{
						width: 'fit-content',
					}}>
					<Image width={'100%'} height={'100%'} src={'/assets/landingv2/faq.svg'} />
				</Paper>
				<Stack direction={'column'} spacing={1.4}>
					<Stack direction={'column'} spacing={1} width={'80%'}>
						<Typography
							fontSize={'14px'}
							fontFamily={'Saira, sans-serif'}
							fontWeight={600}
							lineHeight={'18.2px'}>
							{title}
						</Typography>
						<Typography
							fontSize={'12px'}
							fontFamily={'Karla, sans-serif'}
							fontWeight={400}
							lineHeight={'15.6px'}>
							{detail}
						</Typography>
					</Stack>
					<Stack direction={'row'} justifyContent={'flex-start'}>
						<Button
							variant='text'
							endIcon={<ArrowRightAltIcon />}
							sx={{
								px: 0,
								color: '#000',
							}}
							onClick={handleStep}>
							View FAQs
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Paper>
	)
}

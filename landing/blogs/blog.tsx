import { Padding } from '@mui/icons-material'
import { Button, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CarouselV2, Section } from 'sdk'
import { BlogCard } from 'sdkv2/components'
export const Blog = () => {
	const router = useRouter()

	return (
		<Stack>
			<Section backgroundColor={'rgba(0, 0, 0, 0.05)'}>
				<Stack
					alignItems={{ xs: 'flex-start', sm: 'center', md: 'center' }}
					marginTop={{ xs: '0', md: '80px' }}>
					<Typography
						variant='h1'
						fontSize={{ md: '36px', xs: '28px' }}
						fontFamily={'Saira ,sans-serif'}
						fontWeight={500}>
						<Typography component={'span'} variant='inherit' color='success.dark' fontWeight={700}>
							Latest Blogs
						</Typography>{' '}
						from our
					</Typography>
					<Typography
						variant='h1'
						fontSize={{ md: '36px', xs: '28px' }}
						fontFamily={'Saira ,sans-serif'}
						fontWeight={500}>
						team
					</Typography>
					<br />
					<Typography
						fontSize={{ md: '24px', xs: '16px' }}
						fontFamily='Karla ,sans-serif'
						fontWeight={400}
						marginTop={{ md: '15px', xs: '0px' }}>
						Stay infromed with our latest blogs
					</Typography>
				</Stack>

				<BlogCard view={'MainBlog'} />
			</Section>
			<Section>
				<Stack direction='row' spacing={7} marginBottom='30px' marginTop='20px' marginLeft='20px'>
					<Button
						onClick={() => {
							router.replace({
								pathname: '/blog',
								query: {
									type: 'latest',
								},
							})
						}}
						variant='contained'
						sx={{
							width: '111px',
							padding: '15px, 35px, 15px, 35px',
							height: '50.06px',
							fontSize: '14.53',
							fontFamily: 'Karla ,sans-serif',
							fontWeight: 400,
						}}>
						Latest
					</Button>
					<Button
						onClick={() => {
							router.replace({
								pathname: '/blog',
								query: {
									type: 'all',
								},
							})
						}}
						variant='text'
						color='inherit'
						sx={{
							fontSize: '14.53',
							fontFamily: 'Karla ,sans-serif',
							fontWeight: 400,
						}}>
						All Blogs
					</Button>
				</Stack>
				<BlogCard view={'CardBlog'} />
			</Section>
		</Stack>
	)
}

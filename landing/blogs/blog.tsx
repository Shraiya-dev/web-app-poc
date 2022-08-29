import { Button, Stack, Typography } from '@mui/material'
import { CarouselV2, Section } from 'sdk'
import { blogData } from 'sdk/data/blogData'
import { BlogCard } from 'sdkv2/components'
const data = Array(8).fill('a')
export const Blog = () => {
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

				<CarouselV2
					slideDelay={5000}
					componentPerView={1}
					items={Array(blogData.Latestblogs.length)
						.fill('a')
						.map(() => {
							return <BlogCard view={'MainBlog'} />
						})}
				/>
			</Section>
			<Section>
				<Stack direction='row' spacing={7} marginBottom='30px' marginTop='20px' marginLeft='20px'>
					<Button variant='contained' sx={{ width: '125px' }}>
						Latest
					</Button>
					<Button variant='text' color='inherit'>
						All Blog
					</Button>
				</Stack>
				<BlogCard view={'CardBlog'} />
			</Section>
		</Stack>
	)
}

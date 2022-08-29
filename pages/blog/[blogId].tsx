import { Box, Button, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { LandingLayout, Section } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import ShareIcon from '@mui/icons-material/Share'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { BlogCard } from 'sdkv2/components'
import { useRouter } from 'next/router'
const Page: NextPage = () => {
	const router = useRouter()
	return (
		<>
			<LandingLayout>
				<Section>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<Button
							// href='/blog'
							onClick={() => {
								router.push({
									pathname: '/blog',
									query: { pid: 1 },
								})
							}}
							startIcon={<ArrowBackIcon />}
							variant='text'
							fullWidth={false}
							sx={{ mt: '-20px', mb: '10px' }}
							color='inherit'>
							Back
						</Button>
						<Button
							endIcon={<ShareIcon />}
							variant='text'
							fullWidth={false}
							sx={{ mt: '-20px', mb: '10px', mr: '12px' }}>
							Share
						</Button>
					</Box>
					<CardMedia
						component='img'
						sx={{
							height: '192px',
							width: '342px',
							borderRadius: '8.3557px',
						}}
						image='/assets/landing/blog/blogs.png'
						alt='Live from space album cover'
					/>
					<Stack>
						<CardContent>
							<Typography
								fontSize={{ md: '32px', xs: '16px' }}
								fontFamily={'Saira ,sans-serif'}
								fontWeight={600}
								gutterBottom
								variant='h2'
								component='div'>
								How to Book workers from Project Hero
							</Typography>
							<Typography
								sx={{ py: { xs: '5px', md: '' } }}
								variant='h6'
								color='text.secondary'
								fontFamily='Karla ,sans-serif'
								fontSize='14px'
								fontWeight={400}>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus quidem consectetur at
								nesciunt illo explicabo sunt quo officia repudiandae quis porro, cum eveniet, rerum
								aperiam quasi earum amet? Quos tempora dolore tempore temporibus culpa autem quod
								corrupti blanditiis id numquam quidem omnis obcaecati ullam ad nesciunt quia, ab nostrum
								quo aliquam. Voluptate, vero! Assumenda praesentium labore quos.
								<br />
								<br /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque consectetur
								maiores ipsam debitis tempora harum voluptatem illum ad ab suscipit. Accusantium dolores
								dolorem tempore, sequi, doloremque ut magnam debitis quidem voluptatibus qui odio vero
								aut magni voluptatum porro ex voluptas. Nam nostrum libero illo voluptate facere nisi
								odio labore perspiciatis, harum,
							</Typography>
						</CardContent>
					</Stack>
				</Section>
				<Section>
					<Typography variant='h2'>Similar Blogs</Typography>
				</Section>
				<BlogCard view={'CardBlog'} />
			</LandingLayout>
		</>
	)
}

export default Page

const pageUrl = '/blog/[blogId]'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps

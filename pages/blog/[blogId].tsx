import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { LandingLayout, Section } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import ShareIcon from '@mui/icons-material/Share'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { BlogCard } from 'sdkv2/components'
import { useRouter } from 'next/router'
import { blogData } from 'sdk/data/blogData'
const Page: NextPage = () => {
	const router = useRouter()
	return (
		<>
			<LandingLayout>
				<Section backgroundColor='#fff'>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<Button
							onClick={() => {
								router.replace({
									pathname: '/blog',
								})
							}}
							startIcon={<ArrowBackIcon />}
							variant='text'
							fullWidth={false}
							sx={{ mt: '-20px', mb: '10px' }}
							color='inherit'>
							<Typography
								fontFamily='Karla ,sans-serif'
								fontSize={{ md: '18px', xs: '12px' }}
								fontWeight={500}>
								Back
							</Typography>
						</Button>
						<Button
							endIcon={<ShareIcon />}
							variant='text'
							fullWidth={false}
							sx={{ mt: '-20px', mb: '10px', mr: '12px' }}>
							<Typography
								fontFamily='Karla ,sans-serif'
								fontSize={{ md: '18px', xs: '12px' }}
								fontWeight={500}>
								Share
							</Typography>
						</Button>
					</Box>
					<Stack direction={'row'} justifyContent={'center'}>
						<Card
							elevation={0}
							sx={{
								p: 2,
								background: 'transparent',
								width: { md: '88%', xs: '100%' },
							}}>
							<Typography
								fontSize={{ md: '32px', xs: '16px' }}
								fontFamily={'Saira ,sans-serif'}
								fontWeight={600}
								gutterBottom
								variant='h2'
								component='div'>
								{blogData?.Allblogs[Number(router?.query?.pid)]?.title}
							</Typography>
							<CardMedia
								component='img'
								sx={{
									height: '336px',
									width: '100%',
									borderRadius: '8.3557px',
								}}
								image='/assets/landing/blog/blogs.png'
								alt='Live from space album cover'
							/>
							<Stack>
								<CardContent
									sx={{
										px: 0,
									}}>
									<Typography
										sx={{ py: { xs: '5px', md: '' } }}
										variant='h6'
										color='text.secondary'
										fontFamily='Karla ,sans-serif'
										fontSize='14px'
										fontWeight={400}>
										{blogData?.Allblogs[Number(router?.query?.pid)]?.details}
									</Typography>
								</CardContent>
							</Stack>
						</Card>
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

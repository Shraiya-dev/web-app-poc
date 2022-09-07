import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { LandingLayout, LinkButton, Section, useMobile, useSnackbar } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import ShareIcon from '@mui/icons-material/Share'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { BlogCard } from 'sdkv2/components'
import { useRouter } from 'next/router'
import { blogData } from 'sdk/data/blogData'
import { useCallback, useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
const Page: NextPage = () => {
	const router = useRouter()
	const [blogType, setBlogType] = useState<string>('Allblogs')
	const isMobile = useMobile()
	const [blogId, setBlogId] = useState<number>(0)
	const [similarBlog, setSimilarBlog] = useState([])
	const [seeMore, setSeeMore] = useState<boolean>(false)
	const { showSnackbar } = useSnackbar()
	useEffect(() => {
		console.log(router.query.blogId)
		setBlogId(Number(router.query.blogId))

		let result: any = []
		blogData?.Allblogs[blogId]?.similarArray.forEach((x: any) => {
			let value = blogData?.Allblogs.filter((y: any) => y.id === x)[0]
			result = [...result, value]
		})
		console.log(result)
		setSimilarBlog(result)
	}, [router.query.blogId])

	const copyOnShare = useCallback((id: any) => {
		if (!window) return
		const href = location.origin + `/blog/${id}`
		navigator.clipboard.writeText(href)
		const shareData = {
			url: href,
		}
		console.log(href)
		if (isMobile) {
			if (!window) {
				return
			}
			navigator
				.share(shareData)
				.then(() => showSnackbar(href, 'success'))
				.catch((e) => showSnackbar(href, 'error'))
		} else {
			showSnackbar('Share link Copied', 'success')
		}
		// showSnackbar(`Share Link Copied`, 'success')
	}, [])

	const ShareBlog = useCallback(() => {
		console.log(router.asPath)
		var href = location.origin + router.asPath
		navigator.clipboard.writeText(href)
		const shareData = {
			url: location.origin + router.asPath,
		}
		isMobile
			? window
				? navigator
						?.share(shareData)
						.then(() => showSnackbar(href, 'success'))
						.catch((e) => showSnackbar(href, 'error'))
				: null
			: showSnackbar('Share link Copied', 'success')
	}, [])
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
							startIcon={<ShareIcon />}
							variant='text'
							onClick={() => {
								ShareBlog()
							}}
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
								{blogData?.Allblogs[blogId]?.title}
							</Typography>
							<CardMedia
								component='img'
								sx={{
									height: '336px',
									width: '100%',
									borderRadius: '8.3557px',
								}}
								image={blogData?.Allblogs[blogId]?.imgSrc}
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
										{blogData?.Allblogs[blogId]?.details}
									</Typography>
								</CardContent>
							</Stack>
						</Card>
					</Stack>
				</Section>
				<Section>
					<Typography variant='h2'>Similar Blogs</Typography>
				</Section>

				<Stack>
					<Section>
						<Grid container spacing={2}>
							{similarBlog.map(
								({ id, title, description, imgSrc, isPopular, isLatest }: any, index: any) => {
									if (index > (isMobile ? 1 : 5) && !seeMore) {
										return null
									}
									return (
										<Grid key={index} item xs={12} sm={6} md={4}>
											{isMobile ? (
												<Card
													elevation={10}
													sx={{
														width: '100%',
														height: '160px',
														display: 'flex',
														flexDirection: 'row-reverse',
														alignItems: 'center',
													}}>
													<Box sx={{ display: 'flex', flexDirection: 'column' }}>
														<CardContent sx={{ height: '135px' }}>
															<Typography
																variant='h6'
																fontSize='16px'
																fontFamily={'Saira ,sans-serif'}
																fontWeight={600}
																sx={{ marginTop: '8%' }}>
																{title.slice(0, 35) + '......'}
															</Typography>
															<Typography
																variant='subtitle1'
																color='text.secondary'
																component='div'
																fontFamily='Karla ,sans-serif'
																fontSize='12px'
																fontWeight={400}>
																{description.slice(0, 50) + '......'}
															</Typography>
														</CardContent>
														<Box
															sx={{
																display: 'flex',
																justifyContent: 'space-around',
																paddingBottom: '25px',
															}}>
															<Button
																onClick={() => {
																	router.push(`/blog/${id}`)
																	// window.scrollTo(0, 0)
																}}
																endIcon={<ArrowForwardIcon />}
																variant='text'
																fullWidth={false}
																sx={{ marginBottom: '0px' }}
																color='inherit'>
																Read More
															</Button>
															<Button
																onClick={() => copyOnShare(id)}
																startIcon={<ShareIcon />}
																variant='text'
																fullWidth={false}>
																<Typography
																	fontFamily='Karla ,sans-serif'
																	fontSize='12px'
																	fontWeight={500}>
																	Share
																</Typography>
															</Button>
														</Box>
													</Box>
													<CardMedia
														component='img'
														sx={{
															width: 106,
															height: 129,
															marginLeft: '10px',
															borderRadius: '8.3557px',
														}}
														image={imgSrc}
														alt='project hero'
													/>
												</Card>
											) : (
												<Card elevation={10} sx={{ p: '12px' }}>
													<CardMedia
														component='img'
														height='228'
														width='380'
														sx={{ borderRadius: '8.3557px' }}
														image={imgSrc}
														alt='project hero'
													/>
													<CardContent>
														<Stack direction='row'>
															<Typography
																gutterBottom
																variant='h6'
																fontSize='16px'
																fontFamily={'Saira ,sans-serif'}
																fontWeight={600}
																component='div'>
																{title}
															</Typography>
															<Button
																onClick={() => copyOnShare(id)}
																startIcon={<ShareIcon />}
																variant='text'
																fullWidth={false}
																sx={{
																	marginLeft: '40px',
																	height: '20px',
																}}>
																<Typography
																	fontFamily='Karla ,sans-serif'
																	fontSize='12px'
																	fontWeight={500}>
																	Share
																</Typography>
															</Button>
														</Stack>
														<Stack
															direction={'column'}
															justifyContent={'flex-start'}
															alignItems={'space-between'}>
															<Box
																sx={{
																	minHeight: '100px',
																	maxHeight: '100px',
																}}>
																<Typography
																	fontFamily='Karla ,sans-serif'
																	fontSize='12px'
																	fontWeight={400}
																	variant='body2'
																	color='text.secondary'>
																	{description.slice(0, 250)}
																</Typography>
															</Box>
															<LinkButton
																href={`blog/${id}`}
																endIcon={<ArrowForwardIcon />}
																variant='text'
																fullWidth={false}
																sx={{
																	ml: '-10px',
																	position: 'absolute',
																	bottom: '10px',
																}}
																color='inherit'>
																Read More
															</LinkButton>
														</Stack>
													</CardContent>
												</Card>
											)}
										</Grid>
									)
								}
							)}
						</Grid>
					</Section>
				</Stack>
			</LandingLayout>
		</>
	)
}

export default Page

const pageUrl = '/blog/[blogId]'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps

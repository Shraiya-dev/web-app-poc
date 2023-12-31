import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import { FC, useCallback, useState } from 'react'
// import { useLocation } from 'react-router-dom'
import ShareIcon from '@mui/icons-material/Share'
import { Carousel, LinkButton, Section } from 'sdk/components'
import { useMobile } from 'sdk/hooks'

import { useRouter } from 'next/router'
import { blogData } from 'sdk/data/blogData'

import { useSnackbar } from 'sdk/providers'
import { sendAnalytics } from 'sdk/analytics'

interface Props {
	view: string
}
export const BlogCard: FC<Props> = ({ view }: Props) => {
	const isMobile = useMobile()
	const [seeMore, setSeeMore] = useState(false)
	const router = useRouter()
	const { showSnackbar } = useSnackbar()
	const copyOnShare = useCallback(
		(id: any, title: string) => {
			if (!window) return

			const nsp = new URLSearchParams({
				title: title,
			})
			const href = location.origin + `/blog/${id}?${nsp.toString()}`
			navigator.clipboard.writeText(href)
			const shareData = {
				url: href,
			}
			sendAnalytics({
				name: 'shareBlog',
				action: 'ButtonClick',
				metaData: { title: title },
			})
			isMobile
				? navigator?.share(shareData).then(() => showSnackbar(href, 'success'))
				: showSnackbar('Share link Copied', 'success')
			sendAnalytics({
				name: 'shareBlog',
				action: 'ButtonClick',
				metaData: { title: title },
			})
		},
		[isMobile, showSnackbar]
	)
	const handleonReadMore = useCallback((id: any, title: string) => {
		const nsp = new URLSearchParams({
			title: title,
		})
		return `blog/${id}?${nsp.toString()}`
	}, [])

	return (
		<>
			{view === 'MainBlog' && (
				<Carousel
					slideDelay={5000}
					componentPerView={1}
					items={blogData.Allblogs.filter(({ isPopular }: any) => isPopular).map(
						({ id, title, description, imgSrc, isPopular, isLatest }: any, index: any) => (
							<Box key={id}>
								<Stack
									key={index}
									direction={{ xs: 'column', md: 'row' }}
									sx={{
										borderRadius: '8.3557px',
										marginTop: { md: '98px', xs: '24px' },
										backgroundColor: { xs: 'none', md: 'white' },
										padding: { md: '18px' },
									}}>
									<CardMedia
										component='img'
										image={imgSrc}
										alt='ProjectHero'
										sx={{
											height: { md: '336px', xs: '100%' },
											width: { md: '346px', xs: '100%' },
											borderRadius: '8.3557px',
										}}
									/>
									<Stack>
										<CardContent>
											<Typography
												gutterBottom
												variant='h2'
												component='div'
												fontSize={{ lg: '32px', md: '27px', xs: '16px' }}
												fontFamily={'Saira ,sans-serif'}
												fontWeight={600}
												sx={{ marginTop: { md: '-18px', xs: '' } }}>
												{title}
											</Typography>

											<Typography
												variant='h6'
												color='text.secondary'
												fontFamily='Karla ,sans-serif'
												fontSize={{ lg: '20px', md: '17px', xs: '14px' }}
												fontWeight={400}>
												{description.slice(0, 200)}....
												<br />
												<br />
												{description.slice(200, 350)}....
											</Typography>
										</CardContent>
										{!isMobile ? (
											<Stack
												direction={'row'}
												spacing={1}
												justifyContent='space-between'
												sx={{ mt: { xs: '30px', md: '0' } }}>
												<LinkButton
													onClick={() => copyOnShare(id, title)}
													startIcon={<ShareIcon sx={{ color: '#efc430' }} />}
													variant='text'
													fullWidth={false}
													sx={{
														position: { md: 'absolute', xs: '' },
														bottom: '22px',

														width: '120px',
														ml: '120px',
													}}>
													<Typography>Share</Typography>
												</LinkButton>
												<Button
													href={handleonReadMore(id, title)}
													endIcon={<ArrowForwardIcon />}
													variant='text'
													fullWidth={false}
													sx={{
														position: { md: 'absolute', xs: '' },
														bottom: '22px',

														pl: '-100px',
														width: '120px',
													}}
													color='inherit'>
													Read More
												</Button>
											</Stack>
										) : (
											<Stack
												direction={'row-reverse'}
												spacing={1}
												justifyContent='space-between'
												sx={{ mt: { xs: '30px', md: '0' } }}>
												<Button
													href={handleonReadMore(id, title)}
													endIcon={<ArrowForwardIcon />}
													variant='text'
													fullWidth={false}
													color='inherit'>
													Read More
												</Button>
												<LinkButton
													color='primary'
													onClick={() => copyOnShare(id, title)}
													startIcon={<ShareIcon sx={{ color: '#efc430' }} />}
													variant='text'
													fullWidth={false}>
													Share
												</LinkButton>
											</Stack>
										)}
									</Stack>
								</Stack>
							</Box>
						)
					)}
				/>
			)}
			{view === 'CardBlog' && (
				<Section>
					<Grid container spacing={2}>
						{blogData?.Allblogs?.map(({ id, title, description, imgSrc, isLatest }: any, index: any) => {
							if (index > (isMobile ? 4 : 6) && !seeMore) {
								return null
							} else if (router.query.type === 'all') {
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
															fontSize={{ md: '16px', xs: '11px' }}
															fontFamily={'Saira ,sans-serif'}
															fontWeight={600}
															sx={{ marginTop: '8%' }}>
															{title}
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
														<LinkButton
															href={handleonReadMore(id, title)}
															endIcon={<ArrowForwardIcon />}
															variant='text'
															fullWidth={false}
															sx={{ marginBottom: '0px' }}
															color='inherit'>
															Read More
														</LinkButton>
														<Button
															onClick={() => copyOnShare(id, title)}
															endIcon={<ShareIcon />}
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
													alt='ProjectHero'
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
													alt='green iguana'
												/>
												<CardContent>
													<Stack direction='row'>
														<Typography
															gutterBottom
															variant='h6'
															fontSize={{ md: '16px', xs: '11px' }}
															fontFamily={'Saira ,sans-serif'}
															fontWeight={600}
															component='div'>
															{title}
														</Typography>
														<Button
															onClick={() => copyOnShare(id, title)}
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
													<Box>
														<Typography
															fontFamily='Karla ,sans-serif'
															fontSize='12px'
															fontWeight={400}
															variant='body2'
															color='text.secondary'>
															{description.slice(0, 250)}....
														</Typography>
													</Box>
												</CardContent>

												<CardActions>
													<LinkButton
														href={handleonReadMore(id, title)}
														endIcon={<ArrowForwardIcon />}
														variant='text'
														fullWidth={false}
														sx={{ marginBottom: '0px' }}
														color='inherit'>
														Read More
													</LinkButton>
												</CardActions>
											</Card>
										)}
									</Grid>
								)
							} else {
								if (isLatest) {
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
																fontSize={{ md: '16px', xs: '11px' }}
																fontFamily={'Saira ,sans-serif'}
																fontWeight={600}
																sx={{ marginTop: '8%' }}>
																{title}
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
															<LinkButton
																href={handleonReadMore(id, title)}
																endIcon={<ArrowForwardIcon />}
																variant='text'
																fullWidth={false}
																sx={{ marginBottom: '0px' }}
																color='inherit'>
																Read More
															</LinkButton>
															<Button
																onClick={() => copyOnShare(id, title)}
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
														alt='Live from space album cover'
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
														alt='green iguana'
													/>
													<CardContent sx={{ width: '100%' }}>
														<Stack direction='row'>
															<Typography
																gutterBottom
																variant='h6'
																fontSize={{ md: '16px', xs: '11px' }}
																fontFamily={'Saira ,sans-serif'}
																fontWeight={600}
																component='div'>
																{title}
															</Typography>
															<Button
																startIcon={<ShareIcon />}
																variant='text'
																fullWidth={false}
																sx={{
																	marginLeft: '40px',
																	height: '20px',
																}}>
																<Typography
																	onClick={() => copyOnShare(id, title)}
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
																	{description.slice(0, 250)}....
																</Typography>
															</Box>
															<LinkButton
																href={handleonReadMore(id, title)}
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
							}
						})}
						{seeMore && (
							<Grid container justifyContent='center' marginTop={3}>
								<Button
									onClick={() => {
										setSeeMore(false)
									}}
									endIcon={<KeyboardArrowUpIcon />}
									variant='text'
									fullWidth={false}
									color='inherit'>
									Show Less
								</Button>
							</Grid>
						)}
						{!seeMore && (!isMobile ? blogData?.Allblogs?.length > 6 : blogData?.Allblogs?.length > 2) && (
							<Grid container justifyContent='center' marginTop={3}>
								<Button
									onClick={() => {
										setSeeMore(true)
									}}
									startIcon={<KeyboardArrowDownIcon />}
									variant='text'
									fullWidth={false}
									color='inherit'>
									Show More
								</Button>
							</Grid>
						)}
					</Grid>
				</Section>
			)}
		</>
	)
}

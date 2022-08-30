import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { theme } from 'sdk/constants'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ShareIcon from '@mui/icons-material/Share'
import { CarouselV2, Section } from 'sdk/components'
import { useMobile } from 'sdk/hooks'

import { blogData } from 'sdk/data/blogData'
import { useRouter } from 'next/router'
interface Props {
	view: string
}
const data = Array(9).fill('a')
export const BlogCard: FC<Props> = ({ view }: Props) => {
	const isMobile = useMobile()
	const [seeMore, setSeeMore] = useState(false)
	const router = useRouter()

	return (
		<>
			{view == 'MainBlog' && (
				<CarouselV2
					slideDelay={5000}
					componentPerView={1}
					items={blogData.Latestblogs.map(({ id, title, description, imgSrc }) => {
						return (
							<Stack
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
									alt='green iguana'
									sx={{
										height: { md: '336px', xs: '192px' },
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
											fontSize={{ md: '32px', xs: '16px' }}
											fontFamily={'Saira ,sans-serif'}
											fontWeight={600}
											sx={{ marginTop: { md: '-18px', xs: '' } }}>
											{title}
										</Typography>
										<Typography
											variant='h6'
											color='text.secondary'
											fontFamily='Karla ,sans-serif'
											fontSize={{ md: '20px', xs: '14px' }}
											fontWeight={400}>
											{description.slice(0, 200)}
											<br />
											<br /> {description.slice(200, 400)}
										</Typography>
									</CardContent>
									<CardActions
										sx={{
											display: 'flex',
											justifyContent: { xs: 'space-between', md: 'flex-start' },
										}}>
										<Button
											onClick={() => {
												router.push({
													pathname: !router.query.page ? 'blog/id' : '/blog/id',
													query: {
														pid: id,
														page: 'read-more',
													},
												})
											}}
											endIcon={<ArrowForwardIcon />}
											variant='text'
											fullWidth={false}
											color='inherit'
											sx={{
												marginTop: { md: '0px', xs: '8px' },
											}}>
											<Typography
												fontFamily='Karla ,sans-serif'
												fontSize={{ md: '18px', xs: '12px' }}
												fontWeight={500}>
												Read More
											</Typography>
										</Button>
										<Button
											endIcon={<ShareIcon />}
											variant='text'
											fullWidth={false}
											sx={{
												marginTop: { md: '0px', xs: '8px' },
											}}>
											<Typography
												fontFamily='Karla ,sans-serif'
												fontSize={{ md: '18px', xs: '12px' }}
												fontWeight={500}>
												Share
											</Typography>
										</Button>
									</CardActions>
								</Stack>
							</Stack>
						)
					})}
				/>
			)}
			{view == 'CardBlog' && (
				<Stack>
					<Section>
						{
							<Grid container spacing={2}>
								{blogData.Allblogs.map(({ id, title, description, imgSrc }, index) => {
									if (index > (isMobile ? 1 : 5) && !seeMore) {
										return null
									}
									return (
										<Grid item xs={12} sm={6} md={4}>
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
															<Button
																// href='blog/id'
																onClick={() => {
																	router.push({
																		pathname: !router.query.page
																			? 'blog/id'
																			: '/blog/id',
																		query: {
																			pid: id,
																			page: 'read-more',
																		},
																	})
																}}
																endIcon={<ArrowForwardIcon />}
																variant='text'
																fullWidth={false}
																sx={{ marginBottom: '0px' }}
																color='inherit'>
																<Typography
																	fontFamily='Karla ,sans-serif'
																	fontSize='12px'
																	fontWeight={500}
																	sx={{ ml: '-5px' }}>
																	Read More
																</Typography>
															</Button>
															<Button
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
																endIcon={<ShareIcon />}
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
														<Typography
															fontFamily='Karla ,sans-serif'
															fontSize='12px'
															fontWeight={400}
															variant='body2'
															color='text.secondary'>
															{description.slice(0, 250)}
														</Typography>
													</CardContent>
													<CardActions>
														<Button
															// href='blog/id'
															onClick={() => {
																router.push({
																	pathname: !router.query.page
																		? 'blog/id'
																		: '/blog/id',
																	query: {
																		pid: id,
																		page: 'read-more',
																	},
																})
															}}
															endIcon={<ArrowForwardIcon />}
															variant='text'
															fullWidth={false}
															color='inherit'>
															<Typography
																fontFamily='Karla ,sans-serif'
																fontSize='12px'
																fontWeight={500}>
																Read More
															</Typography>
														</Button>
													</CardActions>
												</Card>
											)}
										</Grid>
									)
								})}
								{seeMore && (
									<Grid container justifyContent='center' marginTop={3}>
										<Button
											onClick={() => {
												console.log(seeMore)
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
								{!seeMore && (!isMobile ? data.length > 6 : data.length > 2) && (
									<Grid container justifyContent='center' marginTop={3}>
										<Button
											onClick={() => {
												console.log(seeMore)
												setSeeMore(true)
											}}
											endIcon={<KeyboardArrowDownIcon />}
											variant='text'
											fullWidth={false}
											color='inherit'>
											Show More
										</Button>
									</Grid>
								)}
							</Grid>
						}
					</Section>
				</Stack>
			)}
		</>
	)
}

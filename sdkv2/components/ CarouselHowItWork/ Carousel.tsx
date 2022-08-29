import { Stack } from '@mui/material'
import { useEffect, useRef } from 'react'

interface Props {
	root: any
	children: any
	handleSlide: (arg0: string) => void
	val: string
	slide: string
}

export const CarouselHowItWork = ({ root, children, handleSlide, val, slide }: Props) => {
	const home: any = useRef()
	useEffect(() => {
		if (val === slide) {
			root.current.scrollTo({
				top: home.current.offsetTop - root.current.offsetTop,
			})
		}
	}, [slide, val, home, root])
	useEffect(() => {
		const options = {
			root: root.current,
			rootMargin: '0px',
			threshold: 1,
		}
		const callbackFuncation = (entries: any, observer: any) => {
			entries.forEach((entry: any) => {
				if (entry.isIntersecting) {
					handleSlide(val)
				}
			})
		}
		const observer = new IntersectionObserver(callbackFuncation, options)
		if (home && home.current) {
			observer.observe(home?.current)
		}
		return () => observer.disconnect()
	}, [root, val, home])
	return (
		<Stack ref={home} sx={{ marginBottom: '-100px', paddingBottom: '100px' }}>
			{children}
		</Stack>
	)
}

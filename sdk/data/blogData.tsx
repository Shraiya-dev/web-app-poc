var ind = 0
export const blogData = {
	Header: {
		heading: 'Latest Blogs from our team',
	},
	Popularblogs: Array(5).fill({
		id: ind++,
		title: 'How to Book workers from Project Hero',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. ',
		imgSrc: '/assets/landing/blog/blogs.png',
	}),
	Latestblogs: Array(5).fill({
		id: ind++,
		title: 'How to Book workers from Project Hero',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. ',
		imgSrc: '/assets/landing/blog/blogs.png',
	}),
	Allblogs: Array(10).fill({
		id: ind++,
		title: 'How to Book workers from Project Hero',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. ',
		imgSrc: '/assets/landing/blog/blogs.png',
		isLatest: true,
		isPopular: true,
	}),
}

export const blogData = {
	// Header: {
	// 	heading: 'Latest Blogs from our team',
	// },
	// Popularblogs: [
	// 	{
	// 		id: '',
	// 		title: '',
	// 		description: '',
	// 		imgSrc: '',
	// 		isPopular: '',
	// 		isLatest: '',
	// 	},
	// ],
	// Latestblogs: [
	// 	{
	// 		id: '',
	// 		title: '',
	// 		description: '',
	// 		imgSrc: '',
	// 		isPopular: '',
	// 		isLatest: '',
	// 	},
	// ],
	// Blogs: [
	// 	{
	// 		id: '',
	// 		title: '',
	// 		description: '',
	// 		imgSrc: '',
	// isPopular: '',
	// isLatest: '',
	// 	},
	// ],

	Header: {
		heading: 'Latest Blogs from our team',
	},
	Popularblogs: new Array(5).map((x, index) => {
		return {
			id: index,
			title: 'How to Book workers from Project Hero',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. ',
			imgSrc: '/assets/landing/blog/blogs.png',
		}
	}),
	Latestblogs: new Array(5).map((x, index) => {
		return {
			id: index + 5,
			title: 'How to Book workers from Project Hero',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. ',
			imgSrc: '/assets/landing/blog/blogs.png',
		}
	}),
	Allblogs: new Array(10).map((x, index) => {
		return {
			id: index + 10,
			title: 'How to Book workers from Project Hero',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui condimentum sed ut duis eu auctor in non eget. Neque a enim enim posuere id sem magna ac. ',
			imgSrc: '/assets/landing/blog/blogs.png',
			isPopular: true,
			isLatest: true,
		}
	}),
}

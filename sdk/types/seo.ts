export interface Seo {
	title: string
	description?: string
}

export interface PageStaticData {
	pageName: string
	seo: Seo
}

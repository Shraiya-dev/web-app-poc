// @ts-nocheck comment to disable all type checking in a TypeScript file.

export const DataLayerPush = (payload: any) => {
	if (window) {
		window.dataLayer = window.dataLayer || []
		window.dataLayer.push(payload)
	}
}

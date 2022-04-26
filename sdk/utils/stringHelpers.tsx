export const capitalize = (str: string) => {
	return str.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
}

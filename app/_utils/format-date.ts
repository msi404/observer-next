export const formatDate = ( date: string ) => {
	const options = {};
	const newDate = `${new Date(date).toLocaleDateString(
	  'ar-AG',
	  options
	) }`;
	return newDate
}


export const formatDate = ( date: string ) => {
	var options = {};
	const newDate = `${new Date(date).toLocaleDateString(
	  'ar-AG',
	  //@ts-ignore
	  options
	) }`;
	return newDate
}
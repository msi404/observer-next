import {RotatingLines} from 'react-loader-spinner'

export const Spinner = () =>
{
	return (
		<RotatingLines
			strokeColor='white'
			ariaLabel="three-dots-loading" />
	)
}
import { differenceInYears } from 'date-fns';

export const calcAge = ( dob: string ) =>
{
	const age = differenceInYears( new Date(), dob );
	return age;
}
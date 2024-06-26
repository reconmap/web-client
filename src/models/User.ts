
interface UserInterface {

	id?: number;
	subject_id?: string;
	active?: boolean;
	full_name: string | undefined;
	short_bio?: string;
	username: string | undefined;
	email: string | undefined;
	timezone: string | undefined;
	preferences: any | undefined;
	role?: string;
}


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const User : UserInterface = {

	active: true,
	role: undefined,

	full_name: undefined,
	username: undefined,
	email: undefined,
	timezone: undefined,
	preferences: undefined,
}

export default User;

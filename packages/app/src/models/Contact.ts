
interface Contact {

	id?: number;
	kind: string | undefined;
	name?: string;
	email?: string;
	phone?: string;
	role?: string;
}

export { Contact };


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const defaultContact : Contact = {

	id: undefined,
	kind: 'general',
	name: undefined,
	email: undefined,
	phone: undefined,
	role: undefined,

}

export default defaultContact;

interface Note {

	user_id?: number;
	visibility: string | undefined;
	parent_id?: number;
	parent_type?: string;
	content?: string;
}

export { Note };


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const defaultNote : Note = {

	visibility: 'private',

}

export default defaultNote;
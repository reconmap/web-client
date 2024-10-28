
interface Attachment {

	id?: number;
	parent_type: string | undefined;
	parent_id: number | undefined;
	submitter_uid: number | undefined;
	client_file_name: string | undefined;
	file_name: string | undefined;
	file_size: number | undefined;
	file_mimetype?: string;
	file_hash: string | undefined;
}

export { Attachment };


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const defaultAttachment : Attachment = {

	id: undefined,

	parent_type: undefined,
	parent_id: undefined,
	submitter_uid: undefined,
	client_file_name: undefined,
	file_name: undefined,
	file_size: undefined,
	file_hash: undefined,
}

export default defaultAttachment;

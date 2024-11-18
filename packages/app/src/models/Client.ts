
interface Client {

	id?: number;
	creator_uid?: number;
	insert_ts?: string;
	update_ts?: string;
	name?: string;
	address?: string;
	url?: string;
	logo_attachment_id?: number;
	small_logo_attachment_id?: number;
}

export { Client };


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const defaultClient : Client = {

	logo_attachment_id: undefined,
	small_logo_attachment_id: undefined,

}

export default defaultClient;
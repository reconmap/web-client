
interface CommandUsage {

	id?: number;
	command_id?: number;
	creator_uid?: number;
	name?: string;
	description?: string;
	executable_path?: string;
	arguments?: string;
	output_filename?: string;
	output_parser?: string;
}

export { CommandUsage };


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const defaultCommandUsage : CommandUsage = {


}

export default defaultCommandUsage;

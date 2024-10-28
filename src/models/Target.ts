
interface Target {

	project_id: number | undefined;
	parent_id?: number;
	name: string | undefined;
	kind: string | undefined;
	tags?: string;
}

export { Target };


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const defaultTarget : Target = {

	parent_id: undefined,

	project_id: undefined,
	name: undefined,
	kind: undefined,
}

export default defaultTarget;

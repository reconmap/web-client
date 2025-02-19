
interface ReportConfiguration {

	id: number | undefined;
	project_id: number | undefined;
	include_toc: boolean | undefined;
	include_revisions_table: boolean | undefined;
	include_team_bios: boolean | undefined;
	include_findings_overview: boolean | undefined;
	include_cover: string | undefined;
	include_header: string | undefined;
	include_footer: string | undefined;
	custom_cover?: string;
	custom_header?: string;
	custom_footer?: string;
}

export { ReportConfiguration };


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const defaultReportConfiguration : ReportConfiguration = {

	include_toc: true,
	include_revisions_table: true,
	include_team_bios: true,
	include_findings_overview: true,
	include_cover: 'default',
	include_header: 'default',
	include_footer: 'default',

	id: undefined,
	project_id: undefined,
}

export default defaultReportConfiguration;

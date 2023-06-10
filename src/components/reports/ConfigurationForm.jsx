import PrimaryButton from "components/ui/buttons/Primary";
import Loading from "components/ui/Loading";
import { actionCompletedToast } from "components/ui/toast";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import secureApiFetch from "services/api";

const ReportConfigurationForm = ({ projectId }) => {

    const [serverConfiguration] = useFetch(`/reports/${projectId}/configuration`);

    const [clientConfiguration, updateClientConfiguration] = useState(null);

    const onConfigurationFormSubmit = (ev) => {
        ev.preventDefault();

        secureApiFetch(`/reports/${projectId}/configuration`, {
            method: 'PUT',
            body: JSON.stringify(clientConfiguration)
        })

        actionCompletedToast(`Configuration updated.`);
    }

    const onFormChange = (ev) => {
        ev.preventDefault();

        let value = ev.target.value;
        if (value === "true" || value === "false") {
            value = JSON.parse(value);
        }

        updateClientConfiguration({ ...clientConfiguration, [ev.target.name]: value });
    }


    useEffect(() => {
        if (serverConfiguration) {
            updateClientConfiguration(serverConfiguration);
        }
    }, [serverConfiguration]);

    if (!clientConfiguration) return <Loading />

    return <>
        <form onSubmit={onConfigurationFormSubmit} className="crud">
            <fieldset>
                <legend>Optional sections</legend>

                <label>
                    Include table of contents
                    <select name="include_toc" value={clientConfiguration.include_toc} onChange={onFormChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label>
                    Include revisions table
                    <select name="include_revisions_table" value={clientConfiguration.include_revisions_table} onChange={onFormChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label>
                    Include team bios
                    <select name="include_team_bios" value={clientConfiguration.include_team_bios} onChange={onFormChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label>
                    Include findings overview
                    <select name="include_findings_overview" value={clientConfiguration.include_findings_overview} onChange={onFormChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
            </fieldset>

            <PrimaryButton type="submit">Save configuration</PrimaryButton>
        </form>
    </>
}

export default ReportConfigurationForm;

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import PrimaryButton from "components/ui/buttons/Primary";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import secureApiFetch from "services/api";
import ReportsTable from "./Table";

const ReportRevisions = ({ projectId }) => {

    const [reports, updateReports] = useFetch(`/reports?projectId=${projectId}`);
    const [templates] = useFetch('/reports/templates');

    const [saveVersionButtonDisabled, setSaveVersionButtonDisabled] = useState(true);
    const defaultFormValues = { reportTemplateId: 0, name: "", description: "" };
    const [formValues, setFormValues] = useState(defaultFormValues);


    useEffect(() => {
        setSaveVersionButtonDisabled(formValues.name.length === 0);
    }, [formValues.name]);

    const onFormValueChange = ev => {
        ev.preventDefault();

        setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    };

    const onSaveVersionSubmit = ev => {
        ev.preventDefault();

        const params = {
            projectId: projectId,
            reportTemplateId: formValues.reportTemplateId,
            name: formValues.name,
            description: formValues.description
        };
        secureApiFetch(`/reports`, {
            method: 'POST',
            body: JSON.stringify(params)
        })
            .then(resp => {
                updateReports();
                setFormValues(defaultFormValues);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        if (templates) {
            setFormValues((prev) => ({ ...prev, reportTemplateId: templates[0].id }))
        }
    }, [templates]);

    if (!reports) return <Loading />

    return <>
        <form onSubmit={onSaveVersionSubmit} className="crud" style={{ marginTop: '20px' }}>
            <fieldset>
                <legend>New report version</legend>

                <FormControl isRequired>
                    <FormLabel>Template</FormLabel>
                    {templates && <Select name="reportTemplateId" value={formValues.reportTemplateId} onChange={onFormValueChange}>
                        {templates.map(template => <option value={template.id}>{template.version_name}</option>)}
                    </Select>}
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" name="name" value={formValues.name} onChange={onFormValueChange}
                        placeholder="eg 1.0, 202103" />
                </FormControl>
                <label>Description</label>
                <input type="text" name="description" value={formValues.description}
                    onChange={onFormValueChange}
                    placeholder="eg Initial version, Draft"
                    required />
            </fieldset>
            <PrimaryButton type="submit" disabled={saveVersionButtonDisabled}>Save version</PrimaryButton>
        </form>

        <ReportsTable reports={reports} updateReports={updateReports} />
    </>
}

export default ReportRevisions;

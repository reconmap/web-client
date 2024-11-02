import NativeButton from "components/form/NativeButton";
import NativeInput from "components/form/NativeInput";
import { actionCompletedToast, errorToast } from "components/ui/toast";
import { useRef, useState } from "react";
import secureApiFetch from "services/api";

const ReportModalDialog = ({ isOpen, onSubmit, onCancel }) => {
    const fileRef = useRef();

    const emptyReportTemplate = {
        version_name: "",
        version_description: null,
        resultFile: null,
    };
    const [reportTemplate, setReportTemplate] = useState(emptyReportTemplate);

    const onCreateReportFormSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append("version_name", reportTemplate.version_name);
        formData.append("version_description", reportTemplate.version_description);
        formData.append("resultFile", fileRef.current.files[0]);

        secureApiFetch(`/reports/templates`, { method: "POST", body: formData })
            .then(() => {
                onSubmit();
                actionCompletedToast(`The report template "${reportTemplate.version_name}" has been added.`);
            })
            .catch((err) => {
                errorToast(err);
            })
            .finally(() => {
                setReportTemplate(emptyReportTemplate);
            });
    };

    const onFormChange = (ev) => {
        setReportTemplate({ ...reportTemplate, [ev.target.name]: ev.target.value });
    };

    return (
        <div size="xl" isOpen={isOpen} onClose={onCancel}>
            <div />
            <div>
                <div>
                    <h4>New report template details</h4>
                </div>
                <div>
                    <form id="reportTemplateForm" onSubmit={onCreateReportFormSubmit}>
                        <div isRequired>
                            <label>Version name</label>
                            <NativeInput type="text" name="version_name" onChange={onFormChange} autoFocus />
                        </div>
                        <div>
                            <label>Version description</label>
                            <NativeInput type="text" name="version_description" onChange={onFormChange} />
                        </div>
                        <div isRequired>
                            <label>File</label>
                            <NativeInput type="file" ref={fileRef} name="resultFile" onChange={onFormChange} />
                        </div>
                    </form>
                </div>

                <div>
                    <NativeButton onClick={onCancel} mr={3}>
                        Cancel
                    </NativeButton>
                    <NativeButton form="reportTemplateForm" type="submit" colorScheme="blue">
                        Save
                    </NativeButton>
                </div>
            </div>
        </div>
    );
};

export default ReportModalDialog;

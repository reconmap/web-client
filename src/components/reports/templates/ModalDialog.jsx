import LabelledField from "components/form/LabelledField";
import NativeButton from "components/form/NativeButton";
import NativeInput from "components/form/NativeInput";
import PrimaryButton from "components/ui/buttons/Primary";
import ModalDialog from "components/ui/ModalDIalog";
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
        <ModalDialog visible={isOpen} onClose={onCancel} title="New report template details">
            <div>
                <div>
                    <form id="reportTemplateForm" onSubmit={onCreateReportFormSubmit}>
                        <div>
                            <LabelledField
                                label="Version name"
                                control={
                                    <NativeInput
                                        type="text"
                                        name="version_name"
                                        onChange={onFormChange}
                                        autoFocus
                                        required
                                    />
                                }
                            />
                        </div>
                        <div>
                            <LabelledField
                                label="Version description"
                                control={<NativeInput type="text" name="version_description" onChange={onFormChange} />}
                            />
                        </div>
                        <div>
                            <LabelledField
                                label="File"
                                control={
                                    <NativeInput
                                        type="file"
                                        ref={fileRef}
                                        name="resultFile"
                                        onChange={onFormChange}
                                        required
                                    />
                                }
                            />
                        </div>
                    </form>
                </div>

                <div>
                    <NativeButton onClick={onCancel}>Cancel</NativeButton>
                    <PrimaryButton form="reportTemplateForm" type="submit">
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </ModalDialog>
    );
};

export default ReportModalDialog;

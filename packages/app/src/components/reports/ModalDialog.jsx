import { useReportsTemplatesQuery } from "api/reports.js";
import HorizontalLabelledField from "components/form/HorizontalLabelledField";
import NativeButton from "components/form/NativeButton";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import PrimaryButton from "components/ui/buttons/Primary.jsx";
import ModalDialog from "components/ui/ModalDIalog";
import { actionCompletedToast, errorToast } from "components/ui/toast";
import TargetIcon from "images/icons/target.svg?react";
import secureApiFetch from "services/api";

const ReportVersionModalDialog = ({ projectId, isOpen, onSubmit, onCancel }) => {
    const defaultFormValues = {
        reportTemplateId: 0,
        name: "",
        description: "",
    };
    const { data: templates } = useReportsTemplatesQuery();

    const beforeCancelCallback = (ev) => {
        ev.target.closest("form").reset();
        onCancel(ev);
    };

    const onFormSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const data = Object.fromEntries(formData.entries());

        secureApiFetch(`/reports`, {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((resp) => {
                if (resp.ok) {
                    onSubmit();
                    actionCompletedToast(`The report version "${data.name}" has been added.`);
                } else {
                    throw new Error(resp.statusText);
                }
            })
            .catch((err) => {
                errorToast(err.message);
                console.error(err);
            })
            .finally(() => {
                setFormValues(defaultFormValues);
            });
    };

    return (
        <ModalDialog
            title={
                <>
                    <TargetIcon style={{ width: "24px" }} /> New report version details
                </>
            }
            visible={isOpen}
            onClose={beforeCancelCallback}
        >
            <div>
                <div>
                    <div></div>
                </div>
                <form id="reportVersionReportForm" onSubmit={onFormSubmit}>
                    <div>
                        <input type="hidden" name="projectId" value={projectId} />
                        {templates && (
                            <HorizontalLabelledField
                                label="Template"
                                control={
                                    <NativeSelect
                                        name="reportTemplateId"
                                        defaultValue={defaultFormValues.reportTemplateId}
                                    >
                                        {templates.map((template) => (
                                            <option key={template.id} value={template.id}>
                                                {template.version_name}
                                            </option>
                                        ))}
                                    </NativeSelect>
                                }
                            />
                        )}

                        <HorizontalLabelledField
                            label="Name"
                            control={
                                <NativeInput
                                    type="text"
                                    name="name"
                                    defaultValue={defaultFormValues.name}
                                    placeholder="eg 1.0, 202103"
                                    autoFocus
                                    required
                                />
                            }
                        />

                        <HorizontalLabelledField
                            label="Description"
                            control={
                                <NativeInput
                                    type="text"
                                    name="description"
                                    defaultValue={defaultFormValues.description}
                                    placeholder="eg Initial version, Draft"
                                    required
                                />
                            }
                        />
                    </div>

                    <div>
                        <NativeButton onClick={beforeCancelCallback}>Cancel</NativeButton>
                        <PrimaryButton form="reportVersionReportForm" type="submit">
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </ModalDialog>
    );
};

export default ReportVersionModalDialog;

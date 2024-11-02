import NativeButton from "components/form/NativeButton";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import { actionCompletedToast, errorToast } from "components/ui/toast";
import useFetch from "hooks/useFetch";
import TargetIcon from "images/icons/target.svg?react";
import { useEffect, useState } from "react";
import secureApiFetch from "services/api";

const ReportVersionModalDialog = ({ projectId, isOpen, onSubmit, onCancel }) => {
    const defaultFormValues = {
        reportTemplateId: 0,
        name: "",
        description: "",
    };
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [templates] = useFetch("/reports/templates");

    const onFormValueChange = (ev) => {
        ev.preventDefault();

        setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    };

    const beforeCancelCallback = (ev) => {
        setFormValues(defaultFormValues);
        onCancel(ev);
    };

    const onFormSubmit = (ev) => {
        ev.preventDefault();

        const params = {
            projectId: projectId,
            reportTemplateId: formValues.reportTemplateId,
            name: formValues.name,
            description: formValues.description,
        };

        secureApiFetch(`/reports`, {
            method: "POST",
            body: JSON.stringify(params),
        })
            .then((resp) => {
                if (resp.ok) {
                    onSubmit();
                    actionCompletedToast(`The report version "${formValues.name}" has been added.`);
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

    useEffect(() => {
        if (templates !== null && templates.length > 0) {
            setFormValues((prev) => ({
                ...prev,
                reportTemplateId: templates[0].id,
            }));
        }
    }, [templates]);

    return (
        <Modal size="xl" isOpen={isOpen} onClose={beforeCancelCallback}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <div>
                        <TargetIcon style={{ width: "24px" }} /> <h4>New report version details</h4>
                    </div>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form id="reportVersionReportForm" onSubmit={onFormSubmit} style={{ marginTop: "20px" }}>
                        <FormControl isRequired>
                            <FormLabel>Template</FormLabel>
                            {templates && (
                                <NativeSelect
                                    name="reportTemplateId"
                                    value={formValues.reportTemplateId}
                                    onChange={onFormValueChange}
                                >
                                    {templates.map((template) => (
                                        <option key={template.id} value={template.id}>
                                            {template.version_name}
                                        </option>
                                    ))}
                                </NativeSelect>
                            )}
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <NativeInput
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={onFormValueChange}
                                placeholder="eg 1.0, 202103"
                                autoFocus
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <NativeInput
                                type="text"
                                name="description"
                                value={formValues.description}
                                onChange={onFormValueChange}
                                placeholder="eg Initial version, Draft"
                            />
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <NativeButton onClick={beforeCancelCallback} mr={3}>
                        Cancel
                    </NativeButton>
                    <NativeButton form="reportVersionReportForm" type="submit" colorScheme="blue">
                        Save
                    </NativeButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ReportVersionModalDialog;

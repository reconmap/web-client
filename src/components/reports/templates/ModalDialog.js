
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { actionCompletedToast, errorToast } from "components/ui/toast";
import { useRef, useState } from "react";
import secureApiFetch from "services/api";

const ReportModalDialog = ({ isOpen, onSubmit, onCancel }) => {
    const fileRef = useRef();

    const emptyReportTemplate = {
        version_name: "",
        version_description: null,
        resultFile: null,
    }
    const [reportTemplate, setReportTemplate] = useState(emptyReportTemplate)

    const onCreateReportFormSubmit = ev => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('version_name', reportTemplate.version_name);
        formData.append('version_description', reportTemplate.version_description);
        formData.append('resultFile', fileRef.current.files[0]);

        secureApiFetch(`/reports/templates`, { method: 'POST', body: formData })
            .then(() => {
                onSubmit();
                actionCompletedToast(`The report template "${reportTemplate.version_name}" has been added.`);
            })
            .catch(err => {
                errorToast(err);
            })
            .finally(() => {
                setReportTemplate(emptyReportTemplate)
            })
    }

    const onFormChange = ev => {
        setReportTemplate({ ...reportTemplate, [ev.target.name]: ev.target.value })
    }

    return <Modal size="xl" isOpen={isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader><h4>New report template details</h4></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <form id="reportTemplateForm" onSubmit={onCreateReportFormSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Version name</FormLabel>
                        <Input type="text" name="version_name" onChange={onFormChange} autoFocus />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Version description</FormLabel>
                        <Input type="text" name="version_description" onChange={onFormChange} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>File</FormLabel>
                        <Input type="file" ref={fileRef} name="resultFile" onChange={onFormChange} />
                    </FormControl>
                </form>
            </ModalBody>

            <ModalFooter>
                <Button onClick={onCancel} mr={3}>Cancel</Button>
                <Button form="reportTemplateForm" type="submit" colorScheme="blue">Save</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

export default ReportModalDialog;

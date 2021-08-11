import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { actionCompletedToast, errorToast } from "components/ui/toast";
import { ReactComponent as TargetIcon } from 'images/icons/target.svg';
import TargetKinds from "models/TargetKinds";
import { useState } from "react";
import secureApiFetch from "services/api";
import TargetForm from "./Form";

const TargetModalDialog = ({ project, isOpen, onSubmit, onCancel }) => {
    const emptyTarget = { projectId: project.id, name: null, kind: TargetKinds[0].value };
    const [target, setTarget] = useState(emptyTarget)

    const onAddTargetFormSubmit = ev => {
        ev.preventDefault();

        secureApiFetch(`/targets`, { method: 'POST', body: JSON.stringify(target) })
            .then(() => {
                onSubmit();
                actionCompletedToast(`The target "${target.name}" has been added.`);
            })
            .catch(err => {
                errorToast(err);
            })
            .finally(() => {
                setTarget(emptyTarget)
            })
    }

    return <Modal size="xl" isOpen={isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader><HStack><TargetIcon style={{ width: '24px' }} /> <h4>New target details</h4></HStack></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <TargetForm newTarget={target} onFormSubmit={onAddTargetFormSubmit} targetSetter={setTarget} />
            </ModalBody>

            <ModalFooter>
                <Button onClick={onCancel} mr={3}>Cancel</Button>
                <Button colorScheme="blue" onClick={onAddTargetFormSubmit}>Save</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

export default TargetModalDialog;

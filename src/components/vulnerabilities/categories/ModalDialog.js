import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { actionCompletedToast } from "components/ui/toast";
import { useState } from "react";
import secureApiFetch from "services/api";
import VulnerabilityCategoryForm from "./Form";

const VulnerabilityCategoryModalDialog = ({ isOpen, onClose, onCancel }) => {
    const emptyCategory = { name: '', description: '' };
    const [newCategory, updateNewCategory] = useState(emptyCategory);

    const onCreateCategoryFormSubmit = ev => {
        if (!document.getElementById('vulnerability_category_form').checkValidity()) {
            return false;
        }

        ev.preventDefault();

        secureApiFetch(`/vulnerabilities/categories`, {
            method: 'POST',
            body: JSON.stringify(newCategory)
        }).then(() => {
            onClose();
            actionCompletedToast(`The vulnerability category has been created.`);
        })
            .finally(() => {
                updateNewCategory(emptyCategory)
            })
    }

    return <Modal size="xl" isOpen={isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>New vulnerability category details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VulnerabilityCategoryForm category={newCategory} onFormSubmit={onCreateCategoryFormSubmit} categorySetter={updateNewCategory} />
            </ModalBody>

            <ModalFooter>
                <Button onClick={onCancel} mr={3}>Cancel</Button>
                <Button type="submit" form="vulnerability_category_form" colorScheme="blue" onClick={onCreateCategoryFormSubmit}>Save</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

export default VulnerabilityCategoryModalDialog;

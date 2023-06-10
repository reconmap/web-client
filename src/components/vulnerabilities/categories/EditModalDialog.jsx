import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { actionCompletedToast } from "components/ui/toast";
import { useState } from "react";
import secureApiFetch from "services/api";
import VulnerabilityCategoryForm from "./Form";

const VulnerabilityCategoryEditModalDialog = ({ category, isOpen, onClose, onCancel }) => {
    const [newCategory, updateNewCategory] = useState(category);

    const onCreateCategoryFormSubmit = ev => {
        if (!document.getElementById('vulnerability_category_form').checkValidity()) {
            return false;
        }

        ev.preventDefault();

        secureApiFetch(`/vulnerabilities/categories/${category.id}`, {
            method: 'PUT',
            body: JSON.stringify(newCategory)
        }).then(() => {
            onClose();
            actionCompletedToast(`The vulnerability category has been updated.`);
        })
            .finally(() => {
            })
    }

    return <Modal size="xl" isOpen={isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Vulnerability category details</ModalHeader>
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

export default VulnerabilityCategoryEditModalDialog;

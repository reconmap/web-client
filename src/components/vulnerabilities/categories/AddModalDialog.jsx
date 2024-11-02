import NativeButton from "components/form/NativeButton";
import { actionCompletedToast } from "components/ui/toast";
import { useState } from "react";
import secureApiFetch from "services/api";
import VulnerabilityCategoryForm from "./Form";

const VulnerabilityCategoryAddModalDialog = ({ isOpen, onClose, onCancel }) => {
    const emptyCategory = { name: "", description: "" };
    const [newCategory, updateNewCategory] = useState(emptyCategory);

    const onCreateCategoryFormSubmit = (ev) => {
        if (!document.getElementById("vulnerability_category_form").checkValidity()) {
            return false;
        }

        ev.preventDefault();

        secureApiFetch(`/vulnerabilities/categories`, {
            method: "POST",
            body: JSON.stringify(newCategory),
        })
            .then(() => {
                onClose();
                actionCompletedToast(`The vulnerability category has been created.`);
            })
            .finally(() => {
                updateNewCategory(emptyCategory);
            });
    };

    return (
        <div size="xl" isOpen={isOpen} onClose={onCancel}>
            <div>
                <div>New vulnerability category details</div>
                <div>
                    <VulnerabilityCategoryForm
                        category={newCategory}
                        onFormSubmit={onCreateCategoryFormSubmit}
                        categorySetter={updateNewCategory}
                    />
                </div>

                <div>
                    <NativeButton onClick={onCancel} mr={3}>
                        Cancel
                    </NativeButton>
                    <NativeButton
                        type="submit"
                        form="vulnerability_category_form"
                        colorScheme="blue"
                        onClick={onCreateCategoryFormSubmit}
                    >
                        Save
                    </NativeButton>
                </div>
            </div>
        </div>
    );
};

export default VulnerabilityCategoryAddModalDialog;

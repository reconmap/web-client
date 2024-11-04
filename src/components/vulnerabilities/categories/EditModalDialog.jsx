import NativeButton from "components/form/NativeButton";
import { actionCompletedToast } from "components/ui/toast";
import { useState } from "react";
import secureApiFetch from "services/api";
import VulnerabilityCategoryForm from "./Form";

const VulnerabilityCategoryEditModalDialog = ({ category, isOpen, onClose, onCancel }) => {
    const [newCategory, updateNewCategory] = useState(category);

    const onCreateCategoryFormSubmit = (ev) => {
        if (!document.getElementById("vulnerability_category_form").checkValidity()) {
            return false;
        }

        ev.preventDefault();

        secureApiFetch(`/vulnerabilities/categories/${category.id}`, {
            method: "PUT",
            body: JSON.stringify(newCategory),
        })
            .then(() => {
                onClose();
                actionCompletedToast(`The vulnerability category has been updated.`);
            })
            .finally(() => {});
    };

    return (
        <div isOpen={isOpen} onClose={onCancel}>
            <div>
                <div>Vulnerability category details</div>
                <div>
                    <VulnerabilityCategoryForm
                        category={newCategory}
                        onFormSubmit={onCreateCategoryFormSubmit}
                        categorySetter={updateNewCategory}
                    />
                </div>

                <div>
                    <NativeButton onClick={onCancel}>Cancel</NativeButton>
                    <NativeButton type="submit" form="vulnerability_category_form" onClick={onCreateCategoryFormSubmit}>
                        Save
                    </NativeButton>
                </div>
            </div>
        </div>
    );
};

export default VulnerabilityCategoryEditModalDialog;

import NativeButton from "components/form/NativeButton";
import { actionCompletedToast, errorToast } from "components/ui/toast";
import TargetIcon from "images/icons/target.svg?react";
import TargetKinds from "models/TargetKinds";
import { useState } from "react";
import secureApiFetch from "services/api";
import TargetForm from "./Form";

const TargetModalDialog = ({ project, isOpen, onSubmit, onCancel }) => {
    const emptyTarget = {
        project_id: project.id,
        name: null,
        kind: TargetKinds[0].value,
    };
    const [target, setTarget] = useState(emptyTarget);

    const onAddTargetFormSubmit = (ev) => {
        ev.preventDefault();

        secureApiFetch(`/targets`, {
            method: "POST",
            body: JSON.stringify(target),
        })
            .then(() => {
                onSubmit();
                actionCompletedToast(`The target "${target.name}" has been added.`);
            })
            .catch((err) => {
                errorToast(err);
            })
            .finally(() => {
                setTarget(emptyTarget);
            });
    };

    return (
        <div size="xl" isOpen={isOpen} onClose={onCancel}>
            <div>
                <div>
                    <div>
                        <TargetIcon style={{ width: "24px" }} /> <h4>New target details</h4>
                    </div>
                </div>
                <div>
                    <TargetForm newTarget={target} onFormSubmit={onAddTargetFormSubmit} targetSetter={setTarget} />
                </div>

                <div>
                    <NativeButton onClick={onCancel} mr={3}>
                        Cancel
                    </NativeButton>
                    <NativeButton colorScheme="blue" onClick={onAddTargetFormSubmit}>
                        Save
                    </NativeButton>
                </div>
            </div>
        </div>
    );
};

export default TargetModalDialog;

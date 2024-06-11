import { Button } from "@chakra-ui/react";
import ModalDialog from "components/ui/ModalDIalog";
import { actionCompletedToast } from "components/ui/toast";
import Note from "models/Note";
import { useState } from "react";
import secureApiFetch from "services/api";
import NotesForm from "./Form";

const NoteModalDialog = ({ parentType, parent, isOpen, onClose, onCancel }) => {
    const emptyNote = {
        ...Note,
        content: "",
        parent_type: parentType,
        parent_id: parent.id,
        visibility: "public",
    };
    const [newNote, updateNewNote] = useState(emptyNote);

    const beforeCancelCallback = (ev) => {
        updateNewNote(emptyNote);
        onCancel(ev);
    };

    const onCreateNoteFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/notes`, {
            method: "POST",
            body: JSON.stringify(newNote),
        })
            .then(() => {
                onClose();
                actionCompletedToast(`The note has been created.`);
            })
            .finally(() => {
                updateNewNote(emptyNote);
            });
    };

    return (
        <ModalDialog
            title="New notes details"
            visible={isOpen}
            onModalClose={beforeCancelCallback}
        >
            <NotesForm
                note={newNote}
                onFormSubmit={onCreateNoteFormSubmit}
                noteSetter={updateNewNote}
            />

            <div style={{ paddingTop: "20px" }}>
                <Button onClick={beforeCancelCallback} mr={3}>
                    Cancel
                </Button>
                <Button colorScheme="blue" onClick={onCreateNoteFormSubmit}>
                    Save
                </Button>
            </div>
        </ModalDialog>
    );
};

export default NoteModalDialog;

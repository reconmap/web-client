import { useDisclosure } from "@chakra-ui/react";
import RestrictedComponent from "components/logic/RestrictedComponent";
import NoteModalDialog from "components/notes/ModalDialog";
import CreateButton from "components/ui/buttons/Create";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import NotesTable from "../notes/Table";
import { IconDocument } from "../ui/Icons";

const VulnerabilitiesNotesTab = ({ vulnerability }) => {
    const [notes, reloadNotes] = useFetch(
        `/notes?parentType=vulnerability&parentId=${vulnerability.id}`,
    );
    const deleteNoteById = useDelete("/notes/", reloadNotes);
    const {
        isOpen: isDialogOpen,
        onOpen: openDialog,
        onClose: closeDialog,
    } = useDisclosure();

    const onDeleteButtonClick = (ev, note) => {
        ev.preventDefault();

        deleteNoteById(note.id);
    };

    const onNoteFormSaved = () => {
        reloadNotes();
        closeDialog();
    };

    return (
        <section>
            <NoteModalDialog
                parentType="vulnerability"
                parent={vulnerability}
                isOpen={isDialogOpen}
                onClose={onNoteFormSaved}
                onCancel={closeDialog}
            />
            <h4>
                <IconDocument />
                Vulnerability notes
                <RestrictedComponent
                    roles={["administrator", "superuser", "user"]}
                >
                    <CreateButton onClick={openDialog}>
                        Add note...
                    </CreateButton>
                </RestrictedComponent>
            </h4>
            <NotesTable
                notes={notes}
                onDeleteButtonClick={onDeleteButtonClick}
            />
        </section>
    );
};

export default VulnerabilitiesNotesTab;

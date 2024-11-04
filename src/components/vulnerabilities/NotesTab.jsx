import NativeButton from "components/form/NativeButton";
import RestrictedComponent from "components/logic/RestrictedComponent";
import NotesForm from "components/notes/Form";
import { actionCompletedToast } from "components/ui/toast";
import Note from "models/Note";
import { useState } from "react";
import secureApiFetch from "services/api";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import NotesTable from "../notes/Table";
import { IconDocument } from "../ui/Icons";

const VulnerabilitiesNotesTab = ({ vulnerability }) => {
    const [notes, reloadNotes] = useFetch(`/notes?parentType=vulnerability&parentId=${vulnerability.id}`);
    const deleteNoteById = useDelete("/notes/", reloadNotes);
    const emptyNote = {
        ...Note,
        content: "",
        parent_type: "vulnerability",
        parent_id: vulnerability.id,
        visibility: "public",
    };
    const [newNote, updateNewNote] = useState(emptyNote);

    const onDeleteButtonClick = (ev, note) => {
        ev.preventDefault();

        deleteNoteById(note.id);
    };

    const onCreateNoteFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/notes`, {
            method: "POST",
            body: JSON.stringify(newNote),
        })
            .then(() => {
                actionCompletedToast(`The note has been created.`);
                reloadNotes();
            })
            .finally(() => {
                updateNewNote({ ...emptyNote, content: "" });
            });
    };

    return (
        <section>
            <h4>
                <IconDocument />
                Vulnerability comments
            </h4>

            <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                <NotesForm note={newNote} onFormSubmit={onCreateNoteFormSubmit} noteSetter={updateNewNote} />
            </RestrictedComponent>

            <div style={{ paddingTop: "20px" }}>
                <NativeButton onClick={onCreateNoteFormSubmit}>Save</NativeButton>
            </div>

            <NotesTable notes={notes} onDeleteButtonClick={onDeleteButtonClick} />
        </section>
    );
};

export default VulnerabilitiesNotesTab;

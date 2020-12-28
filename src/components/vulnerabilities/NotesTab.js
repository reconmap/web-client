import React, {useState} from 'react'
import {IconDocument} from '../ui/Icons'
import useFetch from "../../hooks/useFetch";
import Loading from "../ui/Loading";
import useDelete from "../../hooks/useDelete";
import secureApiFetch from "../../services/api";
import {actionCompletedToast} from "../ui/toast";
import NotesForm from "../notes/Form";
import NotesTable from "../notes/Table";

const VulnerabilitiesNotesTab = ({vulnerability}) => {
    const [notes, reloadNotes] = useFetch(`/notes?parentType=vulnerability&parentId=${vulnerability.id}`)
    const deleteNoteById = useDelete('/notes/', reloadNotes)
    const emptyNote = {visibility: 'private', content: '', parentType: 'vulnerability', parentId: vulnerability.id};
    const [newNote, updateNewNote] = useState(emptyNote)

    const onDeleteButtonClick = (ev, note) => {
        ev.preventDefault();

        deleteNoteById(note.id);
    }

    const onCreateNoteFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/notes`, {
            method: 'POST',
            body: JSON.stringify(newNote)
        }).then(() => {
            reloadNotes();
            actionCompletedToast(`The note has been created."`);
        })
            .finally(() => {
                updateNewNote(emptyNote)
            })
    }

    if (!notes) {
        return <Loading/>
    }

    return (
        <section>
            <h4>
                <IconDocument/>New vulnerability note
            </h4>
            <NotesForm note={newNote} onFormSubmit={onCreateNoteFormSubmit} noteSetter={updateNewNote}/>
            <h4>
                <IconDocument/>Vulnerability notes
            </h4>
            <NotesTable notes={notes} onDeleteButtonClick={onDeleteButtonClick}/>
        </section>
    )
}

export default VulnerabilitiesNotesTab;

import React, {useState} from 'react'
import {IconDocument} from '../ui/Icons'
import useFetch from "../../hooks/useFetch";
import DeleteButton from "../ui/buttons/Delete";
import Loading from "../ui/Loading";
import useDelete from "../../hooks/useDelete";
import NoResults from "../ui/NoResults";
import secureApiFetch from "../../services/api";
import {actionCompletedToast} from "../ui/toast";
import PrimaryButton from "../ui/buttons/Primary";

const ProjectNotesTab = ({project}) => {
    const [notes, reloadNotes] = useFetch(`/notes?projectId=${project.id}`)
    const deleteNoteById = useDelete('/notes/', reloadNotes)
    const emptyNote = {visibility: 'private', content: '', parentType: 'project', parentId: project.id};
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

    const onFormInputChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        updateNewNote({
            ...newNote, [name]: value
        });
    };


    if (!notes) {
        return <Loading/>
    }

    return (
        <section>
            <h4>
                <IconDocument/>New project note
            </h4>
            <form onSubmit={onCreateNoteFormSubmit}>
                <label>Visibility</label>
                <select name="visibility" required value={newNote.visibility} onChange={onFormInputChange}>
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </select><br/>
                <label>Content</label>
                <textarea name="content" style={{width: '100%'}} required value={newNote.content}
                          onChange={onFormInputChange}/><br/>
                <PrimaryButton type="submit">Create</PrimaryButton>
            </form>
            <h4>
                <IconDocument/>Project notes
            </h4>
            <table>
                <thead>
                <tr>
                    <th style={{width: '200px'}}>Creation time</th>
                    <th style={{width: '140px'}}>Author</th>
                    <th style={{width: '140px'}}>Visibility</th>
                    <th>Content</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {notes.length === 0 && <tr>
                    <td colSpan="5"><NoResults/></td>
                </tr>}
                {notes.map((note, index) =>
                    <tr>
                        <td>{note.insert_ts}</td>
                        <td>{note.user_name}</td>
                        <td>{note.visibility}</td>
                        <td>{note.content}</td>
                        <td><DeleteButton onClick={(ev) => onDeleteButtonClick(ev, note)}/></td>
                    </tr>
                )}
                </tbody>
            </table>
        </section>
    )
}

export default ProjectNotesTab;

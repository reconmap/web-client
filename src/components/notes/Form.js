import PrimaryButton from "../ui/buttons/Primary";
import React from "react";

const NotesForm = ({note, onFormSubmit, noteSetter: setNote}) => {
    const onFormInputChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        setNote({
            ...note, [name]: value
        });
    };

    return <form onSubmit={onFormSubmit}>
        <label>Visibility</label>
        <select name="visibility" required value={note.visibility} onChange={onFormInputChange}>
            <option value="private">Private</option>
            <option value="public">Public</option>
        </select><br/>
        <label>Content</label>
        <textarea name="content" style={{width: '100%'}} required value={note.content}
                  onChange={onFormInputChange}/><br/>
        <PrimaryButton type="submit">Create</PrimaryButton>
    </form>
}

export default NotesForm;

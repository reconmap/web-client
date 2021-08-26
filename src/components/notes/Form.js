import { Select, Textarea } from "@chakra-ui/react";

const NotesForm = ({ note, onFormSubmit, noteSetter: setNote }) => {
    const onFormInputChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        setNote({ ...note, [name]: value });
    };

    return <form onSubmit={onFormSubmit}>
        <label>Content</label>
        <Textarea name="content" style={{ width: '100%' }} required value={note.content}
            onChange={onFormInputChange} autoFocus /><br />
        <label>Visibility</label>
        <Select name="visibility" required value={note.visibility} onChange={onFormInputChange}>
            <option value="private">Private</option>
            <option value="public">Public</option>
        </Select>
    </form>
}

export default NotesForm;

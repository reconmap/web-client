import { FormControl, FormLabel, Select, Textarea } from "@chakra-ui/react";

const NotesForm = ({ note, onFormSubmit, noteSetter: setNote }) => {
    const onFormInputChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        setNote({ ...note, [name]: value });
    };

    return <form onSubmit={onFormSubmit}>
        <FormControl id="content" isRequired>
            <FormLabel>Content</FormLabel>
            <Textarea name="content" style={{ width: '100%' }} value={note.content}
                onChange={onFormInputChange} autoFocus /><br />
        </FormControl>
        <FormControl id="visibility" isRequired>
            <FormLabel>Visibility</FormLabel>
            <Select name="visibility" value={note.visibility} onChange={onFormInputChange}>
                <option value="private">Private</option>
                <option value="public">Public</option>
            </Select>
        </FormControl>
    </form>
}

export default NotesForm;

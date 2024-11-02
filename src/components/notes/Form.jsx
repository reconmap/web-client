import NativeSelect from "components/form/NativeSelect";
import NativeTextArea from "components/form/NativeTextArea";

const NotesForm = ({ note, onFormSubmit, noteSetter: setNote }) => {
    const onFormInputChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        setNote({ ...note, [name]: value });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div id="content" isRequired>
                <label>Content</label>
                <NativeTextArea
                    name="content"
                    style={{ width: "100%" }}
                    onChange={onFormInputChange}
                    value={note.content}
                    required
                    autoFocus
                ></NativeTextArea>
                <br />
            </div>
            <div id="visibility" isRequired>
                <label>Visibility</label>
                <NativeSelect name="visibility" value={note.visibility} onChange={onFormInputChange}>
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </NativeSelect>
            </div>
        </form>
    );
};

export default NotesForm;

import NativeInput from "components/form/NativeInput";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import PrimaryButton from "../ui/buttons/Primary";

const CommandForm = ({ isEditForm = false, onFormSubmit, command, commandSetter: setCommand }) => {
    const onFormChange = (ev) => {
        const target = ev.target;
        let name = target.name;
        let value = target.value;
        if ("tags" === name) {
            value = JSON.stringify(value.split(","));
        }
        setCommand({ ...command, [name]: value });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <fieldset>
                <legend>Basic information</legend>
                <label>
                    Name
                    <NativeInput
                        type="text"
                        name="name"
                        onChange={onFormChange}
                        value={command.name || ""}
                        required
                        autoFocus
                    />
                </label>
                <label>
                    Description
                    <MarkdownEditor
                        name="description"
                        onChange={onFormChange}
                        value={command.description || ""}
                        required
                    />
                </label>
                <label>
                    Tags
                    <NativeInput
                        type="text"
                        name="tags"
                        onChange={onFormChange}
                        value={command.tags ? JSON.parse(command.tags).join(",") : ""}
                    />
                </label>
                <label>
                    More information URL
                    <NativeInput
                        type="url"
                        name="more_info_url"
                        onChange={onFormChange}
                        value={command.more_info_url || ""}
                    />
                </label>
            </fieldset>

            <PrimaryButton type="submit">{isEditForm ? "Save" : "Add"}</PrimaryButton>
        </form>
    );
};

export default CommandForm;

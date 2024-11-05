import LabelledField from "components/form/LabelledField";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import PrimaryButton from "../ui/buttons/Primary";

const DocumentForm = ({ document, onFormSubmit, documentSetter: setNote, isEditForm = false }) => {
    const onFormInputChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        setNote({
            ...document,
            [name]: value,
        });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <NativeInput
                    type="text"
                    name="title"
                    id="title"
                    value={document.title || ""}
                    onChange={onFormInputChange}
                    autoFocus
                />
            </div>

            <div>
                <label htmlFor="content">Content (markdown supported)</label>
                <MarkdownEditor
                    name="content"
                    style={{ width: "100%" }}
                    required
                    value={document.content || ""}
                    onChange={onFormInputChange}
                />
                <br />
            </div>

            <LabelledField
                label="Visibility"
                htmlFor="visibility"
                control={
                    <NativeSelect
                        name="visibility"
                        id="visibility"
                        value={document.visibility}
                        onChange={onFormInputChange}
                        required
                    >
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </NativeSelect>
                }
            />

            <PrimaryButton type="submit">{isEditForm ? "Update" : "Create"}</PrimaryButton>
        </form>
    );
};

export default DocumentForm;

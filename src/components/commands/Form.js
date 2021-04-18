import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import React from "react";
import PrimaryButton from "../ui/buttons/Primary";

const CommandForm = ({ isEditForm = false, onFormSubmit, command, commandSetter: setCommand }) => {
    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setCommand({ ...command, [name]: value });
    };

    return <form onSubmit={onFormSubmit}>
        <label>Short name
            <input type="text" name="short_name" onChange={onFormChange} value={command.short_name} required autoFocus /></label>
        <label>Description
            <MarkdownEditor name="description" onChange={onFormChange} value={command.description} required />
        </label>
        <label>Type
            <select name="executable_type" onChange={onFormChange} value={command.executable_type} required>
                <option value="custom">Custom</option>
                <option value="rmap">Reconmap (rmap)</option>
            </select>
        </label>
        {command.executable_type === 'custom' && <>
            <label>Executable path
            <input type="text" name="executable_path" onChange={onFormChange} value={command.executable_path} /></label>
        </>
        }
        <label>Command line arguments
            <input type="text" name="arguments" onChange={onFormChange} value={command.arguments} /></label>
        {command.executable_type === 'rmap' && <>
            <label>Docker image
            <input type="text" name="docker_image" onChange={onFormChange} value={command.docker_image} /></label>

            <label>Output filename
            <input type="text" name="output_filename" onChange={onFormChange} value={command.output_filename} />
            </label>
        </>}

        <PrimaryButton type="submit">{isEditForm ? "Save" : "Add"}</PrimaryButton>
    </form>
}

export default CommandForm;

import PrimaryButton from "../ui/buttons/Primary";
import React from "react";

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
            <textarea name="description" onChange={onFormChange} value={command.description} required />
        </label>
        <label>Docker image
            <input type="text" name="docker_image" onChange={onFormChange} value={command.docker_image}
                required /></label>
        <label>Container arguments
            <input type="text" name="container_args" onChange={onFormChange} value={command.container_args}
                required /></label>
        <label>JSON configuration
            <textarea name="configuration" onChange={onFormChange} value={command.configuration} required />
        </label>

        <PrimaryButton type="submit">{isEditForm ? "Save" : "Add"}</PrimaryButton>
    </form>
}

export default CommandForm;

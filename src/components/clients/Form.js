import React from "react";
import PrimaryButton from "../ui/buttons/Primary";

const ClientForm = ({ isEditForm = false, onFormSubmit, client, clientSetter: setClient }) => {
    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setClient({ ...client, [name]: value });
    };

    return <form onSubmit={onFormSubmit}>
        <label>Name
            <input type="text" name="name" onChange={onFormChange} value={client.name || ""} required autoFocus /></label>
        <label>URL
            <input type="text" name="url" onChange={onFormChange} value={client.url || ""} />
        </label>
        <label>Contact name
            <input type="text" name="contact_name" onChange={onFormChange} value={client.contact_name || ""}
                required /></label>
        <label>Contact email
            <input type="email" name="contact_email" onChange={onFormChange} value={client.contact_email || ""}
                required /></label>
        <label>Contact phone
            <input type="tel" name="contact_phone" onChange={onFormChange} value={client.contact_phone || ""} />
        </label>

        <PrimaryButton type="submit">{isEditForm ? "Save" : "Add"}</PrimaryButton>
    </form>
}

export default ClientForm;

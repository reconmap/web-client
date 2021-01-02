import PrimaryButton from "../ui/buttons/Primary";
import React from "react";

const ClientForm = ({onFormSubmit, client, clientSetter: setClient}) => {
    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setClient({...client, [name]: value});
    };

    return <form onSubmit={onFormSubmit}>
        <label>Name
            <input type="text" name="name" onChange={onFormChange} required autoFocus/></label>
        <label>URL
            <input type="text" name="url" onChange={onFormChange}/></label>
        <label>Contact name
            <input type="text" name="contactName" onChange={onFormChange} required/></label>
        <label>Contact email
            <input type="email" name="contactEmail" onChange={onFormChange} required/></label>
        <label>Contact phone
            <input type="text" name="contactPhone" onChange={onFormChange}/></label>

        <PrimaryButton type="submit">Create</PrimaryButton>
    </form>
}

export default ClientForm;

import { Input, Select } from "@chakra-ui/react";
import PrimaryButton from "../ui/buttons/Primary";

const ClientForm = ({ isEditForm = false, onFormSubmit, client, clientSetter: setClient }) => {
    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setClient({ ...client, [name]: value });
    };

    return <form onSubmit={onFormSubmit} className="crud">
        <fieldset>
            <legend>Company information</legend>
            <label>Name
                <Input type="text" name="name" onChange={onFormChange} value={client.name || ""} required autoFocus /></label>
            <label>Address
                <Input type="text" name="address" onChange={onFormChange} value={client.address || ""} /></label>
            <label>URL
                <Input type="text" name="url" onChange={onFormChange} value={client.url || ""} />
            </label>
        </fieldset>
        <fieldset>
            <legend>Contact details</legend>
            <label>Contact kind
                <Select name="contact_kind" onChange={onFormChange} value={client.contact_kind || ""}>
                    <option value="general">General</option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                </Select>
            </label>
            <label>Contact name
                <Input type="text" name="contact_name" onChange={onFormChange} value={client.contact_name || ""}
                    required /></label>
            <label>Contact role
                <Input type="text" name="contact_role" onChange={onFormChange} value={client.contact_role || ""}
                /></label>
            <label>Contact email
                <Input type="email" name="contact_email" onChange={onFormChange} value={client.contact_email || ""}
                    required /></label>
            <label>Contact phone
                <Input type="tel" name="contact_phone" onChange={onFormChange} value={client.contact_phone || ""} />
            </label>
        </fieldset>

        <PrimaryButton type="submit">{isEditForm ? "Save" : "Add"}</PrimaryButton>
    </form>
}

export default ClientForm;

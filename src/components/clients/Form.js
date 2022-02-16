import PrimaryButton from "../ui/buttons/Primary";

const ClientForm = ({ isEditForm = false, onFormSubmit, client, clientSetter: setClient }) => {
    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setClient({ ...client, [name]: value });
    };

    const onImageSelect = (image, name) => {
        if(!image) {
            return;
          }
      
        fileToDataUri(image)
            .then(dataUri => {
                setClient({ ...client, [name]: dataUri });
        });
    }

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    });

    return <form onSubmit={onFormSubmit} className="crud">
        <fieldset>
            <legend>Company information</legend>
            <label>Name
                <input type="text" name="name" onChange={onFormChange} value={client.name || ""} required autoFocus /></label>
            <label>Address
                <input type="text" name="address" onChange={onFormChange} value={client.address || ""} /></label>
            <label>URL
                <input type="text" name="url" onChange={onFormChange} value={client.url || ""} />
            </label>
            <label>Logo
                <img src={client.logo || null} />
            </label>
            <label>Update logo
                <input type="file" name="logo" onChange={(event) => onImageSelect(event.target.files[0] || null, "logo")}/>
            </label>
            <label>Small logo
                <img src={client.small_logo || null} />
            </label>
            <label>Update small logo
                <input type="file" name="small_logo" onChange={(event) => onImageSelect(event.target.files[0] || null, "small_logo")}/>
            </label>
        </fieldset>
        <fieldset>
            <legend>Contact details</legend>
            <label>Contact name
                <input type="text" name="contact_name" onChange={onFormChange} value={client.contact_name || ""}
                    required /></label>
            <label>Contact email
                <input type="email" name="contact_email" onChange={onFormChange} value={client.contact_email || ""}
                    required /></label>
            <label>Contact phone
                <input type="tel" name="contact_phone" onChange={onFormChange} value={client.contact_phone || ""} />
            </label>
        </fieldset>

        <PrimaryButton type="submit">{isEditForm ? "Save" : "Add"}</PrimaryButton>
    </form>
}

export default ClientForm;

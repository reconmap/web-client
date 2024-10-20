import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import useDelete from "hooks/useDelete";
import useFetch from "hooks/useFetch";
import secureApiFetch from "services/api";

const CustomFieldsPage = () => {
    const [customFields, refetchCustomFields] = useFetch("/system/custom-fields");

    const deleteCustomFieldById = useDelete("/system/custom-fields/", refetchCustomFields);

    const onDeleteCustomFieldClick = (ev, field) => {
        ev.preventDefault();

        deleteCustomFieldById(field.id);
    };

    const onAddCustomFieldSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const data = Object.fromEntries(formData.entries());
        secureApiFetch(`/system/custom-fields`, {
            method: "POST",
            body: JSON.stringify(data),
        }).then((resp) => {
            if (resp.status === 201) {
                refetchCustomFields();
            }
        });

        return false;
    };

    return (
        <>
            <h2>Custom fields</h2>

            <form onSubmit={onAddCustomFieldSubmit}>
                <input type="hidden" name="config" value="{}" />
                <label>Name</label>
                <input type="text" name="name" />
                <label>Kind</label>
                <select name="kind">
                    <option value="text">Text</option>
                    <option value="integer">Integer</option>
                    <option value="decimal">Decimal</option>
                </select>
                <label>Label</label>
                <input type="text" name="label" />
                <label>Parent type</label>
                <select name="parent_type">
                    <option value="vulnerability">Vulnerability</option>
                </select>
                <hr />
                <button type="submit">Add</button>
            </form>

            <table>
                <tbody>
                    {customFields &&
                        customFields.map((field) => (
                            <tr>
                                <td>{field.name}</td>
                                <td>{field.kind}</td>
                                <td>{field.label}</td>
                                <td>{field.parent_type}</td>
                                <td>
                                    <DeleteIconButton onClick={(ev) => onDeleteCustomFieldClick(ev, field)} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default CustomFieldsPage;

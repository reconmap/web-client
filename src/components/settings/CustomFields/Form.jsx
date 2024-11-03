import HorizontalLabelledField from "components/form/HorizontalLabelledField";
import NativeButton from "components/form/NativeButton.js";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
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

                <HorizontalLabelledField label="Name" control={<NativeInput type="text" name="name" />} />

                <HorizontalLabelledField
                    label="Kind"
                    control={
                        <NativeSelect name="kind">
                            <option value="text">Text</option>
                            <option value="integer">Integer</option>
                            <option value="decimal">Decimal</option>
                        </NativeSelect>
                    }
                />

                <HorizontalLabelledField label="Label" control={<NativeInput type="text" name="label" />} />

                <HorizontalLabelledField
                    label="Parent type"
                    control={
                        <NativeSelect name="parent_type">
                            <option value="vulnerability">Vulnerability</option>
                        </NativeSelect>
                    }
                />

                <hr />
                <HorizontalLabelledField control={<NativeButton type="submit">Add</NativeButton>} />
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Kind</th>
                        <th>Label</th>
                        <th>Parent type</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
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

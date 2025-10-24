import {
    useSystemCustomFieldDeletionMutation,
    useSystemCustomFieldPostMutation,
    useSystemCustomFieldsQuery,
} from "api/system.js";
import HorizontalLabelledField from "components/form/HorizontalLabelledField";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import PrimaryButton from "components/ui/buttons/Primary";
import Title from "components/ui/Title";

const CustomFieldsPage = () => {
    const { data: customFields } = useSystemCustomFieldsQuery();

    const customFieldDeletionMutation = useSystemCustomFieldDeletionMutation();
    const customFieldPostMutation = useSystemCustomFieldPostMutation();

    const onDeleteCustomFieldClick = (ev, field) => {
        ev.preventDefault();

        customFieldDeletionMutation.mutate(field.id);
    };

    const onAddCustomFieldSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const data = Object.fromEntries(formData.entries());

        customFieldPostMutation.mutate(data);

        ev.target.reset();

        return false;
    };

    return (
        <>
            <Title type="System" title="Custom fields" documentTitle="single" />

            <form onSubmit={onAddCustomFieldSubmit}>
                <input type="hidden" name="config" value="{}" />

                <HorizontalLabelledField label="Name" control={<NativeInput type="text" name="name" required />} />

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

                <HorizontalLabelledField label="Label" control={<NativeInput type="text" name="label" required />} />

                <HorizontalLabelledField
                    label="Parent type"
                    control={
                        <NativeSelect name="parent_type">
                            <option value="vulnerability">Vulnerability</option>
                        </NativeSelect>
                    }
                />

                <hr />
                <HorizontalLabelledField control={<PrimaryButton type="submit">Add</PrimaryButton>} />
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
                            <tr key={field.id}>
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

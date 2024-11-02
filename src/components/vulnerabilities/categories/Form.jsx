import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import useFetch from "hooks/useFetch";

const VulnerabilityCategoryForm = ({ category, onFormSubmit, categorySetter: setCategory }) => {
    const [categories] = useFetch("/vulnerabilities/categories?parentsOnly=true");

    const onFormInputChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        const value = target.value === "" ? null : target.value;

        setCategory({ ...category, [name]: value });
    };

    return (
        <form id="vulnerability_category_form" onSubmit={onFormSubmit}>
            <div id="parent_id" isRequired>
                <label>Parent category</label>
                {categories && (
                    <NativeSelect name="parent_id" value={category.parent_id} onChange={onFormInputChange}>
                        <option>(none)</option>
                        {categories
                            .filter((category) => category.parent_id === null)
                            .map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </NativeSelect>
                )}
            </div>
            <div id="name" isRequired>
                <label>Name</label>
                <NativeInput name="name" autoFocus value={category.name} onChange={onFormInputChange} />
            </div>
            <div id="description">
                <label>Description</label>
                <NativeInput name="description" value={category.description} onChange={onFormInputChange} />
            </div>
        </form>
    );
};

export default VulnerabilityCategoryForm;

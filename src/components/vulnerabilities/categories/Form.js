import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import useFetch from "hooks/useFetch";

const VulnerabilityCategoryForm = ({ category, onFormSubmit, categorySetter: setCategory }) => {
    const [categories] = useFetch('/vulnerabilities/categories?parentsOnly=true');

    const onFormInputChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value === "" ? null : target.value;

        setCategory({ ...category, [name]: value });
    };

    return <form id="vulnerability_category_form" onSubmit={onFormSubmit}>
        <FormControl id="parent_id" isRequired>
            <FormLabel>Parent category</FormLabel>
            {categories && <Select name="parent_id" value={category.parent_id} onChange={onFormInputChange}>
                <option>(none)</option>
                {categories.filter(category => category.parent_id === null).map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>}
        </FormControl>
        <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" autoFocus value={category.name} onChange={onFormInputChange} />
        </FormControl>
        <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input name="description" value={category.description} onChange={onFormInputChange} />
        </FormControl>
    </form>
}

export default VulnerabilityCategoryForm;

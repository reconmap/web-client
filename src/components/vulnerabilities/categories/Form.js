import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const VulnerabilityCategoryForm = ({ category, onFormSubmit, categorySetter: setCategory }) => {
    const onFormInputChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        setCategory({ ...category, [name]: value });
    };

    return <form id="vulnerability_category_form" onSubmit={onFormSubmit}>
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

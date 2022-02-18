import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import React from "react";
import PrimaryButton from "../ui/buttons/Primary";

const DocumentForm = ({ document, onFormSubmit, documentSetter: setNote, isEditForm = false }) => {
    const onFormInputChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        setNote({
            ...document, [name]: value
        });
    };

    return <form onSubmit={onFormSubmit}>
        <FormControl isRequired>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input type="text" name="title" id="title" value={document.title || ""} onChange={onFormInputChange} autoFocus />
        </FormControl>

        <FormControl isRequired>
            <FormLabel htmlFor="content">Content (markdown supported)</FormLabel>
            <MarkdownEditor name="content" style={{ width: '100%' }} required value={document.content || ""}
                onChange={onFormInputChange} /><br />
        </FormControl>

        <FormControl>
            <FormLabel htmlFor="visibility">Visibility</FormLabel>
            <Select name="visibility" id="visibility" value={document.visibility} onChange={onFormInputChange} required>
                <option value="private">Private</option>
                <option value="public">Public</option>
            </Select>
        </FormControl>

        <PrimaryButton type="submit">{isEditForm ? "Update" : "Create"}</PrimaryButton>
    </form>
}

export default DocumentForm;

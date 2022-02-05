import { Select } from "@chakra-ui/react";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import PrimaryButton from "../ui/buttons/Primary";

const CommandForm = ({ isEditForm = false, onFormSubmit, command, commandSetter: setCommand }) => {
    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        let value = target.value;
        if ('tags' === name) {
            value = JSON.stringify(value.split(','));
        }
        setCommand({ ...command, [name]: value });
    };

    const [parsers] = useFetch('/commands/output-parsers');

    if (!parsers) return <Loading />

    return <form onSubmit={onFormSubmit} className="crud">
        <fieldset>
            <legend>Basic information</legend>
            <label>Name
                <input type="text" name="name" onChange={onFormChange} value={command.name || ""} required autoFocus /></label>
            <label>Description
                <MarkdownEditor name="description" onChange={onFormChange} value={command.description || ""} required />
            </label>
            <label>Tags
                <input type="text" name="tags" onChange={onFormChange} value={command.tags ? JSON.parse(command.tags).join(',') : ''} /></label>
            <label>More information URL
                <input type="url" name="more_info_url" onChange={onFormChange} value={command.more_info_url || ""} /></label>
        </fieldset>
        <fieldset>
            <legend>Automation details</legend>

            <label>Command line arguments
                <input type="text" name="arguments" onChange={onFormChange} value={command.arguments || ""} /></label>

            <label>Output filename
                <input type="text" name="output_filename" onChange={onFormChange} value={command.output_filename || ""} />
            </label>

            <label>Output parser
                <Select name="output_parser" onChange={onFormChange} value={command.output_parser || ""}>
                    <option value="">(none)</option>
                    {parsers.map(parser => <option key={`parser_${parser.code}`} value={parser.code}>{parser.name}</option>)}
                </Select>
            </label>
        </fieldset>

        <label>Execution environment
            <Select name="executable_type" onChange={onFormChange} value={command.executable_type} required>
                <option value="custom">Host</option>
                <option value="rmap">Container</option>
            </Select>
        </label>
        {command.executable_type === 'custom' && <>
            <label>Executable path
                <input type="text" name="executable_path" onChange={onFormChange} value={command.executable_path || ""} /></label>
        </>
        }
        {command.executable_type === 'rmap' && <>
            <label>Docker image
                <input type="text" name="docker_image" onChange={onFormChange} value={command.docker_image || ""} /></label>
        </>}

        <PrimaryButton type="submit">{isEditForm ? "Save" : "Add"}</PrimaryButton>
    </form>
}

export default CommandForm;

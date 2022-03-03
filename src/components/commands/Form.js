import { Input, Select } from "@chakra-ui/react";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import PrimaryButton from "../ui/buttons/Primary";

const CommandForm = ({ isEditForm = false, onFormSubmit, command, commandSetter: setCommand }) => {
    const onFormChange = ev => {
        const target = ev.target;
        let name = target.name;
        let value = target.value;
        if ('tags' === name) {
            value = JSON.stringify(value.split(','));
        }
        if ('output_capture' === name) {
            const outputFileName = value === 'disabled' ? null :
                value === 'stdout' ? '{{{STDOUT}}}' :
                    "";

            setCommand({ ...command, [name]: value, output_filename: outputFileName });
        } else {
            setCommand({ ...command, [name]: value });
        }
    };

    const [parsers] = useFetch('/commands/output-parsers');

    if (!parsers) return <Loading />

    return <form onSubmit={onFormSubmit} className="crud">
        <fieldset>
            <legend>Basic information</legend>
            <label>Name
                <Input type="text" name="name" onChange={onFormChange} value={command.name || ""} required autoFocus /></label>
            <label>Description
                <MarkdownEditor name="description" onChange={onFormChange} value={command.description || ""} required />
            </label>
            <label>Tags
                <Input type="text" name="tags" onChange={onFormChange} value={command.tags ? JSON.parse(command.tags).join(',') : ''} /></label>
            <label>More information URL
                <Input type="url" name="more_info_url" onChange={onFormChange} value={command.more_info_url || ""} /></label>
        </fieldset>

        <fieldset>
            <legend>Automation details</legend>

            <label>Execution environment
                <Select name="executable_type" onChange={onFormChange} value={command.executable_type} required>
                    <option value="custom">Host</option>
                    <option value="rmap">Container</option>
                </Select>
            </label>
            {command.executable_type === 'custom' && <>
                <label>Executable path
                    <Input type="text" name="executable_path" onChange={onFormChange} value={command.executable_path || ""} /></label>
            </>
            }
            {command.executable_type === 'rmap' && <>
                <label>Docker image
                    <Input type="text" name="docker_image" onChange={onFormChange} value={command.docker_image || ""} /></label>
            </>}

            <label>Command line arguments
                <Input type="text" name="arguments" onChange={onFormChange} value={command.arguments || ""} /></label>

            <label>Output capture
                <Select name="output_capture" onChange={onFormChange} value={command.output_capture || "disabled"} required>
                    <option value="disabled">Disabled</option>
                    <option value="stdout">Standard output</option>
                    <option value="path">File path</option>
                </Select>
            </label>

            {command.output_capture === 'path' && <label>Output filename
                <Input type="text" name="output_filename" onChange={onFormChange} value={command.output_filename || ""} />
            </label>}

            {command.output_capture !== 'disabled' && <label>Output parser
                <Select name="output_parser" onChange={onFormChange} value={command.output_parser || ""}>
                    <option value="">(none)</option>
                    {parsers.map(parser => <option key={`parser_${parser.code}`} value={parser.code}>{parser.name}</option>)}
                </Select>
            </label>}
        </fieldset>

        <PrimaryButton type="submit">{isEditForm ? "Save" : "Add"}</PrimaryButton>
    </form>
}

export default CommandForm;

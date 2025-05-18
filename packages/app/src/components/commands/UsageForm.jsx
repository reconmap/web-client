import HorizontalLabelledField from "components/form/HorizontalLabelledField.js";
import LabelledField from "components/form/LabelledField";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import useFetch from "hooks/useFetch";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../ui/buttons/Primary";

const CommandUsageForm = ({ isEditForm = false, onFormSubmit, command, commandSetter: setCommand }) => {
    const [t] = useTranslation();

    const onFormChange = (ev) => {
        const target = ev.target;
        let name = target.name;
        let value = target.value;
        if ("tags" === name) {
            value = JSON.stringify(value.split(","));
        }
        if ("output_capture" === name) {
            const outputFileName = value === "disabled" ? null : value === "stdout" ? "{{{STDOUT}}}" : "";

            setCommand({
                ...command,
                [name]: value,
                output_filename: outputFileName,
            });
        } else {
            setCommand({ ...command, [name]: value });
        }
    };

    const [parsers] = useFetch("/commands/output-parsers");

    return (
        <form onSubmit={onFormSubmit}>
            <fieldset>
                <legend>Basic information</legend>
                <label>
                    Name
                    <NativeInput
                        type="text"
                        name="name"
                        onChange={onFormChange}
                        value={command.name || ""}
                        required
                        autoFocus
                    />
                </label>
                <label>
                    Description
                    <MarkdownEditor
                        name="description"
                        onChange={onFormChange}
                        value={command.description || ""}
                        required
                    />
                </label>
                <label>
                    Tags
                    <NativeInput
                        type="text"
                        name="tags"
                        onChange={onFormChange}
                        value={command.tags ? JSON.parse(command.tags).join(",") : ""}
                    />
                </label>
                <label>
                    More information URL
                    <NativeInput
                        type="url"
                        name="more_info_url"
                        onChange={onFormChange}
                        value={command.more_info_url || ""}
                    />
                </label>
            </fieldset>

            <fieldset>
                <legend>Automation details</legend>

                <label>
                    Executable path
                    <NativeInput
                        type="text"
                        name="executable_path"
                        onChange={onFormChange}
                        value={command.executable_path || ""}
                    />
                </label>

                <LabelledField
                    label={t("Command line arguments")}
                    control={
                        <NativeInput
                            type="text"
                            name="arguments"
                            onChange={onFormChange}
                            value={command.arguments || ""}
                        />
                    }
                />

                <HorizontalLabelledField
                    label="Output capture"
                    htmlFor="outputCapture"
                    control={
                        <NativeSelect
                            id="outputCapture"
                            name="output_capture"
                            onChange={onFormChange}
                            value={command.output_capture || "disabled"}
                            required
                        >
                            <option value="disabled">Disabled</option>
                            <option value="stdout">Standard output</option>
                            <option value="path">File path</option>
                        </NativeSelect>
                    }
                />

                {command.output_capture === "path" && (
                    <label>
                        Output filename
                        <NativeInput
                            type="text"
                            name="output_filename"
                            onChange={onFormChange}
                            value={command.output_filename || ""}
                        />
                    </label>
                )}

                {command.output_capture !== "disabled" && (
                    <HorizontalLabelledField
                        label="Output parser"
                        htmlFor="outputParser"
                        control={
                            <NativeSelect
                                id="outputParser"
                                name="output_parser"
                                onChange={onFormChange}
                                value={command.output_parser || ""}
                            >
                                <option value="">(none)</option>
                                {parsers &&
                                    parsers.map((parser) => (
                                        <option key={`parser_${parser.code}`} value={parser.code}>
                                            {parser.name}
                                        </option>
                                    ))}
                            </NativeSelect>
                        }
                    />
                )}
            </fieldset>

            <PrimaryButton type="submit">{isEditForm ? "Save" : "Add"}</PrimaryButton>
        </form>
    );
};

export default CommandUsageForm;

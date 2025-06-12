import HorizontalLabelledField from "components/form/HorizontalLabelledField.jsx";
import LabelledField from "components/form/LabelledField";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import useFetch from "hooks/useFetch";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../ui/buttons/Primary";

const CommandUsageForm = ({ isEditForm = false, onFormSubmit, commandUsage, commandSetter: setCommand }) => {
    const [t] = useTranslation();

    const onFormChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        let value = target.value;
        if ("tags" === name) {
            value = JSON.stringify(value.split(","));
        }

        setCommand({ ...commandUsage, [name]: value });
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
                        value={commandUsage.name || ""}
                        required
                        autoFocus
                    />
                </label>
                <label>
                    Description
                    <MarkdownEditor
                        name="description"
                        onChange={onFormChange}
                        value={commandUsage.description || ""}
                        required
                    />
                </label>
                <label>
                    Tags
                    <NativeInput
                        type="text"
                        name="tags"
                        onChange={onFormChange}
                        value={commandUsage.tags ? JSON.parse(commandUsage.tags).join(",") : ""}
                    />
                </label>
                <label>
                    More information URL
                    <NativeInput
                        type="url"
                        name="more_info_url"
                        onChange={onFormChange}
                        value={commandUsage.more_info_url || ""}
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
                        value={commandUsage.executable_path || ""}
                    />
                </label>

                <LabelledField
                    label={t("Command line arguments")}
                    control={
                        <NativeInput
                            type="text"
                            name="arguments"
                            onChange={onFormChange}
                            value={commandUsage.arguments || ""}
                        />
                    }
                />

                <HorizontalLabelledField
                    label="Output capturing mode"
                    htmlFor="outputCapturingMode"
                    control={
                        <NativeSelect
                            id="outputCapture"
                            name="output_capturing_mode"
                            onChange={onFormChange}
                            value={commandUsage.output_capturing_mode || "none"}
                            required
                        >
                            <option value="none">None</option>
                            <option value="stdout">Standard output</option>
                            <option value="file">File</option>
                        </NativeSelect>
                    }
                />

                {commandUsage.output_capturing_mode === "file" && (
                    <HorizontalLabelledField
                        label="Output filename"
                        htmlFor="outputFilename"
                        control={
                            <NativeInput
                                id="outputFilename"
                                type="text"
                                name="output_filename"
                                onChange={onFormChange}
                                value={commandUsage.output_filename || ""}
                            />
                        }
                    />
                )}

                {commandUsage.output_capturing_mode !== "none" && (
                    <HorizontalLabelledField
                        label="Output parser"
                        htmlFor="outputParser"
                        control={
                            <NativeSelect
                                id="outputParser"
                                name="output_parser"
                                onChange={onFormChange}
                                value={commandUsage.output_parser || ""}
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

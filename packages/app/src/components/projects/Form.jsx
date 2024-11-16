import HorizontalLabelledField from "components/form/HorizontalLabelledField";
import LabelledField from "components/form/LabelledField";
import NativeCheckbox from "components/form/NativeCheckbox";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import ProjectVulnerabilityMetrics from "models/ProjectVulnerabilityMetrics";
import useFetch from "../../hooks/useFetch";
import Loading from "../ui/Loading";
import PrimaryButton from "../ui/buttons/Primary";

const ProjectForm = ({ isEdit = false, project, projectSetter: setProject, onFormSubmit }) => {
    const [clients] = useFetch("/clients");
    const [categories] = useFetch("/project/categories");

    const handleFormChange = (ev) => {
        const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
        setProject({ ...project, [ev.target.name]: value });
    };

    if (!project && !clients) return <Loading />;

    return (
        <form onSubmit={onFormSubmit}>
            <fieldset>
                <legend>Basic information</legend>

                <HorizontalLabelledField
                    control={
                        <NativeCheckbox
                            id="isTemplate"
                            name="is_template"
                            onChange={handleFormChange}
                            checked={project.is_template}
                        >
                            Project template
                        </NativeCheckbox>
                    }
                />

                <HorizontalLabelledField
                    label="Category"
                    htmlFor="categoryId"
                    control={
                        <NativeSelect
                            id="categoryId"
                            name="category_id"
                            onChange={handleFormChange}
                            value={project.category_id || ""}
                        >
                            <option value="">(none)</option>
                            {categories &&
                                categories.map((category) => (
                                    <option key={`category_${category.id}`} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                        </NativeSelect>
                    }
                />

                {!project.is_template && (
                    <>
                        <HorizontalLabelledField
                            label="Visibility"
                            control={
                                <NativeSelect name="visibility" onChange={handleFormChange} value={project.visibility}>
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </NativeSelect>
                            }
                        />

                        <HorizontalLabelledField
                            label="Client"
                            control={
                                <NativeSelect
                                    name="client_id"
                                    onChange={handleFormChange}
                                    value={project.client_id || ""}
                                >
                                    <option value="">(none)</option>
                                    {clients &&
                                        clients.map((client, index) => (
                                            <option key={index} value={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                </NativeSelect>
                            }
                        />

                        <LabelledField
                            label="External ID"
                            control={
                                <NativeInput
                                    type="text"
                                    name="external_id"
                                    onChange={handleFormChange}
                                    value={project.external_id || ""}
                                />
                            }
                        />
                    </>
                )}

                <label>
                    Name
                    <NativeInput
                        type="text"
                        name="name"
                        onChange={handleFormChange}
                        value={project.name || ""}
                        required
                        autoFocus
                    />
                </label>
                <label>
                    Description
                    <MarkdownEditor
                        name="description"
                        onChange={handleFormChange}
                        value={project.description || ""}
                        required
                    />
                </label>
            </fieldset>

            <fieldset>
                <legend>Rules of engagement</legend>

                <HorizontalLabelledField
                    label="Vulnerability metrics"
                    control={
                        <NativeSelect
                            name="vulnerability_metrics"
                            value={project.vulnerability_metrics || ""}
                            onChange={handleFormChange}
                        >
                            <option value="">(undefined)</option>
                            {ProjectVulnerabilityMetrics.map((type) => (
                                <option key={`metrics_${type.id}`} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </NativeSelect>
                    }
                />
                {!project.is_template && (
                    <>
                        <HorizontalLabelledField
                            label="Start date"
                            control={
                                <NativeInput
                                    type="date"
                                    name="engagement_start_date"
                                    value={project.engagement_start_date}
                                    onChange={handleFormChange}
                                />
                            }
                        />
                        <HorizontalLabelledField
                            label="End date"
                            control={
                                <NativeInput
                                    type="date"
                                    name="engagement_end_date"
                                    value={project.engagement_end_date}
                                    onChange={handleFormChange}
                                />
                            }
                        />{" "}
                    </>
                )}
            </fieldset>

            <PrimaryButton type="submit">{isEdit ? "Update" : "Create"}</PrimaryButton>
        </form>
    );
};

export default ProjectForm;

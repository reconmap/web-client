import DynamicForm from "components/form/DynamicForm";
import NativeCheckbox from "components/form/NativeCheckbox";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import useFetch from "hooks/useFetch";
import ProjectVulnerabilityMetrics from "models/ProjectVulnerabilityMetrics";
import RemediationComplexity from "models/RemediationComplexity";
import RemediationPriority from "models/RemediationPriority";
import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import Risks from "../../models/Risks";
import secureApiFetch from "../../services/api";
import Primary from "../ui/buttons/Primary";
import CvssAbbr from "./CvssAbbr";
import OwaspRR from "./OwaspRR";

const VulnerabilityForm = ({
    isEditForm = false,
    vulnerability,
    vulnerabilitySetter: setVulnerability,
    onFormSubmit,
}) => {
    const [initialised, setInitialised] = useState(false);
    const [projects, setProjects] = useState(null);
    const [categories, setCategories] = useState(null);
    const [subCategories, setSubCategories] = useState(null);
    const [targets, setTargets] = useState(null);
    const [useOWASP, setMetrics] = useState(false);
    const [customFields] = useFetch("/system/custom-fields");

    useEffect(() => {
        if (initialised) return;

        Promise.all([
            secureApiFetch(`/projects`, { method: "GET" }),
            secureApiFetch(`/vulnerabilities/categories`, { method: "GET" }),
        ])
            .then((resp) => {
                const [respA, respB] = resp;
                return Promise.all([respA.json(), respB.json()]);
            })
            .then(([projects, categories]) => {
                const defaultProjectId = projects.length ? projects[0].id : 0;
                const projectId = isEditForm ? vulnerability.project_id : defaultProjectId;
                setMetrics(isOwaspProject(projects, projectId));

                var subcategories = null;
                if (vulnerability.parent_category_id) {
                    secureApiFetch(`/vulnerabilities/categories/${vulnerability.parent_category_id}`, { method: "GET" })
                        .then((response) => response.json())
                        .then((json) => {
                            subcategories = json;
                        });
                }

                secureApiFetch(`/targets?projectId=${projectId}`, {
                    method: "GET",
                })
                    .then((resp) => resp.json())
                    .then((targets) => {
                        unstable_batchedUpdates(() => {
                            setProjects(projects);
                            setCategories(categories);
                            setTargets(targets);
                            setVulnerability((prevVulnerability) => {
                                let updatedVulnerability = prevVulnerability;
                                if (!idExists(projects, prevVulnerability.project_id)) {
                                    updatedVulnerability.project_id = defaultProjectId;
                                }
                                if (
                                    !idExists(categories, prevVulnerability.category_id) &&
                                    !idExists(subcategories, prevVulnerability.category_id)
                                ) {
                                    updatedVulnerability.category_id = categories[0].id;
                                }
                                if (!idExists(targets, vulnerability.target_id)) {
                                    updatedVulnerability.target_id = null;
                                }
                                return updatedVulnerability;
                            });
                            setInitialised(true);
                        });
                    });
            });
    }, [
        initialised,
        isEditForm,
        setProjects,
        setCategories,
        setTargets,
        setMetrics,
        setVulnerability,
        vulnerability.target_id,
        vulnerability.project_id,
        vulnerability.parent_category_id,
        subCategories,
        setSubCategories,
    ]);

    useEffect(() => {
        if (!initialised) return;

        if (vulnerability.parent_category_id) {
            secureApiFetch(`/vulnerabilities/categories/${vulnerability.parent_category_id}`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((json) => {
                    setSubCategories(json);
                });
        }

        const projectId = vulnerability.project_id;
        secureApiFetch(`/targets?projectId=${projectId}`, { method: "GET" })
            .then((resp) => resp.json())
            .then((targets) => {
                unstable_batchedUpdates(() => {
                    setTargets(targets);
                    if (isEditForm) {
                        // Edit
                        if (!idExists(targets, vulnerability.target_id)) {
                            setVulnerability((prevVulnerability) => {
                                return { ...prevVulnerability, target_id: 0 };
                            });
                        }
                    }
                });
            });
    }, [
        initialised,
        isEditForm,
        setTargets,
        setVulnerability,
        vulnerability.target_id,
        vulnerability.project_id,
        vulnerability.parent_category_id,
    ]);

    const idExists = (elements, id) => {
        if (!elements) return false;
        for (const el of elements) {
            if (el.id === parseInt(id)) return true;
        }
        return false;
    };

    const isOwaspProject = (elements, id) => {
        let metrics = ProjectVulnerabilityMetrics[0].id;
        for (const el of elements) {
            if (el.id === parseInt(id)) {
                metrics = el.vulnerability_metrics;
            }
        }
        return ProjectVulnerabilityMetrics[1].id === metrics;
    };

    const onFormChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;

        if ("category_id" === name) {
            if (value !== "(none)") {
                secureApiFetch(`/vulnerabilities/categories/${value}`, {
                    method: "GET",
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setSubCategories(json);
                    });
                setVulnerability({
                    ...vulnerability,
                    parent_category_id: value,
                    [name]: value,
                });
            } else {
                setVulnerability({ ...vulnerability, category_id: null });
            }
        } else if ("subcategory_id" === name) {
            setVulnerability({ ...vulnerability, category_id: value });
        } else {
            setVulnerability({ ...vulnerability, [name]: value });
        }
    };

    return (
        <form id="vulnerabilityCreateForm" onSubmit={onFormSubmit}>
            <div>
                <h2>
                    <div>Basic information</div>
                </h2>
                <label>
                    Properties
                    <div>
                        <NativeCheckbox name="is_template" onChange={onFormChange} checked={vulnerability.is_template}>
                            Is template
                        </NativeCheckbox>
                    </div>
                </label>
                <label>
                    External ID
                    <NativeInput
                        type="text"
                        name="external_id"
                        value={vulnerability.external_id || ""}
                        onChange={onFormChange}
                    />
                </label>
                <label>
                    Summary
                    <NativeInput
                        type="text"
                        name="summary"
                        value={vulnerability.summary || ""}
                        onChange={onFormChange}
                        required
                        autoFocus
                    />
                </label>
                <label>
                    Description
                    <MarkdownEditor
                        name="description"
                        value={vulnerability.description || ""}
                        onChange={onFormChange}
                    />
                </label>
                <label>
                    External references
                    <MarkdownEditor
                        name="external_refs"
                        value={vulnerability.external_refs || ""}
                        onChange={onFormChange}
                    />
                </label>
                <label>
                    Category
                    <NativeSelect
                        name="category_id"
                        value={vulnerability.parent_category_id || ""}
                        onChange={onFormChange}
                        required
                    >
                        <option>(none)</option>
                        {categories &&
                            categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                    </NativeSelect>
                </label>
                <label>
                    Subcategory
                    <NativeSelect
                        name="subcategory_id"
                        value={vulnerability.category_id || ""}
                        onChange={onFormChange}
                        required
                    >
                        <option>(none)</option>
                        {subCategories &&
                            subCategories.map((subcat) => (
                                <option key={subcat.id} value={subcat.id}>
                                    {subcat.name}
                                </option>
                            ))}
                    </NativeSelect>
                </label>
                <label>
                    Visibility
                    <NativeSelect
                        name="visibility"
                        value={vulnerability.visibility || ""}
                        onChange={onFormChange}
                        required
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </NativeSelect>
                    <span className="field-explanation">
                        Private makes this vulnerability not visible to the client.
                    </span>
                </label>
                <label>
                    Risk
                    <NativeSelect name="risk" value={vulnerability.risk || ""} onChange={onFormChange} required>
                        {Risks.map((risk) => (
                            <option key={risk.id} value={risk.id}>
                                {risk.name}
                            </option>
                        ))}
                    </NativeSelect>
                </label>
                <label>
                    Tags
                    <NativeInput
                        type="text"
                        name="tags"
                        onChange={onFormChange}
                        value={vulnerability.tags ? JSON.parse(vulnerability.tags).join(",") : ""}
                    />
                </label>
                <label>
                    Proof of concept
                    <MarkdownEditor
                        name="proof_of_concept"
                        value={vulnerability.proof_of_concept || ""}
                        onChange={onFormChange}
                    />
                </label>
                <label>
                    Impact
                    <MarkdownEditor name="impact" value={vulnerability.impact || ""} onChange={onFormChange} />
                </label>
                {!useOWASP && (
                    <>
                        <label>
                            CVSS score
                            <NativeInput
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                name="cvss_score"
                                value={vulnerability.cvss_score || ""}
                                onChange={onFormChange}
                            />
                        </label>
                        <label>
                            <span>
                                <CvssAbbr /> vector
                            </span>
                            <NativeInput
                                type="text"
                                name="cvss_vector"
                                value={vulnerability.cvss_vector || ""}
                                onChange={onFormChange}
                                placeholder="eg: AV:N/AC:L/Au:S/C:P/I:P/A:N"
                            />
                        </label>
                    </>
                )}
            </div>
            {useOWASP && (
                <div>
                    <h2>
                        <div>Owasp Risk Rating calculator</div>
                    </h2>
                    <label>Owasp Risk Rating</label>
                    <OwaspRR vulnerability={vulnerability} vulnerabilitySetter={setVulnerability} />
                </div>
            )}
            <h2>
                <div>Remediation</div>
            </h2>
            <label>
                Remediation instructions
                <MarkdownEditor name="remediation" value={vulnerability.remediation || ""} onChange={onFormChange} />
            </label>
            <label>
                Remediation complexity
                <NativeSelect
                    name="remediation_complexity"
                    value={vulnerability.remediation_complexity || ""}
                    onChange={onFormChange}
                    required
                >
                    {RemediationComplexity.map((complexity) => (
                        <option key={complexity.id} value={complexity.id}>
                            {complexity.name}
                        </option>
                    ))}
                </NativeSelect>
            </label>
            <label>
                Remediation priority
                <NativeSelect
                    name="remediation_priority"
                    value={vulnerability.remediation_priority || ""}
                    onChange={onFormChange}
                    required
                >
                    {RemediationPriority.map((priority) => (
                        <option key={priority.id} value={priority.id}>
                            {priority.name}
                        </option>
                    ))}
                </NativeSelect>
            </label>

            {!vulnerability.is_template && (
                <div>
                    <h2>
                        <div>Relations</div>
                    </h2>
                    <label>
                        Project
                        <NativeSelect
                            name="project_id"
                            value={vulnerability.project_id || ""}
                            onChange={onFormChange}
                            required
                        >
                            {projects &&
                                projects.map((project, index) => (
                                    <option key={index} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                        </NativeSelect>
                    </label>

                    <label>
                        Affected target
                        <NativeSelect name="target_id" value={vulnerability.target_id || ""} onChange={onFormChange}>
                            <option value="0">(none)</option>
                            {targets &&
                                targets.map((target, index) => (
                                    <option key={index} value={target.id}>
                                        {target.name}
                                    </option>
                                ))}
                        </NativeSelect>
                    </label>
                </div>
            )}

            {customFields && <DynamicForm fields={customFields} />}

            <Primary type="submit">{isEditForm ? "Save" : "Add"}</Primary>
        </form>
    );
};

export default VulnerabilityForm;

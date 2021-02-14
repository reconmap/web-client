import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from "react-dom";
import Risks from "../../models/Risks";
import secureApiFetch from "../../services/api";
import Primary from "../ui/buttons/Primary";

const VulnerabilityForm = ({
    isEditForm = false,
    vulnerability,
    vulnerabilitySetter: setVulnerability,
    onFormSubmit
}) => {
    const [initialised, setInitialised] = useState(false);
    const [projects, setProjects] = useState(null);
    const [categories, setCategories] = useState(null);
    const [targets, setTargets] = useState(null);

    useEffect(() => {
        if (initialised) return;

        Promise.all([
            secureApiFetch(`/projects`, { method: 'GET' }),
            secureApiFetch(`/vulnerabilities/categories`, { method: 'GET' }),
        ])
            .then(resp => {
                const [respA, respB] = resp;
                return Promise.all([respA.json(), respB.json()]);
            })
            .then(([projects, categories]) => {
                const defaultProjectId = projects.length ? projects[0].id : 0;
                const projectId = isEditForm ? vulnerability.project_id : defaultProjectId;
                secureApiFetch(`/targets?projectId=${projectId}`, { method: 'GET' })
                    .then(resp => resp.json())
                    .then(targets => {
                        unstable_batchedUpdates(() => {
                            setProjects(projects);
                            setCategories(categories);
                            setTargets(targets);
                            setVulnerability(prevVulnerability => {
                                let updatedVulnerability = prevVulnerability;
                                if (!idExists(projects, prevVulnerability.project_id)) {
                                    updatedVulnerability.project_id = defaultProjectId;
                                }
                                if (!idExists(categories, prevVulnerability.category_id)) {
                                    updatedVulnerability.category_id = categories[0].id;
                                }
                                if (!idExists(targets, vulnerability.target_id)) {
                                    updatedVulnerability.target_id = null;
                                }
                                return updatedVulnerability;
                            })
                            setInitialised(true);
                        });
                    })
            });
    }, [initialised, isEditForm, setProjects, setCategories, setTargets, setVulnerability, vulnerability.target_id, vulnerability.project_id]);

    useEffect(() => {
        if (!initialised) return;

        const projectId = vulnerability.project_id;
        secureApiFetch(`/targets?projectId=${projectId}`, { method: 'GET' })
            .then(resp => resp.json())
            .then(targets => {
                unstable_batchedUpdates(() => {
                    setTargets(targets);
                    if (isEditForm) { // Edit
                        if (!idExists(targets, vulnerability.target_id)) {
                            setVulnerability(prevVulnerability => {
                                return { ...prevVulnerability, target_id: 0 }
                            });
                        }
                    }
                });
            })
    }, [initialised, isEditForm, setTargets, setVulnerability, vulnerability.target_id, vulnerability.project_id]);

    const idExists = (elements, id) => {
        for (const el of elements) {
            if (el.id === parseInt(id)) return true;
        }
        return false;
    }

    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        setVulnerability({ ...vulnerability, [name]: value });
    };

    return <form onSubmit={onFormSubmit}>
        <label>Project
            <select name="project_id" value={vulnerability.project_id} onChange={onFormChange} required>
                {projects && projects.map((project, index) =>
                    <option key={index} value={project.id}>{project.name}</option>
                )}
            </select>
        </label>
        <label>Summary
            <input type="text" name="summary" value={vulnerability.summary} onChange={onFormChange} required autoFocus />
        </label>
        <label>Description
            <textarea name="description" value={vulnerability.description} onChange={onFormChange} />
        </label>
        <label>Risk
            <select name="risk" value={vulnerability.risk} onChange={onFormChange} required>
                {Risks.map((risk, index) =>
                    <option key={index} value={risk.id}>{risk.name}</option>
                )}
            </select>
        </label>
        <label>Category
            <select name="category_id" value={vulnerability.category_id} onChange={onFormChange} required>
                {categories && categories.map((category, index) =>
                    <option key={index} value={category.id}>{category.name}</option>
                )}
            </select>
        </label>
        <label>CVSS score
            <input type="number" step="0.1" min="0" max="10" name="cvss_score" value={vulnerability.cvss_score || ""}
                onChange={onFormChange} />
        </label>
        <label><span>CVSS vector</span>
            <input type="text" name="cvss_vector" value={vulnerability.cvss_vector || ""} onChange={onFormChange} placeholder="eg: AV:N/AC:L/Au:S/C:P/I:P/A:N" />
        </label>
        <label>Affected target
            <select name="target_id" value={vulnerability.target_id} onChange={onFormChange}>
                <option value="0">(none)</option>
                {targets && targets.map((target, index) =>
                    <option key={index} value={target.id}>{target.name}</option>
                )}
            </select>
        </label>

        <Primary type="submit">{isEditForm ? "Save" : "Add"}</Primary>
    </form>
}

export default VulnerabilityForm;

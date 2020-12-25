import Risks from "../../models/Risks";
import Primary from "../ui/buttons/Primary";

const VulnerabilityForm = ({onFormSubmit, onFormChange, vulnerability, projects, categories, targets}) => {
    const isUpdateForm = vulnerability.id;

    return <form onSubmit={onFormSubmit}>
        <label>Project
            <select name="project_id" value={vulnerability.project_id} onChange={onFormChange} required>
                {projects && projects.map((project, index) =>
                    <option key={index} value={project.id}>{project.name}</option>
                )}
            </select>
        </label>
        <label>Summary
            <input type="text" name="summary" value={vulnerability.summary} onChange={onFormChange} required autoFocus/>
        </label>
        <label>Description
            <textarea name="description" value={vulnerability.description} onChange={onFormChange} required/>
        </label>
        <label>Risk
            <select name="risk" value={vulnerability.risk} onChange={onFormChange} required>
                {Risks.map((risk, index) =>
                    <option key={index} value={risk.id}>{risk.name}</option>
                )}
            </select>
        </label>
        <label>Category
            <select name="category_id" value={vulnerability.category_id || ""} onChange={onFormChange} required>
                {categories && categories.map((category, index) =>
                    <option key={index} value={category.id}>{category.name}</option>
                )}
            </select>
        </label>
        <label>CVSS score
            <input type="number" step="0.1" min="0" max="10" name="cvss_score" value={vulnerability.cvss_score || ""}
                   onChange={onFormChange}/>
        </label>
        <label><span>CVSS vector<br/><small>eg: AV:N/AC:L/Au:S/C:P/I:P/A:N</small></span>
            <input type="text" name="cvss_vector" value={vulnerability.cvss_vector || ""} onChange={onFormChange}/>
        </label>
        <label>Affected target
            <select name="target_id" value={vulnerability.target_id || ""} onChange={onFormChange}>
                {targets && targets.map((target, index) =>
                    <option key={index} value={target.id}>{target.name}</option>
                )}
            </select>
        </label>

        <Primary type="submit">{isUpdateForm ? "Update" : "Create"}</Primary>
    </form>
}

export default VulnerabilityForm;

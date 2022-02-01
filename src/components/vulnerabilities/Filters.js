import { Select } from "@chakra-ui/react";
import useFetch from "hooks/useFetch";
import Risks from "models/Risks";

const VulnerabilityFilters = ({ tableModel, tableModelSetter: setTableModel, showProjectFilter = true }) => {
    const [categories] = useFetch('/vulnerabilities/categories?parentsOnly=true');
    const [projects] = useFetch('/projects?status=active');

    const handleSetProject = ev => {
        setTableModel({ ...tableModel, filters: { ...tableModel.filters, projectId: ev.target.value } });
    }
    const handleSetCategory = ev => {
        setTableModel({ ...tableModel, filters: { ...tableModel.filters, categoryId: ev.target.value } });
    }
    const handleSetRisk = ev => {
        setTableModel({ ...tableModel, filters: { ...tableModel.filters, risk: ev.target.value } });
    }
    const handleSetStatus = ev => {
        setTableModel({ ...tableModel, filters: { ...tableModel.filters, status: ev.target.value } });
    }
    return <div className='space-x-2 mx-auto flex items-center '>
        <div>
            <label>Risk</label>
            <Select onChange={handleSetRisk}>
                <option value=''>(any)</option>
                {Risks.map(risk => <option key={risk.id} value={risk.id}>{risk.name}</option>)}
            </Select>
        </div>

        <div>
            <label>Status</label>
            <Select onChange={handleSetStatus}>
                <option value=''>(any)</option>
                <option value='open'>Open</option>
                <option value='closed'>Closed</option>
            </Select>
        </div>

        <div>
            <label>Category</label>
            <Select onChange={handleSetCategory}>
                <option value=''>(any)</option>
                {categories !== null && categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>
        </div>

        {showProjectFilter && <div>
            <label>Project</label>
            <Select onChange={handleSetProject}>
                <option value=''>(any)</option>
                {projects !== null && projects.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}
            </Select>
        </div>}

    </div>
}

export default VulnerabilityFilters;

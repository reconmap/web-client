import NativeSelect from "components/form/NativeSelect";
import useFetch from "hooks/useFetch";
import Risks from "models/Risks";

const VulnerabilityFilters = ({
    tableModel,
    tableModelSetter: setTableModel,
    showProjectFilter = true,
}) => {
    const [categories] = useFetch(
        "/vulnerabilities/categories?parentsOnly=true",
    );
    const [projects] = useFetch("/projects?status=active");

    const onFilterChange = (ev) => {
        setTableModel({
            ...tableModel,
            filters: {
                ...tableModel.filters,
                [ev.target.name]: ev.target.value,
            },
        });
    };

    return (
        <details>
            <summary>Filters</summary>
            <div className="space-x-2 mx-auto flex items-center">
                {showProjectFilter && (
                    <div>
                        <label>Project</label>
                        <NativeSelect
                            name="projectId"
                            onChange={onFilterChange}
                        >
                            <option value="">(any)</option>
                            {projects !== null &&
                                projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                        </NativeSelect>
                    </div>
                )}

                <div>
                    <label>Status</label>
                    <NativeSelect name="status" onChange={onFilterChange}>
                        <option value="">(any)</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </NativeSelect>
                </div>

                <div>
                    <label>Risk</label>
                    <NativeSelect name="risk" onChange={onFilterChange}>
                        <option value="">(any)</option>
                        {Risks.map((risk) => (
                            <option key={risk.id} value={risk.id}>
                                {risk.name}
                            </option>
                        ))}
                    </NativeSelect>
                </div>

                <div>
                    <label>Category</label>
                    <NativeSelect name="categoryId" onChange={onFilterChange}>
                        <option value="">(any)</option>
                        {categories !== null &&
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </NativeSelect>
                </div>
            </div>
        </details>
    );
};

export default VulnerabilityFilters;

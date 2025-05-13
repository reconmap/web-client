import { actionCompletedToast } from "components/ui/toast";
import useQuery from "hooks/useQuery";
import defaultVulnerability from "models/Vulnerability";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import VulnerabilityForm from "./Form";

const VulnerabilityCreate = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const urlProjectId = useRef(query.get("projectId") || 0);
    const isTemplate = "true" === query.get("isTemplate");

    const [vulnerability, setVulnerability] = useState({
        ...defaultVulnerability,
        is_template: isTemplate,
        project_id: urlProjectId.current,
    });

    const onFormSubmit = (ev) => {
        ev.preventDefault();

        var formData = new FormData(document.getElementById("vulnerabilityCreateForm"));
        var fields = Object.fromEntries(formData);
        fields.tags = JSON.stringify(fields.tags.split(","));
        fields.target_id = null;
        fields.category_id = null;
        if (!fields.hasOwnProperty("is_template")) {
            fields.is_template = "0";
        }

        secureApiFetch(`/vulnerabilities`, { method: "POST", body: JSON.stringify(fields) }).then(() => {
            if (vulnerability.is_template) {
                navigate("/vulnerabilities/templates");
            } else {
                navigate(`/vulnerabilities`);
            }

            actionCompletedToast(`The vulnerability "${vulnerability.summary}" has been added.`);
        });
    };

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </Breadcrumb>
            </div>
            <Title title="New vulnerability details" />

            <VulnerabilityForm
                vulnerability={vulnerability}
                vulnerabilitySetter={setVulnerability}
                onFormSubmit={onFormSubmit}
            />
        </div>
    );
};

export default VulnerabilityCreate;

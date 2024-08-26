import PageTitle from "components/logic/PageTitle";
import { actionCompletedToast } from "components/ui/toast";
import useQuery from "hooks/useQuery";
import VulnerabilityModel from "models/Vulnerability";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import { IconPlus } from "../ui/Icons";
import Title from "../ui/Title";
import VulnerabilityForm from "./Form";

const VulnerabilityCreate = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const urlProjectId = useRef(query.get("projectId") || 0);
    const isTemplate = "true" === query.get("isTemplate");

    const [vulnerability, setVulnerability] = useState({
        ...VulnerabilityModel,
        is_template: isTemplate,
        project_id: urlProjectId.current,
    });
    const [customFields, setCustomFields] = useState(null);

    const onFormSubmit = (ev) => {
        ev.preventDefault();

        secureApiFetch(`/vulnerabilities`, { method: "POST", body: JSON.stringify(vulnerability) }).then(() => {
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
            <PageTitle value="Add vulnerability" />
            <div className="heading">
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </Breadcrumb>
            </div>
            <Title title="New vulnerability details" icon={<IconPlus />} />

            <VulnerabilityForm
                vulnerability={vulnerability}
                vulnerabilitySetter={setVulnerability}
                onFormSubmit={onFormSubmit}
            />
        </div>
    );
};

export default VulnerabilityCreate;

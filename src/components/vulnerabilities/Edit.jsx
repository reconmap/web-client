import PageTitle from "components/logic/PageTitle";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import { actionCompletedToast, errorToast } from "../ui/toast";
import VulnerabilityForm from "./Form";

const VulnerabilityEdit = () => {
    const { vulnerabilityId } = useParams();

    const navigate = useNavigate();

    const [serverVulnerability] = useFetch(`/vulnerabilities/${vulnerabilityId}`);
    const [clientVulnerability, setClientVulnerability] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/vulnerabilities/${vulnerabilityId}`, {
            method: "PUT",
            body: JSON.stringify(clientVulnerability),
        })
            .then((resp) => {
                if (resp.status === 204) {
                    actionCompletedToast(`The vulnerability "${clientVulnerability.summary}" has been updated.`);

                    if (clientVulnerability.is_template) {
                        navigate(`/vulnerabilities/templates/${vulnerabilityId}`);
                    } else {
                        navigate(`/vulnerabilities/${vulnerabilityId}`);
                    }
                } else {
                    throw new Error("Unable to save. Check form");
                }
            })
            .catch((err) => {
                errorToast(err.message);
            });
    };

    useEffect(() => {
        if (serverVulnerability) setClientVulnerability(serverVulnerability);
    }, [serverVulnerability]);

    return (
        <div>
            <PageTitle value="Edit Vulnerability" />
            <div className="heading">
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </Breadcrumb>
            </div>
            <Title title="Vulnerability details" />
            {!clientVulnerability ? (
                <Loading />
            ) : (
                <VulnerabilityForm
                    isEditForm={true}
                    vulnerability={clientVulnerability}
                    vulnerabilitySetter={setClientVulnerability}
                    onFormSubmit={onFormSubmit}
                />
            )}
        </div>
    );
};

export default VulnerabilityEdit;

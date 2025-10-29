import { useOrganisationQuery } from "api/clients.js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import { actionCompletedToast } from "../ui/toast";
import ClientForm from "./Form";

const EditClientPage = () => {
    const navigate = useNavigate();
    const { clientId } = useParams();

    const { data: serverClient } = useOrganisationQuery(clientId);
    const [clientClient, setClientClient] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/clients/${clientId}`, {
            method: "PUT",
            body: JSON.stringify(clientClient),
        });

        actionCompletedToast(`The client "${clientClient.name}" has been updated.`);

        navigate(`/organisations/${clientId}`);
    };

    useEffect(() => {
        if (serverClient) setClientClient(serverClient);
    }, [serverClient]);

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/clients">Clients</Link>
                </Breadcrumb>
            </div>

            <Title title="Client details" />

            {!clientClient ? (
                <Loading />
            ) : (
                <ClientForm
                    isEditForm={true}
                    onFormSubmit={onFormSubmit}
                    client={clientClient}
                    clientSetter={setClientClient}
                />
            )}
        </div>
    );
};

export default EditClientPage;

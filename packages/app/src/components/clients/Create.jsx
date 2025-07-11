import { actionCompletedToast, errorToast } from "components/ui/toast";
import Client from "models/Client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import ClientForm from "./Form";
import OrganisationsUrls from "./OrganisationsUrls";

const ClientCreate = () => {
    const [t] = useTranslation();

    const navigate = useNavigate();
    const [newClient, setNewClient] = useState(Client);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        const form = ev.target.closest("form");
        const formData = new FormData(form);

        secureApiFetch("/clients", {
            method: "POST",
            body: formData,
        }).then((resp) => {
            if (resp.status === 201) {
                navigate(OrganisationsUrls.List);
                actionCompletedToast(`The client "${newClient.name}" has been added.`);
            } else {
                errorToast("The client could not be saved. Review the form data or check the application logs.");
            }
        });
    };

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to={OrganisationsUrls.List}>{t("Organisations")}</Link>
                </Breadcrumb>
            </div>

            <Title title={t("New organisation")} />

            <ClientForm onFormSubmit={onFormSubmit} client={newClient} clientSetter={setNewClient} />
        </div>
    );
};

export default ClientCreate;

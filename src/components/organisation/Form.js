import Organisation from 'models/Organisation';
import React, { useEffect, useState } from 'react';
import useFetch from "../../hooks/useFetch";
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from '../ui/buttons/Primary';
import { IconPreferences } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from '../ui/Title';

export default function OrganisationForm({ history }) {
    const [organisation, setOrganisation] = useState(Organisation);

    const [rootOrganisation] = useFetch('/organisations/root');
    const [loading, setLoading] = useState(false);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        setLoading(true);
        await secureApiFetch(`/organisations/root`, { method: 'PUT', body: JSON.stringify(organisation) })
        history.push(`/clients`)
    }
    const handleFormChange = ev => {
        const target = ev.target;

        const name = target.name;
        const value = target.value;

        setOrganisation({ ...organisation, [name]: value });
    };

    useEffect(() => {
        if (rootOrganisation)
            setOrganisation({
                name: rootOrganisation.name,
                url: rootOrganisation.url,
                contactName: rootOrganisation.contact_name,
                contactEmail: rootOrganisation.contact_email,
                contactPhone: rootOrganisation.contact_phone
            });
    }, [rootOrganisation]);

    if (!organisation) {
        return <Loading />
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                </Breadcrumb>
            </div>
            <form onSubmit={onFormSubmit}>
                <Title title="Settings" type="Organisation" icon={<IconPreferences />} />
                <label>Name
                    <input type="text" name="name" value={organisation.name} onChange={handleFormChange} required
                        autoFocus /></label>
                <label>URL
                    <input type="text" name="url" value={organisation.url} onChange={handleFormChange} /></label>
                <label>Contact name
                    <input type="text" name="contactName" value={organisation.contactName} onChange={handleFormChange}
                    /></label>
                <label>Contact email
                    <input type="email" name="contactEmail" value={organisation.contactEmail}
                        onChange={handleFormChange} /></label>
                <label>Contact phone
                    <input type="text" name="contactPhone" value={organisation.contactPhone}
                        onChange={handleFormChange} /></label>
                <PrimaryButton type="submit"
                    disabled={loading}>Update</PrimaryButton>
            </form>
        </div>
    )
}

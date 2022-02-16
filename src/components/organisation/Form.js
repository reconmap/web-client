import { actionCompletedToast } from 'components/ui/toast';
import Organisation from 'models/Organisation';
import { useEffect, useState } from 'react';
import useFetch from "../../hooks/useFetch";
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from '../ui/buttons/Primary';
import { IconPreferences } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from '../ui/Title';

const OrganisationForm = () => {
    const [organisation, setOrganisation] = useState(Organisation);

    const [rootOrganisation] = useFetch('/organisations/root');
    const [loading, setLoading] = useState(false);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        setLoading(true);
        await secureApiFetch(`/organisations/root`, { method: 'PUT', body: JSON.stringify(organisation) });
        actionCompletedToast('The changes to the organisation has been saved.');
        setLoading(false);
    }
    const handleFormChange = ev => {
        const target = ev.target;

        const name = target.name;
        const value = target.value;

        setOrganisation({ ...organisation, [name]: value });
    };

    const onImageSelect = (image, name) => {
        if(!image) {
            return;
          }
      
        fileToDataUri(image)
            .then(dataUri => {
              setOrganisation({ ...organisation, [name]: dataUri });
        });
    }

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    });

    useEffect(() => {
        if (rootOrganisation)
        {
            setOrganisation(rootOrganisation);
        }

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
                    <input type="text" name="contact_name" value={organisation.contact_name} onChange={handleFormChange}
                    /></label>
                <label>Contact email
                    <input type="email" name="contact_email" value={organisation.contact_email}
                        onChange={handleFormChange} /></label>
                <label>Contact phone
                    <input type="tel" name="contact_phone" value={organisation.contact_phone}
                        onChange={handleFormChange} /></label>
                <label>Logo
                    <img src={organisation.logo || null} />
                </label>
                <label>Update logo
                    <input type="file" name="logo" onChange={(event) => onImageSelect(event.target.files[0] || null, "logo")}/>
                </label>
                <label>Small logo
                    <img src={organisation.small_logo || null} />
                </label>
                <label>Update small logo
                    <input type="file" name="small_logo" onChange={(event) => onImageSelect(event.target.files[0] || null, "small_logo")}/>
                </label>
                <PrimaryButton type="submit"
                    disabled={loading}>Save</PrimaryButton>
            </form>
        </div>
    )
}

export default OrganisationForm;

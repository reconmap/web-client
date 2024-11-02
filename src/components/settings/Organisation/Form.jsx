import AttachmentsImageDropzone from "components/attachments/ImageDropzone";
import NativeButton from "components/form/NativeButton";
import NativeInput from "components/form/NativeInput";
import RestrictedComponent from "components/logic/RestrictedComponent";
import PrimaryButton from "components/ui/buttons/Primary";
import { IconPreferences } from "components/ui/Icons";
import Loading from "components/ui/Loading";
import Title from "components/ui/Title";
import { actionCompletedToast } from "components/ui/toast";
import useFetch from "hooks/useFetch";
import Organisation from "models/Organisation";
import { useEffect, useState } from "react";
import secureApiFetch from "services/api";

const OrganisationForm = () => {
    const [organisation, setOrganisation] = useState(Organisation);

    const [rootOrganisation, refetchOrganisation] = useFetch("/organisations/root");
    const [loading, setLoading] = useState(false);
    const parentType = "organisation";
    const parentId = organisation.id;
    const [logo, setLogo] = useState(null);
    const [smallLogo, setSmallLogo] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        setLoading(true);
        await secureApiFetch(`/organisations/root`, {
            method: "PUT",
            body: JSON.stringify(organisation),
        });
        actionCompletedToast("The changes to the organisation has been saved.");
        setLoading(false);
    };

    const handleFormChange = (ev) => {
        const target = ev.target;

        const name = target.name;
        const value = target.value;

        setOrganisation({ ...organisation, [name]: value });
    };

    useEffect(() => {
        if (rootOrganisation) {
            setOrganisation(rootOrganisation);
            if (rootOrganisation.small_logo_attachment_id !== null) {
                downloadAndDisplayLogo(rootOrganisation.small_logo_attachment_id, "small_logo");
            } else {
                setSmallLogo(null);
            }

            if (rootOrganisation.logo_attachment_id !== null) {
                downloadAndDisplayLogo(rootOrganisation.logo_attachment_id, "logo");
            } else {
                setLogo(null);
            }
        }
    }, [rootOrganisation]);

    const downloadAndDisplayLogo = (logoId, type) => {
        secureApiFetch(`/attachments/${logoId}`, { method: "GET" })
            .then((resp) => {
                if (resp.status === 404) {
                    return Promise.reject("Logo not found");
                }
                const contentDispositionHeader = resp.headers.get("Content-Disposition");
                const filenameRe = new RegExp(/filename="(.*)";/);
                const filename = filenameRe.exec(contentDispositionHeader)[1];
                return Promise.all([resp.blob(), filename]);
            })
            .then((values) => {
                const blob = values[0];
                const url = URL.createObjectURL(blob);
                if (type === "small_logo") {
                    setSmallLogo(url);
                } else {
                    setLogo(url);
                }
            });
    };

    const onUploadFinished = (type, id) => {
        if (id) {
            setOrganisation({ ...organisation, [type]: id });
            organisation[type] = id;
            setLoading(true);
            secureApiFetch(`/organisations/root`, {
                method: "PUT",
                body: JSON.stringify(organisation),
            }).then((ev) => {
                // has to be done after PUT is completed. Therefore it cannot be merged with the case when ID is null
                refetchOrganisation();
            });
            setLoading(false);
        } else {
            refetchOrganisation();
        }
    };

    const removeAttachment = (ev, id) => {
        secureApiFetch(`/attachments/${id}`, { method: "DELETE" }).then((resp) => {
            if (resp.status === 204) {
                actionCompletedToast("Logo removed");
                refetchOrganisation();
            }
        });
    };

    if (!organisation) {
        return <Loading />;
    }

    return (
        <div>
            <div className="heading">Breadcrumb?</div>
            <form onSubmit={onFormSubmit}>
                <Title title="Settings" type="Organisation" icon={<IconPreferences />} />
                <label>
                    Name
                    <NativeInput
                        type="text"
                        name="name"
                        value={organisation.name}
                        onChange={handleFormChange}
                        required
                        autoFocus
                    />
                </label>
                <label>
                    URL
                    <NativeInput type="text" name="url" value={organisation.url} onChange={handleFormChange} />
                </label>
                <label>
                    Contact name
                    <NativeInput
                        type="text"
                        name="contact_name"
                        value={organisation.contact_name || ""}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Contact email
                    <NativeInput
                        type="email"
                        name="contact_email"
                        value={organisation.contact_email || ""}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Contact phone
                    <NativeInput
                        type="tel"
                        name="contact_phone"
                        value={organisation.contact_phone || ""}
                        onChange={handleFormChange}
                    />
                </label>

                <PrimaryButton type="submit" disabled={loading}>
                    Save
                </PrimaryButton>

                <label>
                    Main logo
                    <div>
                        {logo && (
                            <div>
                                <img src={logo} alt="The main organisation logo" />
                                <br />
                                <NativeButton onClick={(ev) => removeAttachment(ev, organisation.logo_attachment_id)}>
                                    Remove
                                </NativeButton>
                            </div>
                        )}
                        {logo === null && (
                            <RestrictedComponent
                                roles={["administrator", "superuser", "user"]}
                                message="(access restricted)"
                            >
                                <AttachmentsImageDropzone
                                    parentType={parentType}
                                    parentId={parentId}
                                    onUploadFinished={onUploadFinished}
                                    uploadFinishedParameter="logo_attachment_id"
                                    attachmentId={organisation.logo_attachment_id}
                                    maxFileCount={1}
                                />
                            </RestrictedComponent>
                        )}
                    </div>
                </label>

                <label>
                    Small logo
                    <div>
                        {smallLogo && (
                            <div>
                                <img src={smallLogo} alt="The smaller version of the logo" />
                                <br />
                                <NativeButton
                                    onClick={(ev) => removeAttachment(ev, organisation.small_logo_attachment_id)}
                                >
                                    Remove
                                </NativeButton>
                            </div>
                        )}
                        {smallLogo === null && (
                            <RestrictedComponent
                                roles={["administrator", "superuser", "user"]}
                                message="(access restricted)"
                            >
                                <AttachmentsImageDropzone
                                    parentType={parentType}
                                    parentId={parentId}
                                    onUploadFinished={onUploadFinished}
                                    uploadFinishedParameter="small_logo_attachment_id"
                                    attachmentId={organisation.small_logo_attachment_id}
                                    maxFileCount={1}
                                />
                            </RestrictedComponent>
                        )}
                    </div>
                </label>
            </form>
        </div>
    );
};

export default OrganisationForm;

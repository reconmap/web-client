import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import NativeTextArea from "components/form/NativeTextArea";
import PageTitle from "components/logic/PageTitle";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import PrimaryButton from "../ui/buttons/Primary";

const SendReport = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [project] = useFetch(`/projects/${projectId}`);
    const [revisions] = useFetch(`/reports?projectId=${projectId}`);

    const [deliverySettings, setDeliverySettings] = useState({
        report_id: null,
        recipients: null,
        subject: "[CONFIDENTIAL] Security report attached",
        body: "Please review attachment containing a security report.",
    });

    const handleSend = async (ev) => {
        if (ev.target.checkValidity() === false) {
            ev.preventDefault();
            ev.stopPropagation();
            return;
        }

        secureApiFetch(`/reports/${deliverySettings.report_id}/send`, {
            method: "POST",
            body: JSON.stringify(deliverySettings),
        })
            .then(() => {
                navigate(`/projects/${project.id}/report`);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleFormChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setDeliverySettings({ ...deliverySettings, [name]: value });
    };

    useEffect(() => {
        if (revisions && deliverySettings.report_id === null)
            setDeliverySettings({
                ...deliverySettings,
                report_id: revisions[0].id,
            });
    }, [revisions, deliverySettings]);

    if (!project) return <Loading />;

    return (
        <div>
            <PageTitle value="Send report" />
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    {project && <Link to={`/projects/${project.id}`}>{project.name}</Link>}
                    {project && <Link to={`/projects/${project.id}/report`}>Report</Link>}
                </Breadcrumb>
            </div>
            <form onSubmit={handleSend}>
                <Title title="Send report" />
                <div isRequired>
                    <label htmlFor="reportId">Revision</label>
                    <NativeSelect id="reportId" name="report_id" onChange={handleFormChange}>
                        {revisions &&
                            revisions.map((revision) => <option value={revision.id}>{revision.version_name}</option>)}
                    </NativeSelect>
                </div>
                <div isRequired>
                    <label>Recipients</label>
                    <NativeInput
                        type="text"
                        name="recipients"
                        onChange={handleFormChange}
                        autoFocus
                        required
                        placeholder="foo@bar.sec"
                    />
                    <div>Comma separated list of email addresses.</div>
                </div>
                <div isRequired>
                    <label>Subject</label>
                    <NativeInput
                        type="text"
                        name="subject"
                        onChange={handleFormChange}
                        value={deliverySettings.subject}
                        required
                    />
                </div>
                <div isRequired>
                    <label>Body</label>
                    <NativeTextArea name="body" onChange={handleFormChange} value={deliverySettings.body} />
                </div>

                <PrimaryButton type="submit">Send</PrimaryButton>
            </form>
        </div>
    );
};

export default SendReport;

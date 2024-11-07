import LabelledField from "components/form/LabelledField";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import NativeTextArea from "components/form/NativeTextArea";
import PageTitle from "components/logic/PageTitle";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
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

    const deliverySettings = {
        report_id: null,
        recipients: null,
        subject: "[CONFIDENTIAL] Security report attached",
        body: "Please review attachment containing a security report.",
    };

    const handleSend = async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        if (ev.target.checkValidity() === false) {
            return;
        }

        const formData = new FormData(ev.target);
        const formObject = Object.fromEntries(formData.entries());

        secureApiFetch(`/reports/${formObject.report_id}/send`, {
            method: "POST",
            body: JSON.stringify(formObject),
        })
            .then(() => {
                navigate(`/projects/${project.id}/report`);
            })
            .catch((err) => {
                console.error(err);
            });
    };

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
                <div>
                    <LabelledField
                        label="Revision"
                        htmlFor="reportId"
                        control={
                            <NativeSelect id="reportId" name="report_id">
                                {revisions &&
                                    revisions.map((revision) => (
                                        <option value={revision.id}>{revision.version_name}</option>
                                    ))}
                            </NativeSelect>
                        }
                    />
                </div>
                <div>
                    <label>Recipients</label>
                    <NativeInput type="text" name="recipients" autoFocus required placeholder="foo@bar.sec" />
                    <div>Comma separated list of email addresses.</div>
                </div>
                <div>
                    <label>Subject</label>
                    <NativeInput type="text" name="subject" defaultValue={deliverySettings.subject} required />
                </div>
                <div>
                    <label>Body</label>
                    <NativeTextArea name="body" defaultValue={deliverySettings.body} />
                </div>

                <PrimaryButton type="submit">Send</PrimaryButton>
            </form>
        </div>
    );
};

export default SendReport;

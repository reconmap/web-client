import CommandUsage from "models/CommandUsage.js";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "../../services/api.js";
import Breadcrumb from "../ui/Breadcrumb.jsx";
import Title from "../ui/Title.jsx";
import CommandUsageForm from "./UsageForm.jsx";

const AddCommandUsagePage = () => {
    const navigate = useNavigate();
    const { commandId } = useParams();
    const defaultCommmandUsage = { command_id: commandId, ...CommandUsage };

    const [commandUsage, setCommandUsage] = useState(defaultCommmandUsage);

    const onCommandUsageSubmit = (ev) => {
        ev.preventDefault();

        secureApiFetch(`/commands/${commandId}/usages`, {
            method: "POST",
            body: JSON.stringify(commandUsage),
        }).then(() => {
            setCommandUsage(defaultCommmandUsage);
            navigate(`/commands/${commandId}`);
        });
        return false;
    };

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/commands">Commands</Link>
                </Breadcrumb>
            </div>
            <Title title="New command details" />
            <CommandUsageForm
                onFormSubmit={onCommandUsageSubmit}
                commandUsage={commandUsage}
                isEditForm={false}
                commandSetter={setCommandUsage}
            />{" "}
        </div>
    );
};

export default AddCommandUsagePage;

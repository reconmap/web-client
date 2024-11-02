import PageTitle from "components/logic/PageTitle";
import Licenses from "data/licenses.json";
import Breadcrumb from "../ui/Breadcrumb";
import { IconQuestionCircle } from "../ui/Icons";

const LicensesPage = () => {
    return (
        <div>
            <PageTitle value="Licenses" />

            <div className="heading">
                <Breadcrumb />
            </div>
            <title title="Licenses" icon={<IconQuestionCircle />} />

            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Dependency</th>
                        <th>License</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(Licenses).map((entry) => (
                        <tr>
                            <td>{entry[0]}</td>
                            <td>{entry[1].licenses}</td>
                            <td>{entry[1].url}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LicensesPage;

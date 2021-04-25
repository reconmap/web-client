import RestrictedComponent from "components/logic/RestrictedComponent";
import React from "react";
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge';
import VulnerabilityBadge from '../badges/VulnerabilityBadge';
import VulnerabilityCategoryBadge from '../badges/VulnerabilityCategoryBadge';
import DeleteButton from "../ui/buttons/Delete";
import LinkButton from "../ui/buttons/Link";
import NoResults from "../ui/NoResults";
import VulnerabilityStatusBadge from "./StatusBadge";

const VulnerabilitiesTable = ({ vulnerabilities, selection, setSelection, destroy }) => {
    const showSelection = selection !== undefined;

    const onSelectionChange = ev => {
        const target = ev.target;
        const selectionId = parseInt(target.value);
        if (target.checked) {
            setSelection([...selection, selectionId]);
        } else {
            setSelection(selection.filter(value => value !== selectionId));
        }
    };


    return (
        <table>
            <thead>
                <tr>
                    {showSelection && <th style={{ width: "32px" }}>&nbsp;</th>}
                    <th style={{ width: '190px' }}>Summary</th>
                    <th style={{ width: '120px' }}>Status</th>
                    <th style={{ width: '120px' }}>Risk</th>
                    <th style={{ width: '120px' }}><abbr title="Common Vulnerability Scoring System">CVSS</abbr> score</th>
                    <th className='only-desktop' style={{ width: '20%' }}>Category</th>
                    <th style={{ width: '15%' }}>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {vulnerabilities.length === 0 ?
                    <tr>
                        <td colSpan="6"><NoResults /></td>
                    </tr> :
                    vulnerabilities.map((vulnerability, index) => {
                        return (
                            <tr key={index}>
                                {showSelection &&
                                    <td>
                                        <input
                                            type="checkbox"
                                            value={vulnerability.id}
                                            onChange={onSelectionChange}
                                            checked={selection.includes(vulnerability.id)}
                                        />
                                    </td>
                                }
                                <td><VulnerabilityBadge vulnerability={vulnerability} /></td>
                                <td><VulnerabilityStatusBadge vulnerability={vulnerability} /></td>
                                <td><RiskBadge risk={vulnerability.risk} /></td>
                                <td><CvssScore score={vulnerability.cvss_score} /></td>
                                <td className='only-desktop'><VulnerabilityCategoryBadge category={vulnerability.category_name} /></td>
                                <td className='flex justify-end'>
                                    <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                                        <LinkButton href={`/vulnerabilities/${vulnerability.id}/edit`}>Edit</LinkButton>
                                        {destroy &&
                                            <DeleteButton onClick={() => destroy(vulnerability.id)} />
                                        }
                                    </RestrictedComponent>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}

export default VulnerabilitiesTable;

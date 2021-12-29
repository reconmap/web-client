import { Checkbox, Stack } from "@chakra-ui/react";
import RestrictedComponent from "components/logic/RestrictedComponent";
import ProjectBadge from "components/projects/ProjectBadge";
import AscendingSortLink from "components/ui/AscendingSortLink";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import ReloadButton from "components/ui/buttons/Reload";
import DescendingSortLink from "components/ui/DescendingSortLink";
import NoResultsTableRow from "components/ui/NoResultsTableRow";
import Tags from "components/ui/Tags";
import useDelete from "hooks/useDelete";
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge';
import VulnerabilityBadge from '../badges/VulnerabilityBadge';
import LinkButton from "../ui/buttons/Link";
import VulnerabilityCategorySpan from "./categories/Span";
import VulnerabilityStatusBadge from "./StatusBadge";

const VulnerabilitiesTable = ({ vulnerabilities, selection, setSelection, reloadCallback, onSortChange }) => {
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

    const onHeaderCheckboxClick = ev => {
        if (ev.target.checked) {
            setSelection(vulnerabilities.map(vulnerability => vulnerability.id));
        } else {
            setSelection([]);
        }
    }

    const deleteVulnerability = useDelete('/vulnerabilities/', reloadCallback, 'Do you really want to delete this vulnerability?', 'The vulnerability has been deleted.');

    return <table>
        <thead>
            <tr>
                {showSelection && <th style={{ width: "32px", textAlign: "left" }}><Checkbox onChange={onHeaderCheckboxClick} isChecked={selection.length && selection.length === vulnerabilities.length} /></th>}
                <th style={{ width: '190px' }}>Summary</th>
                <th style={{ width: '190px' }}>Project</th>
                <th style={{ width: '120px' }}><DescendingSortLink callback={onSortChange} property="status" /> Status <AscendingSortLink callback={onSortChange} property="status" /></th>
                <th style={{ width: '120px' }}><DescendingSortLink callback={onSortChange} property="risk" /> Risk <AscendingSortLink callback={onSortChange} property="risk" /></th>
                <th style={{ width: '120px' }}><DescendingSortLink callback={onSortChange} property="cvss_score" /> <abbr title="Common Vulnerability Scoring System">CVSS</abbr> score <AscendingSortLink callback={onSortChange} property="cvss_score" /></th>
                <th className='only-desktop' style={{ width: '20%' }}><DescendingSortLink callback={onSortChange} property="category_name" /> Category <AscendingSortLink callback={onSortChange} property="category_name" /></th>
                <th style={{ width: '15%', textAlign: 'right' }}><ReloadButton onClick={reloadCallback} /></th>
            </tr>
        </thead>
        <tbody>
            {vulnerabilities.length === 0 ?
                <NoResultsTableRow numColumns="6" />
                :
                vulnerabilities.map((vulnerability, index) => {
                    return (
                        <tr key={index}>
                            {showSelection &&
                                <td>
                                    <Checkbox
                                        value={vulnerability.id}
                                        onChange={onSelectionChange}
                                        isChecked={selection.includes(vulnerability.id)}
                                    />
                                </td>
                            }
                            <td>
                                <Stack>
                                    <VulnerabilityBadge vulnerability={vulnerability} />
                                    <div><Tags values={vulnerability.tags} /></div>
                                </Stack>
                            </td>
                            <td>{vulnerability.is_template ? <span title="Not applicable">(n/a)</span> : <ProjectBadge project={{ id: vulnerability.project_id, name: vulnerability.project_name }} />}</td>
                            <td><VulnerabilityStatusBadge vulnerability={vulnerability} /></td>
                            <td><RiskBadge risk={vulnerability.risk} /></td>
                            <td><CvssScore score={vulnerability.cvss_score} /></td>
                            <td className='only-desktop'>
                                <VulnerabilityCategorySpan name={vulnerability.category_name} parentName={vulnerability.parent_category_name} />
                            </td>
                            <td className='flex justify-end'>
                                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                                    <LinkButton href={`/vulnerabilities/${vulnerability.id}/edit`}>Edit</LinkButton>
                                    {reloadCallback &&
                                        <DeleteIconButton onClick={() => deleteVulnerability(vulnerability.id)} />
                                    }
                                </RestrictedComponent>
                            </td>
                        </tr>
                    )
                })}
        </tbody>
    </table>
}

export default VulnerabilitiesTable;

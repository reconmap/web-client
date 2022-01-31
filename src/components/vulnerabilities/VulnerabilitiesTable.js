import { Checkbox, Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import RestrictedComponent from "components/logic/RestrictedComponent";
import ProjectBadge from "components/projects/ProjectBadge";
import AscendingSortLink from "components/ui/AscendingSortLink";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import ReloadButton from "components/ui/buttons/Reload";
import DescendingSortLink from "components/ui/DescendingSortLink";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import Tags from "components/ui/Tags";
import useDelete from "hooks/useDelete";
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge';
import VulnerabilityBadge from '../badges/VulnerabilityBadge';
import LinkButton from "../ui/buttons/Link";
import VulnerabilityCategorySpan from "./categories/Span";
import VulnerabilityStatusBadge from "./StatusBadge";

const VulnerabilitiesTable = ({ tableModel, tableModelSetter: setTableModel, reloadCallback }) => {
    const showSelection = tableModel.selection !== undefined;

    const onSortChange = (ev, column, order) => {
        ev.preventDefault();

        setTableModel({ ...tableModel, sortBy: { column: column, order: order } })
    }

    const onSelectionChange = ev => {
        const target = ev.target;
        const selectionId = parseInt(target.value);
        if (target.checked) {
            setTableModel({ ...tableModel, selection: [...tableModel.selection, selectionId] })
        } else {
            setTableModel({ ...tableModel, selection: tableModel.selection.filter(value => value !== selectionId) })
        }
    };

    const onHeaderCheckboxClick = ev => {
        if (ev.target.checked) {
            setTableModel({ ...tableModel, selection: tableModel.vulnerabilities.map(vulnerability => vulnerability.id) })
        } else {
            setTableModel({ ...tableModel, selection: [] })
        }
    }

    const numColumns = showSelection ? 8 : 7;
    const vulnerabilitiesLength = null !== tableModel.vulnerabilities ? tableModel.vulnerabilities.length : 0;

    const deleteVulnerability = useDelete('/vulnerabilities/', reloadCallback, 'Do you really want to delete this vulnerability?', 'The vulnerability has been deleted.');

    return <Table>
        <Thead>
            <Tr>
                {showSelection && <Th style={{ width: "32px", textAlign: "left" }}><Checkbox onChange={onHeaderCheckboxClick} isChecked={tableModel.selection.length && tableModel.selection.length === vulnerabilitiesLength} isDisabled={tableModel.vulnerabilitiesLength === 0} /></Th>}
                <Th style={{ width: '190px' }}>Summary</Th>
                <Th style={{ width: '190px' }}>Project</Th>
                <Th style={{ width: '120px' }}><DescendingSortLink callback={onSortChange} property="status" /> Status <AscendingSortLink callback={onSortChange} property="status" /></Th>
                <Th style={{ width: '120px' }}><DescendingSortLink callback={onSortChange} property="risk" /> Risk <AscendingSortLink callback={onSortChange} property="risk" /></Th>
                <Th style={{ width: '120px' }}><DescendingSortLink callback={onSortChange} property="cvss_score" /> <abbr title="Common Vulnerability Scoring System">CVSS</abbr> score <AscendingSortLink callback={onSortChange} property="cvss_score" /></Th>
                <Th className='only-desktop' style={{ width: '20%' }}><DescendingSortLink callback={onSortChange} property="category_name" /> Category <AscendingSortLink callback={onSortChange} property="category_name" /></Th>
                <Th style={{ width: '15%', textAlign: 'right' }}><ReloadButton onClick={reloadCallback} /></Th>
            </Tr>
        </Thead>
        <Tbody>
            {null === tableModel.vulnerabilities &&
                <LoadingTableRow numColumns={numColumns} />}
            {null !== tableModel.vulnerabilities && 0 === tableModel.vulnerabilities.length &&
                <NoResultsTableRow numColumns={numColumns} />}
            {null !== tableModel.vulnerabilities && tableModel.vulnerabilities.length > 0 &&
                tableModel.vulnerabilities.map((vulnerability, index) => {
                    return <Tr key={index}>
                        {showSelection &&
                            <Td>
                                <Checkbox
                                    value={vulnerability.id}
                                    onChange={onSelectionChange}
                                    isChecked={tableModel.selection.includes(vulnerability.id)}
                                />
                            </Td>
                        }
                        <Td>
                            <Stack>
                                <VulnerabilityBadge vulnerability={vulnerability} />
                                <div><Tags values={vulnerability.tags} /></div>
                            </Stack>
                        </Td>
                        <Td>{vulnerability.is_template ? <span title="Not applicable">(n/a)</span> : <ProjectBadge project={{ id: vulnerability.project_id, name: vulnerability.project_name }} />}</Td>
                        <Td><VulnerabilityStatusBadge vulnerability={vulnerability} /></Td>
                        <Td><RiskBadge risk={vulnerability.risk} /></Td>
                        <Td><CvssScore score={vulnerability.cvss_score} /></Td>
                        <Td className='only-desktop'>
                            <VulnerabilityCategorySpan name={vulnerability.category_name} parentName={vulnerability.parent_category_name} />
                        </Td>
                        <Td className='flex justify-end'>
                            <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                                <LinkButton href={`/vulnerabilities/${vulnerability.id}/edit`}>Edit</LinkButton>
                                {reloadCallback &&
                                    <DeleteIconButton onClick={() => deleteVulnerability(vulnerability.id)} />
                                }
                            </RestrictedComponent>
                        </Td>
                    </Tr>
                })}
        </Tbody>
    </Table>
}

export default VulnerabilitiesTable;

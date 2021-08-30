import { HStack, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AttachmentsTable from 'components/attachments/AttachmentsTable';
import AttachmentsDropzone from 'components/attachments/Dropzone';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import Tags from 'components/ui/Tags';
import VulnerabilityStatuses from 'models/VulnerabilityStatuses';
import React from 'react';
import { Link, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import { IconDocument, IconFlag } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import { actionCompletedToast } from "../ui/toast";
import useDelete from './../../hooks/useDelete';
import useFetch from './../../hooks/useFetch';
import VulnerabilitiesNotesTab from "./NotesTab";
import VulnerabilityDescriptionPanel from './VulnerabilityDescriptionPanel';
import VulnerabilityRemediationPanel from './VulnerabilityRemediationPanel';

const VulnerabilityDetails = () => {
    const history = useHistory()
    const { params: { vulnerabilityId } } = useRouteMatch()
    const [vulnerability, updateVulnerability] = useFetch(`/vulnerabilities/${vulnerabilityId}`)
    const deleteVulnerability = useDelete(`/vulnerabilities/`)

    const parentType = 'vulnerability';
    const parentId = vulnerabilityId;
    const [attachments, reloadAttachments] = useFetch(`/attachments?parentType=${parentType}&parentId=${parentId}`)

    const handleDelete = async () => {
        const confirmed = await deleteVulnerability(vulnerabilityId);
        if (confirmed)
            history.push('/vulnerabilities')
    }

    const onStatusChange = ev => {
        const [status, substatus] = ev.target.value.split('-');
        secureApiFetch(`/vulnerabilities/${vulnerability.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status, substatus })
        })
            .then(() => {
                actionCompletedToast("The status has been transitioned.");
                updateVulnerability()
            })
            .catch(err => console.error(err))
    }

    if (!vulnerability) return <Loading />

    if (vulnerability && vulnerability.is_template) {
        return <Redirect to={`/vulnerabilities/templates/${vulnerability.id}`} />
    }

    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/vulnerabilities">Vulnerabilities</Link>
            </Breadcrumb>
            <HStack alignItems='flex-end'>
                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <EditButton onClick={(ev) => {
                        ev.preventDefault();
                        history.push(`/vulnerabilities/${vulnerability.id}/edit`)
                    }}>Edit</EditButton>

                    <label>Transition to&nbsp;
                        <Select onChange={onStatusChange} value={vulnerability.status + '-' + vulnerability.substatus}>
                            {VulnerabilityStatuses.map(status =>
                                <option key={`vulnstatus_${status.id}`} value={status.id}>{status.name}</option>
                            )}
                        </Select>
                    </label>

                    <DeleteButton onClick={handleDelete} />
                </RestrictedComponent>
            </HStack>
        </div>
        <article>
            <PageTitle value={`${vulnerability.summary} vulnerability`} />

            <Title type='Vulnerability' title={vulnerability.external_id ? <><strong>{vulnerability.external_id.toUpperCase()}</strong>&nbsp;{vulnerability.summary}</> : vulnerability.summary} icon={<IconFlag />} />
            <Tags values={vulnerability.tags} />

            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Remediation</Tab>
                    <Tab>Notes</Tab>
                    <Tab>Attachments</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <VulnerabilityDescriptionPanel vulnerability={vulnerability} />
                    </TabPanel>
                    <TabPanel>
                        <VulnerabilityRemediationPanel vulnerability={vulnerability} />
                    </TabPanel>
                    <TabPanel>
                        <VulnerabilitiesNotesTab vulnerability={vulnerability} />
                    </TabPanel>
                    <TabPanel>
                        <AttachmentsDropzone parentType={parentType} parentId={parentId} onUploadFinished={reloadAttachments} />

                        <h4><IconDocument />Attachment list</h4>
                        <AttachmentsTable attachments={attachments} reloadAttachments={reloadAttachments} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </article>

    </div >
}

export default VulnerabilityDetails;

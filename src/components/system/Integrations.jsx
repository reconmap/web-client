import PageTitle from 'components/logic/PageTitle';
import ExternalLink from 'components/ui/ExternalLink';
import LoadingTableRow from 'components/ui/tables/LoadingTableRow';
import NoResultsTableRow from 'components/ui/tables/NoResultsTableRow';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import { IconExtensions } from '../ui/Icons';

const SystemIntegrationsPage = () => {
    const [integrations] = useFetch('/system/integrations')

    return <div>
        <PageTitle value="Integrations" />
        <div className='heading'>
            <Breadcrumb>
                <div>System</div>
            </Breadcrumb>
        </div>
        <title title="Integrations" icon={<IconExtensions />} />

        <table className='rm-listing'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>External URL</th>
                    <th>Configured?</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {null === integrations && <LoadingTableRow numColumns={5} />}
                {null !== integrations && 0 === integrations.length && <NoResultsTableRow numColumns={5} />}
                {null !== integrations && 0 !== integrations.length && integrations.map((integration, index) =>
                    <tr key={index}>
                        <td>{integration.name}</td>
                        <td>{integration.description}</td>
                        <td><ExternalLink href={integration.externalUrl}>{integration.externalUrl}</ExternalLink></td>
                        <td>{integration.configured ? 'Yes' : 'No'}</td>
                        <td>-</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}

export default SystemIntegrationsPage;

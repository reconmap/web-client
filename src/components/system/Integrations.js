import { Grid } from '@chakra-ui/layout';
import PageTitle from 'components/logic/PageTitle';
import ExternalLink from 'components/ui/ExternalLink';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import { IconExtensions } from '../ui/Icons';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Title from "../ui/Title";

const SystemIntegrationsPage = () => {
    const [integrations] = useFetch('/system/integrations')

    return (
        <div>
            <PageTitle value="Integrations" />
            <div className='heading'>
                <Breadcrumb>
                    <div>System</div>
                </Breadcrumb>
            </div>
            <Title title="Integrations" icon={<IconExtensions />} />
            {!integrations ? <Loading /> : integrations.length === 0 ? <NoResults /> :
                <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    {integrations.map((integration, index) =>
                        <article key={index} className='card' style={{ marginRight: 10 }}>
                            <h2> {integration.name} </h2>
                            <p>{integration.description}</p>
                            <dl> <dt>External URL</dt>
                                <dd><ExternalLink href={integration.externalUrl}>{integration.externalUrl}</ExternalLink></dd>
                                <dt>Configured</dt>
                                <dd>{integration.configured ? 'Yes' : 'No'}</dd>
                            </dl>
                        </article>
                    )}
                </Grid>}

        </div>
    )
}

export default SystemIntegrationsPage;

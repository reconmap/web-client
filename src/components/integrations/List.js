import useSetTitle from '../../hooks/useSetTitle';
import useFetch from '../../hooks/useFetch';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Breadcrumb from '../ui/Breadcrumb';
import Title from "../ui/Title";
import { IconExtensions } from '../ui/Icons';

const IntegrationsList = ({ history }) => {
    const [integrations] = useFetch('/system/integrations')

    useSetTitle('Integrations');

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <div>System</div>
                </Breadcrumb>
            </div>
            <Title title="Integrations" icon={<IconExtensions />} />
            {!integrations ? <Loading /> : integrations.length === 0 ? <NoResults /> :
                <section className='flex'>
                    {integrations.map((integration, index) =>
                        <article key={index} className='card'>
                            <h2> {integration.name} </h2>
                            <p>{integration.description}</p>
                            <dl> <dt>External URL</dt>
                                <dd><a href={integration.externalUrl}>{integration.externalUrl}</a></dd>
                                <dt>Configured</dt>
                                <dd>{integration.configured ? 'Yes' : 'No'}</dd>
                            </dl>
                        </article>
                    )}
                </section>}

        </div>
    )
}

export default IntegrationsList

import useSetTitle from '../../hooks/useSetTitle';
import useFetch from '../../hooks/useFetch';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Breadcrumb from '../ui/Breadcrumb';
import Title from "../ui/Title";

const IntegrationsList = ({history}) => {
    useSetTitle('Integrations');
    const [integrations] = useFetch('/integrations')
    return (
        <div>
            <div className='heading'>
                <Breadcrumb history={history}/>
            </div>
            <Title type="System Utils" title="Integrations"/>
            {!integrations ? <Loading/> : integrations.length === 0 ? <NoResults/> :
                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {integrations.map((integration, index) =>
                        <article key={index} className='card '>
                            <h2 className='mb-2'>
                                {integration.name}
                            </h2>
                            <p className='mb-2'>{integration.description}</p>
                            <dl>
                                <dt>External URL</dt>
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
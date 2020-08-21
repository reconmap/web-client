import React from 'react'

const IntegrationsList = () => {

    React.useEffect(() => { document.title = 'Integrations | Reconmap'; },[]);

    const INTEGRATIONS = [
        { app: 'Jira', desc: 'This integration allows you to import or export tasks to and from Jira', icon: 'list', enabled: 1 },
        { app: 'Trello', desc: 'This integration allows you to import or export tasks to and from trello', icon: 'trello', enabled: 1 },
        { app: 'Slack', desc: 'This integration allows you to import or export tasks to and from slack', icon: 'slack', enabled: 1 },
    ]
    return (
        <>
            <div className='heading'>
                <h1>Integrations</h1>
                <button onClick={() => { this.props.history.push("/integration/create"); }}>Create integration</button>
            </div>
            <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {INTEGRATIONS.map(integration =>
                    <article key={integration.app} className='base '>
                        <h2 className='mb-2'>
                            {integration.app}
                            <i data-feather={integration.icon} className={` text-red-600  float-right text-4xl`} />
                        </h2>
                            <p className='mb-2'>{integration.desc}</p>
                            <button className='mt-2'><i data-feather='check-square' className='mr-2'></i> Enable</button>
                    </article>
                )}
            </section>

        </>
    )
}

export default IntegrationsList
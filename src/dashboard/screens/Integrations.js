import React from 'react'

const Integrations = () => {

    React.useEffect(() => { document.title = 'Integrations | Reconmap'; },[]);

    const INTEGRATIONS = [
        { app: 'Jira', desc: 'This integration allows you to import or export tasks to and from Jira', icon: 'list', enabled: 1 },
        { app: 'Trello', desc: 'This integration allows you to import or export tasks to and from trello', icon: 'trello', enabled: 1 },
        { app: 'Slack', desc: 'This integration allows you to import or export tasks to and from slack', icon: 'slack', enabled: 1 },
    ]
    return (
        <>
            <h1>Integrations</h1>
            <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {INTEGRATIONS.map(integration =>
                    <article key={integration.app} className='base base-integration'>
                        <h4 className='base-subtitle'>
                            {integration.app}
                            <i data-feather={integration.icon} className={` text-red-600  float-right text-4xl`} />
                        </h4>
                        <p className='base-desc py-4'>{integration.desc}</p>
                        <p className='text-right'><button className="px-3 py-1"><i data-feather='check-square' className='mr-2'></i> Enable</button></p>
                    </article>
                )}
            </section>

        </>
    )
}

export default Integrations
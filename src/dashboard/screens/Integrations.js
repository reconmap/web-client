import React from 'react'

const Integrations = () => {
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
                    <article key={integration.app} className='base hover:border-red-600 border-2 border-transparent flex flex-col'>
                        <h4 className='text-white flex py-2 items-center justify-between mb-4'>
                            {integration.app}
                            <i data-feather={integration.icon} className={` text-red-600  text-4xl`} />
                        </h4>
                        <p className='text-gray-500 text-sm'>{integration.desc}</p>
                        <p className='text-right'><button className="px-3 py-1"><i data-feather='check-square' className='mr-2'></i> Enable</button></p>
                    </article>
                )}
            </section>

        </>
    )
}

export default Integrations
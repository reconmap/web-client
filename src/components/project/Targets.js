import React from 'react'
import Loading from "../ui/Loading"

const ProjectTargets = ({ targets, handleAddTarget }) => {
    return <section className='mb-10'>
        <h2>Target(s)</h2>
        <div className='flex flex-wrap gap-4'>
            {targets ?
                targets.map((target, index) =>
                    <div key={index} className='card reactive w-64'>
                        <h3>{target.kind}</h3>
                        <h2>{target.name}</h2>
                    </div>)
                : <Loading />}
            <div className='card outline reactive w-64' onClick={handleAddTarget}>
                <h3>Add target</h3>
            </div>
        </div>
    </section>
}

export default ProjectTargets
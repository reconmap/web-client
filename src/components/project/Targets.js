import React from 'react'
import Loading from "../ui/Loading"
import { IconServer, IconPlus } from '../icons'

const ProjectTargets = ({ targets, handleAddTarget }) => {
    return <section>
                <div className='heading'>
                    <IconServer styling='text-gray-700'/>   
                    <h2>Target(s)</h2>
                    <button onClick={handleAddTarget}>
                    <IconPlus/>
                    Add target
                    </button>
                </div>
                <div className='flex flex-wrap gap-4'>
                    {targets ?
                        targets.map((target, index) =>
                            <article key={index} className='card reactive w-64 ' >
                                <h2 style={{ color:'white'}}>{target.name}</h2>
                                <footer className='flex items-center justify-between'>
                                    {target.kind}
                                    <IconServer styling='text-gray-700'/>
                                </footer>
                            </article>)
                        : <Loading />}
                    {/* <div className='card outline reactive w-64 items-center justify-center text-center ' onClick={handleAddTarget}>
                        <IconPlus size='20' styling='text-gray-600'/>
                        <h3>Add target</h3>
                    </div> */}
                </div>
            </section>
}

export default ProjectTargets
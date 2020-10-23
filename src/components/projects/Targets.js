import Loading from "../ui/Loading"
import { IconServer, IconPlus } from '../icons'
import { useHistory } from 'react-router-dom'
import BtnSecondary from '../ui/buttons/BtnSecondary'

const ProjectTargets = ({ project, targets, handleAddTarget }) => {
    const history = useHistory()
    return <section>
        <div className='heading'>
            <IconServer styling='text-gray-700' />
            <h2>Target(s)</h2>
            <BtnSecondary onClick={handleAddTarget} size='sm'><IconPlus size={4} />Add target</BtnSecondary>
        </div>
        <div className='flex flex-wrap gap-4'>
            {targets ?
                targets.map((target, index) =>
                    <article key={index} className='card w-64 ' onClick={() => history.push(`/projects/${project.id}/targets/${target.id}`)}>
                        <h2 style={{ color: 'white' }}>{target.name}</h2>
                        <footer className='flex items-center justify-between'>
                            {target.kind}
                            <IconServer styling='text-gray-700' />
                        </footer>
                    </article>)
                : <Loading />}
        </div>
    </section>
}

export default ProjectTargets
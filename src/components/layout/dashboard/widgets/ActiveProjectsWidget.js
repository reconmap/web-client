import { Stack } from "@chakra-ui/react";
import ProjectBadge from "components/projects/ProjectBadge";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";

const ActiveProjectsWidget = () => {
    const [projects] = useFetch(`/projects?status=active&limit=5`)

    if (!projects) return <Loading />

    return <article className="card">
        <h4>Active projects</h4>

        {projects.length === 0 ?
            <p>No projects to show.</p>
            :
            <Stack>
                <h5>Links</h5>
                {projects.map(project => <ProjectBadge project={project} />)}
            </Stack>
        }
    </article>
}

export default ActiveProjectsWidget;

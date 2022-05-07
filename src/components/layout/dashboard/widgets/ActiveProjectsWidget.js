import { Stack } from "@chakra-ui/react";
import ProjectBadge from "components/projects/ProjectBadge";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import DashboardWidget from "./Widget";

const ActiveProjectsWidget = () => {
    const [projects] = useFetch(`/projects?status=active&page=0&limit=5`)

    if (!projects) return <Loading />

    return <DashboardWidget title="Active projects">

        {projects.length === 0 ?
            <p>No projects to show.</p>
            :
            <Stack>
                <h5>Links</h5>
                {projects.map(project => <ProjectBadge key={project.id} project={project} />)}
            </Stack>
        }
    </DashboardWidget>
}

export default ActiveProjectsWidget;

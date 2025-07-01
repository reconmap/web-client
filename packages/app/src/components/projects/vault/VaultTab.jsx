import RestrictedComponent from "components/logic/RestrictedComponent";
import useFetch from "hooks/useFetch";
import VaultSecretForm from "./VaultSecretForm.jsx";
import VaultTable from "./VaultTable.jsx";

const ProjectVaultTab = ({ project }) => {
    const [secrets, refreshVault] = useFetch(`/projects/${project.id}/vault`);

    return (
        <section>
            <RestrictedComponent roles={["administrator", "superuser", "user"]} message="(access restricted)">
                <VaultTable secrets={secrets} onDelete={() => refreshVault()} />
                <VaultSecretForm projectId={project.id} onSubmit={() => refreshVault()} />
            </RestrictedComponent>
        </section>
    );
};

export default ProjectVaultTab;

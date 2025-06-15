import VaultSecretForm from "components/projects/vault/VaultSecretForm.jsx";
import VaultTable from "components/projects/vault/VaultTable.jsx";
import useFetch from "hooks/useFetch.js";

const VaultPage = () => {
    const [secrets, refreshSecrets] = useFetch("/vault");

    return (
        <>
            <h3 className="title is-3">Vault</h3>

            <VaultSecretForm onSubmit={() => refreshSecrets()} />

            <VaultTable secrets={secrets} onDelete={() => refreshSecrets()} />
        </>
    );
};

export default VaultPage;

import { Stack } from "@chakra-ui/react";
import DocumentBadge from "components/documents/Badge";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";

const RecentDocumentsWidget = () => {
    const [documents] = useFetch(`/documents?limit=5`)

    if (!documents) return <Loading />

    return <article className="card">
        <h4>Recent documents</h4>

        {documents.length === 0 ?
            <p>No documents to show.</p>
            :
            <Stack>
                <h5>Links</h5>
                {documents.map(doc => <DocumentBadge document={doc} />)}
            </Stack>
        }
    </article>
}

export default RecentDocumentsWidget;

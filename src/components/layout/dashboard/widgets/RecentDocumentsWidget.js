import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import { Link } from "react-router-dom";

const RecentDocumentsWidget = () => {
    const [documents] = useFetch(`/documents?limit=5`)

    if (!documents) return <Loading />

    return <article className="card">
        <h4>Recent documents</h4>

        {documents.length === 0 ?
            <p>No documents to show.</p>
            :
            <table>
                <thead>
                    <th>Title</th>
                </thead>
                <tbody>
                    {documents.map(doc => <tr>
                        <td><Link to={`/documents/${doc.id}`}>{doc.title}</Link></td>
                    </tr>)}
                </tbody>
            </table>
        }
    </article>
}

export default RecentDocumentsWidget;

import RestrictedComponent from "components/logic/RestrictedComponent";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import VisibilityLegend from "components/ui/VisibilityLegend";
import ReactMarkdown from "react-markdown";

const NotesTable = ({ notes, onDeleteButtonClick }) => {
    if (!notes || notes.length === 0) {
        return <>No comments</>;
    }

    return (
        <>
            <h3>Comments</h3>
            <ol>
                {notes.map((note) => (
                    <li style={{ marginBottom: 20, listStyleType: "none" }}>
                        <div>
                            <blockquote style={{ fontSize: "large" }}>
                                <ReactMarkdown>{note.content}</ReactMarkdown>
                            </blockquote>
                        </div>
                        <div style={{ fontSize: "small" }}>
                            <VisibilityLegend visibility={note.visibility} /> -
                            Posted by {note.user_name} @{" "}
                            <RelativeDateFormatter date={note.insert_ts} />.
                            <RestrictedComponent
                                roles={["administrator", "superuser", "user"]}
                            >
                                <DeleteIconButton
                                    onClick={(ev) =>
                                        onDeleteButtonClick(ev, note)
                                    }
                                />
                            </RestrictedComponent>
                        </div>
                    </li>
                ))}
            </ol>
        </>
    );
};

export default NotesTable;

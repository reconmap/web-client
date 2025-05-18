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
        <div class="container mt-5">
            <h3 class="title is-4 has-text-white">Comments</h3>

            {notes.map((note) => (
                <div class="box has-background-dark has-text-white">
                    <div class="media">
                        <div class="media-content">
                            <p class="mb-2">
                                {" "}
                                <blockquote style={{ fontSize: "large" }}>
                                    <ReactMarkdown>{note.content}</ReactMarkdown>
                                </blockquote>
                            </p>
                            <p class="is-size-7 has-text-grey-light">
                                <VisibilityLegend visibility={note.visibility} /> - Posted by {note.user_name} · Posted
                                by {note.user_name} · <RelativeDateFormatter date={note.insert_ts} />
                            </p>
                        </div>
                        <div class="media-right">
                            <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                                <DeleteIconButton onClick={(ev) => onDeleteButtonClick(ev, note)} />
                            </RestrictedComponent>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotesTable;

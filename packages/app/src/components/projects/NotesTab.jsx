import RestrictedComponent from "components/logic/RestrictedComponent";
import NoteModalDialog from "components/notes/ModalDialog";
import CreateButton from "components/ui/buttons/Create";
import useBoolean from "hooks/useBoolean";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import NotesTable from "../notes/Table";
import Loading from "../ui/Loading";

const ProjectNotesTab = ({ project }) => {
    const [notes, reloadNotes] = useFetch(`/notes?parentType=project&parentId=${project.id}`);
    const deleteNoteById = useDelete("/notes/", reloadNotes);
    const { value: isOpen, setTrue: openDialog, setFalse: closeDialog } = useBoolean();

    const onDeleteButtonClick = (ev, note) => {
        ev.preventDefault();

        deleteNoteById(note.id);
    };

    const onNoteFormSaved = () => {
        closeDialog();
        reloadNotes();
    };

    if (!notes) {
        return <Loading />;
    }

    return (
        <section>
            <h4 className="title is-4">Project comments</h4>
            <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                <NoteModalDialog
                    parentType="project"
                    parent={project}
                    isOpen={isOpen}
                    onClose={onNoteFormSaved}
                    onCancel={closeDialog}
                />
                <CreateButton onClick={openDialog}>Add comment...</CreateButton>
            </RestrictedComponent>

            <NotesTable notes={notes} onDeleteButtonClick={onDeleteButtonClick} />
        </section>
    );
};

export default ProjectNotesTab;

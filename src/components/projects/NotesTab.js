import { useDisclosure } from '@chakra-ui/react';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import NoteModalDialog from 'components/notes/ModalDialog';
import CreateButton from 'components/ui/buttons/Create';
import React from 'react';
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import NotesTable from "../notes/Table";
import { IconDocument } from '../ui/Icons';
import Loading from "../ui/Loading";

const ProjectNotesTab = ({ project }) => {
    const [notes, reloadNotes] = useFetch(`/notes?parentType=project&parentId=${project.id}`)
    const deleteNoteById = useDelete('/notes/', reloadNotes)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onDeleteButtonClick = (ev, note) => {
        ev.preventDefault();

        deleteNoteById(note.id);
    }

    const onNoteFormSaved = () => {
        reloadNotes();
        onClose();
    }

    if (!notes) {
        return <Loading />
    }

    return (
        <section>
            <NoteModalDialog parentType="project" parent={project} isOpen={isOpen} onClose={onNoteFormSaved} />
            <h4>
                <IconDocument />Project notes

                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <CreateButton onClick={onOpen}>Add note</CreateButton>
                </RestrictedComponent>
            </h4>
            <NotesTable notes={notes} onDeleteButtonClick={onDeleteButtonClick} />
        </section>
    )
}

export default ProjectNotesTab;

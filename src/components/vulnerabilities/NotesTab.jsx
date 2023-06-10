import { useDisclosure } from '@chakra-ui/react';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import NoteModalDialog from 'components/notes/ModalDialog';
import CreateButton from 'components/ui/buttons/Create';
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import NotesTable from "../notes/Table";
import { IconDocument } from '../ui/Icons';

const VulnerabilitiesNotesTab = ({ vulnerability }) => {
    const [notes, reloadNotes] = useFetch(`/notes?parentType=vulnerability&parentId=${vulnerability.id}`)
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

    return <section>
            <NoteModalDialog parentType="vulnerability" parent={vulnerability} isOpen={isOpen} onClose={onNoteFormSaved} onCancel={onClose} />
            <h4>
                <IconDocument />Vulnerability notes

                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <CreateButton onClick={onOpen}>Add note...</CreateButton>
                </RestrictedComponent>
            </h4>
            <NotesTable notes={notes} onDeleteButtonClick={onDeleteButtonClick} />
    </section>
}

export default VulnerabilitiesNotesTab;

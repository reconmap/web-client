import { Divider, Kbd } from "@chakra-ui/react";
import ModalDialog from "components/ui/ModalDIalog";
import { useCallback, useEffect, useState } from "react";
import isInputElement from "utilities/domUtils";
import './KeyboardShortcuts.scss';

const KeyboardShortcuts = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const onKeyDownListener = useCallback((ev) => {
        if (isInputElement(document.activeElement)) {
            return;
        }

        if (ev.key === '?') {
            ev.preventDefault();

            setModalVisible(!modalVisible);

        }
    }, [modalVisible]);

    const onModalClose = () => {
        setModalVisible(false);
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    return <ModalDialog title="Keyboard shortcuts" visible={modalVisible} onModalClose={onModalClose} style={{ maxWidth: '500px' }}>
        <div className="KeyboardShortcutsPopup">
            <h4>General</h4>
            <ul>
                <li>
                    Show/Hide keyboard shortcuts
                    <Kbd>?</Kbd>
                </li>
                <li>
                    Search
                    <Kbd>/</Kbd>
                </li>
            </ul>
            <Divider />

            <h4>Pagination</h4>
            <ul>
                <li>
                    Previous page
                    <Kbd>p</Kbd>
                </li>
                <li>
                    Next page
                    <Kbd>n</Kbd>
                </li>
            </ul>
        </div>
    </ModalDialog>
};

export default KeyboardShortcuts;

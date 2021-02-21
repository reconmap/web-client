import { useCallback, useEffect } from "react";
import isInputElement from "utilities/domUtils";
import './ModalDialog.scss';

const ModalDialog = ({ title, children, visible, onModalClose, style = {} }) => {

    const closeShortcutsPopup = () => {
        onModalClose();
    }

    const onKeyDownListener = useCallback((ev) => {
        if (isInputElement(document.activeElement)) {
            return;
        }

        if (ev.key === 'Escape') {
            ev.preventDefault();

            onModalClose();
        }
    }, [onModalClose]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    if (!visible) return null;

    return <div>
        <div className="modaldialog-backdrop" onClick={closeShortcutsPopup}></div>
        <div className="KeyboardShortcutsPopup" style={style}>
            <h3>{title}</h3>
            <hr />

            {children}
        </div>
    </div>
}

export default ModalDialog;

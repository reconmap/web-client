import {createRef, useCallback, useEffect} from "react";
import './KeyboardShortcuts.scss';
import isInputElement from "../../utilities/domUtils";

const KeyboardShortcuts = () => {
    const divRef = createRef();

    const onKeyDownListener = useCallback((ev) => {
        if (isInputElement(document.activeElement)) {
            return;
        }

        if (ev.key === '?') {
            ev.preventDefault();

            if (divRef.current.classList.contains('KeyboardShortcutsHidden')) {
                divRef.current.classList.remove('KeyboardShortcutsHidden');
            } else {
                divRef.current.classList.add('KeyboardShortcutsHidden');
            }
        } else if (ev.key === 'Escape') {
            ev.preventDefault();

            if (!divRef.current.classList.contains('KeyboardShortcutsHidden')) {
                divRef.current.classList.add('KeyboardShortcutsHidden');
            }
        }
    }, [divRef]);

    const closeShortcutsPopup = () => {
        divRef.current.classList.add('KeyboardShortcutsHidden');
    }
    
    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    return <div ref={divRef} className="KeyboardShortcutsHidden">
        <div className="KeyboardShortcuts" onClick={closeShortcutsPopup}></div>
        <div className="KeyboardShortcutsPopup">
            <h3>Keyboard shortcuts</h3>
            <hr />

            <h4>General</h4>
            <ul>
                <li>
                    Show/Hide keyboard shortcuts
                    <kbd>?</kbd>
                </li>
                <li>
                    Search
                    <kbd>/</kbd>
                </li>
            </ul>
            <hr />

            <h4>Pagination</h4>
            <ul>
                <li>
                    Previous page
                    <kbd>p</kbd>
                </li>
                <li>
                    Next page
                    <kbd>n</kbd>
                </li>
            </ul>
        </div>
    </div>
};

export default KeyboardShortcuts;

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

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    return <div ref={divRef} className="KeyboardShortcutsHidden">
        <div className="KeyboardShortcuts"></div>
        <div className="KeyboardShortcutsPopup">
            <h2>Keyboard shortcuts</h2>

            <h3>General</h3>
            <ul>
                <li><strong>Show/Hide keyboard shortcuts</strong>?</li>
                <li><strong>Search</strong>/</li>
            </ul>

            <h3>Pagination</h3>
            <ul>
                <li><strong>Previous page</strong>p</li>
                <li><strong>Next page</strong>n</li>
            </ul>
        </div>
    </div>
};

export default KeyboardShortcuts;

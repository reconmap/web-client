import {createRef, useCallback, useEffect} from "react";
import './KeyboardShortcuts.scss';
import isInputElement from "../../utilities/domUtils";

const KeyboardShortcuts = () => {
    const divRef = createRef();

    const onKeyDownListener = useCallback((ev) => {
        if (!isInputElement(document.activeElement) && ev.key === '?') {
            ev.preventDefault();

            if (divRef.current.classList.contains('KeyboardShortcutsHidden')) {
                divRef.current.classList.remove('KeyboardShortcutsHidden');
            } else {
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

    return <div ref={divRef} className="KeyboardShortcuts KeyboardShortcutsHidden">
        <h2>Keyboard shortcuts</h2>

        <ul>
            <li><strong>Show/Hide keyboard shortcuts</strong>: ?</li>
            <li><strong>Search</strong>: /</li>
        </ul>
    </div>
};

export default KeyboardShortcuts;


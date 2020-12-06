import {useHistory} from 'react-router-dom'
import {createRef, useCallback, useEffect} from "react";

const SearchBox = () => {
    const history = useHistory();
    const inputRef = createRef();

    const onKeyDownListener = useCallback((ev) => {
        if (ev.key === '/' && document.activeElement !== inputRef.current) {
            ev.preventDefault();

            inputRef.current.select();
            inputRef.current.focus();
        }
    }, [inputRef]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    const handleSearchKeyDown = ev => {
        const inputField = ev.target;
        const trimmedValue = inputField.value.trim();
        if (ev.key === 'Enter' && trimmedValue.length > 0) {
            history.push('/search/' + encodeURIComponent(trimmedValue));
        }
    }

    return <input ref={inputRef} type="search" placeholder="Search..." onKeyDown={handleSearchKeyDown}/>
}

export default SearchBox;

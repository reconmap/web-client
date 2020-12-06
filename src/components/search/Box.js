import {useHistory} from 'react-router-dom'

const SearchBox = () => {
    const history = useHistory()

    const handleSearchKeyDown = ev => {
        const inputField = ev.target;
        const trimmedValue = inputField.value.trim();
        if (ev.key === 'Enter' && trimmedValue.length > 0) {
            history.push('/search/' + encodeURIComponent(trimmedValue));
        }
    }

    return <input type="search" placeholder="Search..." onKeyDown={handleSearchKeyDown}/>
}

export default SearchBox

let { useEffect } = require('react');

const useSetTitle = title => {
    useEffect(() => {
        document.title = title ? title + ' | Reconmap' : 'Reconmap';
    }, [title]);
}

export default useSetTitle;


const PageTitle = ({ value = null }) => {
    document.title = value ? value + ' | Reconmap' : 'Reconmap';

    return <></>;
}

export default PageTitle;

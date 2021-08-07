import { memo } from "react";

const PageTitle = memo(({ value = null }) => {
    document.title = value ? value + ' | Reconmap' : 'Reconmap';

    return <></>;
});

export default PageTitle;

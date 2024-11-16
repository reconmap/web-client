import NativeButton from "components/form/NativeButton.js";
import { ReactElement } from "react";
import { downloadFromApi } from "services/api.js";

interface Props {
    entity: string;
}

const ExportMenuItem: React.FC<Props> = ({ entity }: Props): ReactElement => {
    return <NativeButton onClick={() => downloadFromApi('/system/data?entities=' + entity)}>Export</NativeButton>;
}

export default ExportMenuItem;

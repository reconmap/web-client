import NativeButton from "components/form/NativeButton.js";
import { ReactElement } from "react";
import { downloadFromApi } from "services/api.js";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    entity: string;
}

const ExportButton: React.FC<Props> = ({ entity, ...props }: Props): ReactElement => {
    return <NativeButton onClick={() => downloadFromApi('/system/data?entities=' + entity)} {...props}>Export</NativeButton>;
}

export default ExportButton;

import NativeButton from "components/form/NativeButton";
import { ReactElement } from "react";
import { downloadFromApi } from "services/api";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    entity: string;
}

const ExportButton: React.FC<Props> = ({ entity, ...props }: Props): ReactElement => {
    return <NativeButton onClick={() => downloadFromApi('/system/data?entities=' + entity)} {...props}>Export</NativeButton>;
}

export default ExportButton;

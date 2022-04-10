import { MenuItem } from "@chakra-ui/react";
import { ReactElement } from "react";
import { downloadFromApi } from "services/api";

interface Props {
    entity: string;
}

const ExportMenuItem: React.FC<Props> = ({ entity }: Props): ReactElement => {
    return <MenuItem onClick={() => downloadFromApi('/system/data?entities=' + entity)}>Export</MenuItem>;
}

export default ExportMenuItem;

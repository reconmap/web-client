import { MenuItem } from "@chakra-ui/react";
import { ReactElement } from "react";
import { downloadFromApi } from "services/api.js";

interface Props {
    entity: string;
}

const ExportMenuItem: React.FC<Props> = ({ entity }: Props): ReactElement => {
    return <MenuItem onClick={() => downloadFromApi('/system/data?entities=' + entity)}>Export</MenuItem>;
}

export default ExportMenuItem;

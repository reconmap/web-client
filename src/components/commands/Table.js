import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import NoResults from "components/ui/NoResults";
import Tags from "components/ui/Tags";
import CommandBadge from "./Badge";

const CommandsTable = ({ commands, onDeleteCallback = null }) => {
    return <Table>
        <Thead>
            <Tr>
                <Th style={{ width: '190px' }}>Name</Th>
                <Th className='only-desktop'>Description</Th>
                <Th>Output parser</Th>
                <Th>Docker image</Th>
                <Th>&nbsp;</Th>
            </Tr>
        </Thead>
        <Tbody>
            {commands.length === 0 ?
                <Tr>
                    <Td colSpan={5}><NoResults /></Td>
                </Tr> :
                commands.map(command =>
                    <Tr key={command.id}>
                        <Td><CommandBadge command={command} /></Td>
                        <Td className='only-desktop truncate'>
                            {command.description}<br />
                            <Tags values={command.tags} />
                        </Td>
                        <Td>{command.output_parser ?? '-'}</Td>
                        <Td>{command.docker_image}</Td>
                        <Td className='flex justify-end'>
                            <LinkButton href={`/commands/${command.id}/edit`}>Edit</LinkButton>
                            {onDeleteCallback && <DeleteIconButton onClick={() => onDeleteCallback(command.id)} />}
                        </Td>
                    </Tr>
                )}
        </Tbody>
    </Table>
}

export default CommandsTable;

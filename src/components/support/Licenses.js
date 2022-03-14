import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import PageTitle from "components/logic/PageTitle";
import Licenses from 'data/licenses.json';
import Breadcrumb from "../ui/Breadcrumb";
import { IconQuestionCircle } from "../ui/Icons";
import Title from "../ui/Title";

const LicensesPage = () => {

    return <div>
        <PageTitle value="Licenses" />

        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title title="Licenses" icon={<IconQuestionCircle />} />

        <Table>
            <Thead>
                <Th>Dependency</Th>
                <Th>License</Th>
                <Th>Url</Th>
            </Thead>
            <Tbody>
                {Object.entries(Licenses).map(entry => <Tr>
                    <Td>{entry[0]}</Td>
                    <Td>{entry[1].licenses}</Td>
                    <Td>{entry[1].url}</Td>
                </Tr>)}
            </Tbody>
        </Table>

    </div>
};

export default LicensesPage;

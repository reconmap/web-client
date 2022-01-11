import NoResults from "../NoResults";

const NoResultsTableRow = ({ numColumns }) => {
    return <tr>
        <td colSpan={numColumns} style={{ padding: '20px' }}><NoResults /></td>
    </tr>
}

export default NoResultsTableRow;

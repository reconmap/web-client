import Loading from "../Loading";

interface Props {
    numColumns: number;
}

const LoadingTableRow = ({ numColumns }: Props) => {
    return <tr>
        <td colSpan={numColumns} style={{ padding: '20px' }}><Loading /></td>
    </tr>
}

export default LoadingTableRow;

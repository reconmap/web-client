import LoadingTableRow from "./LoadingTableRow.jsx";
import NoResultsTableRow from "./NoResultsTableRow.jsx";

const defaultCellRenderer = (column, row) => {
    return row[column.property] ?? "-";
};

const NativeTable = ({ columns = [], rows = [], rowId = () => {} }) => {
    const enabledColumns = columns.filter((column) => column.enabled === undefined || column.enabled);
    const numColumns = enabledColumns.length;

    const rowsAreLoading = undefined === rows || null === rows;
    const rowsAreEmpty = !rowsAreLoading && 0 === rows.length;

    return (
        <table className="table is-fullwidth">
            <thead>
                <tr>
                    {enabledColumns.map((column) => (
                        <th className={column.className || ""}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rowsAreLoading && <LoadingTableRow numColumns={numColumns} />}
                {rowsAreEmpty && <NoResultsTableRow numColumns={numColumns} />}
                {!rowsAreLoading &&
                    rows.map((row) => (
                        <tr key={rowId(row)}>
                            {enabledColumns.map((column) => (
                                <td>{column.cell ? column.cell(row) : defaultCellRenderer(column, row)}</td>
                            ))}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default NativeTable;

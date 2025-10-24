import NativeButtonGroup from "components/form/NativeButtonGroup";
import PaginationV2 from "components/layout/PaginationV2";
import CreateButton from "components/ui/buttons/Create";
import ExportMenuItem from "components/ui/menuitems/ExportMenuItem";
import Title from "components/ui/Title";
import useQuery from "hooks/useQuery";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import secureApiFetch from "services/api";
import CommandsTable from "./Table.jsx";

const CommandsListPage = () => {
    const navigate = useNavigate();
    const query = useQuery();
    let pageNumber = query.get("page");
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [numberPages, setNumberPages] = useState(1);
    const [totalCount, setTotalCount] = useState("?");

    const [commands, setCommands] = useState([]);

    const onAddCommandClick = (ev) => {
        ev.preventDefault();

        navigate("/commands/add");
    };

    const onPageChange = (pageNumber) => {
        const queryParams = new URLSearchParams();
        queryParams.set("page", pageNumber + 1);
        const url = `/commands?${queryParams.toString()}`;
        navigate(url);
    };

    const reloadCommands = useCallback(() => {
        setCommands(null);

        const queryParams = new URLSearchParams();
        queryParams.set("page", apiPageNumber);
        const url = `/commands?${queryParams.toString()}`;

        secureApiFetch(url, { method: "GET" })
            .then((resp) => {
                if (resp.headers.has("X-Page-Count")) {
                    setNumberPages(resp.headers.get("X-Page-Count"));
                }
                if (resp.headers.has("X-Total-Count")) {
                    setTotalCount(resp.headers.get("X-Total-Count"));
                }
                return resp.json();
            })
            .then((commands) => {
                setCommands(commands);
            });
    }, [setCommands, apiPageNumber]);

    useEffect(() => {
        reloadCommands();
    }, [reloadCommands]);

    return (
        <div>
            <div className="heading">
                <PaginationV2 page={apiPageNumber} total={numberPages} onPageChange={onPageChange} />

                <NativeButtonGroup>
                    <CreateButton onClick={onAddCommandClick}>Add command</CreateButton>
                    <ExportMenuItem entity="commands" />
                </NativeButtonGroup>
            </div>
            <Title title={`Commands (${totalCount})`} />
            <CommandsTable commands={commands} />
        </div>
    );
};

export default CommandsListPage;

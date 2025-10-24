import { useCommandDeleteMutation } from "api/commands.js";
import Tags from "components/ui/Tags";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import { useTranslation } from "react-i18next";
import CommandBadge from "./Badge";

const CommandsTable = ({ commands }) => {
    const [t] = useTranslation();
    const commandDeleteMutation = useCommandDeleteMutation();

    return (
        <table className="table is-fullwidth">
            <thead>
                <tr>
                    <th style={{ width: "190px" }}>{t("Name")}</th>
                    <th className="only-desktop">{t("Description")}</th>
                    <th>Output parser</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {null === commands && <LoadingTableRow numColumns={5} />}
                {null !== commands && 0 === commands.length && <NoResultsTableRow numColumns={5} />}
                {null !== commands &&
                    0 !== commands.length &&
                    commands.map((command) => (
                        <tr key={command.id}>
                            <td>
                                <CommandBadge command={command} />
                            </td>
                            <td className="only-desktop">
                                {command.description}
                                <br />
                                <Tags values={command.tags} />
                            </td>
                            <td>{command.output_parser ?? "-"}</td>
                            <td>
                                <LinkButton href={`/commands/${command.id}/edit`}>Edit</LinkButton>
                                <DeleteIconButton onClick={() => commandDeleteMutation.mutate(command.id)} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default CommandsTable;

import { useCommandSchedulesQuery, useCommandUsagesQuery } from "api/commands.js";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import { toString as CronExpressionToString } from "cronstrue";

const ScheduledRuns = ({ command, task = null }) => {
    const { data: commandUsages } = useCommandUsagesQuery(command?.id);
    const { data: scheduledCommands } = useCommandSchedulesQuery(command?.id);

    const deleteScheduledCommand = (ev, commandSchedule) => {
        secureApiFetch(`/commands/schedules/${commandSchedule.id}`, {
            method: "DELETE",
        })
            .then(() => {
                fetchScheduledCommands();
                actionCompletedToast("The scheduled command has been deleted.");
            })
            .catch((err) => console.error(err));
    };

    if (commandUsages == null) {
        return (
            <>
                <p>This command has no instructions defined.</p>
            </>
        );
    }

    return (
        <>
            {scheduledCommands && (
                <table className="table is-fullwidth">
                    <caption>Scheduled commands</caption>
                    <thead>
                        <tr>
                            <th>Cron expression</th>
                            <th>Description</th>
                            <th>Argument values</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduledCommands.map((scheduleCommand) => (
                            <tr>
                                <td>{scheduleCommand.cron_expression}</td>
                                <td>
                                    {CronExpressionToString(scheduleCommand.cron_expression, {
                                        throwExceptionOnParseError: false,
                                    })}
                                </td>
                                <td>{scheduleCommand.argument_values}</td>
                                <td>
                                    <DeleteIconButton onClick={(ev) => deleteScheduledCommand(ev, scheduleCommand)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ScheduledRuns;

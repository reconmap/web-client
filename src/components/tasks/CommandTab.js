import ShellCommand from "../ui/ShellCommand";
import NoResultsTableRow from '../ui/NoResultsTableRow'
import SecondaryButton from '../ui/buttons/Secondary'
import FileSizeSpan from '../ui/FileSizeSpan'
import { IconUpload } from "../ui/Icons";
import { useEffect, useState } from "react";
import secureApiFetch from "src/services/api";
import DeleteButton from "../ui/buttons/Delete";
import Loading from "../ui/Loading";
import PrimaryButton from "../ui/buttons/Primary";
import { actionCompletedToast } from "../ui/toast";
import useFetch from "src/hooks/useFetch";

const TaskCommandTab = ({ task }) => {
    const [commandVars, setCommandVars] = useState('');
    const [containerArgs, setContainerArgs] = useState(null);
    const [commandOutputs, updateCommandOutputs] = useFetch(`/commands/outputs?taskId=${task.id}`)

    const onDeleteOutputClick = (ev, outputId) => {
        ev.preventDefault();

        secureApiFetch(`/commands/outputs/${outputId}`, { method: 'DELETE' })
            .then(() => {
                actionCompletedToast("The output has been deleted.");
                updateCommandOutputs();
            })
            .catch(err => console.error(err))
    }

    const onArgUpdate = ev => {
        setContainerArgs({ ...containerArgs, [ev.target.name]: { name: ev.target.name, placeholder: ev.target.value } });
    };

    useEffect(() => {
        if (containerArgs) {
            let dynamicArgs = '';
            Object.keys(containerArgs).forEach((key) => {
                let containerArg = containerArgs[key];
                dynamicArgs += `-var ${containerArg.name}=${containerArg.placeholder}`;
            });
            setCommandVars(dynamicArgs);
        }
    }, [containerArgs]);

    useEffect(() => {
        const argRegex = /{{{(.+?)}}}/g;
        const commandArguments = task.command_container_args.match(argRegex);
        const argMap = commandArguments.reduce((accumulator, current) => {
            const tokens = current.replaceAll('{{{', '').replaceAll('}}}', '').split('|||');
            accumulator[tokens[0]] = {
                name: tokens[0],
                placeholder: tokens[1]
            };
            return accumulator;
        }, {});

        setContainerArgs(argMap);

    }, [task]);

    return <>
        <h4>Command</h4>
        {task.command_id &&
            <>
                <h5>1. Fill in the arguments</h5>
                {containerArgs !== null &&
                    Object.keys(containerArgs).map((key) =>
                        <p>
                            {containerArgs[key].name}<br />
                            <input name={containerArgs[key].name} value={containerArgs[key].placeholder} onChange={onArgUpdate} />
                        </p>
                    )
                }
                <h5>2. Run this command</h5>
                <div>
                    To run the task execute:
                                <ShellCommand>./rmap run-command -id {task.command_id} {commandVars}</ShellCommand>
                    <p style={{ fontSize: "small" }}>(this will invoke the <strong>{task.command_short_name}</strong> application on a docker container)</p>
                </div>
                <h4>
                    <h5>Results</h5>
                    <PrimaryButton to={`/tasks/${task.id}/upload`}>
                        <IconUpload /> Upload results
                                </PrimaryButton>
                </h4>
                {!commandOutputs ? <Loading /> :

                    <table>
                        <thead>
                            <th>Upload date</th>
                            <th>Uploaded by</th>
                            <th>Filename</th>
                            <th>File size</th>
                            <th>Mimetype</th>
                            <th>&nbsp;</th>
                        </thead>
                        <tbody>
                            {commandOutputs.length === 0 && <NoResultsTableRow numColumns={5} />}
                            {commandOutputs.map((result, index) =>
                                <tr key={index}>
                                    <td>{result.insert_ts}</td>
                                    <td>{result.submitter_name}</td>
                                    <td>{result.file_name}</td>
                                    <td><FileSizeSpan fileSize={result.file_size} /></td>
                                    <td>{result.file_mimetype}</td>
                                    <td style={{ display: "flex" }}>
                                        <SecondaryButton disabled>Download</SecondaryButton>
                                        <DeleteButton onClick={ev => onDeleteOutputClick(ev, result.id)} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </>
        }
        {!task.command_id &&
            <p>No command defined for this task.</p>
        }
    </>
}

export default TaskCommandTab;

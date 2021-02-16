import CommandInstructions from "components/commands/Instructions";
import DeleteButton from "components/ui/buttons/Delete";
import PrimaryButton from "components/ui/buttons/Primary";
import SecondaryButton from "components/ui/buttons/Secondary";
import FileSizeSpan from "components/ui/FileSizeSpan";
import { IconUpload } from "components/ui/Icons";
import Loading from "components/ui/Loading";
import NoResultsTableRow from "components/ui/NoResultsTableRow";
import useFetch from "hooks/useFetch";
import secureApiFetch from "services/api";
import { actionCompletedToast } from "../ui/toast";

const TaskCommandTab = ({ task }) => {
    const [command] = useFetch(`/commands/${task.command_id}`)
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

    if (!command) return <Loading />

    return <>
        {task.command_id &&
            <>
                <CommandInstructions command={command} />
                <hr />
                <h4>
                    Results
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

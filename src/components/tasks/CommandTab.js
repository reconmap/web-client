import CommandInstructions from "components/commands/Instructions";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";

const TaskCommandTab = ({ task }) => {
    const [command] = useFetch(`/commands/${task.command_id}`)
    if (!command) return <Loading />

    return <>
        {task.command_id && <CommandInstructions command={command} task={task} />}
        {!task.command_id && <p>No command defined for this task.</p>}
    </>
}

export default TaskCommandTab;

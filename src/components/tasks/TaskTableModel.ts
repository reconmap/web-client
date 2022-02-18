
interface Props {
    pageNumber: number;
    selection: string[];
    tasks?: object[];
    filters: object;
    sortBy: object;
}

class TaskTableModel implements Props {
    pageNumber: number = 0;
    selection: string[] = [];
    tasks?: object[] = [];
    filters: object = {
        projectId: null,
        priority: null,
        status: null,
    };
    sortBy: object = { column: 'insert_ts', order: 'DESC' };
}

export default TaskTableModel;

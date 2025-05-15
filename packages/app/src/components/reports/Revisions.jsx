import CreateButton from "components/ui/buttons/Create";
import Loading from "components/ui/Loading";
import useBoolean from "hooks/useBoolean";
import useFetch from "hooks/useFetch";
import ReportVersionModalDialog from "./ModalDialog";
import ReportsTable from "./Table";

const ReportRevisions = ({ projectId }) => {
    const [reports, refetchReports] = useFetch(`/reports?projectId=${projectId}`);

    const { value: isAddDialogOpen, setTrue: openAddDialog, setFalse: closeAddDialog } = useBoolean();

    const onDialogOk = () => {
        refetchReports();
        closeAddDialog();
    };

    if (!reports) return <Loading />;

    return (
        <>
            <div className="flex justify-end">
                <ReportVersionModalDialog
                    projectId={projectId}
                    isOpen={isAddDialogOpen}
                    onSubmit={onDialogOk}
                    onCancel={closeAddDialog}
                />
                <CreateButton onClick={openAddDialog}>Add new revision&hellip;</CreateButton>
            </div>

            <ReportsTable reports={reports} updateReports={refetchReports} />
        </>
    );
};

export default ReportRevisions;

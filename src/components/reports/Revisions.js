import { useDisclosure } from "@chakra-ui/hooks";
import CreateButton from "components/ui/buttons/Create";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import ReportVersionModalDialog from "./ModalDialog";
import ReportsTable from "./Table";

const ReportRevisions = ({ projectId }) => {

    const [reports, refetchReports] = useFetch(`/reports?projectId=${projectId}`);

    const { isOpen: isAddDialogOpen, onOpen: openAddDialog, onClose: closeAddDialog } = useDisclosure();

    const onDialogOk = () => {
        refetchReports();
        closeAddDialog();
    }

    if (!reports) return <Loading />

    return <>
        <div className="flex justify-end">
            <ReportVersionModalDialog projectId={projectId} isOpen={isAddDialogOpen} onSubmit={onDialogOk} onCancel={closeAddDialog} />
            <CreateButton onClick={openAddDialog}>Add report version...</CreateButton>
        </div>

        <ReportsTable reports={reports} updateReports={refetchReports} />
    </>
}

export default ReportRevisions;

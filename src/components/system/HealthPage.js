import PageTitle from 'components/logic/PageTitle';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import { IconCheck } from '../ui/Icons';
import Title from "../ui/Title";

const GreenYes = () => <span style={{ color: 'green' }}>Yes</span>;
const RedNo = () => <span style={{ color: 'red' }}>No</span>;

const SystemHealthPage = () => {
    const [apiHealth] = useFetch('/system/health');

    return <div>
        <PageTitle value="System health" />
        <div className='heading'>
            <Breadcrumb>
                <div>System</div>
            </Breadcrumb>
        </div>
        <Title title="System health" icon={<IconCheck />} />

        <h4>API health</h4>

        {apiHealth && <>
            <dl>
                <dt>Response</dt>
                <dd style={{ color: 'green' }}>OK</dd>

                <dt>Attachments directory exists</dt>
                <dd>{apiHealth.attachmentsDirectory.exists ? <GreenYes /> : <RedNo />}</dd>

                <dt>Attachments directory is writeable</dt>
                <dd>{apiHealth.attachmentsDirectory.writeable ? <GreenYes /> : <RedNo />}</dd>
            </dl>
        </>}

    </div>
}

export default SystemHealthPage;

import React, {useState} from 'react'
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from '../ui/buttons/Primary';
import Title from '../ui/Title';
import useSetTitle from "../../hooks/useSetTitle";
import secureApiFetch from "../../services/api";
import {Link, useParams} from 'react-router-dom';

const SendReport = ({history}) => {
    useSetTitle("Send report")

    const routeParams = useParams();
    const {reportId} = routeParams;

    const [deliverySettings, setDeliverySettings] = useState({
        recipients: null,
        subject: "[CONFIDENTIAL] Security report attached",
        body: "Please review attachment containing a security report."
    })

    const [loading, setLoading] = useState(false)
    const handleSend = async (ev) => {
        ev.preventDefault();

        setLoading(true)
        await secureApiFetch(`/reports/${reportId}/send`, {method: 'POST', body: JSON.stringify(deliverySettings)})
        history.push(`/reports`)
    }

    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setDeliverySettings({...deliverySettings, [name]: value});
    };

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/reports">Saved Reports</Link>
                </Breadcrumb>
            </div>
            <form onSubmit={handleSend}>
                <Title title='Send report'/>
                <label>Recipients (comma separated)
                    <input type="text" name="recipients" onChange={handleFormChange} required autoFocus
                           placeholder="foo@bar.sec"/>
                </label>
                <label>Subject
                    <input type="text" name="subject" onChange={handleFormChange}
                           value={deliverySettings.subject}/>
                </label>
                <label>Body
                    <textarea name="body" onChange={handleFormChange} required
                              value={deliverySettings.body}/>
                </label>
                <PrimaryButton type="submit"
                               disabled={loading}>{loading ? 'Sending...' : 'Send'}</PrimaryButton>
            </form>
        </div>
    )
}

export default SendReport

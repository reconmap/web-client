import React, {useState} from 'react'
import Breadcrumb from '../ui/Breadcrumb';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import Title from '../ui/Title';
import CancelButton from "../ui/buttons/Cancel";
import useSetTitle from "../../hooks/useSetTitle";
import secureApiFetch from "../../services/api";
import {useParams} from 'react-router-dom';

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
    const handleSend = async (event) => {
        event.preventDefault();

        setLoading(true)
        await secureApiFetch(`/reports/${reportId}/send`, {method: 'POST', body: JSON.stringify(deliverySettings)})
        history.push(`/reports`)
    }

    const handleFormChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setDeliverySettings({...deliverySettings, [name]: value});
    };

    const handleGoBack = () => {
        history.goBack()
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb history={history}/>
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
                <BtnPrimary type="submit"
                            disabled={loading}>{loading ? 'Sending...' : 'Send'}</BtnPrimary>
                <CancelButton onClick={handleGoBack} disabled={loading}/>
            </form>
        </div>
    )
}

export default SendReport
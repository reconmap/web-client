import Title from "../ui/Title";
import BtnPrimary from "../ui/buttons/BtnPrimary";
import CancelButton from "../ui/buttons/Cancel";
import {useHistory} from 'react-router-dom';
import {useEffect, useState} from "react";
import Breadcrumb from "../ui/Breadcrumb";
import secureApiFetch from "../../services/api";
import toast, {actionCompletedToast} from "../../utilities/toast";

const UserPasswordChange = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();
    const [passwords, setPasswords] = useState(
        {
            currentPassword: "",
            newPassword: "",
            newPasswordConfirmation: ""
        }
    );
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const handleCreate = async (ev) => {
        ev.preventDefault();
        setSubmitButtonDisabled(true);

        secureApiFetch(`/users/${user.id}/password`, {
            method: 'PATCH',
            body: JSON.stringify(passwords)
        })
            .then((resp) => {
                if (resp.status !== 200) {
                    throw new Error('Invalid response from server');
                }
                
                actionCompletedToast(`Your password has been changed.`);
                history.push('/users');
            })
            .catch(err => {
                console.error(err);
                toast("There was a problem updating your password. Check the data.")
                setSubmitButtonDisabled(false);
            });
    }
    const handleFormChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setPasswords({...passwords, [name]: value});
    };
    const handleGoBack = () => {
        history.push('/users/')
    }

    useEffect(() => {
        setSubmitButtonDisabled(passwords.newPassword !== passwords.newPasswordConfirmation);
    }, [passwords]);

    return (
        <div>
            <div className='heading'>
                <Breadcrumb history={history}/>
            </div>
            <form onSubmit={handleCreate}>
                <Title title="User Password Change"/>
                <label>Current password
                    <input type="password" name="currentPassword" value={passwords.currentPassword}
                           onChange={handleFormChange} autoFocus required/>
                </label>
                <label>New password
                    <input type="password" name="newPassword" value={passwords.newPassword} onChange={handleFormChange}
                           required/>
                </label>
                <label>New password confirmation
                    <input type="password" name="newPasswordConfirmation" value={passwords.newPasswordConfirmation}
                           onChange={handleFormChange} required/>
                </label>
                <BtnPrimary type="submit"
                            disabled={submitButtonDisabled}>Update</BtnPrimary>
                <CancelButton onClick={handleGoBack} disabled={submitButtonDisabled}/>
            </form>
        </div>
    )
}

export default UserPasswordChange

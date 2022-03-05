import { Input } from "@chakra-ui/react";
import { actionCompletedToast, errorToast } from "components/ui/toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "services/auth";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import PrimaryButton from "../ui/buttons/Primary";
import { IconPreferences } from "../ui/Icons";
import Title from "../ui/Title";

const UserPasswordChange = () => {
    const user = Auth.getLoggedInUser();
    const navigate = useNavigate();
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
            .then(resp => {
                if (resp.status !== 200) {
                    throw new Error('Invalid response from server');
                }

                actionCompletedToast(`Your password has been changed.`);
                navigate('/users');
            })
            .catch(err => {
                console.error(err);
                errorToast("There was a problem updating your password. Check the data.")
                setSubmitButtonDisabled(false);
            });
    }
    const handleFormChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setPasswords({ ...passwords, [name]: value });
    };

    useEffect(() => {
        setSubmitButtonDisabled(passwords.newPassword !== passwords.newPasswordConfirmation);
    }, [passwords]);

    return <div>
        <div className='heading'>
            <Breadcrumb />
        </div>
        <form onSubmit={handleCreate}>
            <Title title="Password change" type="User" icon={<IconPreferences />} />
            <label>Current password
                <Input type="password" name="currentPassword" value={passwords.currentPassword}
                    onChange={handleFormChange} autoFocus required />
            </label>
            <label>New password
                <Input type="password" name="newPassword" value={passwords.newPassword} onChange={handleFormChange}
                    required />
            </label>
            <label>New password confirmation
                <Input type="password" name="newPasswordConfirmation" value={passwords.newPasswordConfirmation}
                    onChange={handleFormChange} required />
            </label>
            <PrimaryButton type="submit"
                disabled={submitButtonDisabled}>Update</PrimaryButton>
        </form>
    </div>
}

export default UserPasswordChange

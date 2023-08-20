import { Input } from "@chakra-ui/react";
import NativeCheckbox from "components/form/NativeCheckbox";
import NativeSelect from "components/form/NativeSelect";
import { useState } from "react";
import UserRoles from "../../models/UserRoles";
import PrimaryButton from "../ui/buttons/Primary";

const UserForm = ({ isEdit = false, user, userSetter: setUser, onFormSubmit }) => {

    const [passwordGenerationMethod, setPasswordGenerationMethod] = useState('autogenerated');

    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setUser({ ...user, [name]: value });
    };

    const onPasswordGenerationMethodChange = ev => {
        setPasswordGenerationMethod(ev.target.value);
    }

    return <form onSubmit={onFormSubmit} className="crud">
        <fieldset>
            <legend>Basic information</legend>

            <label>Full name
                <input type="text" name="full_name" value={user.full_name || ""} onChange={onFormChange} required />
            </label>
            <label>Short bio
                <Input type="text" name="short_bio" value={user.short_bio || ""} onChange={onFormChange}
                    placeholder="DevSecOps, or Project Manager" />
            </label>
            <label>Email
                <Input type="email" name="email" value={user.email || ""} onChange={onFormChange} required />
            </label>
            <label>Role
                <NativeSelect name="role" onChange={onFormChange} value={user.role} required>
                    {UserRoles.map(role => <option key={`role_${role.id}`} value={role.id}>{role.name}</option>)}
                </NativeSelect>
            </label>
            <label>Properties
                <div>
                    <NativeCheckbox name="active" checked={user.active} onChange={onFormChange}>Active</NativeCheckbox>
                    <NativeCheckbox name="mfa_enabled" checked={user.mfa_enabled} onChange={onFormChange}>2FA enabled</NativeCheckbox>
                </div>
            </label>
        </fieldset>

        <fieldset>
            <legend>Credentials</legend>
            <label>Username
                <Input type="text" name="username" value={user.username || ""} onChange={onFormChange} autoFocus required />
            </label>
            {!isEdit &&
                <>
                    <label htmlFor="passwordGenerationMethod">Password generation method
                    <NativeSelect name="passwordGenerationMethod" onChange={onPasswordGenerationMethodChange}>
                            <option value="auto">Auto-generated</option>
                            <option value="manual">Manual</option>
                    </NativeSelect>
                    </label>
                    {passwordGenerationMethod === 'manual' &&
                        <>
                            <label>Password
                                <Input type="password" name="unencryptedPassword" onChange={onFormChange} required />
                            </label>
                            <label>
                                Send email to user
                        <NativeCheckbox name="sendEmailToUser" onChange={onFormChange} />
                            </label>
                        </>
                    }
                </>
            }
        </fieldset>

        <PrimaryButton type="submit">{isEdit ? "Update" : "Create"}</PrimaryButton>
    </form >
}

export default UserForm;

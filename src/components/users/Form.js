import PrimaryButton from "../ui/buttons/Primary";
import UserRoles from "../../models/UserRoles";

const UserForm = ({isEdit = false, user, userSetter: setUser, onFormSubmit}) => {

    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setUser({...user, [name]: value});
    };

    return <form onSubmit={onFormSubmit} className="crud">
        <fieldset>
            <legend>Basic information</legend>

            <label>Full name
                <input type="text" name="full_name" value={user.full_name} onChange={onFormChange} required/>
            </label>
            <label>Short bio
                <input type="text" name="short_bio" value={user.short_bio} onChange={onFormChange}
                       placeholder="DevSecOps, or Project Manager"/>
            </label>
            <label>Email
                <input type="email" name="email" value={user.email} onChange={onFormChange} required/>
            </label>
            <label>Role
                <select name="role" onChange={onFormChange} value={user.role} required>
                    {UserRoles.map((role, index) => <option value={role.id}>{role.name}</option>)}
                </select>
            </label>
        </fieldset>

        <fieldset>
            <legend>Credentials</legend>
            <label>Username
                <input type="text" name="username" value={user.username} onChange={onFormChange} autoFocus required/>
            </label>
            {!isEdit &&
            <>
                <label>Password
                    <input type="password" name="password" onChange={onFormChange} required/>
                </label>
                <label>
                    Send email to user
                    <input type="checkbox" name="sendEmailToUser" onChange={onFormChange}/>
                </label>
            </>
            }
        </fieldset>

        <PrimaryButton type="submit">{isEdit ? "Update" : "Create"}</PrimaryButton>
    </form>
}

export default UserForm;

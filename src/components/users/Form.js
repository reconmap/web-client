import PrimaryButton from "../ui/buttons/Primary";
import UserRoles from "../../models/UserRoles";

const UserForm = ({isEdit = false, user, userSetter: setUser, onFormSubmit}) => {

    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setUser({...user, [name]: value});
    };

    return <form onSubmit={onFormSubmit}>
        <label>Name
            <input type="text" name="name" value={user.name} onChange={onFormChange} autoFocus required/>
        </label>
        <label>Password
            <input type="password" name="password" onChange={onFormChange} required/>
        </label>
        <label>Email
            <input type="email" name="email" value={user.email} onChange={onFormChange} required/>
        </label>
        <label>Role
            <select name="role" onChange={onFormChange} value={user.role} required>
                {UserRoles.map((role, index) => <option>{role.name}</option>)}
            </select>
        </label>
        {!isEdit &&
        <label>
            Send email to user
            <input type="checkbox" name="sendEmailToUser" onChange={onFormChange}/>
        </label>
        }

        <PrimaryButton type="submit">{isEdit ? "Update" : "Create"}</PrimaryButton>
    </form>
}

export default UserForm;

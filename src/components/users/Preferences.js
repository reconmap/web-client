import React, {useContext, useState} from 'react'
import useSetTitle from '../../hooks/useSetTitle'
import {IconDark, IconLight, IconSave} from '../icons'
import {getAllTimezones} from 'countries-and-timezones';
import secureApiFetch from '../../services/api';
import BtnPrimary from '../ui/buttons/BtnPrimary'
import Title from '../ui/Title';
import ThemeContext from "../../contexts/ThemeContext";
import BtnSecondary from "../ui/buttons/BtnSecondary";
import CancelButton from "../ui/buttons/Cancel";
import Breadcrumb from '../ui/Breadcrumb';

const UserPreferences = ({history}) => {
    useSetTitle('Preferences')
    const timezones = getAllTimezones();
    const timezoneKeys = Object.keys(timezones).sort();
    const [timezone, setTimezone] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    const {theme, setTheme} = useContext(ThemeContext)

    const handleSwitchTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const handleChange = (e) => {
        setTimezone(e.target.value);
    }

    const handleSubmit = () => {
        secureApiFetch(`/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({timezone: timezone})
        })
            .then(() => {
                user.timezone = timezone;
                localStorage.setItem('user', JSON.stringify(user));
                history.push('/');
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            <div className='heading'>
                <Breadcrumb history={history}/>
            </div>

            <form onSubmit={e => e.preventDefault()} >
                <Title type='User' title='Preferences'/>
                <label>Timezone
                <select onChange={handleChange} defaultValue={user.timezone}>
                    {timezoneKeys.map((key) =>
                        <option value={timezones[key].name}>{timezones[key].name}</option>
                    )}
                </select>
                </label>
                <label>Theme
                <BtnSecondary onClick={handleSwitchTheme}>{theme === 'light' ? <IconDark/> :
                    <IconLight/>} {theme === 'light' ? 'Dark' : 'Light'}</BtnSecondary>
                </label>
                <BtnPrimary onClick={handleSubmit}><IconSave/> Save</BtnPrimary>
                <CancelButton onClick={() => {
                    history.push("/")
                }}/>
            </form>
        </>
    )
}

export default UserPreferences

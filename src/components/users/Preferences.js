import React, { useState } from 'react'
import useSetTitle from '../../hooks/useSetTitle'
import { IconSave } from '../icons'
import { getAllTimezones } from 'countries-and-timezones';
import secureApiFetch from '../../services/api';
import BtnPrimary from '../ui/buttons/BtnPrimary'
import BtnLink from '../ui/buttons/BtnLink'
import Title from '../ui/Title';

const UserPreferences = ({ history }) => {
    useSetTitle('Preferences')
    const timezones = getAllTimezones();
    const timezoneKeys = Object.keys(timezones).sort();
    const [timezone, setTimezone] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleChange = (e) => {
        setTimezone(e.target.value);
    }

    const handleSubmit = () => {
        secureApiFetch(`/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ timezone: timezone })
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
            <form onSubmit={e => e.preventDefault()} className='flex flex-col space-y-2'>
                <Title type='User' title='Preferences'/>
                <label>Timezone</label>
                <select onChange={handleChange} defaultValue={user.timezone}>
                    {timezoneKeys.map((key) =>
                        <option value={timezones[key].name}>{timezones[key].name}</option>
                    )}
                </select>

                <BtnPrimary onClick={handleSubmit}><IconSave styling='mr-2' /> Save</BtnPrimary>
                <BtnLink onClick={() => { history.push("/") }} >Cancel</BtnLink>
            </form>
        </>
    )
}

export default UserPreferences

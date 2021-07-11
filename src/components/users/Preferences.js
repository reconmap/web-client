import { Select } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import { getAllTimezones } from 'countries-and-timezones';
import React, { useContext, useState } from 'react';
import ThemeContext from "../../contexts/ThemeContext";
import secureApiFetch from '../../services/api';
import setThemeColors from '../../utilities/setThemeColors';
import Breadcrumb from '../ui/Breadcrumb';
import Primary from '../ui/buttons/Primary';
import SecondaryButton from "../ui/buttons/Secondary";
import { IconDark, IconLight, IconPreferences, IconSave } from '../ui/Icons';
import Title from '../ui/Title';

const UserPreferences = ({ history }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const timezones = getAllTimezones();
    const timezoneKeys = Object.keys(timezones).sort();
    const [timezone, setTimezone] = useState(user.timezone);
    const { theme, setTheme } = useContext(ThemeContext)

    const handleSwitchTheme = () => {
        setTheme(theme => {
            setThemeColors(theme)
            return (theme === 'light') ? 'dark' : 'light'
        })
    }

    const handleChange = ev => {
        setTimezone(ev.target.value);
    }

    const onFormSubmit = ev => {
        ev.preventDefault();

        secureApiFetch(`/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ timezone: timezone })
        })
            .then(() => {
                user.timezone = timezone;
                localStorage.setItem('user', JSON.stringify(user));
                history.push('/');
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <PageTitle value="Preferences" />
            <div className='heading'>
                <Breadcrumb />
            </div>
            <Title type='User' title='Preferences' icon={<IconPreferences />} />
            <form onSubmit={onFormSubmit} required>
                <label>Timezone
                    <Select onChange={handleChange} defaultValue={user.timezone}>
                        {timezoneKeys.map((key, index) =>
                            <option key={index} value={timezones[key].name}>{timezones[key].name}</option>
                        )}
                    </Select>
                </label>
                <label>Theme
                    <SecondaryButton onClick={handleSwitchTheme}>
                        {theme === 'dark' ?
                            <><IconDark /> Dark</> : <><IconLight /> Light</>
                        }
                    </SecondaryButton>

                </label>
                <Primary type="submit"><IconSave /> Save</Primary>
            </form>
        </>
    )
}

export default UserPreferences;

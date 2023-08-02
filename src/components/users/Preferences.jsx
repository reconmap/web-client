import { FormControl, FormLabel, useColorMode } from '@chakra-ui/react';
import { LanguageList } from 'bootstrap/LanguageList';
import NativeSelect from 'components/form/NativeSelect';
import PageTitle from 'components/logic/PageTitle';
import { ThemeList } from 'components/ui/themes';
import { actionCompletedToast } from 'components/ui/toast';
import { useAuth } from 'contexts/AuthContext';
import CountriesTimezones from 'countries-and-timezones';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { initialiseUserPreferences } from 'services/userPreferences';
import ThemeContext from "../../contexts/ThemeContext";
import secureApiFetch from '../../services/api';
import setThemeColors from '../../utilities/setThemeColors';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPreferences } from '../ui/Icons';
import Title from '../ui/Title';
import Primary from '../ui/buttons/Primary';

const UserPreferences = () => {

    const { i18n } = useTranslation();

    const { user } = useAuth();
    user.preferences = initialiseUserPreferences(user);

    const timezones = CountriesTimezones.getAllTimezones();
    const timezoneKeys = Object.keys(timezones).sort();

    const { setTheme } = useContext(ThemeContext);

    const { setColorMode } = useColorMode();

    const [formValues, setFormValues] = useState({
        timezone: user.timezone,
        language: user.preferences["web-client.language"],
        theme: user.preferences["web-client.theme"]
    });

    const updateFormValues = ev => {
        setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    }

    const onFormSubmit = ev => {
        ev.preventDefault();

        user.timezone = formValues.timezone;
        user.preferences = {
            ...initialiseUserPreferences(user),
            "web-client.theme": formValues.theme,
            "web-client.language": formValues.language,
        };

        secureApiFetch(`/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ timezone: formValues.timezone, preferences: user.preferences })
        })
            .then(() => {
                setTheme(theme => {
                    setThemeColors(formValues.theme);
                    setColorMode(formValues.theme);
                    return formValues.theme;
                });
                i18n.changeLanguage(formValues.language)

                localStorage.setItem('user', JSON.stringify(user));

                actionCompletedToast("Your preferences have been saved.");
            })
            .catch(err => console.error(err));
    }

    return <>
        <PageTitle value="Preferences" />
        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title type='User' title='Preferences' icon={<IconPreferences />} />
        <form onSubmit={onFormSubmit}>
            <FormControl>
                <FormLabel>Language</FormLabel>
                <NativeSelect name="language" onChange={updateFormValues} defaultValue={user.preferences.language}>
                    {LanguageList.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                </NativeSelect>
            </FormControl>
            <FormControl>
                <FormLabel>Theme</FormLabel>
                <NativeSelect name="theme" onChange={updateFormValues} defaultValue={user.preferences.theme}>
                    {ThemeList.map(theme => <option key={theme.id} value={theme.id}>{theme.name}</option>)}
                </NativeSelect>
            </FormControl>
            <FormControl>
                <FormLabel>Timezone</FormLabel>
                <NativeSelect name="timezone" onChange={updateFormValues} defaultValue={user.timezone}>
                    {timezoneKeys.map((key, index) =>
                        <option key={index} value={timezones[key].name}>{timezones[key].name}</option>
                    )}
                </NativeSelect>
            </FormControl>

            <Primary type="submit">Save</Primary>
        </form>
    </>
}

export default UserPreferences;

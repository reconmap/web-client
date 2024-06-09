import { FormControl, FormLabel, useColorMode } from "@chakra-ui/react";
import { LanguageList } from "bootstrap/LanguageList";
import NativeSelect from "components/form/NativeSelect";
import NativeSubmitButton from "components/form/NativeSubmitButton";
import PageTitle from "components/logic/PageTitle";
import { ThemeList } from "components/ui/themes";
import { actionCompletedToast } from "components/ui/toast";
import { useAuth } from "contexts/AuthContext";
import CountriesTimezones from "countries-and-timezones";
import useFetch from "hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { initialiseUserPreferences } from "services/userPreferences";
import ThemeContext from "../../contexts/ThemeContext";
import secureApiFetch from "../../services/api";
import setThemeColors from "../../utilities/setThemeColors";
import Breadcrumb from "../ui/Breadcrumb";
import { IconPreferences } from "../ui/Icons";
import Title from "../ui/Title";

const UserPreferences = () => {
    const { i18n } = useTranslation();

    const { user } = useAuth();

    const [userData] = useFetch(`/users/${user.id}`);

    const timezones = CountriesTimezones.getAllTimezones();
    const timezoneKeys = Object.keys(timezones).sort();

    const { setTheme } = useContext(ThemeContext);

    const { setColorMode } = useColorMode();

    const [formValues, setFormValues] = useState(null);

    const updateFormValues = (ev) => {
        setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    };

    const onFormSubmit = (ev) => {
        ev.preventDefault();

        user.preferences = {
            ...initialiseUserPreferences(user),
            "web-client.theme": formValues.theme,
            "web-client.language": formValues.language,
        };

        secureApiFetch(`/users/${user.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                timezone: formValues.timezone,
                preferences: user.preferences,
            }),
        })
            .then(() => {
                setTheme((theme) => {
                    setThemeColors(formValues.theme);
                    setColorMode(formValues.theme);
                    return formValues.theme;
                });
                i18n.changeLanguage(formValues.language);

                localStorage.setItem("user", JSON.stringify(user));

                actionCompletedToast("Your preferences have been saved.");
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        if (userData) {
            setFormValues({
                timezone: userData.timezone,
                theme: userData.preferences["web-client.theme"],
                language: userData.preferences["web-client.language"],
            });
        }
    }, [userData]);

    if (!userData || !formValues) {
        return <>Loading...</>;
    }

    return (
        <>
            <PageTitle value="Preferences" />
            <div className="heading">
                <Breadcrumb />
            </div>
            <Title type="User" title="Preferences" icon={<IconPreferences />} />
            <form onSubmit={onFormSubmit}>
                <FormControl>
                    <FormLabel>Language</FormLabel>
                    <NativeSelect
                        name="language"
                        onChange={updateFormValues}
                        defaultValue={
                            userData.preferences["web-client.language"]
                        }
                    >
                        {LanguageList.map((lang) => (
                            <option key={lang.id} value={lang.id}>
                                {lang.name}
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>
                <FormControl>
                    <FormLabel>Theme</FormLabel>
                    <NativeSelect
                        name="theme"
                        onChange={updateFormValues}
                        defaultValue={userData.preferences["web-client.theme"]}
                    >
                        {ThemeList.map((theme) => (
                            <option key={theme.id} value={theme.id}>
                                {theme.name}
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>
                <FormControl>
                    <FormLabel>Timezone</FormLabel>
                    <NativeSelect
                        name="timezone"
                        onChange={updateFormValues}
                        defaultValue={userData.timezone}
                    >
                        {timezoneKeys.map((key, index) => (
                            <option key={index} value={timezones[key].name}>
                                {timezones[key].name}
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>

                <NativeSubmitButton>Save</NativeSubmitButton>
            </form>
        </>
    );
};

export default UserPreferences;

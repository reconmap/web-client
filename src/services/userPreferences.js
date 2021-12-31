
const DefaultUserPreferences = {
    "web-client.theme": "dark",
    "web-client.widgets": null,
}

const initialiseUserPreferences = user => {
    if (!user.hasOwnProperty('preferences') || null === user.preferences || undefined === user.preferences) {
        console.debug("user has no preferences")
        return DefaultUserPreferences;
    }
    if (typeof (user.preferences) === 'string') {
        console.debug("user prefs are string")
        return { ...DefaultUserPreferences, ...JSON.parse(user.preferences) };
    }

    console.debug("user prefs are object")
    console.dir(user.preferences);
    return { ...DefaultUserPreferences, ...user.preferences };
}

export { DefaultUserPreferences, initialiseUserPreferences };

const setThemeColors = (theme) => {
    const style = document.documentElement.style
    const colorBase = 'hsl(var(--base-hue), var(--tint)'

    if (theme === 'light') {
        style.setProperty('--black', `${colorBase}, 90%)`)
        style.setProperty('--bg-color', `${colorBase}, 100%)`)
        style.setProperty('--text-color', `${colorBase}, 40%)`)
        style.setProperty('--white', `${colorBase}, 6%)`)
    } else {
        style.setProperty('--black', `${colorBase}, 6%)`)
        style.setProperty('--bg-color', `${colorBase}, 12%)`)
        style.setProperty('--text-color', `${colorBase}, 50%)`)
        style.setProperty('--white', `${colorBase}, 90%)`)
    }
}

export default setThemeColors

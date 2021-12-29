const setThemeColors = (theme) => {
    const style = document.documentElement.style

    if (theme === 'light') {
        style.setProperty('--black', `var(--color-gray-lightest)`)
        style.setProperty('--bg-color', `#fff`)
        style.setProperty('--text-color', `var(--color-black)`)
        style.setProperty('--white', `var(--color-black)`)
    } else {
        style.setProperty('--black', `var(--color-black)`)
        style.setProperty('--bg-color', `var(--color-gray-dark)`)
        style.setProperty('--text-color', `var(--color-gray-light)`)
        style.setProperty('--white', `#fff`)
    }
}

export default setThemeColors;

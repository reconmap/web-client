import {IconLeft} from './Icons'

const Breadcrumb = ({history}) => {
    const handleGoBack = () => {
        history.goBack()
    }

    const handleGoTo = (destination) => {
        if (destination.length > 3) {
            history.push('/' + destination)
        }
    }
    const styles = {
        button: {
            display: 'flex',
            alignSelf: 'center',
            border: `var(--borderWidth) solid var(--black)`,
            backgroundColor: 'transparent',
        },
        arrow: {
            color: 'var(--primary-color)',

        },
        slash: {
            margin: 'var(--margin)',
            color: 'var(--text-color)',

        }
    }

    return <button style={styles.button}>
        {history && history.length > 0 && <span onClick={handleGoBack} style={styles.arrow}> <IconLeft/> </span>}
        {history && history.location.pathname.split('/').map((route, index) =>
            route !== '' &&
            <span key={index} onClick={() => handleGoTo(route)}>
                        <i style={styles.slash}>/</i>
                {route}
                    </span>
        )}
    </button>
}

export default Breadcrumb

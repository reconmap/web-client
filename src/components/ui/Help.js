import React from 'react'
import {IconQuestionCircle} from './Icons'

export default function Help({title, children, text}) {
    const styles = {
        helpContainer: {
            borderRadius: 'var(--borderRadius)',
            backgroundColor: 'rgba(0,0,0,.1)',
            marginBottom: 'var(--padding)',
            borderLeft: 'var(--borderWidth) dashed var(--black)'
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--margin)',
            color: 'var(--primary-color)',
        },
        icon: {
            width: '2rem', height: '2rem'
        }
    }
    return (
        <aside style={styles.helpContainer}>
            <h5 style={styles.header}><IconQuestionCircle styling={styles.icon}/>{title || 'Help'}</h5>
            {text && <p>{text}</p>}
            {children}
        </aside>
    )
}

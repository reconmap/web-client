import React from 'react'
import { IconQuestionCircle } from '../icons'

export default function Help({ title, children, text}) {
    const styles= {
        header : {
            display:'flex',
            alignItems: 'center',
            gap:'var(--margin)',
        }
    }
    return (
        <aside>
            <h5 style={styles.header }><IconQuestionCircle styling={{  width: '2rem', height:'2rem'}}/> {title || 'Help'}</h5>
            {text && <p>{text}</p>}
            {children}
        </aside>
    )
}

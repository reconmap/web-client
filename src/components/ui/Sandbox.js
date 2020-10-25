import React from 'react'
import { IconUnlocked } from '../icons'
import Title from './Title'

export default function Sandbox() {
    return (
        <div>
            <Title title='Sandbox' type='UI test page' icon={<IconUnlocked />}/>

            <h3>Heading Level 4 can have buttons on the right <button>Press Me</button></h3>
            <p>Consequat aliqua aliqua sit dolore minim dolore excepteur do qui exercitation.</p>

            <h4>Heading Level 4 can have buttons on the right <button>Press Me</button></h4>
            <p>Consequat aliqua aliqua sit dolore minim dolore excepteur do qui exercitation.</p>
        </div>
    )
}

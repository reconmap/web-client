import React from 'react'
import {IconUnlocked} from './Icons'
import Title from './Title'
import Breadcrumb from './../ui/Breadcrumb'
import Help from './../ui/Help'
import BtnPrimary from './../ui/buttons/BtnPrimary'
import BtnSecondary from './buttons/BtnSecondary'
import BtnLink from './buttons/BtnLink'

export default function Sandbox() {
    const colors = [
        '--primary-color',
        '--complementary-color',
        '--secondary-color',
        '--analog-color',
        '--third-color',
        '--fourth-color',
        '--text-color',
        '--bg-color',
        '--white',
        '--black',
        '--gray',
        '--green',
        '--blue',
        '--red',
        '--yellow',
        '--purple',
    ]
    return (
        <div>
            <Breadcrumb/>
            <Title title='Sandbox' type='UI test page' icon={<IconUnlocked/>}/>
            <Help title='This is the help'>
                <p>
                    Excepteur exercitation incididunt quis commodo sint do pariatur labore velit do commodo voluptate
                    minim Lorem.
                </p>
            </Help>
            <div>

                <form>

                </form>
            </div>
            <h3>Heading Level 3 can have buttons on the right <button>Press Me</button></h3>
            <p>Consequat aliqua aliqua sit dolore minim dolore excepteur do qui exercitation.</p>
            <code>
                vim .env
            </code>
            <h4>Heading Level 4 can have buttons on the right <button>Press Me</button></h4>
            <p>This is a paragraph.</p>
            <div className='button-group' style={{margin: 'var(--margin) 0'}}>
                <BtnPrimary>BtnPrimary</BtnPrimary>
                <BtnSecondary>BtnSecondary</BtnSecondary>
                <BtnLink>BtnLink</BtnLink>
            </div>

            <p style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                fontSize: 'var(--fontSizeXsmall)',
                color: 'white'
            }}>
                {colors.map((color, index) =>
                    <figure key={index}
                            style={{width: '80px', height: '80px', background: `var(${color})`}}>{color}</figure>
                )}
            </p>
        </div>
    )
}

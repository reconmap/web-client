import React from 'react'
import { IconUnlocked } from '../icons'
import Title from './Title'
import Breadcrumb from './../ui/Breadcrumb'
import { useHistory } from 'react-router-dom'
import BtnPrimary from './../ui/buttons/BtnPrimary'
import BtnSecondary from './buttons/BtnSecondary'
import BtnLink from './buttons/BtnLink'
export default function Sandbox() {
    const history = useHistory()
    return (
        <div>
            <Breadcrumb history={history}/>
            <Title title='Sandbox' type='UI test page' icon={<IconUnlocked />}/>

            <h3>Heading Level 4 can have buttons on the right <button>Press Me</button></h3>
            <p>Consequat aliqua aliqua sit dolore minim dolore excepteur do qui exercitation.</p>

            <h4>Heading Level 4 can have buttons on the right <button>Press Me</button></h4>
            <p>Consequat aliqua aliqua sit dolore minim dolore excepteur do qui exercitation.</p>
            <p>
                <BtnPrimary>BtnPrimary</BtnPrimary>
                <BtnSecondary>BtnSecondary</BtnSecondary>
                <BtnLink>BtnLink</BtnLink>
            </p>
            <p style={{ display:'flex', gap: '10px'}}>
                <figure style={{ width:'80px', height:'80px', background:'var(--primary-color)'}}>primary</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--complementary-color)'}}>complementary</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--secondary-color)'}}>secondary</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--analog-color)'}}>analog</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--third-color)'}}>third</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--fourth-color)'}}>fourth</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--text-color)'}}>text-color</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--bg-color)'}}>bg-color</figure>
            </p>
            <p style={{ display:'flex', gap: '10px'}}>
                <figure style={{ width:'80px', height:'80px', background:'transparent'}}></figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--green)'}}>green</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--blue)'}}>blue</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--red)'}}>red</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--yellow)'}}>yellow</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--purple)'}}>purple</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--white)'}}>white</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--black)'}}>black</figure>
                <figure style={{ width:'80px', height:'80px', background:'var(--gray)'}}>gray</figure>
            </p>
        </div>
    )
}

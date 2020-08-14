import React from 'react'
export default function Features() {
    const FEATURES = [
        {icon:'plus',text:'Free and open source'},
        {icon:'pen',text:'Extensible via plugins'},
        {icon:'terminal',text:'Multiple language support'},
        {icon:'book',text:'User roles and permissions'},
        {icon:'book',text:'vReport generation (PDF, Word)'},
    ]
        return <div className='flex flex-col justify-center h-full items-start '>
            <h1 className='text-5xl font-bold mb-10'>Features</h1>
            <ul className='text-2xl flex flex-col gap-4'>
                {FEATURES.map(feature => <li><i className={`fa fa-${feature.icon} mx-5 fa-fw`}/>{feature.text}</li>)}
            </ul>
        </div>
}

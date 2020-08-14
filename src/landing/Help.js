import { Link } from 'react-router-dom'
import React from 'react'
export default function Help() {
    const HOW_WORKS = [
        {icon:'plus',text:'Create a project from scratch or using a template.'},
        {icon:'pen',text:'Define your target (hosts, domains, …)'},
        {icon:'terminal',text:'Execute each one of the reconnaissance tasks and upload their results'},
        {icon:'book',text:'Generate an automatic report for all the findings'},
    ]
    return <div className='flex flex-col justify-center h-full items-start '>
        <h1 className='text-5xl font-bold mb-10'>How does it works</h1>
        <ul className='text-2xl flex flex-col gap-4'>
            {HOW_WORKS.map(step => <li><i className={`fa fa-${step.icon} mx-5 fa-fw`}/>{step.text}</li>)}
        </ul>
    </div>
}

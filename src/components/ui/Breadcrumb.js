import React from 'react'
import { IconLeft, IconFolder } from '../icons'

const Breadcrumb = ({ path, goBack }) => {
    return <div className='  breadcrumb   items-center  inline-flex '>
        {goBack ? <div onClick={goBack} className='p-1 hover:opacity-75 opacity-50 rounded cursor-pointer'><IconLeft size={'6'} /></div> :
            <div className='p-1 hover:opacity-75 opacity-50 rounded cursor-pointer'><IconFolder size={'6'} /></div>}
        {path.split('/').map((route, index) =>
            route !== '' && route.length > 1 && 
            <span key={index} className=' leading-none capitalize flex-inline font-medium tracking-wide '> 
                <i className='mx-2 font-bold opacity-25'>/</i> 
                {route} 
            </span>
        )} </div>
}
export default Breadcrumb
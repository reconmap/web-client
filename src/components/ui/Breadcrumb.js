import React from 'react'
import { IconLeft, IconFolder } from '../icons'

const Breadcrumb = ( {path, goBack} ) => {
    return <div className='text-gray-500 p-2 text-sm border-2 border-gray-800 items-center rounded-lg inline-flex mb-2'>
    {goBack ? <div onClick={goBack} className='p-1 text-gray-700 hover:text-gray-200 hover:bg-gray-800 mr-2 rounded cursor-pointer'><IconLeft size={'6'}/></div> : 
    <div className='p-1 text-gray-700 hover:text-gray-200 hover:bg-gray-800 mr-2 rounded cursor-pointer'><IconFolder size={'6'}/></div>
    }
    {path.split('/').map( route => 
        route != '' && route.length > 1 && <span className=' leading-none capitalize flex-inline font-medium tracking-wide '>{route} <i className='mx-2 text-gray-700 font-bold'>/</i></span>
    )} </div>
}
export default Breadcrumb
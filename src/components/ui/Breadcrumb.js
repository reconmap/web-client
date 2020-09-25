import React from 'react'
import { IconLeft } from '../icons'

const Breadcrumb = ({ history }) => {
    const handleGoBack = () => {
        history.goBack()
    }
 
    const handleGoTo = (destination) => {
        if( destination.length >3 ){
            history.push('/' + destination)
        }
    }

    return <div className='  breadcrumb items-center  inline-flex '>

        {history && history.length > 0 && <div onClick={handleGoBack} className='pr-1 hover:opacity-75 opacity-50 rounded cursor-pointer'>
            <IconLeft size={'5'} />
        </div>}

        {/* <div onClick={handleGoToRoot} className=' hover:opacity-75 opacity-50 rounded cursor-pointer'><IconFolder size={'5'} /></div> */}

        {history.location.pathname.split('/').map((route, index) => 
                route !== '' && 
                    <span key={index} className='hover:opacity-75 cursor-pointer leading-none capitalize flex-inline font-medium tracking-wide ' onClick={ ()=> handleGoTo(route)}>
                        <i className='mx-2 font-bold opacity-25'>/</i>
                        {route}
                    </span>
            )}
        </div>
}
export default Breadcrumb
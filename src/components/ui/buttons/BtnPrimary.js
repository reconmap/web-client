import React from 'react'
import {useHistory} from 'react-router-dom';

export default function BtnPrimary({type, onClick, children, color = 'red', size = 'base', disabled = false, to, external = false}) {
    const SIZES = {
        'xs': ' px-2 py-1 ',
        'sm': ' px-3 py-2 ',
        'base': ' px-5 py-3 ',
        'lg': ' px-6 py-4 ',
    }
    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }
    return (
        <button
            type={type ? type : "button"}
            onClick={onClick || handleOpen}
            disabled={disabled}
            className={`${disabled && 'opacity-50'}  inline-flex items-center justify-center ${SIZES[size]} border border-transparent text-${size} leading-6 font-medium rounded-md text-white bg-${color}-500 hover:bg-${color}-400 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}>
            {children}
        </button>
    )
}

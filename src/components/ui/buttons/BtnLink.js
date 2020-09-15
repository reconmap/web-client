import React from 'react'
import { useHistory } from 'react-router-dom'

export default function BtnLink ({ onClick, children, color = 'red', size = 'base', to, disabled = false, external = false }) {
    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }
    const SIZES = {
        'xs': ' px-2 py-1 ',
        'sm': ' px-3 py-2 ',
        'base': ' px-5 py-3 ',
        'lg': ' px-6 py-4 ',
    }
    return (
        <button
            onClick={onClick || handleOpen}
            disabled={disabled}
            className={`${disabled && 'opacity-50 text-gray-500'} inline-flex items-center justify-center px-5 py-3 border border-transparent text-${size} ${SIZES[size]} leading-6 font-medium rounded-md text-${color}-500  hover:text-${color}-400 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}>
            {children}
        </button>
    )
}

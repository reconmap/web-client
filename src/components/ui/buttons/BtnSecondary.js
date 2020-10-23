import { useHistory } from 'react-router-dom'

export default function BtnSecondary({ onClick, children, color = 'red', size = 'base', to, disabled = false, external = false }) {
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
            className={`${disabled && 'opacity-50 text-gray-500'} hover:shadow-outline btn-secondary shadow inline-flex items-center justify-center ${SIZES[size]} border border-transparent text-${size} leading-6 font-medium rounded-md text-${color}-600 bg-white hover:text-${color}-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}>
            {children}
        </button>
    )
}

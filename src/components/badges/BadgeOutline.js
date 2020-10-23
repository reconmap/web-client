
export default function BadgeOutline({children, color='gray' , fontSize='text-sm', icon}) {
    return (
        <span className={`px-2 py-1 inline-flex items-center leading-5 font-semibold rounded border-2 border-${color}-500 text-${color}-500 ${fontSize}`}>
            {icon}
            {children}
        </span>
    )
}

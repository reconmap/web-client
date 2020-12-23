import './Tabs.scss'

const Tabs = ({children}) => {
    return <div className='flex gap-sm mt tabs'>
        {children}
    </div>
}

export default Tabs;

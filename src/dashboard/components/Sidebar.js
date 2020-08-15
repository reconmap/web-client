import React from 'react'
import LINKS from './../../routes/dashboard'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <aside className='w-48  flex flex-col  p-3'>
          {LINKS.map(link => <Link to={link.to} className='px-2 py-3 w-full text-gray-400 text-sm font-medium hover:text-white' >{link.title}</Link>)}
        </aside>
    )
}

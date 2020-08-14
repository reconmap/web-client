import React from 'react'
import {Link} from 'react-router-dom'
export default function Header() {
    const LINKS = [
        { title: "Home", to: "/" },
        { title: "Features", to: "features" },
        { title: "Help", to: "help" },
      ];
    return <header className="flex items-center justify-between w-full  py-2 ">
                <h3 className="text-3xl font-bold"><i className='fa fa-mountain mr-2 text-base opacity-50'/> Reconmap</h3>
                <nav className="font-semibold gap-5 flex items-center">
                {LINKS.map((link,index) => ( <Link key={index} className={`text-gray-500 font-bold   py-1 text-base hover:text-white hover:border-white`} to={link.to} > {link.title} </Link> ))}
                <Link to='login' className='rounded bg-gray-800 py-2 px-4'>Log in</Link>
                </nav>
            </header>
}


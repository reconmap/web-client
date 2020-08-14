import { Link } from 'react-router-dom'
import React from 'react'
export default function Forbidden() {
    return (
        <React.Fragment>
            <img src="logo.png" />
            <h1 className="text-4xl  font-semibold">Access restricted</h1>
            <p className="text-xl mb-5">
            Access beyond this page is restricted. Please login to work on your
            reconnaissance and pentest projects.
            </p>
            <Link to="login" className="bg-white text-gray-800 py-3 px-5 rounded text-xl font-bold" > Login </Link>
        </React.Fragment>
    )
}

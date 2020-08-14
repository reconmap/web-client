import { Link } from 'react-router-dom'
import React from 'react'

export default function Login() {
        return <div className='flex flex-col justify-center h-full items-start '>
            <h1 className='text-5xl font-bold mb-10'>Login in</h1>
            <section className='flex flex-col w-full sm:w-1/2 max-w-md'>
                <label for="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="text-lg w-full p-3 bg-gray-800  rounded-t " placeholder="Email address" required autofocus />
                <label for="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="text-lg  w-full p-3 bg-gray-800  rounded-b   " placeholder="Password" required/>
                <div className="checkbox my-3">
                    <label>
                    <input type="checkbox" value="remember-me" /> Remember me 
                    </label>
                </div>
            <Link to="dashboard" className="bg-blue-600 text-white w-full py-3 px-5 rounded text-xl font-medium" > Sign in </Link>
            </section>

        </div>
}

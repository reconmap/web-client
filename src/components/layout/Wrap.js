import React from 'react'
import Footer from "./Footer";
import Header from "./Header";

const Wrap = ({ children }) => {
    return (
        <div className=" container flex w-full h-screen p-5 mx-auto flex-col ">
            <Header />
            <div className="flex flex-1 flex-col justify-center h-full items-center md:items-start text-center md:text-left">
                {children}
            </div>
            <Footer />

        </div>
    )
}

export default Wrap
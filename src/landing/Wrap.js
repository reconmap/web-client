import React from 'react'
import Footer from "./Footer";
import Header from "./Header";

const Wrap = ({children}) => {
    return (
        <div className=" container flex w-full h-screen p-3 mx-auto flex-col ">
            <Header />
            <main role="main" className="flex flex-1 flex-col ">
                <div className="flex flex-col justify-center h-full items-center text-center">
                    {children}
                </div>
            </main>
            <Footer />

        </div>
    )
}

export default Wrap
import Footer from "./Footer";
import Header from "./Header";

const Wrap = ({children}) => {
    return (
        <div className="flex w-full h-screen  flex-col ">
            <Header/>
            <div
                className="flex flex-1 flex-col justify-center h-full items-center md:items-start text-center md:text-left">
                {children}
            </div>
            <Footer/>

        </div>
    )
}

export default Wrap

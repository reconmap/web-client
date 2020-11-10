export default function Footer() {
    return <footer className=" font-medium text-center md:text-left py-12 px-5">
        Version <strong className="text-white">{process.env.REACT_APP_VERSION}</strong>
    </footer>
}

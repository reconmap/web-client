import Header from "./Header";
import './LoginContainer.scss'
const LoginContainer = ({children}) => {
    return (
        <div className='login__container'>
            <Header/>
            <div>
                {children}
            </div>
            <footer>
                Version
                <strong > {process.env.REACT_APP_VERSION}</strong> ({process.env.REACT_APP_GIT_COMMIT_HASH})
            </footer>
        </div>
    )
}

export default LoginContainer

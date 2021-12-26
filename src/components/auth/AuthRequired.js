import { Navigate, useLocation } from "react-router-dom";
import { AuthConsumer } from "../../contexts/AuthContext";

const AuthRequired = ({ children }) => {
    const location = useLocation();

    return <AuthConsumer>
        {({ isAuth }) => isAuth ? children : <Navigate to="/login" state={{ from: { pathname: location.pathname } }} replace />}
    </AuthConsumer>
}

export default AuthRequired;

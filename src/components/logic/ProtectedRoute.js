import { Redirect, Route } from "react-router-dom";
import { AuthConsumer } from "../../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <AuthConsumer>
        {
            ({ isAuth }) => (
                <Route {...rest} render={props =>
                    isAuth ? <Component {...props} /> :
                        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                } />
            )
        }
    </AuthConsumer>
)

export default ProtectedRoute;

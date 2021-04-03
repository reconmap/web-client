import { Route } from "react-router";
import Login from "./Login";
import MfaSetup from "./MfaSetup";
import MfaVerification from "./MfaVerification";

const AuthRoutes = [
    <Route exact path="/login" component={Login} />,
    <Route exact path="/auth/mfa-setup" component={MfaSetup} />,
    <Route exact path="/auth/mfa-verification" component={MfaVerification} />
]

export default AuthRoutes;

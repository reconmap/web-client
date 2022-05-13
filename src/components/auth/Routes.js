import { Route } from "react-router";
import LoginForm from "./LoginForm";
import MfaSetup from "./MfaSetup";
import MfaVerification from "./MfaVerification";

const AuthRoutes = [
    <Route path="/login" element={<LoginForm />} />,
    <Route path="/auth/mfa-setup" element={<MfaSetup />} />,
    <Route path="/auth/mfa-verification" element={<MfaVerification />} />
]

export default AuthRoutes;

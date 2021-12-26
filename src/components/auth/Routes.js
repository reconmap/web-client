import { Route } from "react-router";
import Login from "./Login";
import MfaSetup from "./MfaSetup";
import MfaVerification from "./MfaVerification";

const AuthRoutes = [
    <Route path="/login" element={<Login />} />,
    <Route path="/auth/mfa-setup" element={<MfaSetup />} />,
    <Route path="/auth/mfa-verification" element={<MfaVerification />} />
]

export default AuthRoutes;

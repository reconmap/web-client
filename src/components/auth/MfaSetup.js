import PrimaryButton from "components/ui/buttons/Primary";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import { useHistory } from "react-router";
import LoginContainer from "./LoginContainer";

const MfaSetup = () => {

    const history = useHistory();

    const [mfa] = useFetch('/auth/mfa-setup');

    const onContinueButtonClick = () => {
        history.push('/auth/mfa-verification');
    }

    if (!mfa) return <Loading />

    return <LoginContainer>

        <section className="loginform">
            <form>
                <fieldset>
                    <legend>Two-factor authentication</legend>

                    <p>Use a time-based one-time password (TOPT) authenticator app to scan the QR code or enter the alphanumeric code <strong>{mfa.secret}</strong> manually.</p>
                    <p><img src={mfa.qrDataUri} /></p>
                    <p>Once you have done this, click the button below.</p>

                    <PrimaryButton onClick={onContinueButtonClick}>Continue</PrimaryButton>
                </fieldset>
            </form>
        </section>
    </LoginContainer>
}

export default MfaSetup;

import UAParser from 'ua-parser-js';

const UserAgentLabel = ({userAgent}) => {
    const parser = new UAParser(userAgent);
    return <span title={userAgent}>{parser.getBrowser().name} on {parser.getOS().name}</span>
}

export default UserAgentLabel;

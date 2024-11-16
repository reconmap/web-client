
interface MailLinkProps {
    email: string | null;
}

const MailLink = ({ email }: MailLinkProps) => {
    if (null === email) {
        return <>-</>
    }
    return <a href={`mailto:${email}`} title={`Send email to "${email}"`}>{email}</a>
}

export default MailLink;


interface Props {
    kind: string;
    name: string;
    role?: string;
    email: string;
    phone?: string;
}

class Contact implements Props {
    kind: string = 'general';
    name: string = '';
    role?: string = undefined;
    email: string = '';
    phone?: string = undefined;
}

export default Contact;

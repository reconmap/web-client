
interface Props {
    type: string;
    name: string;
    note?: string;
    value: string;
    password?: string;
    reportable: boolean;
}

class Vault implements Props {
    type: string = 'password'; // note, password, token, key
    name: string = '';
    note?: string = undefined;
    value: string = '';
    password?: string = undefined;
    reportable: boolean = false;
}

export default Vault;

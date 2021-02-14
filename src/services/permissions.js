
const PermissionsService = {
    isAllowed: (desired, granted) => {
        if (granted.includes(desired) || granted.includes('*.*')) {
            return true;
        }
        const parts = desired.split('.');
        return granted.includes(parts[0] + '.*');
    }
}

export default PermissionsService;

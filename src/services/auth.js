
const Auth = {
    removeSession: () => {
        localStorage.clear();
    },

    getLoggedInUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default Auth;

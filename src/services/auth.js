
const Auth = {
    removeSession: () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('user');
    },

    getLoggedInUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default Auth;

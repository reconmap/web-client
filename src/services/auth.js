
const Auth = {
    removeSession: () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('user');
    }
}

export default Auth;


export const userAuth = () => {
    return localStorage.getItem('token') ? localStorage.getItem('token') : null;
}

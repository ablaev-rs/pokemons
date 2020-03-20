module.exports = (storageName) => {
    const data =  JSON.parse(localStorage.getItem(storageName));
    if(data && data.token) {
        return {
            token: data.token,
            userId: data.userId,
            isAuth: true
        } ;
    } else {
        return {
            token: null,
            userId: null,
            isAuth: false
        } ;
    }
}

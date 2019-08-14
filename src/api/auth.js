import share from '../api/share'
export function auth() {
    return share({
        url: '/api/auth',
        method: 'get',
    });
}

//
export function  getLang(data) {
    return share({
        url: '/api/language',
        method: 'post',
        data
    });
}

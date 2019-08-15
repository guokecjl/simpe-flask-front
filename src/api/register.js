import share from '../api/share'

export function registerApi(data){
    return share({
        url: '/auth/register',
        method: 'post',
        data
    })
}
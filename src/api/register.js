import share from '../api/share'

export function registerApi(data){
    return share({
        url: '/register',
        method: 'post',
        data
    })
}
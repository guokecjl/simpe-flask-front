import share from '../api/share'

export function resetPassword(data){
    return share({
        url: '/reset_pwd',
        method: 'post',
        data
    })
}

import share from '../api/share'

export function resetPassword(data){
    return share({
        url: '/auth/reset_pwd',
        method: 'post',
        data
    })
}

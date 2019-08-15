import share from '../api/share'

export function loginApi(data) {
  return share({
    url: '/auth/login',
    method: 'post',
    data
  });
}

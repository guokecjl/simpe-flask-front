import share from '../api/share'

export function loginApi(data) {
  return share({
    url: '/api/login',
    method: 'post',
    data
  });
}

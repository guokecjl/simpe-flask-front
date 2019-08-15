import share from '../api/share'

export function loginApi(data) {
  return share({
    url: '/login',
    method: 'post',
    data
  });
}

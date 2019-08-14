import axios from 'axios';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    //timeout: 5000                  // 请求超时时间
});
axios.defaults.withCredentials=true;

export const fetch = (data) => {
    return new Promise((resolve, reject) => {
        service(data).then((res)=>{
            if(res.data && res.data.status === 40001){
                reject(res.data)
            }else {
                resolve(res)
            }
        }).catch(()=>{ reject() })
    })
}
export default fetch;

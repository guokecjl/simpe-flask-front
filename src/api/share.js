import axios from 'axios';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
});
axios.defaults.withCredentials=true;

export default service;

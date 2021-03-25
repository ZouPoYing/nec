import axios from 'axios'
export function request(config){
  const instance = axios.create({
    /*baseURL: 'http://123.207.32.32:8000/api/h3',*/
    /*baseURL: 'http://192.168.1.106:9191/ncm',*/
    timeout: 5000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }

  })

  // 写法
  /*return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })
    instance(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })*/
  // 请求拦截器
  /*instance.interceptors.request.use(config =>{
    console.log(config);
    return config
  }, error => {
    console.log(error);
  })*/
  // 响应拦截器
  /*instance.interceptors.response.use(res =>{
    console.log(res);
    return res.data
  }, error => {
    console.log(error);
  })
  return instance(config)*/

}


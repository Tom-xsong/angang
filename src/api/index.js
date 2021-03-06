import axios from "axios"


// axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

let baseUrl = "http://119.84.70.208:7507"
// switch (process.env.NODE_ENV) { 
//     case 'development': 
//         baseUrl = "http://119.84.70.208:7506"  //开发环境url  
//         break 
 
//     case 'production': 
//         baseUrl = " "  //生产环境url 
//         break 
// }

axios.defaults.baseURL = baseUrl;



//请求拦截
axios.interceptors.request.use(config => {
console.group("本次请求内容")
console.log(config)

    return config
})

//响应拦截
axios.interceptors.response.use(res => {
    console.group("本次路径：" + res.config.url)
    console.log(res)
    console.groupEnd()

    return res;
})



//封装get方法
export function get(url, params) {
  return new Promise((resolve, reject) => {   
    axios.get(
        url, 
        {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}


//封装post方法 
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(
            url,
            JSON.stringify(params),
            {
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
				
            }
        )
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}














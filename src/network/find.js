import {request} from "./request"

// 获取发现页面的轮播图以及每日推荐等数据的url
/*export function getFindMultidata() {
    return  request({
        url: 'http://123.207.32.32:8000/api/h8/home/multidata'
    })
}*/

// 获取发现页面展示数据
export function getFindShowData(page, type) {
    return  request({
        url: 'http://123.207.32.32:8000/api/h8/home/data',
        params: {
            page,
            type
        }
    })
}

// 测试链接springboot
export function getSpringboot() {
    return  request({
        url: 'http://192.168.1.106:9191/ncm/user/list'
    })
}
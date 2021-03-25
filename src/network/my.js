import {request} from "./request"

export function getMyMultidata() {
  return  request({
      url: '/my/multidata'
  })
}
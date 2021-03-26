import Vue from 'vue'
import VueRouter from 'vue-router'
const My = () => import('../views/my/My')
const Cloud = () => import('../views/cloud/Cloud')
const Find = () => import('../views/find/Find')
const Ranking = () => import('../views/find/Ranking')
const SongList = () => import('../views/find/SongList')
const Everyday = () => import('../views/find/Everyday')
const Search = () => import('../views/search/Search')
const Set = () => import('../views/set/Set')
const Video = () => import('../views/video/Video')
const Detail = () => import('../views/detail/Detail')
const SongListDetail = () => import('../views/detail/SongListDetail')
const Login = () => import('../views/loginAndRegister/Login')
const Register = () => import('../views/loginAndRegister/Register')
const Repassword = () => import('../views/loginAndRegister/Repassword')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/find'
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/cloud',
    component: Cloud
  },
  {
    path: '/find',
    component: Find
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/set',
    component: Set
  },
  {
    path: '/video',
    component: Video
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/songListDetail/:id',
    component: SongListDetail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/repassword',
    component: Repassword
  },
  {
    path: '/ranking',
    component: Ranking
  },
  {
    path: '/songList',
    component: SongList
  },
  {
    path: '/everyday',
    component: Everyday
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
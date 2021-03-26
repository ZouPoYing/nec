<template>
  <div id="find">
    <find-swiper :banners="banners"></find-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <tab-control class="tab-control"
      :titles="['流行','摇滚','民谣','古风']"
      @tabClick="tabClick"></tab-control>
    <goods-list :goodslist="showGoods"></goods-list>
    <div class="getMore">
      <div v-if="getMore" @click="getNextPage">点击加载更多</div>
      <div v-else>我也是有底线的</div>
    </div>
    <back-top @click.native="backClick()"></back-top>
  </div>
</template>

<script>
    // 方法
    import {getFindMultidata, getFindShowData, getSpringboot} from "../../network/find";
    // 公共组件
    import TabControl from "../../components/content/tabControl/TabControl";
    import BackTop from "../../components/common/backTop/BackTop";
    // 子组件
    import FindSwiper from "./childComps/FindSwiper";
    import RecommendView from "./childComps/RecommendView";
    import GoodsList from "../../components/content/goods/GoodsList";
    import axios from "axios";

  export default {
        name: "Find",
    components: {
      TabControl,
      BackTop,
      FindSwiper,
      RecommendView,
      GoodsList
    },
    computed: {
          showGoods() {
            return this.showData[this.currentType].list
          }
    },
    data() {
          return {
            banners: [],
            recommends: [],
            showData: {
              'lx': {page: 0, list: []},
              'yg': {page: 0, list: []},
              'my': {page: 0, list: []},
              'gf': {page: 0, list: []}
            },
            currentType: 'lx',
            getMore: true
          }
    },
    mounted() {  
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    created() {
      this.getFindMultidata();
      this.getFindShowData('lx');
      this.getFindShowData('yg');
      this.getFindShowData('my');
      this.getFindShowData('gf');
    },
    methods: {
      // 事件监听相关方法
      tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'lx'
                break
          case 1:
            this.currentType = 'yg'
            break
          case 2:
            this.currentType = 'my'
            break
          case 3:
            this.currentType = 'gf'
            break
        }
      },
      btnClick() {
        console.log('去详情页面');
      },
      backClick() {
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },
      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop () {
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 60) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      },
      // 网络请求相关方法
      getFindMultidata() {
        var that = this;
        axios.get('http://localhost:9191/ncm/app/bannersList',{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          withCredentials: true
        }).then(function (response) {
          console.log(response);
          that.banners = response.data;
        }).catch(function (error) {
          console.log(error);
        });
        axios.get('http://localhost:9191/ncm/app/recommendsList',{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          withCredentials: true
        }).then(function (response) {
          console.log(response);
          that.recommends = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      getFindShowData(type) {
        const page = this.showData[type].page + 1;
        var that = this;
        var url = 'http://localhost:9191/ncm//song/pageLXSong';
        if(type == 'lx') {
          url = 'http://localhost:9191/ncm//song/pageLXSong'
        }
        if(type == 'yg') {
          url = 'http://localhost:9191/ncm//song/pageYGSong'
        }
        if(type == 'my') {
          url = 'http://localhost:9191/ncm//song/pageMYSong'
        }
        if(type == 'gf') {
          url = 'http://localhost:9191/ncm//song/pageGFSong'
        }
        axios.get(url,{
            params: {
                page: page,
                size: 30
            },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          withCredentials: true
        }).then(function (response) {
          console.log(response);
            that.showData[type].list.push(...response.data)
            that.showData[type].page += 1
        }).catch(function (error) {
          console.log(error);
        });
      },
      getNextPage() {
        console.log('getNextPage');
        console.log('currentType'+this.currentType);
        if(this.currentType == 'lx') {
          this.getFindShowData('lx');
          this.showData[this.currentType].page += 1
        }
        if(this.currentType == 'yg') {
          this.getFindShowData('yg');
          this.showData[this.currentType].page += 1
        }
        if(this.currentType == 'my') {
          this.getFindShowData('my');
          this.showData[this.currentType].page += 1
        }
        if(this.currentType == 'gf') {
          this.getFindShowData('gf');
          this.showData[this.currentType].page += 1
        }
        this.getMore = false
      }
    }
    }
</script>

<style scoped>

  #find {
    padding-top: 50px;
    padding-bottom: 44px;
  }

  .tab-control {
    position: sticky; /*这个属性很重要*/
    top: 40px;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }

  .wrapper {
    height: 200px;
    overflow: hidden;
  }

  .getMore {
    width: 120px;
    margin-left: 100px;
  }
</style>
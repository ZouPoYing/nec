<template>
  <div id="find">
        <find-swiper :banners="banners"></find-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <re-song-list></re-song-list>
        <tab-control class="tab-control"
                     :titles="['流行','新款','精选']"
                     @tabClick="tabClick"></tab-control>
        <goods-list :goodslist="showGoods"></goods-list>
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
    import ReSongList from "./childComps/ReSongList";
    import GoodsList from "../../components/content/goods/GoodsList";
    import axios from "axios";

  export default {
        name: "Find",
    components: {
      TabControl,
      BackTop,
      FindSwiper,
      RecommendView,
      ReSongList,
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
              'pop': {page: 0, list: []},
              'new': {page: 1, list: []},
              'sell': {page: 2, list: []}
            },
            currentType: 'pop'
          }
      },
    /*mounted() {
      console.log('mounted');
    },*/
    created() {
      this.getUserList();
      console.log('created');
      this.getFindMultidata();
      this.getFindShowData('pop');
      this.getFindShowData('new');
      this.getFindShowData('sell');
    },
    methods: {
      // 事件监听相关方法
      tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      btnClick() {
        console.log('1');
      },
      backClick() {
        console.log('backtop');
      },
      // 网络请求相关方法
      getFindMultidata() {
        var that = this;
        axios.get('http://123.207.32.32:8000/api/h8/home/multidata',{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          withCredentials: true
        }).then(function (response) {
          console.log(response);
          that.banners = response.data.data.banner.list;
          that.recommends = response.data.data.recommend.list;
        }).catch(function (error) {
          console.log(error);
        });
      },
      getFindShowData(type) {
        const page = this.showData[type].page + 1;
        var that = this;
        axios.get('http://123.207.32.32:8000/api/h8/home/data',{
            params: {
                page: page,
                type: type
            },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          withCredentials: true
        }).then(function (response) {
          console.log(response);
            that.showData[type].list.push(...response.data.data.list)
            that.showData[type].page += 1
        }).catch(function (error) {
          console.log(error);
        });
      },
      getUserList() {
        var that = this;
        axios.post('http://192.168.1.106:9191/ncm/user/list',null,{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          withCredentials: true
        }).then(function (response) {
          console.log(response);
          that.userlist = response.data
        }).catch(function (error) {
          console.log(error);
        });
      }

    }
    }
</script>

<style scoped>

  #find {
    padding-top: 50px;
    padding-bottom: 44px;
    /*height: 1000vh;
    line-height: 100%;*/
  }

  .tab-control {
    position: sticky; /*这个属性很重要*/
    top: 40px;
    z-index: 9;
  }

  .content {
    /*overflow: hidden;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }

  .wrapper {
    height: 200px;
    overflow: hidden;
    /*overflow-y: scroll;*/
  }
  /*.content {
    height: 500px;
    overflow: hidden;
  }*/
</style>

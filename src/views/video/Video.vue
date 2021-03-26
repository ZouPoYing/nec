<template>
    <div id="video">
        <tab-control class="tab-control"
                 :titles="['故事类','片段类','演唱会','歌舞类','动画类']"
                 @tabClick="tabClick"></tab-control>
        <div class="mvMessage">
            <ul>
                <li v-for="(item, index) in mv" v-bind:key="index" @click="itemClick(item)">
                    <video :src="'http://localhost:9191/ncm/'+item.mvMv" width="280" controls></video>
                    <div class="info">
                        <p>{{item.mvInfo}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    // 公共组件
    import TabControl from "../../components/content/tabControl/TabControl";

    export default {
        name: "Video",
        data() {
            return{
                currentType: '',
                mv: []
            }
        },
        components: {
            TabControl
        },
        created() {
            this.getMv();
        },
        methods: {
            getMv() {
                var that = this;
                axios.post('http://localhost:9191/ncm/song/listGSMv',{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                withCredentials: true
                }).then(function (response) {
                    console.log(response);
                    that.mv = response.data
                }).catch(function (error) {
                    console.log(error);
                })
            },
            tabClick(index) {
                var that = this;
                axios.post('http://localhost:9191/ncm/song/listMv',index,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                withCredentials: true
                }).then(function (response) {
                    console.log(response);
                    that.mv = response.data
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>

  #video {
    padding-top: 50px;
    padding-bottom: 44px;
    /*height: 1000vh;
    line-height: 100%;*/
  }

  ul {
    padding: 20px;
    list-style:none;
  }
</style>
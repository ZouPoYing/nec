<template>
    <div id="song-list">
        <div class="userMessage" :style="bg">
          <img src="http://localhost:9191/ncm/song/song.jpg" alt="">
          <span>歌单</span>
        </div>
        <div class="songMessage">
            <div class="song-list">
                <ul>
                    <li v-for="(item, index) in songList"  v-bind:key="index" @click="itemClick(item.wid)">
                    <img class="img" src="http://localhost:9191/ncm/song/song.jpg" alt="">
                    <span>{{item.songListName}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "SongList",
        data() {
            return{
                songList: [],
                bg: 'background:url("http://localhost:9191/ncm/bg/bg.jpg");'
            }
        },
        created() {
            this.getSongList();
        },
        methods: {
            getSongList() {
                var that = this;
                axios.post('http://localhost:9191/ncm/song/listSongList',{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                withCredentials: true
                }).then(function (response) {
                    console.log(response);
                    that.songList = response.data
                }).catch(function (error) {
                    console.log(error);
                })
            },
            itemClick(id) {
                this.$router.push('/songListDetail/'+id)
            }
        }
    }
</script>

<style scoped>

    #song-list {
        padding-top: 50px;
        padding-bottom: 44px;
    }

    .userMessage {
        padding: 20px;
        height: 80px;
    }

    .userMessage img {
        width: 60px;
        height: 60px;
    }

    .userMessage span {
        font-size: 20px;
        margin-left:20px;
        color: white;
    } 

    .songMessage {
        width: 290px;
        padding-left: 20px;
        border-top-width: 21px;
        border-style:solid;
        border-color: white;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        position: absolute;
        top: 150px;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding: 0px;
        list-style:none;
        margin-bottom: 40px;
    }

    li {
        width: 130px;
        height: 50px;
        padding: 10px 0 10px 0;
        position: relative;
    }

    li span {
        overflow:hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-20%, -50%);
    }

    .img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        background: lightgray;
    }
</style>
<template>
    <div id="song-list-detail">
        <div class="userMessage" :style="bg">
          <img :src="'http://localhost:9191/ncm/'+user.userPicHead" alt="">
          <span>{{user.userName}}</span>
        </div>
        <div class="songMessage">
            <h2>{{songListName}}</h2>
            <ul>
                <li v-for="(item, index) in songList"  v-bind:key="index">
                    <div class="index" @click="itemClick(item)">
                        <span>{{index+1}}</span>
                    </div>
                    <div class="info" @click="itemClick(item)">
                        <p>{{item.songName}}</p>
                        <p>{{item.songAuthor}}</p>
                    </div>
                    <div class="pic" @click="delClick(item.wid)">
                        <img src="@/assets/img/common/del.png" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "SongListDetail",
        data() {
            return{
                songList: [],
                user: {
                    userEmail: '',
                    userId: '',
                    userName: '',
                    userPassword: '',
                    userPicHead: ''
                },
                bg: 'background:url("http://localhost:9191/ncm/bg/bg.jpg");',
                songListName: '',
                id: this.$route.params.id,
            }
        },
        created() {
            this.getSongList();
            this.getUserQuery();
        },
        methods: {
            getSongList() {
                var that = this;
                if(this.id == '我喜欢的音乐') {
                    axios.post('http://localhost:9191/ncm/song/listLikeSongByUserId',this.$store.state.userId,{
                    headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                        that.songList = response.data
                    }).catch(function (error) {
                        console.log(error);
                    });
                    this.songListName = '我喜欢的音乐'
                } else if (this.id == '最近播放') {
                    axios.post('http://localhost:9191/ncm/song/listReSongByUserId',this.$store.state.userId,{
                    headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                        that.songList = response.data
                    }).catch(function (error) {
                        console.log(error);
                    });
                    this.songListName = '最近播放'
                } else {
                    axios.post('http://localhost:9191/ncm/song/querySongListNameByWid',this.id,{
                    headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                        that.songListName = response.data
                    }).catch(function (error) {
                        console.log(error);
                    });
                    axios.get('http://localhost:9191/ncm/song/listSongListDetailsByUserIdAndSongListId',{
                        params: {
                            userid: this.$store.state.userId,
                            wid: this.$route.params.id
                        },
                        headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                        },
                        withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                        that.songList = response.data
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            getUserQuery() {
                var that = this;
                axios.post('http://localhost:9191/ncm/user/queryUserByUserId',this.$store.state.userId,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                withCredentials: true
                }).then(function (response) {
                console.log(response);
                that.user = response.data
                }).catch(function (error) {
                console.log(error);
                });
            },
            itemClick(item) {
                this.$store.commit('getSong',item)
                this.$router.push('/detail')
            },
            delClick(id) {
                var that = this
                console.log(this.$route.params.id);
                console.log(id);
                axios.get('http://localhost:9191/ncm/song/deleteSongListDetail',{
                    params: {
                        params: this.$route.params.id,
                        wid: id
                    },
                    headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                }).then(function (response) {
                    console.log(response);
                    that.getSongList();
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

    #song-list-detail {
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
        border-radius:50%;
    }

    .userMessage span {
        font-size: 20px;
        margin-left:20px;
        color: white;
    } 

    .songMessage {
        width: 290px;
        padding-left: 20px;
        padding-bottom: 44px;
        border-top-width: 21px;
        border-style:solid;
        border-color: white;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        position: absolute;
        top: 150px;
    }

    ul {
        padding: 0px;
        list-style:none;
    }

    li {
        height: 50px;
    }

    .index {
        position: relative;
        height: 50px;
        width: 50px;
        /* text-align: center;
        display: table-cell;
        vertical-align: middle; */
        float: left;
    }

    .index span {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .info {
        height: 50px;
        width: 190px;
        float: left;
    }

    .info p{
        margin: 5px 0 5px 10px;
        overflow:hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
    }

    .pic {
        height: 50px;
        width: 50px;
        float: left;
    }

    .pic img {
        padding: 15px;
        height: 20px;
        width: 20px;
    }
</style>
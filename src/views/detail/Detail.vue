<template>
    <div id="detail">
        <div class="top">
            <div class="back" @click="back">
                <img src="@/assets/img/navbar/back.png" alt="">
            </div>
            <div class="p">
                <p class="name">{{song.songName}}</p>
                <p class="author">{{song.songAuthor}}</p>
            </div>
        </div>
        <div class="middle" :style="bg"></div>
        <div class="middleM">
            <img :src="'http://localhost:9191/ncm/'+song.songPic" alt="">
        </div>
        <div class="under">
            <div class="time">
                <div class="tiem-item" v-if="like" @click="likee">
                    <img src="@/assets/img/common/unlike.png" alt="">
                </div>
                <div class="tiem-item" v-else  @click="unlike">
                    <img src="@/assets/img/common/like.png" alt="">
                </div>
                <div class="tiem-item" @click="message">
                    <img src="@/assets/img/common/message.png" alt="">
                </div>
                <div class="tiem-item" @click="add">
                    <img src="@/assets/img/common/add.png" alt="">
                </div>
            </div>
            <div class="btn">
                <audio :src="'http://localhost:9191/ncm/'+song.songSong" id="musicMp3" autoplay="" controls=""></audio>
            </div>
        </div>
        <div class="SongList" v-if="addList">
            <h4>添加到歌单</h4>
            <ul>
                <li v-for="(item, index) in songListList"  v-bind:key="index" @click="itemClick(item.wid)">
                    <span>{{item.songListName}}</span>
                </li>
            </ul>
        </div>
        <div class="message" v-if="messageList">
            <h4>评论区</h4>
            <div class="messageUl">
                <ul>
                    <li v-for="(item, index) in userComment"  v-bind:key="index">
                        <div class="top">
                            <div class="user">
                                <img src="http://localhost:9191/ncm/head/head.jpg" alt="">
                            </div>
                            <div class="p2">
                                <p>{{item.userName}}</p>
                                <p style="font-size: 12px;">{{item.commentDate}}</p>
                            </div>
                            <div class="praise" v-if="praise">
                                <img src="@/assets/img/common/unpraise.png" alt="">
                            </div>
                            <div class="praise" v-else>
                                <img src="@/assets/img/common/praise.png" alt="">
                            </div>
                            <span>{{item.praiseNum}}</span>
                        </div>
                        <p class="text">{{item.text}}</p>
                    </li>
                    <span class="line"></span>
                    <li v-for="(item, index) in songComment"  v-bind:key="index">
                        <div class="top">
                            <div class="user">
                                <img src="http://localhost:9191/ncm/head/head.jpg" alt="">
                            </div>
                            <div class="p2">
                                <p>{{item.userName}}</p>
                                <p style="font-size: 12px;">{{item.commentDate}}</p>
                            </div>
                            <div class="praise" v-if="praise">
                                <img src="@/assets/img/common/unpraise.png" alt="">
                                
                            </div>
                            <div class="praise" v-else>
                                <img src="@/assets/img/common/praise.png" alt="">
                            </div>
                            <span>{{item.praiseNum}}</span>
                        </div>
                        <p class="text">{{item.text}}</p>
                    </li>
                </ul>
            </div>
            <div class="write">
                <input type="text" class="writetext" placeholder="有故事也需以歌来和" v-model.trim="text" />
                <span @click="submit">发送</span>
                <span style="color: red;">{{regComment}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Detail",
        data() {
            return{
                song: {
                    songId: '',
                    songName: '歌曲名',
                    songAuthor: '作者',
                    songDate: '',
                    songPic: 'song/song.jpg',
                    songTime: '',
                    songType: '',
                    songSong: 'mp3/song.mp3'
                    },
                    bg: 'background:url("http://localhost:9191/ncm/song/song.jpg");',
                    like: true,
                    praise: true,
                    addList: false,
                    messageList: false,
                    songListList: [],
                    userComment: [],
                    songComment: [],
                    text: '',
                    regComment: ''
            }
        },
        created() {
            this.getSongQuery();
            this.getIsLikeSong();
            this.addReSong();
            this.getComment();
        },
        methods: {
            getSongQuery() {
                var that = this;
                axios.post('http://localhost:9191/ncm/song/querySongBySongId',this.$store.state.song.songId,{
                headers: {
                'Content-Type': 'application/json;charset=UTF-8'
                },
                withCredentials: true
                }).then(function (response) {
                console.log(response);
                that.song = response.data
                that.bg = 'background:url("http://localhost:9191/ncm/'+that.song.songPic+'");'
                }).catch(function (error) {
                console.log(error);
                });
            },
            getIsLikeSong() {
                var that = this;
                if(this.$store.state.userId == '') {
                    return
                } else {
                    axios.get('http://localhost:9191/ncm/song/selectLikeSongByUserIdAndSongId',{
                        params: {
                            userid: this.$store.state.userId,
                            songid: this.$store.state.song.songId
                        },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                        if(response.data == true) {
                            that.like = false
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            addReSong() {
                var that = this;
                if(this.$store.state.userId == '') {
                    return
                } else {
                    axios.get('http://localhost:9191/ncm/song/insertOrUpdateReSong',{
                        params: {
                            userid: this.$store.state.userId,
                            songid: this.$store.state.song.songId
                        },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            getComment() {
                var that = this
                if(this.$store.state.userId == '') {
                    return
                } else {
                    axios.get('http://localhost:9191/ncm/song/listSongCommentDetailsByUserIdAndSongId',{
                        params: {
                            userid: this.$store.state.userId,
                            songid: this.$store.state.song.songId
                        },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                        that.userComment = response.data
                    }).catch(function (error) {
                        console.log(error);
                    });
                    axios.get('http://localhost:9191/ncm/song/listSongCommentDetailsBySongId',{
                        params: {
                            songid: this.$store.state.song.songId
                        },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                        that.songComment = response.data
                        //that.songComment.commentDate=formatDateTime(that.songComment.commentDate)
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            back() {
                this.$router.back(-1)
            },
            likee() {
                var that = this;
                if(this.$store.state.userId == '') {
                    that.$router.replace('/login');
                } else {
                    axios.get('http://localhost:9191/ncm/song/insertLikeSongByUserIdAndSongId',{
                        params: {
                            userid: this.$store.state.userId,
                            songid: this.$store.state.song.songId
                        },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                        if(response.data == true) {
                            that.like = false
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            unlike() {
                var that = this;
                if(this.$store.state.userId == '') {
                    that.$router.replace('/login');
                } else {
                    axios.get('http://localhost:9191/ncm/song/deleteLikeSongByUserIdAndSongId',{
                        params: {
                            userid: this.$store.state.userId,
                            songid: this.$store.state.song.songId
                        },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                        if(response.data == true) {
                            that.like = true
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            add() {
                this.messageList = false
                this.addList = !this.addList
                var that = this;
                axios.post('http://localhost:9191/ncm/song/listSongListByUserId',this.$store.state.userId,{
                    headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                }).then(function (response) {
                    console.log(response);
                    that.songListList = response.data
                }).catch(function (error) {
                    console.log(error);
                });
            },
            message() {
                this.addList = false
                this.messageList = !this.messageList
            },
            itemClick(wid) {
                axios.get('http://localhost:9191/ncm/song/insertSongListByUserIdSongIdWid',{
                    params: {
                        userid: this.$store.state.userId,
                        songid: this.$store.state.song.songId,
                        wid: wid
                    },
                    headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
                this.addList = false
            },
            submit() {
                var that = this
                var reg = /^[(a-zA-Z0-9\u4e00-\u9fa5)]{1,200}$/
                if (!reg.test(this.text)) {
                    this.regComment = '200字'
                    return;
                } else {
                    this.regComment = ''
                    if (this.$store.state.userId == '') {
                        this.$router.replace('/login');
                    }
                    axios.get('http://localhost:9191/ncm/song/insertCommentBySongIdUserIdText',{
                        params: {
                            songid: this.$store.state.song.songId,
                            userid: this.$store.state.userId,
                            text: this.text
                        },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true
                    }).then(function (response) {
                    console.log(response);
                    that.getComment();
                    }).catch(function (error) {
                    console.log(error);
                    });
                    this.text = ''
                }
            }
        }
    }
</script>

<style scoped>

    #detail {
        padding-top: 50px;
        padding-bottom: 44px;
    }

    .top {
        height: 50px;
    }

    .back {
        width: 50px;
        height: 50px;
        display: inline-block;
    }

    .p {
        margin-left: 20px;
        width: 250px;
        height: 50px;
        display: inline-block;
    }

    .p p{
        margin: 5px 0 5px 10px;
        overflow:hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
    }

    .back img{
        width: 30px;
        height: 30px;
        padding: 10px;
    }

    .middle {
        height: 330px; 
        background-repeat:repeat;
        background-size:320px 330px;
        background-attachment: fixed;
        background: blur(15px);
        filter: blur(15px);
    }

    .middleM {
        top: 100px;
        width: 320px;
        height: 330px;
        position: fixed;
    }

    .middleM img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        top:50%;
        left: 50%;
        transform: translate(+25%,+25%);
        border:30px solid #000;
    }

    .under {
        height: 94px;
    }

    .time {
        height: 47px;
    }

    .tiem-item {
        display: inline-block;
        height: 47px;
        width: 106px;
    }
    
    .time img {
        margin: 10px 0 0 30px;
        width: 30px;
        height: 30px;
    }

    .btn {
        height: 47px;
    }

    .SongList {
        width: 120px;
        height: 160px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-20%, -10%);
        background: white;
        border-radius: 5px;
        padding-left: 10px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .SongList ul {
        list-style:none;
        padding: 0px;
    }

    .SongList ul li {
        height: 30px;
        position: relative;
    }

    .SongList li span {
        overflow:hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .message {
        top: 100px;
        width: 320px;
        height: 330px;
        position: fixed;
        z-index: 10;
        background: white;
    }

    .message h4 {
        margin: 10px 0 0 20px;
    }

    .message ul {
        list-style:none;
        padding: 0px;
    }

    .messageUl {
        position: absolute;
        width: 320px;
        height: 250px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .message ul li {
        position: relative;
    }

    .text {
        width: 230px;
        margin: 10px 20px 5px 70px;
        word-wrap:break-word;
    }

    .user {
        margin-left: 20px;
        width: 50px;
        height: 50px;
        display: inline-block;
    }

    .user img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .p2 {
        width: 150px;
        height: 50px;
        display: inline-block;
    }

    .p2 p {
        padding: 0 0 0px 5px;
        margin: 0;
    }

    .praise {
        width: 50px;
        height: 50px;
        display: inline-block;
    }

    .praise img {
        width: 30px;
        height: 30px;
        padding: 10px;
    }

    .write {
        position: absolute;
        top: 300px;
    }

    .write span {
        margin-left: 5px;
        padding: 10px;
    }

    input {
        border-left-width: 0px;
        border-right-width: 0px;
        border-top-width: 0px;
    }

    .line {
        display: block;
        width: 300px;
        height: 1px;
        background-color: gray;
    }
</style>
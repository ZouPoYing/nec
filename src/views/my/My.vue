<template>
  <div id="my">
    <div v-if="getUser" class="goLoginAndRegister" @click="goLoginAndRegister">没有用户信息，去登录</div>
    <div v-else>
      <div class="userMessage" :style="bg">
          <img :src="'http://localhost:9191/ncm/'+user.userPicHead" alt="">
          <span>{{user.userName}}</span>
      </div>
      <div class="songMessage">
        <div class="my-like" @click="goMyLike('我喜欢的音乐')">
          <h2>我喜欢的音乐</h2>
          <img class="img" src="@/assets/img/common/like.jpg" alt="">
        </div>
        <div class="recently" @click="goReSong('最近播放')">
          <h2>最近播放</h2>
          <img class="img" src="@/assets/img/common/recently.jpg" alt="">
        </div>
        <div class="song-list">
          <h2>我的歌单</h2>
          <ul>
            <li @click="add">
              <img class="img1" src="@/assets/img/common/addSongList.png" alt="">
              <span>创建歌单</span>
            </li>
            <li v-for="(item, index) in songListList"  v-bind:key="index" @click="itemClick(item.wid)">
              <img class="img2" src="http://localhost:9191/ncm/song/song.jpg" alt="">
              <span>{{item.songListName}}</span>
            </li>
            <li @click="del">
              <img class="img1" src="@/assets/img/common/delete.png" alt="">
              <span>删除歌单</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="addSongList" v-if="addSongList">
        <h2>新建歌单</h2>
        <input type="text" class="text" placeholder="请输入歌单名" v-model.trim="songListName" />
        <p class="reg-songListName">{{regSongListName}}</p>
        <span @click="submit">提交</span>
        <span @click="unAdd">取消</span>
      </div>
      <div class="delSongList" v-if="delSongList">
        <h4>删除歌单</h4>
        <ul>
          <li v-for="(item, index) in songListList"  v-bind:key="index" @click="delItemClick(item.wid)">
            <span>{{item.songListName}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
        name: "My",
        data() {
          return {
            songListList: [],
            getUser: true,
            user: {
              userEmail: '',
              userId: '',
              userName: '',
              userPassword: '',
              userPicHead: ''
            },
            bg: 'background:url("http://localhost:9191/ncm/bg/bg.jpg");',
            addSongList: false,
            delSongList: false,
            songListName: '',
            regSongListName: ''
          }
        },
      created() {
        this.getUserQuery();
        this.changeGetUser();
        this.getSongListList();
      },
      methods: {
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
        changeGetUser() {
          if (this.$store.state.userId == '') {
            this.getUser = true
          } else {
            this.getUser = false
          }
          console.log(this.getUser);
        },
        getSongListList() {
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
        goLoginAndRegister() {
          this.$router.push('/login')
        },
        goMyLike(id) {
          this.$router.push('/songListDetail/'+id)
        },
        goReSong(id) {
          this.$router.push('/songListDetail/'+id)
        },
        add() {
          this.delSongList = false
          this.addSongList = !this.addSongList
        },
        del() {
          this.addSongList = false
          this.delSongList = !this.delSongList
        },
        unAdd() {
          this.addSongList = false
        },
        submit() {
          var reg = /^[(a-zA-Z0-9\u4e00-\u9fa5)]{1,5}$/
          if (!reg.test(this.songListName)) {
            this.regSongListName = '1到5个中文字母数字的组合'
            return;
          } else {
            this.regSongListName = ''
            axios.get('http://localhost:9191/ncm/song/insertSongListByUserIdAndSongListName',{
                params: {
                    userid: this.$store.state.userId,
                    songListName: this.songListName
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
            this.addSongList = false
            this.getSongListList()
          }
        },
        itemClick(id) {
          this.$router.push('/songListDetail/'+id)
        },
        delItemClick(id) {
          var that = this
          axios.post('http://localhost:9191/ncm/song/deleteSongListAndSongListDetails',id,{
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            withCredentials: true
          }).then(function (response) {
            console.log(response);
            that.getSongListList()
          }).catch(function (error) {
            console.log(error);
          });
          this.delSongList = false
        }
      }
  }
</script>

<style scoped>

  #my {
    margin-top: 50px;
    margin-bottom: 44px;
  }

  .goLoginAndRegister {
    padding-top: 200px;
    padding-left: 80px;
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

  .img {
    width: 280px;
    height: 100px;
    border-radius: 5px;
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
    top: 100px;
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

  .img1, .img2 {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background: lightgray;
  }

  .addSongList {
    width: 200px;
    height: 160px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 5px;
    padding-left: 10px;
  }

  .addSongList span{
    padding: 0 30px 0 30px;
  }

  input {
    border-left-width: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
  }

  .delSongList {
    width: 200px;
    height: 160px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 5px;
    padding-left: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .delSongList ul {
    list-style:none;
    padding: 0px;
  }

  .delSongList ul li {
    height: 30px;
    position: relative;
  }

  .delSongList li span {
    overflow:hidden;
    word-break:keep-all;
    white-space:nowrap;
    text-overflow:ellipsis;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>

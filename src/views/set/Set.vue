<template>
  <div id="set">
    <div v-if="getUser" class="goLoginAndRegister" @click="goLoginAndRegister">没有用户信息，去登录</div>
    <div v-else>
      <div class="userMessage" :style="bg">
        <img :src="'http://localhost:9191/ncm/'+user.userPicHead" alt="">
        <div v-if="editOrUpdata"  @click="edit">
          <h2>{{user.userName}}</h2>
        </div>
        <div v-else>
          <input class="userName" type="text" v-model.trim="user.userName" @blur="update">
          <span class="reg-userName">{{regUserName}}</span>
        </div>
      </div>
      <toast></toast>
      <div class="other">
        <ul>
          <span></span>
          <li><a href="http://localhost:9191/ncm/musicStore.html" target="_blank">商城</a></li>
          <span></span>
          <li><a href="http://localhost:9191/ncm/music%20man.html" target="_blank">网易音乐人</a></li>
          <span></span>
          <li><a href="http://localhost:9191/ncm/downLoad.html" target="_blank">下载客户端</a></li>
          <span></span>
          <li>创作者中心</li>
          <span></span>
          <li @click="clearUserMessage">退出登录</li>
          <span></span>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
    import Toast from "../../components/common/toast/Toast";

    export default {
        name: "Set",
      components: {Toast},
      data() {
          return{
            getUser: true,
            editOrUpdata: true,
            user: {
              userEmail: '',
              userId: '',
              userName: '',
              userPassword: '',
              userPicHead: ''
            },
            regUserName: '',
            bg: 'background:url("http://localhost:9191/ncm/bg/bg.jpg");'
          }
      },
      created() {
        this.getUserQuery();
        this.changeGetUser();
      },
      methods: {
        edit() {
          this.editOrUpdata = false
        },
        update() {
          var reg = /^[(a-zA-Z0-9\u4e00-\u9fa5)]{1,16}$/
            if (!reg.test(this.user.userName)) {
                this.regUserName = '1到16个中文字母数字的组合'
                return;
            } else {
              this.regUserName = ''
            }
          axios.post('http://localhost:9191/ncm/user/updateNameById',this.user,{
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              withCredentials: true
            }).then(function (response) {
              console.log(response);
            }).catch(function (error) {
              console.log(error);
            });
          this.editOrUpdata = true
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
        changeGetUser() {
          if (this.$store.state.userId == '') {
            this.getUser = true
          } else {
            this.getUser = false
          }
          console.log(this.getUser);
        },
        goLoginAndRegister() {
          this.$router.push('/login')
        },
        clearUserMessage() {
          this.$store.commit('getUserId','')
          this.$router.go(0)
        }
      }
    }
</script>

<style scoped>

  #set {
    padding-top: 50px;
    padding-bottom: 44px;
  }

  .goLoginAndRegister {
    padding-top: 200px;
    padding-left: 80px;
  }

  .userMessage {
    padding: 40px;
    height: 180px;
  }

  .userMessage img {
    width: 60px;
    height: 60px;
    border-radius:50%;
  }

  .userMessage h2 {
    color: white;
  }

  .other {
    position: absolute;
    top: 291px;
    width: 320px;
    height: 200px;
    border-top-width: 20px;
    border-style:solid;
    border-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .other ul li {
    padding-top: 10px;
    height: 30px;
    list-style-type: none;
    margin: 0 auto;
  }

  .other ul span {
    display: block;
    right: 40px;
    width: 240px;
    height: 1px;
    background-color: gray;
  }

  .userName {
    width: 200px;
    margin: 17px 0 17px 0;
    font-size: 24px;
    font-weight:bold;
  }

  .reg-userName {
        padding-top: 5px;
        display: flex;
        height: 20px;
        width: 250px;
    }
</style>

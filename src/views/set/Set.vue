<template>
  <div id="set">
    <div v-if="getUser" class="goLoginAndRegister" @click="goLoginAndRegister">没有用户信息，去登录</div>
    <div v-else>
      <div class="userMessage">
        <img :src="user.userPicHead" alt="">
        <img src="@/dist/static/img/user/head2.jpg" alt="">
        <!--<img src="@/assets/img/user/head2.jpg" alt="">-->
        <h2>{{user.userName}}</h2>
      </div>
      <toast></toast>
      <div class="other">
        <ul>
          <span></span>
          <li><a href="http://localhost:51705/webstromproject/vue/nec/src/musicStore.html?_ijt=aiee27asqvfm07nfj0ks7s8rlg" target="_blank">商城</a></li>
          <span></span>
          <li><a href="http://localhost:51705/webstromproject/vue/nec/src/music%20man.html?_ijt=aiee27asqvfm07nfj0ks7s8rlg" target="_blank">网易音乐人</a></li>
          <span></span>
          <li><a href="http://localhost:51705/webstromproject/vue/nec/src/downLoad.html?_ijt=45tf2ksas8cer26de8dj0cf6lh" target="_blank">下载客户端</a></li>
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
            userlist: {},
            user: '',
          }
      },
      created() {
        this.getUserQuery();
        this.changeGetUser();
        this.getUserList();
      },
      methods: {
        getUserQuery() {
          this.user = this.$route.query
        },
        changeGetUser() {
          if (JSON.stringify(this.user) == '{}') {
            this.getUser = true
          } else {
            this.getUser = false
          }
          console.log(this.getUser);
        },
        goLoginAndRegister() {
          this.$router.push('/login')
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
        },
        clearUserMessage() {
          this.user = '';
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
    margin: 40px;
    height: 200px;
  }

  .userMessage img {
    width: 60px;
    height: 60px;
    border-radius:50%;
    background-color: red;
  }

  .other {
    height: 200px;
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
</style>

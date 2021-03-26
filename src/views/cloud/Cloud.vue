<template>
    <div id="cloud">
        <tab-control class="tab-control"
                 :titles="['广场','关注']"
                 @tabClick="tabClick"></tab-control>
        <div class="message">
            <div class="messageUl">
                <ul>
                    <li v-for="(item, index) in comment"  v-bind:key="index">
                        <div class="top">
                            <div class="user">
                                <img src="http://localhost:9191/ncm/head/head.jpg" alt="">
                            </div>
                            <div class="p2">
                                <p>{{item.userName}}</p>
                                <p style="font-size: 12px;">{{item.commentDate}}</p>
                            </div>
                        </div>
                        <p class="text">{{item.comment}}</p>
                    </li>
                </ul>
            </div>
            <div class="write">
                <input type="text" class="writetext" placeholder="在这里写评论吧" v-model.trim="text" />
                <span @click="submit">发送</span>
                <span style="color: red;">{{regComment}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    // 公共组件
    import TabControl from "../../components/content/tabControl/TabControl";

    export default {
        name: "Cloud",
        data() {
          return{
            comment: [],
            text: '',
            regComment: ''
          }
        },
        components: {
            TabControl
        },
        created() {
          this.getComment();
        },
        methods: {
          getComment() {
            var that = this;
            axios.post('http://localhost:9191/ncm/song/listComment',{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            withCredentials: true
            }).then(function (response) {
                console.log(response);
                that.comment = response.data
            }).catch(function (error) {
                console.log(error);
            })
          },
          tabClick(index) {
            var that = this;
            if(index == '0') {
              this.getComment();
            } else {
              axios.post('http://localhost:9191/ncm/song/listCommentByUserId',this.$store.state.userId,{
              headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
              },
              withCredentials: true
              }).then(function (response) {
                  console.log(response);
                  that.comment = response.data
              }).catch(function (error) {
                  console.log(error);
              })
            }
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
                axios.get('http://localhost:9191/ncm/song/insertCommentByUserIdText',{
                    params: {
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

  #cloud {
    padding-top: 50px;
    padding-bottom: 44px;
  }

  .tab-control {
    position: sticky; 
    top: 40px;
    z-index: 9;
  }
  
  .message {
        top: 100px;
        width: 320px;
        height: 400px;
        position: fixed;
        z-index: 10;
        background: white;
  }

  .message ul {
    list-style:none;
    padding: 0px;
  }

  .messageUl {
        position: absolute;
        width: 320px;
        height: 380px;
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

    .write {
      padding-left: 10px;
        position: absolute;
        top: 400px;
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

</style>

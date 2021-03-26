<template>
    <div id="login-and-register">
        <div class="login" id="login" >
            <form>
                <div class="div-text">
                    <h4>欢迎登录</h4>
                    <span class="left1"></span>
                    <input type="text" class="text"  placeholder="请输入邮箱号码" v-model.trim="login.email" @blur="email" />
                </div>
                <span class="reg-email">{{regEmail}}</span>
                <div class="div-password" >
                    <span class="left2"></span>
                    <input type="password" class="password"  placeholder="请输入密码" v-model.trim="login.password" @blur="password" />
                </div>
                <span class="reg-password">{{regPassword}}</span>
                <!-- <div class="div-check" >
                    <input class="checkbox" type="checkbox" />
                    <span class="re-register">自动登录</span>
                </div> -->
                <div class="login-btn" >
                    <button type="button" class="button" @click="log">登录</button>
                </div>
                <span class="message">{{message}}</span>
                <div class="register">
                    <router-link to="/repassword">忘记登录密码</router-link>
                    <span>
                        <router-link to="/register">免费注册</router-link>
                    </span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    //import vuex from 'vuex'

    export default {
        name: "Login",
        data() {
            return {
                login: {
                    email: '',
                    password: ''
                },
                regEmail: '',
                regPassword: '',
                message: '',
                userId: ''
            }
        },
        methods: {
            log() {
                if (this.regEmail == '' || this.regPassword == '') {
                    var that = this;
                    var obj = this.login;
                    axios.post('http://localhost:9191/ncm/user/login',obj,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        withCredentials: true
                    }).then(function (response) {
                        console.log(response);
                        console.log('登陆成功');
                        console.log(response.data);
                        if (response.data != '') {
                            that.$router.push({
                                path: '/set'
                            });
                            console.log(response.data.userId);
                            that.$store.commit('getUserId',response.data.userId)
                        } else {
                            that.message = '账号或密码错误'
                        }
                    }).catch(function (error) {
                        console.log(error);
                        console.log('登陆失败');
                    });
                }
            },
            email() {
                var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (this.login.email != '' && !reg.test(this.login.email)) {
                    this.regEmail = '邮箱格式不正确'
                } else {
                    this.regEmail = ''
                }
            },
            password() {
                var reg = /^[a-zA-Z0-9]{4,16}$/
                if (this.login.password != '' && !reg.test(this.login.password)) {
                    this.regPassword = '4到16个字符'
                } else {
                    this.regPassword = ''
                }
            }
        }
    }
</script>

<style scoped>

    #login-and-register {
        padding-top: 50px;
        padding-bottom: 44px;
    }

    .login {
        display: block;
    }

    .login input {
        margin-left: 5px;
    }

    .div-text {
        padding-left: 30px;
        padding-right: 30px;
    }

    h4 {
        font-weight: normal;
    }

    .text {
        width: 200px;
        height: 25px;
        padding-left: 50px;
        margin-top: 48px;
        font-size: 12px;
    }

    .div-password {
        margin-top: 21px;
        padding-left: 30px;
        padding-right: 30px;
    }

    .password {
        width: 200px;
        height: 25px;
        padding-left: 50px;
        font-size: 12px;
    }

    .div-check {
        margin-top: 12px;
        padding-left: 30px;
        padding-right: 30px;
        font-size: 12px;
        color: #757575;
    }

    .checkbox {
        margin-top:1px;
        vertical-align:middle;
    }

    .re-register {
        margin-bottom:-1px;
        margin-left: 10px;
        font-size: 12px;
        vertical-align: middle;
    }

    .login-btn {
        margin-top: 45px;
        padding-left: 30px;
        padding-right: 30px;
    }

    .button {
        height: 35px;
        width: 100%;
        border-radius: 5px;
        font-size: 16px;
        background-color: orangered;
    }

    .register {
        padding-top: 20px;
        padding-left: 30px;
        padding-right: 30px;
    }

    .register span{
        float: right;
    }

    .reg-email {
        padding-top: 5px;
        margin-left: 30px;
        display: flex;
        height: 20px;
        width: 200px;
    }

    .reg-password {
        padding-top: 5px;
        margin-left: 30px;
        display: flex;
        height: 20px;
        width: 200px;
    }

    .message {
        padding-top: 5px;
        margin-left: 30px;
        display: flex;
        height: 20px;
        width: 200px;
    }
</style>
<template>
    <div id="register">
        <form>
            <div class="div-email">
                <h4>欢迎注册</h4>
                <div>
                    <span class="left1"></span>
                    <input type="text" placeholder="请输入您的QQ邮箱号码" v-model="register.email" class="email" @blur="email" />
                </div>
            </div>
            <span class="reg-email">{{regEmail}}</span>
            <div class="div-verification">
                <input type="text" placeholder="请输入验证码" v-model="register.code" class="code" @blur="code" />
                <button type="button" class="btn-getcoder" @click="getCode">获取邮箱验证码</button>
            </div>
            <span class="reg-code">{{regCode}}</span>
            <div class="div-password">
                <input type="password" placeholder="请输入密码" v-model="register.password" class="password" @blur="password" />
            </div>
            <span class="reg-password">{{regPassword}}</span>
            <div class="div-check">
                <label class="checkbox-pretty inline checked">
                    <input type="checkbox" class="check" @click="check" />
                    <span>同意《用户协议》</span>
                </label>
            </div>
            <div class="div-button">
                <input value="同意协议并注册" class="btn-register" @click="submit" :disabled="!isAgree" v-bind:class="{'bg':!isAgree}" />
            </div>
            <span class="message">{{message}}</span>
            <router-link to="/login"><h4 class="go-login">去登录</h4></router-link>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Register",
        data() {
            return {
                register: {
                    email: '',
                    code: '',
                    password: ''
                },
                regEmail: '',
                regCode: '',
                regPassword: '',
                isAgree: false,
                message: ''
            }
        },
        methods: {
            getCode() {
                if (this.regEmail == '') {
                    const obj = this.register.email;
                    axios.post('http://192.168.1.106:9191/ncm/user/getEmailNumber', obj,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            withCredentials: true
                        }
                    ).then(function (response) {
                    }).catch(function (error) {
                    });
                }
            },
            submit() {
                if (this.regEmail == '' || this.regCode == '' || this.regPassword == '' || this.isAgree == true) {
                    console.log('1');
                    var that = this;
                    var obj = this.register;
                    console.log(obj);
                    axios.post('http://192.168.1.106:9191/ncm/user/register', obj,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            withCredentials: true
                        }
                    ).then(function (response) {
                        if (response.data == '注册成功') {
                            that.$router.replace('/login');
                        } else {
                            that.message = response.data
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            email() {
                var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (this.register.email != '' && !reg.test(this.register.email)) {
                    this.regEmail = '邮箱格式不正确'
                } else {
                    this.regEmail = ''
                }
            },
            code() {
                var reg = /^[A-Za-z0-9]{6,6}$/
                if (this.register.code != '' && !reg.test(this.register.code)) {
                    this.regCode = '验证码格式不正确'
                } else {
                    this.regCode = ''
                }
            },
            password() {
                var reg = /^[a-zA-Z0-9]{4,16}$/
                if (this.register.password != '' && !reg.test(this.register.password)) {
                    this.regPassword = '4到16个字符'
                } else {
                    this.regPassword = ''
                }
            },
            check() {
                this.isAgree = !this.isAgree
            }
        }
    }
</script>

<style scoped>

    #register {
        padding-top: 50px;
        padding-bottom: 44px;
    }

    .div-email {
        padding-left: 30px;
        margin-top: 10px;
    }

    .div-verification {
        padding-left: 30px;
        padding-top: 1px;
        margin-top: 10px;
    }

    .div-password {
        padding-left: 30px;
        padding-top: 10px;
    }

    .div-check {
        padding-left: 30px;
        display: inline-block;
        margin-top: 5px;
    }

    .div-button {
        padding-left: 30px;
        margin-top:40px;
    }

    .email {
        margin: auto;
        display: block;
        float: left;
        padding-left: 55px;
        width: 200px;
        height: 25px;
    }

    .code {
        margin: auto;
        display: block;
        float: left;
        padding-left: 55px;
        width: 100px;
        height: 25px;
    }

    .password {
        margin: auto;
        display: block;
        float: left;
        padding-left: 55px;
        width: 200px;
        height: 25px;
    }

    .btn-getcoder {
        width: 100px;
        height: 31px;
        float: left;
        font-size: 12px;
    }

    .btn-register {
        margin-left: 30px;
        width: 150px;
        height: 30px;
        padding: 20px;
        border: 1px rgba(187, 187, 187, 0.5) solid;
        background-color: orangered;
        font-size: 20px;
    }

    .go-login {
        margin-left: 40px;
    }

    .reg-email {
        padding-top: 5px;
        margin-left: 30px;
        display: flex;
        height: 20px;
        width: 200px;
    }

    .reg-code {
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

    .bg {
        background-color: gainsboro;
    }
</style>
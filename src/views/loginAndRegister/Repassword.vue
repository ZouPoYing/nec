<template>
    <div id="repassword">
        <form>
            <div class="div-email">
                <h4>重置密码</h4>
                <div>
                    <span class="left1"></span>
                    <input type="text" placeholder="请输入您的QQ邮箱号码" v-model.trim="register.email" class="email" @blur="email" />
                </div>
            </div>
            <span class="reg-email">{{regEmail}}</span>
            <div class="div-verification">
                <input type="text" placeholder="请输入验证码" v-model.trim="register.code" class="code" @blur="code" />
                <button type="button" class="btn-getcoder" @click="getCode">获取邮箱验证码</button>
            </div>
            <span class="reg-code">{{regCode}}</span>
            <div class="div-password">
                <input type="password" placeholder="请输入新密码" v-model.trim="register.password" class="password" @blur="password" />
            </div>
            <span class="reg-password">{{regPassword}}</span>
            <div class="div-button">
                <input value="重置密码" class="btn-repassword" @click="submit" />
            </div>
            <span class="message">{{message}}</span>
            <div class="jump">
                <router-link to="/login"><h4 class="go-login">去登录</h4></router-link>
                <router-link to="/register"><h4 class="go-register">去注册</h4></router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Repassword",
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
                message: ''
            }
        },
        methods: {
            getCode() {
                if (this.regEmail == '') {
                    const obj = this.register.email;
                    axios.post('http://localhost:9191/ncm/user/reGetEmailNumber', obj,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            withCredentials: true
                        }
                    ).then(function (response) {
                        console.log(response);
                        console.log('验证码发送成功');
                    }).catch(function (error) {
                        console.log(error);
                        console.log('验证码发送失败');
                    });
                }
            },
            submit() {
                if (this.regEmail == '' || this.regCode == '' || this.regPassword == '') {
                    var that = this;
                    var obj = this.register;
                    console.log(obj);
                    axios.post('http://localhost:9191/ncm/user/rePassword', obj,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            withCredentials: true
                        }
                    ).then(function (response) {
                        console.log(response);
                        if(response.data == '重置成功') {
                            that.$router.push('/login');
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
            }
        }
    }
</script>

<style scoped>

    #repassword {
        padding-top: 50px;
        padding-bottom: 44px;
    }

    .div-email {
        padding-left: 30px;
    }

    .div-verification {
        padding-left: 30px;
        padding-top: 20px;
    }

    .div-password {
        padding-left: 30px;
        padding-top: 20px;
    }

    .div-button {
        padding-left: 30px;
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

    .btn-repassword {
        margin-top: 20px;
        margin-left: 30px;
        width: 100px;
        height: 10px;
        padding: 20px;
        border: 1px rgba(187, 187, 187, 0.5) solid;
        background-color: orangered;
        font-size: 20px;
    }

    .go-login {
        display: inline;
        width: 50px;
        height: 40px;
        margin-left: 40px;
    }

    .go-register {
        display: inline;
        width: 50px;
        height: 40px;
        margin-left: 140px;
    }

    .jump {
        margin-top: 20px;
        width: 300px;
        height: 50px;
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
</style>
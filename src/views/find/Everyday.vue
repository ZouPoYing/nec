<template>
    <div id="everyday">
        <div class="userMessage" :style="bg">
          <img src="@/assets/img/common/day.png" alt="">
          <span>每日推荐</span>
        </div>
        <div class="songMessage">
            <ul>
                <li v-for="(item, index) in songList"  v-bind:key="index" @click="itemClick(item)">
                    <div class="index">
                        <span>{{index+1}}</span>
                    </div>
                    <div class="info">
                        <p>{{item.songName}}</p>
                        <p>{{item.songAuthor}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Everyday",
        data() {
            return{
                songList: [],
                bg: 'background:url("http://localhost:9191/ncm/bg/day.jpg") no-repeat;'
            }
        },
        created() {
            this.getSongList();
        },
        methods: {
            getSongList() {
                var that = this;
                if(this.$store.state.userId == '') {
                    that.$router.replace('/login');
                }
                axios.post('http://localhost:9191/ncm/song/listDay',this.$store.state.userId,{
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
            itemClick(item) {
                this.$store.commit('getSong',item)
                this.$router.push('/detail')
            }
        }
    }
</script>

<style scoped>

    #everyday {
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

</style>
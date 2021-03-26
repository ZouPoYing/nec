<template>
    <div id="tab-bar"  @click="click">
        <div id="song-icon">
            <slot>
                <img :src="'http://localhost:9191/ncm/'+this.$store.state.song.songPic" alt="">
            </slot>
        </div>
        <div id="song-info">
            <slot>
                <p class="name">{{this.$store.state.song.songName}}</p>
                <p class="author">{{this.$store.state.song.songAuthor}}</p>
            </slot>
        </div>
        <div id="song-play" @click="play">
            <slot>
                <img src="@/assets/img/common/unplay.png" alt="">
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabBar",
        data() {
            return{
                // song: {
                //     songId: '',
                //     songName: '歌曲名',
                //     songAuthor: '作者',
                //     songDate: '',
                //     songPic: 'song/song.jpg',
                //     songTime: '',
                //     songType: '',
                //     songSong: 'mp3/song.mp3'
                //     },
                //     bg: 'background:url("http://localhost:9191/ncm/song/song.jpg");'
            }
        },
        methods: {
            click() {
                if (this.$store.state.song.songId == '') {
                    return
                }
                this.$store.commit('getSong',this.$store.state.song)
                this.$router.push('/detail')
            },
            play() {

            }
        }
    }
</script>

<style scoped>
    #tab-bar {
        display: flex;
        height: 44px;
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 0px;
        box-shadow: 0 -1px 1px rgba(100,100,100,0.2);
        z-index: 10;
    }

    #song-icon, #song-play {
        width: 60px;
        background: white;
    }

    #song-icon img {
        margin: 6px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }

    #song-play img {
        margin: 6px;
        width: 35px;
        height: 35px;
    }

    #song-info {
        flex: 1;
        background: white;
    }

    #song-info p{
        margin: 2px 0 0 20px;
        overflow:hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
</style>

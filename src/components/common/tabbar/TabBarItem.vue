<template>
    <div id="tab-bar-item">
        <div>
            <slot name="song-icon">
                <img :src="'http://localhost:9191/ncm/'+this.$store.song.songPic" alt="">
            </slot>
        </div>
        <div>
            <slot name="song-info">
                <p class="name">{{this.$store.song.songName}}</p>
                <p class="author">{{this.$store.song.songAuthor}}</p>
            </slot>
        </div>
        <div>
            <slot name="song-play">
                <img src="@/assets/img/common/unplay.png" alt="">
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
       name: "TabBarItem"
    }
</script>

<style scoped>

    img {
        width: 30px;
        height: 30px;
    }
</style>

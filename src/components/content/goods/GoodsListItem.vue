<template>
    <div id="goods-item" @click="itemClick">
        <img :src="'http://localhost:9191/ncm/'+goodsListItem.songPic" alt="">
        <div class="goods-info">
            <p>{{goodsListItem.songName}}</p>
            <span class="left">{{goodsListItem.songAuthor}}</span>
            <span class="right">{{goodsListItem.songLikeNum}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props: {
            goodsListItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            itemClick() {
                //this.$store.commit('getSongId',this.goodsListItem.songId)
                this.$store.commit('getSong',this.goodsListItem)
                this.$router.push('/detail')
            }
        }
    }
</script>

<style scoped>
    #goods-item {
        padding-bottom: 40px;
        position: relative;
        width: 48%;
        float: left;
    }
    #goods-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-info {
        margin-left: 20px;
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
        color:black;
    }

    .goods-info .left {
        color:gray;
        margin-right: 20px;
    }

    .goods-info .right {
        position: relative;
        text-align: center;
    }

    .goods-info .right::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("../../../assets/img/common/like.png") 0 0/14px 14px;
    }
</style>
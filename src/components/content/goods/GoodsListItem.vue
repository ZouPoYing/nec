<template>
    <div id="goods-item" @click="itemClick">
        <img :src="goodsListItem.show.img" alt="">
        <div class="goods-info">
            <p>{{goodsListItem.title}}</p>
            <span class="left">{{goodsListItem.price}}</span>
            <span class="right">{{goodsListItem.cfav}}</span>
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
                console.log('1');
                /*console.log(this.product);*/
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
    }
    #goods-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-info {
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
    }

    .goods-info .left {
        color: red;
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
        background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>
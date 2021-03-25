<template>
    <div id="goods-list">
        <goods-list-item v-for="item in goodslist" :key="item.link" :goods-list-item="item">

        </goods-list-item>

    </div>

</template>

<script>
    import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
        components: {
            GoodsListItem
        },
        props: {
            goodslist: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>

    #goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>
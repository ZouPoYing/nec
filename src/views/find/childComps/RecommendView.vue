<template>
    <div id="recommend">
        <div class="recommend-item" v-for="item in recommends" :key="item.id">
            <a  :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>

</template>

<script>
    export default {
        name: "RecommendView",
        props: {
            recommends: {
                type: Array,
                default() {
                    return []
                }
            }
        },
    }
</script>

<style scoped>
    #recommend {
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
    }

    .recommend-item {
        flex: 1; /*元素均等分*/
    }

    .recommend-item img {
        width: 60px;
        height: 60px;
    }
</style>
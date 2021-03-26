<template>
    <div id="recommend">
        <div class="recommend-item" v-for="(item, index) in recommends" :key="item.id" @click="itemClick(index)">
            <a  :href="item.link">
                <img :src="'http://localhost:9191/ncm/'+item.img" alt="">
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
        methods: {
            itemClick(id) {
                console.log(id);
                if (id == '0') {
                    this.$router.push('/everyday')
                } else if (id == '1') {
                    this.$router.push('/songList')
                } else if (id == '2') {
                    this.$router.push('/ranking')
                } else {
                    return
                }
            }
        }
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
        width: 40px;
        height: 40px;
        background: red;
        border-radius:50%;
        margin: 10px;
    }
</style>
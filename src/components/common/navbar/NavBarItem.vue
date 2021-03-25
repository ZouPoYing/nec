<template>
    <div class="nav-bar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-cion-active"></slot></div>
        <div :class="{active: isActive}"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBarItem",
        props: {
            path: String
        },
        data() {
            return{
            }
        },
        computed: {
            isActive() {
                return this.$route.path.indexOf(this.path) !== -1 //判断活跃路由是不是当前路由
            }
        },
        methods: {
            itemClick() {
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>
    .nav-bar-item {
        flex: 1;
        text-align: center;
        height: 40px;
    }

    .nav-bar-item img {
        width: 24px;
        height: 24px;
    }

    .active {
        color: black;
        font-size: 18px;
    }
</style>
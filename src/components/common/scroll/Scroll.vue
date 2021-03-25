<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$ref.wrapper, {
                /*probeType: 3,
                click: true,
                pullUpLoad: true*/
            })
            this.scroll.scrollTo(0,0)
            // 监听滚动位置
            /*this.scroll.on('scroll', (position) => {

            })*/
            // 监听上拉事件
            /*this.scroll.on('pullingUp', () => {
                console.log('上拉加载更多');
            })*/
        }/*,
        methods: {
            btnClick() {
                console.log('1');
            }
        }*/
    }
</script>

<style scoped>

</style>
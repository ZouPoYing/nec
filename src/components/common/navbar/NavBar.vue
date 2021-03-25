<template>
    <div id="nav-bar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
    #nav-bar {
        display: flex;
        background-color: white;
        /* 定位相关 */
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        padding-top: 10px;
        line-height: 44px;
        z-index: 9;
    }


</style>
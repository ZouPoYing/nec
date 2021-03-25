<template>
    <div id="tab-bar">
        <div id="song-icon"><slot></slot></div>
        <div id="song-info"><slot></slot></div>
        <div id="song-play"><slot></slot></div>
    </div>
</template>

<script>
    export default {
        name: "TabBar"
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
    }

     #song-icon, #song-play {
         width: 60px;
         background-color: red;
     }

    #song-info {
        flex: 1;
        background-color: blue;
    }
</style>

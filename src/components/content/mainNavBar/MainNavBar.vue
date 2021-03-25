<template>
    <nav-bar>
        <nav-bar-item path="/set">
            <img slot="item-icon" src="@/assets/img/navbar/set.png">
            <img slot="item-icon-active" src="@/assets/img/navbar/set-black.png">
        </nav-bar-item>
        <nav-bar-item path="/my">
            <div slot="item-text">我的</div>
        </nav-bar-item>
        <nav-bar-item path="/find">
            <div slot="item-text">发现</div>
        </nav-bar-item>
        <nav-bar-item path="/cloud">
            <div slot="item-text">云村</div>
        </nav-bar-item>
        <nav-bar-item path="video">
            <div slot="item-text">视频</div>
        </nav-bar-item>
        <nav-bar-item path="search">
            <img slot="item-icon" src="@/assets/img/navbar/search.png">
            <img slot="item-cion-active" src="@/assets/img/navbar/search-black.png">
        </nav-bar-item>
    </nav-bar>
</template>

<script>
    import NavBar from "../../common/navbar/NavBar";
    import NavBarItem from "../../common/navbar/NavBarItem";
    export default {
        name: "MainNavBar",
        components: {
            NavBar,
            NavBarItem
        },
        data() {
            return {
                //imgURL: "@/assets/img/navbar/search.png"
            }
        }
    }
</script>

<style scoped>

</style>
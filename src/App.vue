<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    created() {
        var self = this;
        window.onload = function() {
            console.log("windLoad");
            self.$EventBus.$emit("windLoad");
        };
        window.onresize = function() {
            console.log("windowResize");
            self.$EventBus.$emit("windowResize");
        };
        document.body.onclick = function(event) {
            console.log("bodyClick");
            self.$EventBus.$emit("bodyClick", event);
        };
    }
};
</script>

<style scoped>
    #app {
        height: 100%;
        overflow: hidden;
    }
</style>

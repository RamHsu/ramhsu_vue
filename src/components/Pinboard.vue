<template>
    <div class="pinboard-container">
        <ruler-wrapper
            ref="rulerWrapper"
            :curPinConfig="curPinConfig"
            :saveRulerLines="saveRulerLines"
        ></ruler-wrapper>
        <div class="charts-container">
            <!--  -->
        </div>
    </div>
</template>

<script>
import RulerWrapper from "./common/RulerWrapper";
export default {
    name: "Pinboard",
    components: { RulerWrapper },
    data() {
        return {
            curPinConfig: null
        };
    },
    methods: {
        saveRulerLines() {}
    },
    created() {
        let self = this;
        self.$EventBus.$on("windowResize", function() {
            console.log("--- windowResize ---");
        });
    },
    mounted() {
        let _self = this;
        _self.$refs.rulerWrapper && _self.$refs.rulerWrapper.drawTicks();
    },
    destroyed() {
        let self = this;
        self.$EventBus.$off("windowResize");
    }
};
</script>

<style scoped>
    .pinboard-container {
        position: absolute;
        top: 50px;
        right: 50px;
        bottom: 50px;
        left: 50px;
        background-color: #eee;
        transform-origin: 0 0;
        /* transform: scale(0.75); */
    }
    .charts-container {
        position: absolute;
        top: 50px;
        right: 50px;
        bottom: 50px;
        left: 50px;
        background-color: #333;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<template>
    <div>
        <p>Answer {{ $t("") }}</p>
    </div>
</template>

<script>
export default {
    name: "Answer",
    data() {
        return {
            timer: null
        };
    },
    created() {
        let self = this;
        self.$EventBus.$on("windLoad", function() {
            console.log("--- windLoad ---");
        });
        self.$EventBus.$on("windowResize", function() {
            console.log("--- windowResize ---");
        });
        self.$EventBus.$on("bodyClick", function(event) {
            console.log("--- bodyClick ---", event);
        });
    },
    mounted() {
        var self = this;
    }
};
</script>；
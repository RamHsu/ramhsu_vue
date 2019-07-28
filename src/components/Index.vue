<template>
    <div>
        <div class="nav">
            <router-link :to="{name: 'Search'}">Search</router-link>
            <router-link :to="{name: 'Answer'}">Answer</router-link>
            <router-link :to="{name: 'Pinboard'}">Pinboard</router-link>
            <router-link :to="{name: 'Mine'}">Mine</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
    name: "Index",
    data() {
        return {};
    },
    computed: {
        ...mapState({
            user: "user",
            appInfos: "appInfos"
        }),
        ...mapGetters({
            getUser: "getUser",
            getAppInfos: "getAppInfos"
        })
    },
    methods: {
        ...mapMutations({
            setUser: "setUser",
            setAppInfos: "setAppInfos"
        }),
        ...mapActions({
            setUserAsync: "setUserAsync",
            setAppInfosAsync: "setAppInfosAsync"
        })
    },
    mounted() {
        let _self = this;

        // 检测登录状态
        /* _self.$axios({
            url: _self._localUrls.getLoginStatus,
            method: "post",
            successCallback(data) {
                if (data.success) {
                    _self.setAppInfos({
                        appInfos: {
                            ownedAnswers: 99999999,
                            usedUsers: 0,
                            usedTables: 5,
                            ownedUsers: 99999999,
                            usedAnswers: 7,
                            ownedTables: 99999999,
                            ownedPinboards: 99999999,
                            usedPinboards: 1
                        }
                    });
                } else {
                    _self.$router.push({
                        path: "/login",
                        query: {
                            redirectUrl: encodeURIComponent(
                                document.location.href
                            )
                        }
                    });
                }
            },
            errorCallback() {
                console.log("error");
            }
        }); */
    }
};
</script>

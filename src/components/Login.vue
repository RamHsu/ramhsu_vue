<template>
    <div>Login olala</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
    name: "Login",
    data() {
        return {};
    },
    computed: {
        ...mapState({
            user: "user",
            appInfos: "appInfos"
        }),
        ...mapGetters({
            userId: "getUser",
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

        // 登录操作
        /* _self.$axios({
            url: _self._localUrls.login,
            method: "post",
            data: {
                userName: "admin",
                password: "admin"
            },
            cancelBefore: true,
            successCallback(data) {
                if (data.success) {
                    _self.setUser({ user: data.user });
                    _self.setCookie("access_token", data.accessToken);
                    _self.setCookie("user_id", data.user.id);

                    // 请求头统一加header
                    // 请求头统一加header
                    if (data.accessToken !== "") {
                        _self.axios.defaults.headers.common["Access-Token"] = data.accessToken;
                        _self.axios.defaults.headers.common["Cache-Control"] = "no-cache";
                        _self.axios.defaults.headers.common["Prama"] = "no-cache";
                        _self.axios.defaults.headers.common["If-Modified-Since"] = "0";
                    }

                    var redirectUrl = (_self.$route.query && _self.$route.query.redirectUrl) || null;
                    if (redirectUrl) {
                        document.location.href = decodeURIComponent(redirectUrl);
                    } else {
                        _self.$router.push({
                            name: "Search"
                        });
                    }
                } else {
                    console.log("登录失败");
                    _self.$router.push({
                        name: "Pinboard"
                    });
                }
            },
            errorCallback(error) {
                console.log(error);
                _self.$router.push({
                    name: "Pinboard"
                });
            }
        }); */
    }
};
</script>

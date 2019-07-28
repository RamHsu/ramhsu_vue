import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRouterMap = [
    {
        path: "/",
        name: "Index",
        redirect: "/answer",
        privileges: [1, 2, 3, 4],
        component: resolve => require(["@/components/Index"], resolve),
        children: [
            {
                mode: "Search",
                path: "/search",
                name: "Search",
                privileges: [3],
                component: resolve => require(["@/components/Search"], resolve)
            },
            {
                mode: "Answer",
                path: "/answer",
                name: "Answer",
                privileges: [1],
                component: resolve => require(["@/components/Answer"], resolve)
            },
            {
                mode: "Pinboard",
                path: "/pinboard",
                name: "Pinboard",
                privileges: [2],
                component: resolve =>
                    require(["@/components/Pinboard"], resolve)
            },
            {
                mode: "Mine",
                path: "/mine",
                name: "Mine",
                privileges: [4],
                component: resolve => require(["@/components/Mine"], resolve)
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: function(resolve) {
            require(["@/components/Login"], resolve);
        }
    }
];

export default new Router({
    routes: constantRouterMap
});

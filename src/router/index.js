import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRouterMap = [
    {
        path: "/",
        name: "index",
        redirect: "/answer",
        privileges: [1, 2, 3, 4],
        component: resolve => require(["@/components/Index"], resolve),
        children: [
            {
                mode: "Answer",
                path: "/answer",
                name: "answer",
                privileges: [1],
                component: resolve => require(["@/components/Answer"], resolve)
            },
            {
                mode: "Pinboard",
                path: "/pinboard",
                name: "pinboard",
                privileges: [2],
                component: resolve =>
                    require(["@/components/Pinboard"], resolve)
            },
            {
                mode: "Search",
                path: "/search",
                name: "search",
                privileges: [3],
                component: resolve => require(["@/components/Search"], resolve)
            },
            {
                mode: "Mine",
                path: "/mine",
                name: "mine",
                privileges: [4],
                component: resolve => require(["@/components/Mine"], resolve)
            }
        ]
    }
];

export default new Router({
    routes: constantRouterMap
});

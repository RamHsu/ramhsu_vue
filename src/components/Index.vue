<template>
  <div class="rm-app">
    <div class="rm-app-contaner">
      <router-view />
    </div>
    <ul class="rm-nav">
      <li v-for="route in routes" :class="{ current: $route.path.indexOf(route.path) > -1 }">
        <router-link :to="route.path">
          <span v-text="$t('nav.' + route.name)"></span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { constantRouterMap } from "@/router";
export default {
  name: "Index",
  data() {
    return {
      routes: null
    };
  },
  created() {
    let self = this;
    let indexRoute = constantRouterMap.find(route => route.name === "index");
    self.routes = (indexRoute && indexRoute.children) || [];
  }
};
</script>

<style scoped>
.rm-app {
    height: 100%;
}

.rm-app-contaner {
    height: calc(100% - 50px);
}

.rm-nav {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    border-top: 1px solid #eee;
}

.rm-nav li {
    flex-grow: 1;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    text-transform: uppercase;
}

.rm-nav li.current a {
    color: #008ff8;
}
</style>
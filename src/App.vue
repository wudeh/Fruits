<template>
<keep-alive>
  <div id="app">
    <router-view />
  </div>
</keep-alive>
</template>

<script>
export default {
  name: "App",
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}

</script>
<style>
#app {
  background-color: #f0f0f0;
}
</style>

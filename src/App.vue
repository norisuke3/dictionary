<template>
<div id="app">
  <div id="nav">
    <div class="menu-button pt-3 mr-3" @click.stop="openHistory">
      <Hamburger></Hamburger>
    </div>
    <transition name="right">
      <div id="history" v-if="historyShown">
        <History @close="closeHistory"></History>
      </div>
    </transition>
  </div>
  <router-view/>
</div>
</template>

<script>
import Hamburger from '@/components/Hamburger.vue'
import History from '@/components/History.vue'
export default {
  components: { Hamburger, History },
  props: [ ],
  data: function(){
    return {
      historyShown: false,
    }
  },
  computed: {
  },
  methods: {
    openHistory: function(){
      this.historyShown = true
    },
    closeHistory: function(){
      this.historyShown = false
    }
  }
}
</script>

<style scoped>
#app {
  height: 100%;
}

#nav {
    text-align: right;
}

.menu-button {
  position: relative;
  height: 20px;
  width: 28px;
  display: inline-block;
}

#history{
  text-align: left;
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: #eeeeff;
}
</style>

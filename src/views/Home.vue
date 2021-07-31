<template>
<div id="app">
  <div id="header">
    <b-nav>
      <b-nav-item @click="activePage = 'Weblio'">Weblio</b-nav-item>
    </b-nav>

    <div class="menu-button pt-3 mr-3" @click.stop="openHistory">
      <Hamburger></Hamburger>
    </div>

    <transition name="right">
      <div id="history" v-if="historyShown">
        <History @close="closeHistory"></History>
      </div>
    </transition>
  </div>

  <div class="home">
    <iframe v-if="activePage == 'Weblio'" :src="urlWeblio" frameborder="0"></iframe>
  </div>
</div>
</template>

<script>
import Hamburger from '@/components/Hamburger.vue'
import History from '@/components/History.vue'
import _ from "lodash"

export default {
  components: { Hamburger, History },
  props: [ ],
  data: function(){
    return {
      historyShown: false,
      activePage: "Weblio",
    }
  },
  computed: {
    urlWeblio: function(){
      return "https://ejje.weblio.jp/content/" + (this.$route.params.word || "");
    }
  },
  methods: {
    openHistory: function(){
      this.historyShown = true
    },
    closeHistory: function(){
      this.historyShown = false
    }
  },
  created(){
    var storage = localStorage;
    var max = 100;
    var history = storage["history"] ? JSON.parse(storage["history"]) : [];
    var word = this.$route.params.word;

    if ( !_.includes(history, word) ) {
      history.length == max && history.shift();
      history.push(word);
      storage["history"] = JSON.stringify(history);
    }
  }
}
</script>

<style scoped>
.home, .home > iframe {
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
}

#header {
    text-align: right;
}

.nav {
    float: left;
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
